<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function index(Request $request)
    {
        $query = Movie::with(['director', 'actors']);

        // Search filter by title, genre, or actor first or last name
        if ($search = $request->query('search')) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('genre', 'like', "%{$search}%")
                  ->orWhereHas('actors', function($q2) use ($search) {
                      $q2->where('first_name', 'like', "%{$search}%")
                         ->orWhere('last_name', 'like', "%{$search}%");
                  });
            });
        }

        // Pagination - 8 movies per page
        $movies = $query->paginate(6);

        return response()->json($movies);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'summary'      => 'required|string',
            'release_year' => 'required|integer|min:1900|max:' . date('Y'),
            'duration'     => 'required|integer|min:1',
            'genre'        => 'required|string|max:100',
            'poster_url'   => 'nullable|string|max:255',
            'director_id'  => 'required|exists:directors,id',
            'actors'       => 'array',
            'actors.*.id'  => 'required|exists:actors,id',
            'actors.*.role'=> 'required|string|max:255',
        ]);

        $movie = Movie::create($validated);

        if ($request->has('actors')) {
            $syncData = [];
            foreach ($request->actors as $actor) {
                $syncData[$actor['id']] = ['role' => $actor['role']];
            }
            $movie->actors()->sync($syncData);
        }

        return response()->json($movie->load('director', 'actors'), 201);
    }

    public function show($id)
    {
        $movie = Movie::with(['director', 'actors'])->findOrFail($id);
        return response()->json($movie);
    }

    public function update(Request $request, $id)
    {
        $movie = Movie::findOrFail($id);

        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'summary'      => 'required|string',
            'release_year' => 'required|integer|min:1900|max:' . date('Y'),
            'duration'     => 'required|integer|min:1',
            'genre'        => 'required|string|max:100',
            'poster_url'   => 'nullable|string|max:255',
            'director_id'  => 'required|exists:directors,id',
            'actors'       => 'nullable|array',
            'actors.*.id'  => 'required_with:actors|exists:actors,id',
            'actors.*.role'=> 'required_with:actors|string|max:255',
        ]);

        $movie->update($validated);

        if ($request->has('actors')) {
            $syncData = [];
            foreach ($request->actors as $actor) {
                $syncData[$actor['id']] = ['role' => $actor['role']];
            }
            $movie->actors()->sync($syncData);
        }

        return response()->json($movie->load('director', 'actors'));
    }

    public function destroy($id)
    {
        $movie = Movie::findOrFail($id);
        $movie->actors()->detach();
        $movie->delete();

        return response()->json(null, 204);
    }
}
