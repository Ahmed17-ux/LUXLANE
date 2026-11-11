<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Models\Category;

class SearchController extends Controller
{
    public function searchCategories(Request $request)
    {
        $searchTerm = $request->input('term');
        $minutes = 60;

        $results = Cache::remember('category_search_' . $searchTerm, $minutes, function () use ($searchTerm) {
            return Category::where('category_name', 'like', '%' . $searchTerm . '%')->get();
        });

        return response()->json($results);
    }
}

