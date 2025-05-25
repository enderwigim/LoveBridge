<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    // Obtener todas las notificaciones del usuario autenticado
    public function index(Request $request)
    {
        return $request->user()->notifications()->latest()->get();
    }

    // Marcar una notificación como leída
    public function markAsRead($id, Request $request)
    {
        $notification = Notification::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $notification->update(['read' => true]);

        return response()->json(['message' => 'Notificación marcada como leída']);
    }
    

// Enviar una solicitud de pareja a otro usuario
public function sendCoupleRequest(string $username, Request $request)
{
    $sender = $request->user();

    // Evitar que se envíe a sí mismo
    if ($sender->username === $username) {
        return response()->json(['message' => 'No puedes enviarte una solicitud a ti mismo.'], 400);
    }

    // Buscar el receptor
    $receiver = User::where('username', $username)->first();

    if (!$receiver) {
        return response()->json(['message' => 'Usuario no encontrado.'], 404);
    }

    // Revisar si ya existe una solicitud de pareja pendiente
    $exists = Notification::where('user_id', $receiver->id)
        ->where('type', 'couple_request')
        ->where('data->from_user_id', $sender->id)
        ->exists();

    if ($exists) {
        return response()->json(['message' => 'Ya enviaste una solicitud a esta persona.'], 409);
    }

    // Crear la notificación
    Notification::create([
        'user_id' => $receiver->id,
        'type' => 'couple_request',
        'data' => [
            'from_user_id' => $sender->id,
            'from_username' => $sender->username,
            'message' => 'quiere ser tu pareja',
        ],
    ]);

    return response()->json(['message' => 'Solicitud enviada con éxito.']);
}

}
