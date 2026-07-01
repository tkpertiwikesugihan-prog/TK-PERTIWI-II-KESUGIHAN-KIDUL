import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, CheckCircle2, Award, CalendarDays, HeartHandshake, Edit } from 'lucide-react';

interface ProfileProps {
  isAdminLoggedIn?: boolean;
  onEditSection?: (subTab: 'spmb' | 'content' | 'programs' | 'posts' | 'password') => void;
}

export default function Profile({ isAdminLoggedIn, onEditSection }: ProfileProps = {}) {
  const [sejarahText] = useState(() => {
    return localStorage.getItem('cms_sejarah_text') || 'Taman Kanak-Kanak Pertiwi II didirikan pada tahun 1989 dengan komitmen kuat untuk memberikan pelayanan pada anak usia dini secara utuh dan menyeluruh. Kami percaya bahwa setiap anak berhak mendapatkan lingkungan asuh yang mencakup layanan gizi dan kesehatan, pendidikan, pengasuhan, serta perlindungan yang optimal untuk mengoptimalkan semua aspek perkembangan masa keemasan mereka (golden age).';
  });

  const [missions] = useState(() => {
    const saved = localStorage.getItem('cms_misi_list');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((m: string, i: number) => ({ number: i + 1, text: m }));
      } catch (e) {}
    }
    return [
      { number: 1, text: 'Menciptakan anak yang kreatif melalui belajar yang menyenangkan.' },
      { number: 2, text: 'Menciptakan suasana belajar berbasis iman, demi tercapainya anak berprestasi dan berakhlaqul karimah.' },
      { number: 3, text: 'Mengokohkan pondasi kepribadian yang berkarakter memiliki cinta tanah air (nasionalisme).' }
    ];
  });

  const facilities = [
    { name: 'Ruang Kelas yang Nyaman', description: 'Dilengkapi pencahayaan alami, pendingin udara, mainan edukatif, dan meja-kursi ergonomis ramah anak.' },
    { name: 'Taman Bermain Outdoor & Indoor', description: 'Sarana permainan ketangkasan fisik yang aman dari benturan, mendorong motorik kasar anak.' },
    { name: 'Perpustakaan Mini / Pojok Baca', description: 'Koleksi buku bergambar pilihan untuk menstimulasi minat baca dan imajinasi awal anak.' },
    { name: 'Fasilitas Cuci Tangan Sehat', description: 'Wastafel berukuran ramah anak di berbagai sudut untuk membiasakan pola hidup bersih dan sehat.' },
    { name: 'Toilet Bersih & Higienis', description: 'Ukurannya disesuaikan untuk anak-anak (child-friendly toilet) guna mendukung kemandirian toilet training.' },
    { name: 'Halaman Parkir Luas & Aman', description: 'Area parkir yang luas memudahkan proses antar-jemput anak dengan tertib dan aman.' }
  ];

  return (
    <div className="bg-slate-50/50 py-12 md:py-20 relative">
      {isAdminLoggedIn && onEditSection && (
        <div className="absolute top-4 right-4 z-40">
          <button 
            onClick={() => onEditSection('content')}
            className="bg-brand-primary hover:bg-rose-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg border-2 border-white flex items-center gap-1.5 cursor-pointer"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Profil Kami</span>
          </button>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section 1: Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-brand-primary font-bold text-xs uppercase tracking-widest font-sans px-3 py-1 rounded-full bg-rose-50 border border-rose-100">
            Profil Institusi
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Mengenal Lebih Dekat <span className="text-brand-primary">TK Pertiwi II</span>
          </h2>
          <div className="w-16 h-1 bg-brand-secondary mx-auto rounded-full mt-2" />
          <p className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            Menjadi mitra terbaik orang tua dalam membimbing tumbuh kembang buah hati secara holistik, menyenangkan, dan berlandaskan budi pekerti luhur.
          </p>
        </div>

        {/* Section 2: Sejarah Singkat */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-md shadow-slate-100/30">
          <div className="lg:col-span-7 space-y-6">
             <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-brand-primary">
                <CalendarDays className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Didirikan Tahun 1989</span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">Sejarah & Filosofi Kami</h3>
              </div>
            </div>
            
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {sejarahText}
            </p>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Selain pengajaran reguler, TK PERTIWI II berkomitmen memfasilitasi setiap anak secara individual sesuai dengan bakat, minat, dan ketertarikannya masing-masing. Oleh karena itu, kami menghadirkan program khusus berupa <strong>Kegembangan Diri / Ekstrakurikuler</strong> yang didesain interaktif dan dapat diikuti oleh seluruh peserta didik untuk mengasah potensi tersembunyi mereka sejak dini.
            </p>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100/80 flex items-start gap-3">
              <HeartHandshake className="w-5.5 h-5.5 text-brand-secondary shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                <strong>Pelayanan Holistik-Integratif:</strong> Kami menyinergikan pendidikan emosional, stimulasi kognitif, pembiasaan akhlak, serta pemantauan gizi/kesehatan fisik anak secara berkala.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-[2rem] opacity-25 blur-lg" />
            <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-xl bg-slate-50">
              <img 
                src="https://lh3.googleusercontent.com/d/19ULkJbQSSxmp2whBq0AZslHusMGA9tyc" 
                alt="Foto Sejarah TK" 
                className="w-full h-80 object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('history-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div id="history-fallback" className="hidden h-80 bg-rose-50/50 flex flex-col items-center justify-center p-8 text-center">
                <Compass className="w-12 h-12 text-brand-primary mb-3 animate-spin-slow" />
                <h4 className="font-display font-bold text-slate-800">Meniti Masa Depan</h4>
                <p className="text-xs text-slate-500 mt-2">Membimbing generasi masa depan dengan cinta dan dedikasi profesional sejak 1989.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Visi & Misi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visi Card */}
          <div className="bg-gradient-to-br from-brand-primary/10 to-rose-50 p-8 md:p-10 rounded-[2.5rem] border border-brand-primary/10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900">Visi Kami</h3>
                <p className="font-sans text-xs uppercase tracking-widest font-extrabold text-brand-primary">Tujuan Luhur Pendidikan</p>
              </div>
              <p className="font-display text-2xl sm:text-3xl font-black text-slate-800 leading-normal italic">
                “Kreatif, Berprestasi, Nasionalisme, dan Berakhlaqul Karimah.”
              </p>
            </div>
            <div className="pt-6 border-t border-brand-primary/10 mt-6">
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Visi ini menjadi penunjuk arah dalam memformulasikan kurikulum, aktivitas, serta pembentukan ekosistem di lingkungan TK Pertiwi II Kesugihan.
              </p>
            </div>
          </div>

          {/* Misi Card */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-md shadow-slate-100/30">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-brand-secondary">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900">Misi Kami</h3>
                <p className="font-sans text-xs uppercase tracking-widest font-extrabold text-brand-secondary">Langkah Konkrit Pelaksanaan</p>
              </div>
              
              <div className="space-y-4 pt-2">
                {missions.map((m) => (
                  <div key={m.number} className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-amber-100 text-brand-secondary flex items-center justify-center font-display font-extrabold text-sm shrink-0">
                      {m.number}
                    </span>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-0.5">
                      {m.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Fasilitas Sekolah */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900">
              Sarana & Fasilitas Sekolah
            </h3>
            <p className="text-slate-500 font-sans text-xs sm:text-sm">
              Kami menyediakan sarana fisik ramah anak yang dirancang untuk menjamin rasa aman, higienis, dan mendukung penuh pembelajaran.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((fac, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-brand-primary/10 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5.5 h-5.5 text-brand-success shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-slate-800 text-base">
                      {fac.name}
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
                      {fac.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
