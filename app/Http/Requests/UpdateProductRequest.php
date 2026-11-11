<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'name' => 'sometimes|required|min:4|max:50|unique:products,name,' . ($this->route('product')?->id),
            'description' => 'sometimes|required|min:20|max:255',
            'price' => 'sometimes|required|numeric|min:3',
            'quantity' => 'sometimes|required|numeric|min:0',
            'category_name' => 'sometimes|required|exists:categories,category_name',
        ];
    }
}
