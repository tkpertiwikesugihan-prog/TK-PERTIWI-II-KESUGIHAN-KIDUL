import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Smile, Award, Activity, Heart, Compass, CheckCircle2, Languages, GraduationCap, Sparkles, Edit } from 'lucide-react';

interface ProgramsProps {
  isAdminLoggedIn?: boolean;
  onEditSection?: (subTab: 'spmb' | 'content' | 'programs' | 'posts' | 'password') => void;
}

export default function Programs({ isAdminLoggedIn, onEditSection }: ProgramsProps = {}) {
  const [developmentalAspects] = useState(() => {
    const saved = localStorage.getItem('cms_developmental_aspects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((item: any) => {
          let icon = BookOpen;
          if (item.id === 'agama_moral') icon = Compass;
          else if (item.id === 'fisik_motorik') icon = Activity;
          else if (item.id === 'kognitif') icon = BookOpen;
          else if (item.id === 'bahasa') icon = Languages;
          else if (item.id === 'sosial_emosional') icon = Smile;
          else if (item.id === 'seni') icon = Sparkles;
          return { ...item, icon };
        });
      } catch (e) {}
    }

    return [
      {
        id: 'agama_moral',
        title: 'Nilai Agama & Moral',
        description: 'Menanamkan karakter luhur dan kebiasaan spritual yang taat sejak dini.',
        details: [
          'Pembiasaan berdoa bersama sebelum dan sesudah memulai aktivitas.',
          'Mengenal rumah ibadah, tata cara beribadah sederhana, serta merayakan hari besar keagamaan.',
          'Mengajarkan sopan santun, kejujuran, dan rasa syukur sebagai makhluk ciptaan Tuhan.'
        ],
        colorClass: 'border-amber-200 bg-amber-50/50 text-amber-700',
        icon: Compass
      },
      {
        id: 'fisik_motorik',
        title: 'Fisik & Motorik',
        description: 'Menjaga kebugaran dan menyelaraskan koordinasi motorik kasar & halus anak.',
        details: [
          'Senam pagi ceria rutin untuk melatih kekuatan otot dan kesegaran jasmani.',
          'Melatih motorik halus lewat kegiatan melipat, meronce, menulis, mewarnai, dan menempel.',
          'Melatih motorik kasar melalui permainan lari, lompat, memanjat, dan menjaga keseimbangan.'
        ],
        colorClass: 'border-rose-200 bg-rose-50/50 text-rose-700',
        icon: Activity
      },
      {
        id: 'kognitif',
        title: 'Kognitif & Logika',
        description: 'Mengasah daya pikir kritis, kemampuan simbolis, dan pemecahan masalah dasar.',
        details: [
          'Mengenal warna, pola, bentuk geometris, serta dasar penjumlahan lewat benda konkret.',
          'Melatih kemampuan berpikir logis: membandingkan ukuran, mengelompokkan benda, dan mengurutkan pola.',
          'Pembiasaan berpikir simbolis: mengenal lambang bilangan, jam, arah mata angin dasar.'
        ],
        colorClass: 'border-blue-200 bg-blue-50/50 text-blue-700',
        icon: BookOpen
      },
      {
        id: 'bahasa',
        title: 'Bahasa & Literasi',
        description: 'Mempersiapkan keaksaraan awal serta melatih keberanian berkomunikasi.',
        details: [
          'Mengenal keaksaraan awal: membaca huruf fonik, mengeja suku kata dasar dengan asyik.',
          'Melatih pemahaman bahasa: mendengarkan cerita interaktif dan menjawab pertanyaan kritis.',
          'Melatih pengungkapan bahasa: bercerita di depan kelas, bernyanyi, dan mengekspresikan pendapat.'
        ],
        colorClass: 'border-indigo-200 bg-indigo-50/50 text-indigo-700',
        icon: Languages
      },
      {
        id: 'sosial_emosional',
        title: 'Sosial Emosional',
        description: 'Membangun karakter mandiri, toleran, berempati, dan cakap bersosialisasi.',
        details: [
          'Belajar berbagi mainan, makanan, dan mengantre giliran dengan tertib.',
          'Melatih kemandirian dasar: merapikan mainan sendiri, memakai sepatu, dan toilet training.',
          'Menstimulasi rasa empati: menyayangi teman, menghormati guru, dan mengekspresikan emosi secara positif.'
        ],
        colorClass: 'border-emerald-200 bg-emerald-50/50 text-emerald-700',
        icon: Smile
      },
      {
        id: 'seni',
        title: 'Seni & Kreativitas',
        description: 'Mengeksplorasi imajinasi, kepekaan estetika, dan kreativitas seni musik, lukis, serta kriya.',
        details: [
          'Mengekspresikan diri melalui karya gambar, lukisan tangan, dan seni kerajinan tangan (kriya).',
          'Mengenal dan melatih kepekaan ritme musik lewat menyanyi, bertepuk tangan, dan menari sederhana.',
          'Mengembangkan imajinasi kreatif melalui bermain drama peran dan mendongeng interaktif.'
        ],
        colorClass: 'border-purple-200 bg-purple-50/50 text-purple-700',
        icon: Sparkles
      }
    ];
  });

  const [extracurriculars] = useState(() => {
    const saved = localStorage.getItem('cms_extracurriculars');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }

    return [
      {
        id: 'english_class',
        title: 'English Class',
        description: 'Pengenalan kosa kata bahasa Inggris dasar dengan metode menyanyi, interaktif, dan visual card yang menyenangkan guna menyongsong era globalisasi.',
        benefits: ['Mengenal kosa kata (Vocabulary) warna, angka, hewan, & anggota tubuh', 'Membiasakan pengucapan (Pronunciation) interaktif lewat lagu', 'Membangun kepercayaan diri berbicara di depan umum sejak usia dini'],
        schedule: 'Setiap Hari Rabu | 08.00 - 09.30 WIB',
        colorClass: 'bg-brand-primary'
      },
      {
        id: 'tpq',
        title: 'TPQ (Taman Pendidikan Al-Qur\'an)',
        description: 'Pembelajaran membaca Iqra, menghafal surat-surat pendek, doa harian, dan pengenalan akhlak islami untuk membentuk pondasi iman yang kokoh.',
        benefits: ['Belajar membaca huruf hijaiyah & tajwid metode Iqra terpadu', 'Menghafal doa-doa harian & surat pendek Juz Amma', 'Menanamkan budi pekerti islami dan kisah teladan para nabi'],
        schedule: 'Setiap Hari Jumat | 08.00 - 09.30 WIB',
        colorClass: 'bg-brand-secondary'
      }
    ];
  });

  return (
    <div className="bg-slate-50/50 py-12 md:py-20 relative">
      {isAdminLoggedIn && onEditSection && (
        <div className="absolute top-4 right-4 z-40">
          <button 
            onClick={() => onEditSection('programs')}
            className="bg-brand-primary hover:bg-rose-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg border-2 border-white flex items-center gap-1.5 cursor-pointer"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Program Belajar</span>
          </button>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-brand-accent font-bold text-xs uppercase tracking-widest font-sans px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
            Kurikulum & Pembelajaran
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Bagaimana Anak Kita <span className="text-brand-accent">Belajar & Tumbuh</span>?
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full mt-2" />
          <p className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            Metode belajar terstruktur yang berpusat pada minat anak (child-centered approach) guna melahirkan anak yang cerdas, kreatif, dan mandiri secara alamiah.
          </p>
        </div>

        {/* Section 1: Aspek Perkembangan */}
        <div className="space-y-10">
          <div className="border-l-4 border-brand-accent pl-4">
            <h3 className="font-display font-extrabold text-2xl text-slate-900">6 Aspek Perkembangan yang Difokuskan</h3>
            <p className="text-slate-500 font-sans text-xs sm:text-sm mt-1">Kami menerapkan pemantauan berkala pada pencapaian tumbuh kembang anak secara objektif.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {developmentalAspects.map((aspect, index) => {
              const AspectIcon = aspect.icon;
              return (
                <motion.div
                  key={aspect.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className={`p-6 sm:p-8 rounded-[2rem] border-2 bg-white shadow-xs transition-all duration-300 hover:shadow-lg ${aspect.colorClass}`}
                >
                  <div className="flex gap-4 items-start">
                    <div className="p-3.5 rounded-2xl bg-white shadow-xs shrink-0">
                      <AspectIcon className="w-6.5 h-6.5" />
                    </div>
                    <div className="space-y-4 w-full">
                      <div>
                        <h4 className="font-display font-black text-lg sm:text-xl text-slate-800 leading-tight">
                          {aspect.title}
                        </h4>
                        <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                          {aspect.description}
                        </p>
                      </div>

                      {/* Detail Checklist */}
                      <ul className="space-y-2.5 pt-2 border-t border-dashed border-slate-200">
                        {aspect.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex gap-2 items-start text-xs sm:text-sm text-slate-600">
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Ekstrakurikuler */}
        <div className="space-y-10 bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900">
              Pengembangan Diri & Ekstrakurikuler
            </h3>
            <p className="text-slate-500 font-sans text-xs sm:text-sm">
              Kegiatan tambahan unggulan pilihan yang dapat diikuti oleh semua anak untuk mengoptimalkan potensi, kecakapan global, serta keimanan dasar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {extracurriculars.map((extra) => (
              <div 
                key={extra.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-slate-50/60 p-6 sm:p-8 hover:bg-white hover:shadow-xl hover:shadow-slate-100/40 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Visual Top Bar Accent */}
                <div className={`absolute top-0 left-0 w-full h-2 ${extra.colorClass}`} />
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-sans">PROGRAM EKSTRA</span>
                    <span className={`px-3.5 py-1 rounded-full text-[10px] font-black text-white ${extra.colorClass}`}>
                      Terbuka Semua Murid
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-display font-black text-xl sm:text-2xl text-slate-800">
                      {extra.title}
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                      {extra.description}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-slate-200/60">
                    <p className="text-xs font-extrabold text-slate-700 tracking-wider uppercase font-sans">Target Capaian Belajar:</p>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                      {extra.benefits.map((b, bIdx) => (
                        <li key={bIdx} className="flex gap-2 items-start">
                          <span className="text-brand-primary font-bold">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
