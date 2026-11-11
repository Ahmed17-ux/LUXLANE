<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{

    public function index(){
        $ListUsers = User::all();
        return  response()->json($ListUsers);
    }
    public function update(Request $request, $id)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|max:255|unique:users,email,' . $id
        ]);

        // Find the user by ID
        $user = User::findOrFail($id);

        // Update the user with validated data
        $user->update($validatedData);

        // Return a success response
        return response()->json(['message' => 'User profile updated successfully'], 200);
    }

    public function getPassword()
    {
        try {
            // Get the ID of the authenticated user
            $userId = Auth::id();

            // Find the user by ID
            $user = User::findOrFail($userId);

            $decrypt= Crypt::decrypt($user->password);

            // Return the hashed password
            return response()->json(['password' => $decrypt], 200);
        } catch (\Exception $e) {
            // Handle any errors, such as user not found
            return response()->json(['error' => 'User not found'], 404);
        }
    }

public function remove(Request $request, $id)
    {
        try {
            dd($id);
            // Find the user by ID
            $user = User::findOrFail($id);
            if (Auth::id() !== $user->id) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve the user's password from the request
            $userPassword = $request->password;
            // Verify the provided password with the user's actual password
            if (!Hash::check($userPassword, $user->password)) {
                return response()->json(['error' => 'Incorrect password'], 401);
            }

            // Logout the user

            $user->delete();

            return response()->json(['message' => 'User account deleted successfully'], 200);
        } catch (\Exception $e) {
            // Handle any errors, such as user not found
            return response()->json(['error' => 'User not found'], 404);
        }
    }



    public function AddAndUpdateImage(Request $request)
    {
        // Get the uploaded image file
        $imageFile = $request->file('image');

        // Check if an image file was uploaded
        if ($imageFile) {
            // Optionally, you can delete the user's old image if it exists
            $user = Auth::user(); // Assuming you're using Laravel's built-in authentication
            $currentUser = User::find($user->id);

            if ($currentUser->image) {
                // Delete the old image file
                Storage::disk('public')->delete($currentUser->image);
            }

            // Store the uploaded image file in the 'UserImage' directory within the 'public' disk
            $storedPath = $imageFile->store('UserImage', 'public');

            // Update the user's image path in the database
            $currentUser->image = $storedPath;
            $currentUser->save();

            // Return a response with the stored path or any other relevant information
            return response()->json(['stored_path' => $storedPath]);
        } else {
            // If no image file was uploaded, return an error response
            return response()->json(['error' => 'No image file uploaded'], 400);
        }
    }

}











