<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BodyTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('body_types')->insert([
            ['name' => 'Sedan'],
            ['name' => 'SUV'],
            ['name' => 'Hatchback'],
            ['name' => 'Coupe'],
            ['name' => 'Convertible'],
            ['name' => 'Wagon'],
            ['name' => 'Van'],
            ['name' => 'Pickup'],
            // Add more types if needed
        ]);
    }
}
