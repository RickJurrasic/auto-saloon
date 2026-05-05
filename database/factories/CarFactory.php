<?php

namespace Database\Factories;

use App\Models\BodyType;
use App\Models\EngineType;
use App\Models\Transmission;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'brand' => $this->faker->randomElement(['Toyota', 'Ford', 'BMW', 'Porsche']),
            'model' => $this->faker->randomElement(['Focus', 'Yaris', 'Cayenne', '3 Series']),
            'year' => $this->faker->numberBetween(1990, 2024),
            'price' => $this->faker->randomFloat(2, 10000, 100000),
            'cardescription' => $this->faker->paragraph(15),
            'user_id' => User::factory(),
            'horsepower' => $this->faker->numberBetween(100, 1000),
            'body_type_id' => BodyType::factory(),
            'engine_type_id' => EngineType::factory(),
            'transmission_id' => Transmission::factory(),
        ];
    }
}
