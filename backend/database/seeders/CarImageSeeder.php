<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\CarImage;
use Illuminate\Database\Seeder;

class CarImageSeeder extends Seeder
{
    public function run(): void
    {
        $cars = Car::all();

        foreach ($cars as $car) {
            // Let's add 3 images per car with seeded URLs so images are stable
            for ($i = 1; $i <= 3; $i++) {
                CarImage::create([
                    'car_id' => $car->id,
                    'image_path' => "https://picsum.photos/seed/car{$car->id}_img{$i}/800/600",
                ]);
            }
        }
    }
}
