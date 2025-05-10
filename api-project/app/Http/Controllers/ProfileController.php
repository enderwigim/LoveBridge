<?php

namespace App\Http\Controllers;

use App\Models\Profile;
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

    
}