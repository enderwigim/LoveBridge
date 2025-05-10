<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            "user_id" => "required|exists:users,id",
            'background_img' => 'string',
            'bio' => 'string',
            'avatar' => 'string',

        ]);

        $profile = Profile::create($data);

        return response()->json($profile, 201);
    }
    // Función para mostrar el perfil de un usuario específico.
    public function show(Profile $profile)
    {
        // Carga la relación con el usuario y devuelve el perfil.
        return response()->json($profile->load('user:name,couple_id'));
    }

    public function update(Request $request, Profile $profile)
    {
        $data = $request->validate([
            'background_img' => 'sometimes|string',
            'bio' => 'sometimes|string',
            'avatar' => 'sometimes|string',
        ]);

        $profile->update($data);
 

        return response()->json($profile);
    }

    // Función para mostrar el perfil de un usuario según su nombre de usuario..
    public function showByUserName($userName)
{
    // Buscar el usuario por nombre
    $user = User::where('name', $userName)->first();

    if (!$user) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    // Cargar el perfil asociado al usuario
    $profile = Profile::where('user_id', $user->id)->with('user:id,name,couple_id')->first();

    if (!$profile) {
        return response()->json(['message' => 'Perfil no encontrado'], 404);
    }

    return response()->json([
        'id' => $profile->id,
        'user_id' => $profile->user_id,
        'background_img' => $profile->background_img,
        'bio' => $profile->bio,
        'avatar' => $profile->avatar,
        'created_at' => $profile->created_at->toDateTimeString(),
        'updated_at' => $profile->updated_at->toDateTimeString(),
        'user' => [
            'name' => $user->name,
            'couple_id' => $user->couple_id,
        ],
    ]);
}

}