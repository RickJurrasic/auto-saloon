<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Car;
use App\Services\GoPayService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BookingController extends Controller
{
    use AuthorizesRequests;

    private $gopayService;

    public function __construct(GoPayService $gopayService)
    {
        $this->gopayService = $gopayService;
    }

    public function index()
    {
        $user = Auth::user();

        if ($user->is_admin) {
            $bookings = Booking::with(['car.user', 'user'])->latest()->get();
        } else {
            $bookings = $user->bookings()->with(['car.user'])->latest()->get();
        }

        return Inertia::render('BookingManagement', ['bookings' => $bookings]);
    }

    public function create()
    {
        // Fetch all cars to pass to the booking form dropdown
        $cars = Car::orderBy('brand')->orderBy('model')->get(['id', 'brand', 'model', 'price']);

        return inertia('BookARide', [
            'cars' => $cars,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'car_id' => 'required|exists:cars,id',
            'booking_date' => 'required|date|after_or_equal:today',
            'message' => 'nullable|string',
        ]);

        $car = Car::findOrFail($validated['car_id']);

        $booking = Booking::create([
            'user_id' => Auth::id(),
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'car_id' => $car->id,
            'test_drive_date' => $validated['booking_date'],
            'message' => $validated['message'],
            'amount' => $car->price,
            'status' => 'pending',
            'payment_id' => null,
        ]);

        $response = $this->gopayService->createPayment($booking, $car);

        if ($response && $response->hasSucceed()) {
            return Inertia::location($response->json['gw_url']);
        }

        // The GoPayService now handles marking the booking as 'failed' and logging.
        // We just need to inform the user.
        return back()->with('error', 'Could not initiate payment. Please try again.');
    }

    public function destroy(Booking $booking)
    {
        $this->authorize('delete', $booking);

        try {
            if ($booking->delete()) {
                return back()->with('success', 'Booking deleted successfully.');
            }

            return back()->with('error', 'Failed to delete the booking.');
        } catch (\Exception $e) {
            Log::error('Error deleting booking: '.$e->getMessage());

            return back()->with('error', 'An error occurred while deleting the booking.');
        }
    }

    public function callback(Request $request)
    {
        $paymentId = $request->query('id');

        if (! $paymentId) {
            return redirect()->route('bookings.failed')->with('error', 'Invalid payment ID.');
        }

        try {
            $response = $this->gopayService->getPaymentStatus($paymentId); // Corrected from getPaymentStatus
            $booking = Booking::where('payment_id', $paymentId)->firstOrFail();

            if ($response->hasSucceed()) {
                $paymentStatus = $response->json['state'];

                if ($paymentStatus === 'PAID') {
                    $booking->status = 'confirmed';
                    $booking->save();

                    return redirect()->route('bookings.success');
                }

                $booking->status = 'failed';
                $booking->save();

                return redirect()->route('bookings.failed')->with('error', 'Payment was not completed.');
            } else {
                Log::error('GoPay Status Check Error: '.$response);
                $booking->status = 'failed';
                $booking->save();

                return redirect()->route('bookings.failed')->with('error', 'Could not verify payment status.');
            }
        } catch (\Exception $e) {
            Log::error('Booking callback error: '.$e->getMessage());

            return redirect()->route('bookings.failed')->with('error', 'An unexpected error occurred.');
        }
    }

    public function success()
    {
        return Inertia::render('BookingSuccess');
    }

    public function failed()
    {
        return Inertia::render('BookingFailed');
    }

    public function webhook(Request $request)
    {
        $paymentId = $request->input('id');

        if (! $paymentId) {
            Log::warning('GoPay Webhook: Received notification without payment ID.');

            return response()->json(['message' => 'Missing payment ID'], 400);
        }

        try {
            return $this->gopayService->handleWebhook($paymentId);
        } catch (\Exception $e) {
            Log::error('GoPay Webhook: An unexpected error occurred: '.$e->getMessage().' for payment ID: '.$paymentId);

            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
}
