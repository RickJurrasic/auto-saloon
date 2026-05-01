<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with('car')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
        ]);
    }

    public function create($carId)
    {
        $car = Car::findOrFail($carId);

        return Inertia::render('Bookings/Create', [
            'car' => $car,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
        ]);

        $booking = Booking::create([
            'user_id' => Auth::id(),
            'car_id' => $request->car_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'status' => 'pending',
        ]);

        return Inertia::render('Bookings/Show', [
            'booking' => $booking->load('car'),
        ]);
    }

    public function show($id)
    {
        $booking = Booking::with('car')
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        return Inertia::render('Bookings/Show', [
            'booking' => $booking,
        ]);
    }

    public function destroy($id)
    {
        $booking = Booking::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $booking->delete();

        return Inertia::render('Bookings/Index', [
            'bookings' => Booking::with('car')
                ->where('user_id', Auth::id())
                ->orderBy('created_at', 'desc')
                ->get(),
        ]);
    }
}