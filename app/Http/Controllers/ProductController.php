<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;



class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function index()
{
    
    $products = Product::with('video')->get();
    $flattenedProducts = $products->map(function ($product) {
        return [
            'id' => $product->id,
            'name' => $product->name,
            'imag' => $product->imag,
            'price'=>$product->price,
            'description' => $product->description,
            'quantity' => $product->quantity,
            'category_name' => $product->category_name,
            'video_url' => $product->video->video_url ?? null,
        ];
    });

    return response()->json(['products' => $flattenedProducts]);

}


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {

        $formFields = $request->validated();
        $formFields['imag'] = $request->file('imag')->store('products', 'public');
        $product = Product::create($formFields);
        return response()->json($product, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
{
    try {
        $validatedData = $request->validated();
        $product->update($validatedData);

        return response()->json(['message' => 'Product updated successfully']);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error updating product'], 500);
    }
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            $product->delete();

            return response()->json(['message' => 'Product removed successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error removing product'], 500);
        }
    }
}
