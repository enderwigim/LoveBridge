<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    /**
     * Los atributos que se pueden asignar masivamente.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'background_img',
        'bio',
        'avatar',
        'user_id',
    ];

    /**
     * Obtiene el usuario al que pertenece el perfil.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
