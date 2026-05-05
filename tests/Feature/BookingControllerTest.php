<?php

namespace Tests\Feature;

use App\Models\Car;
use App\Models\User;
use GoPay\Api as GoPay;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Mockery;
use Tests\TestCase;

class BookingControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /** @test */
    public function a_user_can_initiate_a_booking_and_is_redirected_to_gopay()
    {
        // 1. Arrange
        $user = User::factory()->create();
        $car = Car::factory()->create(['price' => 500]);
        $bookingData = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber,
            'car_id' => $car->id,
            'booking_date' => now()->addDay()->format('Y-m-d'),
            'message' => $this->faker->sentence,
        ];

        // Mock the GoPay service
        $gopayMock = Mockery::mock(GoPay::class);
        $this->app->instance(GoPay::class, $gopayMock);

        $fakeGoPayResponse = (object) [
            'gw_url' => 'https://gw.gopay.com/gw/v3/12345',
            'id' => 12345,
        ];

        $gopayMock->shouldReceive('createPayment')->andReturn(new class($fakeGoPayResponse)
        {
            public $json;

            public function __construct($json)
            {
                $this->json = (array) $json;
            }

            public function hasSucceed()
            {
                return true;
            }
        });

        // 2. Act
        $response = $this->actingAs($user)->post(route('bookings.store'), array_merge($bookingData, ['price' => $car->price])); // The 'price' field is added to the bookingData array for validation purposes in the controller.

        // 3. Assert
        $this->assertDatabaseHas('bookings', [
            'user_id' => $user->id,
            'car_id' => $car->id,
            'email' => $bookingData['email'],
            'status' => 'pending', // Initially pending
        ]);

        // Assert a 409 Conflict response, which Inertia uses for external redirects.
        $response->assertStatus(409);
    }

    /** @test */
    public function it_handles_gopay_api_failure_gracefully()
    {
        // 1. Arrange
        $user = User::factory()->create();
        $car = Car::factory()->create(['price' => 500]);
        $bookingData = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'car_id' => $car->id,
            'booking_date' => now()->addDay()->format('Y-m-d'),
            'price' => $car->price,
        ];

        // Mock the GoPay service to simulate a failure
        $gopayMock = Mockery::mock(GoPay::class);
        $this->app->instance(GoPay::class, $gopayMock);

        $gopayMock->shouldReceive('createPayment')->andReturn(new class
        {
            public function hasSucceed()
            {
                return false;
            }

            public function __toString()
            {
                return 'Error from GoPay';
            }
        });

        // 2. Act
        $response = $this->actingAs($user)->post(route('bookings.store'), array_merge($bookingData, ['price' => $car->price]));

        // 3. Assert
        $this->assertDatabaseMissing('bookings', [
            'user_id' => $user->id,
            'car_id' => $car->id,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('error', 'Could not initiate payment. Please try again.');
    }
}
