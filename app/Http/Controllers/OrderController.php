<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator as FacadesValidator;

class OrderController extends Controller
{
    public function index()
    {
        $allOrders = Order::all();
        return response()->json(['orders' => $allOrders]);
    }
    public function countorders(){
        $allOrders = Order::all();
        return response()->json(['orders' => $allOrders->count()]);
    }
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validator = FacadesValidator::make($request->all(), [
            'order_date' => 'required|date_format:d/m/Y',
            'prix_total' => 'required|numeric',
            'user_id' => 'required|exists:users,id',
            'id_product' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'order_status' => 'nullable|string|in:in_progress,completed,canceled', // Add validation for order_status
        ]);

        // If validation fails, return the validation errors
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create a new order instance
        $order = new Order();
        $order->order_date = date_create_from_format('d/m/Y', $request->input('order_date'));
        $order->prix_total = $request->input('prix_total');
        $order->user_id = $request->input('user_id');
        $order->id_product = $request->input('id_product');
        $order->quantity = $request->input('quantity');
        $order->order_status = $request->input('order_status', 'in_progress');

        // Save the order to the database
        $order->save();

        // Return a success response
        return response()->json(['message' => 'Order created successfully'], 201);
    }


}
