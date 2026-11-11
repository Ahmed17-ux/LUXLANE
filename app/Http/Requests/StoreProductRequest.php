<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=> 'required|min:4|max:50|unique:products,name',
            'imag' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:4096', // Allow images up to 4096 kilobytes
            'description'=>'required|min:20|max:255',
            'price'=>'required|numeric|min:3',
            'quantity'=>'required|numeric|min:10',
            'category_name'=>'required'
        ];
    }
}
