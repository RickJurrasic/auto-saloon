<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\User;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'test@example.com')->first();

        if ($user) {
            Car::factory(10)->create([
                'user_id' => $user->id,
            ]);
        }
    }
}
