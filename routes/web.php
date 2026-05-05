<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\CarImageController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', fn () => inertia('Home'))->name('home');
Route::get('/about', fn () => inertia('About'))->name('about');

Route::get('/showroom', [CarController::class, 'publicIndex'])->name('showroom.index');

// Nice friendly booking link
Route::get('/book-a-ride', [BookingController::class, 'create'])->name('bookings.create');


/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

Route::get('/login', fn () => inertia('Login'))->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


/*
|--------------------------------------------------------------------------
| Booking + Payment (public + webhook)
|--------------------------------------------------------------------------
*/

Route::prefix('bookings')->name('bookings.')->group(function () {

    // Public-facing + webhook callbacks
    Route::get('/create', [BookingController::class, 'create'])->name('create');
    Route::post('/', [BookingController::class, 'store'])->name('store');

    Route::get('/callback', [BookingController::class, 'callback'])->name('callback');
    Route::get('/success', [BookingController::class, 'success'])->name('success');
    Route::get('/failed', [BookingController::class, 'failed'])->name('failed');
    Route::get('/webhook', [BookingController::class, 'webhook'])->name('webhook');

    // Authenticated booking management
    Route::middleware('auth')->group(function () {
        Route::get('/', [BookingController::class, 'index'])->name('index');
        Route::delete('/{booking}', [BookingController::class, 'destroy'])->name('destroy');
    });
});


/*
|--------------------------------------------------------------------------
| Admin / Authenticated Area
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Car CRUD (except show, because show is public)
    Route::resource('cars', CarController::class)->except(['show']);

    // Car image deletion
    Route::delete(
        '/car-images/{car_image}',
        [CarImageController::class, 'destroy']
    )->name('car-images.destroy');

});

Route::get('/cars/{car}', [CarController::class, 'show'])->name('cars.show');
