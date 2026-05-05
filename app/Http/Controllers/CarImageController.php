<?php

namespace App\Http\Controllers;

use App\Models\CarImage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;

class CarImageController extends Controller
{
    use AuthorizesRequests;

    public function destroy(CarImage $car_image)
    {
        // Authorize that the user owns the car this image belongs to
        $this->authorize('update', $car_image->car);

        // Delete the image from storage
        Storage::disk('public')->delete($car_image->image_path);

        // Delete the image from the database
        $car_image->delete();

        return back()->with('success', 'Image deleted successfully.');
    }
}
