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
    // PERFILES
    Route::get('/profiles/{profile}', [ProfileController::class, 'show']);
    Route::get('/profiles/username/{userName}', [ProfileController::class, 'showByUserName']);
    Route::apiResource('profiles', ProfileController::class);
    // USUARIOS
    Route::apiResource('users', UserController::class);
        // Ruta para buscar usuarios por nombre de usuario.
    Route::get('/users/search/{userName}', [UserController::class, 'showByUser']);
});


