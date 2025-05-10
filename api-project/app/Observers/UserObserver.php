<?php

namespace App\Observers;

use App\Models\User;
// Se importa el modelo Profile.
use App\Models\Profile;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        // Crear el perfil asociado automáticamente al crear el usuario
        Profile::create([
            'user_id' => $user->id,
            'background_img' => 'default.jpg', // Puedes cambiarlo por un valor predeterminado
            'bio' => 'Nuevo usuario',
            'avatar' => 'default_avatar.jpg', // Puedes establecer una imagen por defecto
        ]);
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        //
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
