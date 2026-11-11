<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Import the User model
use App\Models\User;

class Report extends Model
{
    use HasFactory;

    /**
     * Get the user that submitted the report.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
