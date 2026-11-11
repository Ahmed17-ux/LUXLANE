<?php

namespace App\Http\Controllers;

use App\Models\Editor;
use App\Http\Requests\StoreEditorRequest;
use App\Http\Requests\UpdateEditorRequest;
use Illuminate\Support\Facades\Hash;

class AdminEditorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $editors = Editor::all();

        return response()->json($editors);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEditorRequest $request)
    {
        $formFields = $request->validated();
        $formFields['password'] = Hash::make($formFields['password']);
        $editor = Editor::create($formFields);

        return response()->json($editor, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Editor $editor)
    {
        // return response()->json($editor);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEditorRequest $request, Editor $editor)
    {
        $formFields = $request->validated();
        $editor->update($formFields);

        return response()->json($editor);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Editor $editor)
    {
        $editor->delete();

        return response()->json(null, 204);
    }
}
