<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;

// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    // Ruta que devuelve el perfil del usuario autentificado según ID del perfil.
    Route::get('/profiles/{profile}', [ProfileController::class, 'show']);
    // Ruta que devuelve el perfil del usuario autentificado según nombre de usuario.
    Route::get('/profiles/username/{userName}', [ProfileController::class, 'showByUserName']);
    Route::apiResource('profiles', ProfileController::class);
    
    Route::apiResource('users', UserController::class);
});


