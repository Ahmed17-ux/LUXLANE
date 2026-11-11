<?php

namespace App\Http\Requests;

use App\Models\Editor;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEditorRequest extends FormRequest
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
        'firstname'=>'required|between:4,50',
        'lastname'=>'required|between:4,50',
        'date_of_birth'=>'required|date',
        'gender'=>['required',Rule::in(['m','f'])],
        'address'=>'required|max:255',
        'phone' => 'required|string|max:10|unique:editors,phone',
        'email' => 'required|email|unique:editors,email',
        'password'=>'required|min:8|max:60'
    ];
    }
}
