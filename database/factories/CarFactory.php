<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CarFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),  // creates a user for this car automatically
            'brand' => $this->faker->randomElement(['Toyota', 'Ford', 'BMW', 'Porsche']),
            'model' => $this->faker->randomElement(['Focus', 'Yaris', 'Cayenne', '3 Series']),
            'year' => $this->faker->numberBetween(1990, 2024),
            'price' => $this->faker->randomFloat(2, 10000, 100000),
        ];
    }
}
