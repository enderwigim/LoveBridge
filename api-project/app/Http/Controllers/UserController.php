<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'username' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'nullable|string|in:usuario,admin,psicologo',
            
        ]);

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return response()->json($user, 201);
    }

    public function show(User $user)
    {
        return response()->json($user);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'username' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,'.$user->id,
            'password' => 'sometimes|min:6',
            'couple_id' => 'nullable|exists:users,id'
        ]);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return response()->json($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }

    // En UserController.php
    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|in:usuario,admin,psicologo' 
        ]);

        // Verifica si el usuario autenticado es admin
        if ($request->user()->role !== 'admin') {
            abort(403, 'Solo los admins pueden cambiar roles');
        }

        $user->update(['role' => $request->role]);
        
        return response()->json(['message' => 'Rol actualizado']);
    }
    public function showByUser(Request $request, string $userName) {
        $users = User::whereRaw('username ILIKE ?', ["%{$userName}%"])
            ->with('profile:id,user_id,avatar')
            ->limit(5)
            ->get();
        
        if ($users->isEmpty()) {
            return response()->json(['message' => 'No se encontraron usuarios'], 404);
        }
        return response()->json($users->map(function ($user) {
            return [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'profile' => [
                    'id' => $user->profile->id ?? null,
                    'user_id' => $user->profile->user_id ?? null,
                    'avatar' => $user->profile->avatar ?? null,
                ]
            ];
        }));
    }
}