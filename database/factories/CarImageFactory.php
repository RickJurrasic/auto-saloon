<?php

namespace Database\Factories;

use App\Models\Car;
use Illuminate\Database\Eloquent\Factories\Factory;

class CarImageFactory extends Factory
{
    protected $model = \App\Models\CarImage::class;

    public function definition(): array
    {
        return [
            'car_id' => Car::factory(),  // creates a new car if none specified
            'image_path' => $this->faker->imageUrl(640, 480, 'cars'), // fake car image URL
        ];
    }
}
