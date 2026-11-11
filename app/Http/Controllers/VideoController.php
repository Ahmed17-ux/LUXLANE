<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'video' => 'required|mimes:mp4,avi,mov,ogg,qt|max:45000',
        ]);

        // Save video file to storage
        $videoPath = $request->file('video')->store('videos', 'public');

        // Create video record in the database
        $video = Video::create([
            'product_id' => $request->input('product_id'),
            'video_url' => $videoPath, 
        ]);

        return response()->json($video, 201);
    }
}
