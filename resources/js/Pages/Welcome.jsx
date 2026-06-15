import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, canLogin }) {
    return (
        <>
            <Head title="Profil Sekolah" />
            
            <div className="min-h-screen bg-slate-50 font-sans text-gray-900 selection:bg-indigo-500 selection:text-white">
                
                {/* Navbar / Header */}
                <header className="bg-white shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex-shrink-0 flex items-center gap-2">
                                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                    E
                                </div>
                                <span className="font-bold text-xl tracking-tight text-slate-800">E-School.</span>
                            </div>
                            
                            <nav className="flex items-center space-x-4">
                                {canLogin ? (
                                    auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="text-sm font-semibold text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md transition-colors"
                                        >
                                            Ke Dashboard
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                                        >
                                            Login Portal
                                        </Link>
                                    )
                                ) : null}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main>
                    <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-[70vh]">
                        <div className="absolute top-0 w-full h-full bg-slate-900 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
                            <span className="w-full h-full absolute opacity-70 bg-slate-900"></span>
                        </div>
                        <div className="container relative mx-auto px-4">
                            <div className="items-center flex flex-wrap">
                                <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
                                    <h1 className="text-white font-bold text-4xl sm:text-5xl leading-tight mb-6">
                                        Masa Depan Pendidikan Dimulai dari Sini.
                                    </h1>
                                    <p className="mt-4 text-lg text-slate-200 mb-10 max-w-2xl mx-auto">
                                        Selamat datang di E-School. Kami berkomitmen untuk mencetak generasi penerus yang cerdas, berkarakter, dan siap menghadapi tantangan global melalui sistem pembelajaran terpadu.
                                    </p>
                                    <a href="#profil" className="inline-block px-8 py-3.5 text-sm font-bold text-slate-900 bg-white rounded-full hover:bg-slate-100 transition-colors shadow-lg">
                                        Pelajari Lebih Lanjut
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visi Misi & Profil Section */}
                    <section id="profil" className="py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold text-slate-900">Mengapa Memilih E-School?</h2>
                                <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Lingkungan belajar yang didukung oleh teknologi modern dan pengajar profesional.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Card 1 */}
                                <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6 text-2xl">
                                        💻
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Fasilitas Modern</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Akses penuh ke portal akademik, jadwal *real-time*, dan rekapitulasi nilai yang transparan untuk siswa.
                                    </p>
                                </div>

                                {/* Card 2 */}
                                <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6 text-2xl">
                                        🌟
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Kurikulum Unggulan</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Disusun secara komprehensif untuk memastikan siswa tidak hanya menguasai teori, tetapi juga praktik.
                                    </p>
                                </div>

                                {/* Card 3 */}
                                <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-6 text-2xl">
                                        👨‍🏫
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Tenaga Pengajar Ahli</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Dididik langsung oleh guru-guru berpengalaman dan berdedikasi tinggi di bidangnya masing-masing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-slate-900 py-8 border-t border-slate-800 text-center">
                    <p className="text-slate-400 text-sm">
                        &copy; {new Date().getFullYear()} E-School. Dibangun dengan Laravel 11 & React.
                    </p>
                </footer>
            </div>
        </>
    );
}