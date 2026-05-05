<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EngineTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('engine_types')->insert([
            ['name' => 'electric'],
            ['name' => 'petrol'],
            ['name' => 'hybrid'],
            // Add more types if needed
        ]);
    }
}
