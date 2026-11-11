<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Editor extends Authenticatable
{
    use HasApiTokens, HasFactory, SoftDeletes, Notifiable;

    protected $fillable = [
        'firstname',
        'lastname',
        'date_of_birth',
        'gender',
        'address',
        'email',
        'phone',
        'password',
    ];


    protected $hidden = ['password'];


    protected $appends =['role'];
    public function getRoleAttribute(){
     return 'editor';
    }
}

