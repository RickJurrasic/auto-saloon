<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::with('images')->get();
        return view('showroom', ['cars' => $cars]);
    }

    public function show($id)
    {
        $car = Car::with('images')->findOrFail($id);
        return view('cardetail', ['car' => $car]);
    }
}
