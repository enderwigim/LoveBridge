<?php

namespace App\Models;

use Mongodb\Laravel\Eloquent\Model;

class ChatMessage extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'chat_messages';

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'content',
        'sent_at',
        'read'
    ];

    protected $casts = [
        'sent_at' => 'datetime',
        'read' => 'boolean'
    ];

    public $timestamps = false;

    public function sender()
    {
        return $this->belongsTo(\App\Models\User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(\App\Models\User::class, 'receiver_id');
    }
}

