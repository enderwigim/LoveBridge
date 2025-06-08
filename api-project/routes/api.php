<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ChatMessageController;


// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user()->load('profile');
    });
    // PERFILES
    Route::get('/profiles/{profile}', [ProfileController::class, 'show']);
    Route::get('/profiles/username/{userName}', [ProfileController::class, 'showByUserName']);
    Route::apiResource('profiles', ProfileController::class);
    // USUARIOS
    Route::apiResource('users', UserController::class);
        // Ruta para buscar usuarios por nombre de usuario.
    Route::get('/users/search/{userName}', [UserController::class, 'showByUser']);
    // NOTIFICACIONES
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/{id}/accept', [NotificationController::class, 'acceptCoupleRequest']);
    Route::delete('/notifications/{id}/reject', [NotificationController::class, 'rejectCoupleRequest']);
    // SOLICITUDES DE PAREJA
   // SOLICITUDES DE PAREJA
    Route::post('/coupleRequest/{username}', [NotificationController::class, 'sendCoupleRequest']);

    // PAREJAS
    Route::post('/couple/add', [UserController::class, 'addCouple']);
    Route::post('/couple/remove', [UserController::class, 'removeCouple']);
    // CHAT
    Route::prefix('chat')->group(function () {
    Route::get('/', [ChatMessageController::class, 'index']); // todos los mensajes
    Route::post('/', [ChatMessageController::class, 'store']); // guardar mensaje
    Route::get('/conversation/{user1}/{user2}', [ChatMessageController::class, 'conversation']); // conversación entre 2 usuarios
    Route::patch('/read/{id}', [ChatMessageController::class, 'markAsRead']); // marcar como leído
});
});


