<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/showroom', [CarController::class, 'index']);

Route::get('/about', function () {
    return view('about');
});
