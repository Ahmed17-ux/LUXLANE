<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'name',
        'imag',
        'description',
        'price',
        'quantity',
        'category_name',
    ];
    public function video()
    {
        return $this->hasOne(Video::class);
    }

}
