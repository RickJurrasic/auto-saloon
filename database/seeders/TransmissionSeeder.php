<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransmissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('transmissions')->insert([
            ['name' => 'Manual'],
            ['name' => 'Automatic'],
            ['name' => 'Semi-Automatic'],
            // Add more types if needed
        ]);
    }
}
