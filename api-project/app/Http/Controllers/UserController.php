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

    // CONTROL DE PAREJAS
    public function addCouple(Request $request)
    {
        $request->validate([
            'username' => 'required|exists:users,username',
        ]);

        $authUser = $request->user();
        $partner = User::where('username', $request->username)->first();

        // No permitir emparejarse con uno mismo
        if ($authUser->id === $partner->id) {
            return response()->json(['message' => 'No puedes ser tu propia pareja.'], 400);
        }

        // Ya tiene pareja
        if ($authUser->couple_id !== null) {
            return response()->json(['message' => 'Ya tienes pareja.'], 409);
        }

        if ($partner->couple_id !== null) {
            return response()->json(['message' => 'La persona ya tiene pareja.'], 409);
        }

        // Crear relación de pareja mutua
        $authUser->update(['couple_id' => $partner->id]);
        $partner->update(['couple_id' => $authUser->id]);

        return response()->json(['message' => '¡Ahora son pareja! 🎉']);
    }
    public function removeCouple(Request $request)
    {
        $authUser = $request->user();

        if (!$authUser->couple_id) {
            return response()->json(['message' => 'No tienes pareja actualmente.'], 400);
        }

        $partner = User::find($authUser->couple_id);

        // Desvincular a ambos
        $authUser->update(['couple_id' => null]);

        if ($partner && $partner->couple_id === $authUser->id) {
            $partner->update(['couple_id' => null]);
        }

        return response()->json(['message' => 'Relación de pareja eliminada.']);
    }

}