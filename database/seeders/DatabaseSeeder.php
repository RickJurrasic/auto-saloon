<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(TransmissionSeeder::class);
        $this->call(BodyTypeSeeder::class);
        $this->call(EngineTypeSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(CarSeeder::class);
        $this->call(CarImageSeeder::class);
    }
}
