<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Registro de usuario
    public function register(Request $request)
    {
        // Valida los datos
        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'nullable|string|in:usuario,admin,psicologo',
        ]);
        // Crea un usuario en la base de datos, y le asigna el rol de usuario por defecto.
        $user = User::create([
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'] ?? 'usuario', 
        ]);
        // Devuelve 201 y el token de autenticación
        return response()->json([
            'user' => $user,
            'token' => $user->createToken('auth_token')->plainTextToken,
            "message" => "Usuario creado exitosamente"
        ], 201);
    }

    public function login(Request $request)
    {
        // Obtiene las credenciales del request.
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Hace una busqueda del usuario por email.
        $user = User::where('email', $credentials['email'])->first();

        // Si no existe el usuario o si la contraseña es incorrecta se lanza un error.
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Credenciales incorrectas']
            ]);
        }

        // Crea un token y lo devuelve.
        return response()->json([
            'token' => $user->createToken('auth_token')->plainTextToken,
            'user' => $user->makeVisible(['role']), 
            "message" => "Login exitoso",
        ], 200);
    }
    public function logout(Request $request)
    {
        // Revoca el token de autenticación.
        $request->user()->currentAccessToken()->delete();
        // Devuelve JSON con el cierre de la sesión,
        return response()->json([
            'message' => 'Sesión cerrada exitosamente',
        ], 200);
    }
}