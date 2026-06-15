<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('classroom_id')->nullable()->constrained('classrooms')->nullOnDelete();
        });

        // 2. Tambahkan classroom_id ke tabel schedules (Jadwal)
        Schema::table('schedules', function (Blueprint $table) {
            $table->foreignId('classroom_id')->nullable()->constrained('classrooms')->cascadeOnDelete();
        });

        // 3. Hapus tabel pivot lama yang tidak efisien
        Schema::dropIfExists('schedule_user');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
