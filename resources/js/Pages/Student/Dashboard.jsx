import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, schedules, grades }) {
    // Helper function untuk menentukan warna badge nilai (Prinsip DRY - Don't Repeat Yourself)
    const getGradeColor = (score) => {
        if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
        if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-red-100 text-red-800 border-red-200';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Siswa</h2>}
        >
            <Head title="Dashboard Akademik" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Welcome Banner */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-indigo-500">
                        <h1 className="text-2xl font-bold text-gray-900">Selamat datang, {auth.user.name}! 👋</h1>
                        <p className="text-gray-600 mt-1">Berikut adalah ringkasan jadwal pelajaran dan nilai akademik Anda.</p>
                    </div>

                    {/* Jadwal Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                📅 Jadwal Pelajaran
                            </h3>
                            
                            {schedules.length > 0 ? (
                                <div className="overflow-x-auto rounded-lg border border-gray-200">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hari</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Jam</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mata Pelajaran</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Guru Pengampu</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {schedules.map((schedule) => (
                                                <tr key={schedule.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{schedule.day}</td>
                                                    {/* Slice(0,5) digunakan untuk memotong detik dari database (misal: "08:00:00" menjadi "08:00") */}
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {schedule.start_time.slice(0, 5)} - {schedule.end_time.slice(0, 5)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.subject?.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{schedule.teacher?.name}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-6 rounded-lg text-center border border-dashed border-gray-300">
                                    <p className="text-gray-500 italic">Belum ada jadwal yang tersedia untuk Anda saat ini.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Nilai Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                🎓 Laporan Nilai
                            </h3>

                            {grades.length > 0 ? (
                                <div className="overflow-x-auto rounded-lg border border-gray-200">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Semester</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mata Pelajaran</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nilai Akhir</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {grades.map((grade) => (
                                                <tr key={grade.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.semester?.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.subject?.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-3 py-1 inline-flex text-sm font-bold rounded-full border ${getGradeColor(grade.score)}`}>
                                                            {/* Hapus angka nol di belakang koma jika nilainya bulat (misal 85.00 jadi 85) */}
                                                            {Number(grade.score)}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-6 rounded-lg text-center border border-dashed border-gray-300">
                                    <p className="text-gray-500 italic">Belum ada nilai yang dipublikasikan untuk Anda.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}