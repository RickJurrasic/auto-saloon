<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Car;
use Exception;
use GoPay\Api as GoPay;
use GoPay\Definition\Language;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class GoPayService
{
    private $gopay;

    public function __construct()
    {
        $this->gopay = GoPay::payments([
            'goid' => config('services.gopay.goid'),
            'clientId' => config('services.gopay.client_id'),
            'clientSecret' => config('services.gopay.client_secret'),
            'gatewayUrl' => config('services.gopay.gateway_url', 'https://gw.gopay.com/api'), // Default to production URL
            'language' => Language::ENGLISH,
        ]);
    }

    public function createPayment(Booking $booking, Car $car)
    {
        $response = $this->gopay->createPayment([
            'payer' => [
                'default_payment_instrument' => 'PAYMENT_CARD',
                'contact' => [
                    'first_name' => $booking->user->first_name ?? 'Test',
                    'last_name' => $booking->user->last_name ?? 'User',
                    'email' => $booking->email,
                ],
            ],
            'amount' => $car->price * 100,
            'currency' => 'USD',
            'order_number' => 'BOOKING-'.$booking->id.'-'.Str::random(4),
            'order_description' => 'Test drive booking for '.$car->brand.' '.$car->model,
            'items' => [
                ['name' => 'Test drive booking', 'amount' => $car->price * 100],
            ],
            'callback' => [
                'return_url' => route('bookings.callback'),
                'notification_url' => route('bookings.webhook'),
            ],
            'lang' => Language::ENGLISH,
        ]);

        if ($response->hasSucceed()) {
            $booking->payment_id = $response->json['id'];
            $booking->save();

            return $response;
        }

        // Log a more specific error message and throw an exception.
        $errorMessage = 'GoPay payment creation failed: '.($response->json['errors'][0]['message'] ?? json_encode($response->json));
        Log::error($errorMessage, ['response' => $response->json]);

        // Instead of deleting, mark as failed to keep a record.
        $booking->status = 'failed';
        $booking->save();
        throw new Exception($errorMessage);
    }

    public function getPaymentStatus(string $paymentId)
    {
        return $this->gopay->getStatus($paymentId);
    }

    public function handleWebhook(string $paymentId)
    {
        $response = $this->getPaymentStatus($paymentId);

        if ($response->hasSucceed()) {
            $paymentStatus = $response->json['state'];
            $booking = Booking::where('payment_id', $paymentId)->first();

            if (! $booking) {
                Log::warning("GoPay Webhook: Booking not found for payment ID: {$paymentId}");

                return response()->json(['message' => 'Booking not found'], 404);
            }

            switch ($paymentStatus) {
                case 'PAID':
                    if ($booking->status !== 'confirmed') {
                        $booking->status = 'confirmed';
                        $booking->save();
                        Log::info("GoPay Webhook: Booking {$booking->id} confirmed for payment ID: {$paymentId}");
                    }
                    break;
                case 'CANCELED':
                case 'TIMEOUTED':
                case 'REFUNDED':
                    if ($booking->status !== 'cancelled') {
                        $booking->status = 'cancelled';
                        $booking->save();
                        Log::info("GoPay Webhook: Booking {$booking->id} cancelled for payment ID: {$paymentId} (State: {$paymentStatus})");
                    }
                    break;
                case 'CREATED':
                case 'PAYMENT_METHOD_CHOSEN':
                    // These are intermediate states, usually no action is needed.
                    Log::info("GoPay Webhook: Received intermediate status '{$paymentStatus}' for payment ID {$paymentId}");
                    break;
                default:
                    Log::warning("GoPay Webhook: Unhandled payment status '{$paymentStatus}' for payment ID {$paymentId}");
            }

            return response()->json(['message' => 'Webhook processed successfully'], 200);
        }

        Log::error("GoPay Webhook Error for payment ID {$paymentId}: ".($response->json['errors'][0]['message'] ?? json_encode($response->json)));

        return response()->json(['message' => 'Failed to get payment status from GoPay'], 500);
    }
}
