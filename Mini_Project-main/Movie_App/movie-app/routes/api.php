<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DirectorController;
use App\Http\Controllers\Api\ActorController;
use App\Http\Controllers\Api\MovieController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('movies', [MovieController::class, 'store']);
    Route::put('movies/{movie}', [MovieController::class, 'update']);
    Route::delete('movies/{movie}', [MovieController::class, 'destroy']);
});

// Public routes
Route::apiResource('movies', MovieController::class)->only(['index', 'show']);
Route::apiResource('directors', DirectorController::class);
Route::apiResource('actors', ActorController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
    ]);
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);
    return $user;
});

Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);
    $user = User::where('email', $request->email)->first();
    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }
    return ['token' => $user->createToken('api-token')->plainTextToken];
});