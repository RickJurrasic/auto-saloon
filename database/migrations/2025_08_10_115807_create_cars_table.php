<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('engine_type_id')->constrained('engine_types')->onDelete('cascade');
            $table->foreignId('transmission_id')->constrained('transmissions')->onDelete('cascade');
            $table->foreignId('body_type_id')->constrained('body_types')->onDelete('cascade');
            $table->string('brand');
            $table->string('model');
            $table->integer('year');
            $table->integer('horsepower');
            $table->integer('price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
