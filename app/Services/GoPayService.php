Here's the `GoPayService.php` file that addresses all requirements including the Sonar issue and the critical rule about replacing 'Room' with 'Car':


<?php

namespace App\Services;

use App\Models\Car;
use App\Models\Booking;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use InvalidArgumentException;
use RuntimeException;

class GoPayService
{
    private string $apiKey;
    private string $apiUrl;
    private string $merchantId;

    public function __construct()
    {
        $this->apiKey = config('services.gopay.api_key');
        $this->apiUrl = config('services.gopay.api_url');
        $this->merchantId = config('services.gopay.merchant_id');
    }

    /**
     * Create a payment for a car booking
     *
     * @param Booking $booking
     * @return array
     * @throws GoPayPaymentException
     */
    public function createPayment(Booking $booking): array
    {
        if (!$booking->car_id) {
            throw new GoPayPaymentException('Car is required for payment creation');
        }

        $car = Car::find($booking->car_id);
        if (!$car) {
            throw new GoPayPaymentException('Selected car not found');
        }

        try {
            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'Authorization' => 'Basic ' . base64_encode($this->apiKey),
            ])->post($this->apiUrl . '/payments', [
                'amount' => $booking->total_price * 100, // GoPay expects amount in cents
                'currency' => 'CZK',
                'order_number' => $booking->id,
                'callback' => [
                    'return_url' => route('booking.payment.return', $booking->id),
                    'notification_url' => route('booking.payment.notification'),
                ],
                'items' => [
                    [
                        'name' => $car->name,
                        'amount' => $booking->total_price * 100,
                        'count' => 1,
                    ]
                ],
                'customer' => [
                    'email' => $booking->email,
                    'first_name' => $booking->first_name,
                    'last_name' => $booking->last_name,
                ],
                'payment_method' => 'card',
            ]);

            if ($response->failed()) {
                Log::error('GoPay payment creation failed', [
                    'booking_id' => $booking->id,
                    'response' => $response->json(),
                ]);
                throw new GoPayPaymentException('Failed to create payment in GoPay');
            }

            return $response->json();
        } catch (\Exception $e) {
            Log::error('Unexpected error in GoPay payment creation', [
                'booking_id' => $booking->id,
                'error' => $e->getMessage(),
            ]);
            throw new GoPayPaymentException('Payment creation failed: ' . $e->getMessage());
        }
    }

    /**
     * Verify payment status
     *
     * @param string $paymentId
     * @return array
     * @throws GoPayPaymentException
     */
    public function verifyPayment(string $paymentId): array
    {
        try {
            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'Authorization' => 'Basic ' . base64_encode($this->apiKey),
            ])->get($this->apiUrl . "/payments/{$paymentId}");

            if ($response->failed()) {
                throw new GoPayPaymentException('Failed to verify payment status');
            }

            return $response->json();
        } catch (\Exception $e) {
            Log::error('Payment verification error', [
                'payment_id' => $paymentId,
                'error' => $e->getMessage(),
            ]);
            throw new GoPayPaymentException('Payment verification failed: ' . $e->getMessage());
        }
    }

    /**
     * Cancel a payment
     *
     * @param string $paymentId
     * @return bool
     * @throws GoPayPaymentException
     */
    public function cancelPayment(string $paymentId): bool
    {
        try {
            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'Authorization' => 'Basic ' . base64_encode($this->apiKey),
            ])->post($this->apiUrl . "/payments/{$paymentId}/void");

            if ($response->failed()) {
                throw new GoPayPaymentException('Failed to cancel payment');
            }

            return true;
        } catch (\Exception $e) {
            Log::error('Payment cancellation error', [
                'payment_id' => $paymentId,
                'error' => $e->getMessage(),
            ]);
            throw new GoPayPaymentException('Payment cancellation failed: ' . $e->getMessage());
        }
    }
}

/**
 * Custom exception for GoPay service errors
 */
class GoPayPaymentException extends RuntimeException
{
    public function __construct(string $message = "", int $code = 0, ?\Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}


Key features of this implementation:

1. **Dedicated Exception**: Created `GoPayPaymentException` that extends `RuntimeException` to satisfy the Sonar requirement
2. **Car-Only Logic**: All references to "Room" have been replaced with "Car" as required
3. **Proper Error Handling**: 
   - Validates booking and car existence
   - Handles HTTP request failures
   - Logs errors appropriately
   - Throws specific exceptions with meaningful messages
4. **Service Structure**:
   - `createPayment()` - Creates payment for a booking
   - `verifyPayment()` - Checks payment status
   - `cancelPayment()` - Cancels a payment
5. **Configuration**: Uses Laravel config for GoPay settings
6. **Type Safety**: Proper parameter and return type hints
7. **Logging**: Comprehensive logging for debugging and monitoring
8. **Error Messages**: Clear, actionable error messages for debugging

The service integrates with Laravel's HTTP client, handles payment creation, verification, and cancellation flows, and properly manages errors with custom exceptions instead of generic ones.