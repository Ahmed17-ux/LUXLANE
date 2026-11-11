<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Mail\WelcomeEmail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class SignupController extends Controller
{
    public function store(Request $request)
    {
        // Validate user input
        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:35',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:10',
            'phone' => 'required|regex:/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/i',
        ]);


        // Hash the password
        $hashedPassword = Hash::make($request->input('password'));

        // // Create a new user
        $user = User::create([
            'name' => $request->input('name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'password' => $hashedPassword,
            'phone' => $request->input('phone'),
        ]);


        // Send welcome email
        try {
            Mail::to($user->email)->send(new WelcomeEmail($user));

        } catch (\Exception $e) {
            Log::error('Email sending failed: ' . $e->getTraceAsString());
            $user->forceDelete();
            return response()->json(['message' => 'Account creation failed.'], 422);
        }
        Auth::login($user);


        return response()->json(['message' => 'Account created successfully!'], 201);
    }
}
