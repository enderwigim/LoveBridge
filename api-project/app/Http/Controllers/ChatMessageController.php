<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChatMessage;

class ChatMessageController extends Controller
{
    // Obtener todos los mensajes
    public function index()
    {
        return ChatMessage::orderBy('sent_at', 'desc')->get();
    }

    // Guardar un nuevo mensaje
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sender_id' => 'required',
            'receiver_id' => 'required',
            'content' => 'required|string',
            'sent_at' => 'nullable|date',
        ]);

        $message = ChatMessage::create([
            'sender_id' => $validated['sender_id'],
            'receiver_id' => $validated['receiver_id'],
            'content' => $validated['content'],
            'sent_at' => $validated['sent_at'] ?? now(),
            'read' => false,
        ]);

        return response()->json($message, 201);
    }

    // Marcar un mensaje como leído
    public function markAsRead($id)
    {
        $message = ChatMessage::findOrFail($id);
        $message->read = true;
        $message->save();

        return response()->json(['status' => 'ok']);
    }

    // Mostrar mensajes entre dos usuarios
    public function conversation($user1, $user2)
    {
        $messages = ChatMessage::where(function ($q) use ($user1, $user2) {
            $q->where('sender_id', $user1)->where('receiver_id', $user2);
        })->orWhere(function ($q) use ($user1, $user2) {
            $q->where('sender_id', $user2)->where('receiver_id', $user1);
        })->orderBy('sent_at', 'asc')->get();

        return response()->json($messages);
    }

}
