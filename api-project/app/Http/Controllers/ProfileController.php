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

    public function show(Profile $profile)
    {
        return response()->json($profile);
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