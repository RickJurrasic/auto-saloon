<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Car;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CarControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        // Create admin user for all tests
        $this->user = User::factory()->create([
            'is_admin' => true,
        ]);

        $this->actingAs($this->user);
    }

    /** @test */
    public function an_authenticated_user_can_view_the_car_management_page()
    {
        // Car must belong to admin user
        $car = Car::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->get(route('cars.index'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->component('CarManagement')
                ->has('cars', 1)
                ->where('cars.0.id', $car->id)
        );
    }

    /** @test */
    public function an_authenticated_user_can_view_the_create_car_page()
    {
        $response = $this->get(route('cars.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn($page) => $page->component('CarCreate'));
    }

    /** @test */
    public function an_authenticated_user_can_create_a_car()
    {
        $bodyType = \App\Models\BodyType::factory()->create();
        $engineType = \App\Models\EngineType::factory()->create();
        $transmission = \App\Models\Transmission::factory()->create();

        $carData = [
            'brand' => 'Test Brand',
            'model' => 'Test Model',
            'year' => 2023,
            'price' => 10000,
            'cardescription' => 'Longer test description.',
            'horsepower' => 300,
            'body_type_id' => $bodyType->id,
            'engine_type_id' => $engineType->id,
            'transmission_id' => $transmission->id,
        ];

        $response = $this->post(route('cars.store'), $carData);

        $response->assertRedirect(route('cars.index'));
        $this->assertDatabaseHas('cars', [
            'brand' => 'Test Brand',
            'user_id' => $this->user->id  // Important!
        ]);
    }

    /** @test */
    public function an_authenticated_user_can_view_the_edit_car_page()
    {
        $car = Car::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->get(route('cars.edit', $car));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->component('CarEdit')
                ->where('car.id', $car->id)
        );
    }

    /** @test */
    public function an_authenticated_user_can_delete_a_car()
    {
        $car = Car::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->delete(route('cars.destroy', $car));

        $response->assertRedirect(route('cars.index'));
        $this->assertDatabaseMissing('cars', ['id' => $car->id]);
    }
}
