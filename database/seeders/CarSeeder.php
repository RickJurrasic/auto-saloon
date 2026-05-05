<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\User;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        $adminUser = User::where('email', 'admin@example.com')->first();
        $testUser = User::where('email', 'user@example.com')->first();
        $transmissionIds = \App\Models\Transmission::pluck('id')->toArray();
        $bodyTypeIds = \App\Models\BodyType::pluck('id')->toArray();

        // If our specific users don't exist, exit gracefully.
        if (! $adminUser || ! $testUser) {
            $this->command->warn('Could not find admin or test user. Skipping CarSeeder.');

            return;
        }

        // Create 3 cars for the non-admin test user
        for ($i = 0; $i < 3; $i++) {
            Car::factory()->create([
                'user_id' => $testUser->id,
                'engine_type_id' => random_int(1, 3),
                'transmission_id' => $transmissionIds[array_rand($transmissionIds)],
                'body_type_id' => $bodyTypeIds[array_rand($bodyTypeIds)],
                'horsepower' => random_int(100, 500),
                'price' => random_int(5000, 100000),
            ]);
        }

        // Create 8 cars for the admin user
        for ($i = 0; $i < 8; $i++) {
            Car::factory()->create([
                'user_id' => $adminUser->id,
                'engine_type_id' => random_int(1, 3),
                'transmission_id' => $transmissionIds[array_rand($transmissionIds)],
                'body_type_id' => $bodyTypeIds[array_rand($bodyTypeIds)],
                'horsepower' => random_int(100, 500),
                'price' => random_int(5000, 100000),
            ]);
        }
    }
}
