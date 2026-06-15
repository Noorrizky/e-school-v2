<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    protected $fillable = [
        'name', 'is_active'
    ];

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }
}
