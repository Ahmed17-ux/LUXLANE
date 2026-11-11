<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CommentsController extends Controller
{
    public function index()
    {
        $userId = Auth::user()->id;

        $userComments = Comments::where('customer_id', $userId)->get();

        $otherComments = Comments::where('customer_id', '!=', $userId)->get();

        $specialArray = [];
        foreach ($otherComments as $comment) {
             $specialArray[] = [
                'id' => $comment->id,
                'content' => $comment->content,
            ];
        }

        return response()->json([
            'my_comments' => $userComments,
            'other_comments' => $specialArray
        ], 200);
    }


    public function store(Request $request)
{


    $customer_id = Auth::user()->id;
    // Define validation rules
    $validatedData = $request->validate([
        'product_id' => 'required|exists:products,id',
        'rating' => 'required|integer|min:1|max:5',
        'content' => 'required|string',
    ]);
    $validatedData['customer_id'] = $customer_id;

    $comment = Comments::create($validatedData);

    return response()->json($comment, 201);
}

}
