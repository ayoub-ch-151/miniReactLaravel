<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Actor;
use Illuminate\Http\Request;

class ActorController extends Controller
{
    public function index()
    {
        return response()->json(Actor::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'birth_date' => 'required|date',
            'country'    => 'required|string|max:100',
        ]);

        $actor = Actor::create($validated);

        return response()->json($actor, 201);
    }

    public function show($id)
    {
        $actor = Actor::with('movies')->findOrFail($id);
        return response()->json($actor);
    }

    public function update(Request $request, $id)
    {
        $actor = Actor::findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'birth_date' => 'required|date',
            'country'    => 'required|string|max:100',
        ]);

        $actor->update($validated);

        return response()->json($actor);
    }

    public function destroy($id)
    {
        $actor = Actor::findOrFail($id);
        $actor->movies()->detach(); // remove pivot references
        $actor->delete();

        return response()->json(null, 204);
    }
}
