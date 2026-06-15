<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'subject_id',
        'classroom_id',
        'day',
        'start_time',
        'end_time',
    ];

    /**
     * Relasi ke Guru (User)
     */
    public function teacher()
    {
        // PASTIKAN ADA KATA 'return'
        return $this->belongsTo(User::class, 'teacher_id');
    }

    /**
     * Relasi ke Mata Pelajaran (Subject)
     */
    public function subject()
    {
        // PASTIKAN ADA KATA 'return'
        return $this->belongsTo(Subject::class);
    }

    /**
     * Relasi ke Kelas (Classroom)
     */
    public function classroom()
    {
        // PASTIKAN ADA KATA 'return'
        return $this->belongsTo(Classroom::class, 'classroom_id');
    }
}