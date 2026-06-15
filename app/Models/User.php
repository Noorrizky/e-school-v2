<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser; // Tambahkan ini
use Filament\Panel; // Tambahkan ini
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles; // Tambahkan ini

class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable, HasRoles; // Tambahkan HasRoles di sini

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function classroom()
    {
        return $this->belongsTo(Classroom::class, 'classroom_id');
    }
    public function canAccessPanel(Panel $panel): bool
    {
        // Menggunakan hasAnyRole untuk mengakomodasi penulisan huruf besar/kecil di database
        return $this->hasAnyRole([
            'super_admin',
            'Super Admin',
            'teacher',
            'Teacher'
        ]);
    }
}
