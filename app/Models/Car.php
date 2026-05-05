<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Car extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'user_id',
        'engine_type_id',
        'transmission_id',
        'body_type_id',
        'brand',
        'model',
        'year',
        'horsepower',
        'price',
        'cardescription',
    ];

    protected static function booted()
    {
        static::deleting(function (Car $car) {
            // Delete associated images from storage and database
            foreach ($car->images as $image) {
                // Delete the file from storage
                Storage::disk('public')->delete($image->image_path);
                // Delete the database record
                $image->delete();
            }
        });
    }

    public function transmission()
    {
        return $this->belongsTo(\App\Models\Transmission::class);
    }

    public function bodyType()
    {
        return $this->belongsTo(\App\Models\BodyType::class);
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function images()
    {
        return $this->hasMany(CarImage::class);
    }

    public function engineType()
    {
        return $this->belongsTo(\App\Models\EngineType::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
