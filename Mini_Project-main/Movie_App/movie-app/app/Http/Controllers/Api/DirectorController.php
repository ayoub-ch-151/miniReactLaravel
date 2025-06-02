<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Director;
use Illuminate\Http\Request;

class DirectorController extends Controller
{
    public function index()
    {
        return response()->json(Director::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'birth_date' => 'required|date',
        ]);

        $director = Director::create($validated);

        return response()->json($director, 201);
    }

    public function show($id)
    {
        $director = Director::with('movies')->findOrFail($id);
        return response()->json($director);
    }

    public function update(Request $request, $id)
    {
        $director = Director::findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'birth_date' => 'required|date',
        ]);

        $director->update($validated);

        return response()->json($director);
    }

    public function destroy($id)
    {
        $director = Director::findOrFail($id);
        $director->delete();

        return response()->json(null, 204);
    }
}
