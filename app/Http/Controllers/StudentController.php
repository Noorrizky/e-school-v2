<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // 1. Import Facade Auth
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    /**
     * Menampilkan dashboard khusus untuk Student
     */
    public function dashboard(): Response
    {
        // 2. TYPE HINT: Beritahu IDE bahwa yang login adalah App\Models\User
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // 3. SAFETY CHECK: Pastikan user tidak null sebelum mengecek role
        if (!$user || !$user->hasAnyRole(['student', 'Student'])) {
            abort(403, 'Hanya siswa yang diizinkan mengakses halaman ini.');
        }
        
        // 4. LOGIKA JADWAL: Filter berdasarkan grup/kelas
        if (!$user->classroom_id) {
            $schedules = collect(); // Kosongkan jadwal jika belum punya kelas
        } else {
            // Ambil jadwal khusus untuk Kelas/Grup siswa tersebut
            $schedules = Schedule::with(['subject', 'teacher'])
                ->where('classroom_id', $user->classroom_id)
                ->orderByRaw("FIELD(day, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu')")
                ->orderBy('start_time')
                ->get();
        }

        // KODE LAMA YANG MENIMPA $schedules SUDAH DIHAPUS DI SINI

        // 5. LOGIKA NILAI: Ambil nilai khusus untuk siswa yang login
        $grades = Grade::with(['subject', 'semester'])
            ->where('student_id', $user->id)
            ->latest()
            ->get();

        // 6. RENDER KE FRONTEND
        return Inertia::render('Student/Dashboard', [
            'schedules' => $schedules,
            'grades' => $grades,
        ]);
    }
}