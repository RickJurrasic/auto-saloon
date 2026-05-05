<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCarRequest;
use App\Models\BodyType;
use App\Models\Car;
use App\Models\EngineType;
use App\Models\Transmission;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

class CarController extends Controller
{
    use AuthorizesRequests;

    // Public index for listing all cars
    public function publicIndex(Request $request)
    {
        $filters = $request->only(['search']);
        $cars = Car::with('images')
            ->when($request->input('search'), function ($query, $search) {
                $query->where('brand', 'like', "%{$search}%")
                    ->orWhere('model', 'like', "%{$search}%");
            })
            ->paginate(9)
            ->withQueryString();

        return inertia('Showroom', [
            'cars' => $cars,
            'filters' => $filters,
        ]);
    }

    // Admin - Car Management index
    public function index()
    {
        $user = Auth::user();
        $cars = $user->is_admin ?
            Car::with(['engineType', 'transmission', 'bodyType'])->latest()->get() :
            $user->cars()->with(['engineType', 'transmission', 'bodyType'])->latest()->get();

        return inertia('CarManagement', compact('cars'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('CarCreate', [
            'engineTypes' => EngineType::all(),
            'transmissions' => Transmission::all(),
            'bodyTypes' => BodyType::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */

    /**
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(StoreCarRequest $request)
    {
        $car = Auth::user()->cars()->create($request->validated());

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) { // Changed from $request->images as $imageFile
                // Resize and encode the image
                $image = Image::read($imageFile);

                // Get original dimensions
                $width = $image->width();
                $height = $image->height();

                // Determine target crop size to maintain 2:1
                if ($width / $height > 2) {
                    // Too wide → crop width
                    $newWidth = $height * 2;
                    $x = ($width - $newWidth) / 2;
                    $y = 0;
                    $image->crop($newWidth, $height, $x, $y);
                } else {
                    // Too tall → crop height
                    $newHeight = $width / 2;
                    $x = 0;
                    $y = ($height - $newHeight) / 2;
                    $image->crop($width, $newHeight, $x, $y);
                }

                // Resize to final dimensions
                $image->resize(1200, 600);

                // Save
                $path = 'car_images/'.uniqid().'.jpg';
                Storage::disk('public')->put($path, $image->encodeByExtension('jpg', 90));

                // Create the database record
                $car->images()->create(['image_path' => $path]);
            }
        }

        return redirect()->route('cars.index')->with('success', 'Car added successfully.');
    }

    public function show(Car $car)
    {
        $car->load(['images', 'engineType', 'transmission', 'bodyType', 'user']);

        return inertia('CarDetail', ['car' => $car]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Car $car)
    {
        $this->authorize('update', $car);

        $car->load('images');

        return inertia('CarEdit', [
            'car' => $car,
            'engineTypes' => EngineType::all(),
            'transmissions' => Transmission::all(),
            'bodyTypes' => BodyType::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCarRequest $request, Car $car)
    {
        $this->authorize('update', $car);

        $car->update($request->validated());

        if ($request->hasFile('images')) {
            // Delete old images
            foreach ($car->images as $image) {
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
            }

            foreach ($request->file('images') as $imageFile) {
                // Resize and encode the image
                $image = Image::read($imageFile)->resize(width: 1200);
                $encodedImage = $image->toJpeg();

                // Generate a unique name
                $path = 'car_images/'.uniqid().'.jpg';

                // Store in public disk
                Storage::disk('public')->put($path, $encodedImage);

                // Create the database record
                $car->images()->create(['image_path' => $path]);
            }
        }

        return redirect()->route('cars.index')->with('success', 'Car updated successfully.');
    }

    public function destroy(Car $car)
    {
        // Check if user can delete cars (through CarPolicy)
        $this->authorize('delete', $car);

        $car->delete();

        // Redirect to the admin dashboard route
        return redirect()->route('cars.index')->with('success', 'Car deleted successfully.');
    }
}
