<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Car;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $carsQuery = Car::with('user');
        $bookingsQuery = Booking::with(['car.user', 'user']);

        if (! $user->is_admin) {
            $carsQuery->where('user_id', $user->id);
            $bookingsQuery->whereHas('car', fn ($query) => $query->where('user_id', $user->id));
        }

        $cars = $carsQuery->get();
        $bookings = $bookingsQuery->get();

        return inertia('Dashboard', compact('cars', 'bookings'));
    }
}
