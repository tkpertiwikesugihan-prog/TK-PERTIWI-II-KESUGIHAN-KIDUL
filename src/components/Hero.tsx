import { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, ArrowRight, ShieldCheck, Heart, Sparkles, Award, Edit } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: string) => void;
  isAdminLoggedIn?: boolean;
  onEditSection?: (subTab: 'spmb' | 'content' | 'programs' | 'posts' | 'password') => void;
}

export default function Hero({ setActiveTab, isAdminLoggedIn, onEditSection }: HeroProps) {
  const [tickerText] = useState(() => {
    return localStorage.getItem('cms_ticker_text') || 'PENGUMUMAN: Pendaftaran Murid Baru (SPMB) Tahun Ajaran 2026/2027 Telah Dibuka!';
  });
  
  const [heroTitle] = useState(() => {
    const data = localStorage.getItem('cms_hero_data');
    if (data) {
      try {
        return JSON.parse(data).title;
      } catch (e) {}
    }
    return "Selamat Datang di Taman Kanak-Kanak Pertiwi II";
  });

  const [heroSubtitle] = useState(() => {
    const data = localStorage.getItem('cms_hero_data');
    if (data) {
      try {
        return JSON.parse(data).subtitle;
      } catch (e) {}
    }
    return "Membangun Karakter, Kreativitas, dan Kemandirian Anak Sejak Dini.";
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div className="overflow-hidden">
      {/* 1. Ticker (Papan Pengumuman Berjalan) */}
      <div className="bg-gradient-to-r from-brand-primary to-rose-500 text-white py-2.5 overflow-hidden border-b border-rose-400">
        <div className="relative max-w-7xl mx-auto px-4 flex items-center">
          <span className="bg-white text-brand-primary font-display font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-10 shrink-0 select-none mr-4">
            PENGUMUMAN
          </span>
          <div className="w-full overflow-hidden relative flex items-center">
            <div className="animate-marquee whitespace-nowrap flex gap-12 font-semibold text-sm">
              <span className="flex items-center gap-1">
                📢 {tickerText} ★
              </span>
              <span className="flex items-center gap-1">
                ⭐ Taman Kanak-Kanak Pertiwi II Kesugihan Kidul berkomitmen memberikan pendidikan karakter unggul sejak dini. ★
              </span>
              <span className="flex items-center gap-1">
                📢 {tickerText} ★
              </span>
              <span className="flex items-center gap-1">
                ⭐ Taman Kanak-Kanak Pertiwi II Kesugihan Kidul berkomitmen memberikan pendidikan karakter unggul sejak dini. ★
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Hero Section */}
      <section className="relative bg-gradient-to-b from-rose-50/70 via-amber-50/40 to-white pt-12 pb-20 md:py-24 lg:py-28 overflow-hidden">
        {isAdminLoggedIn && onEditSection && (
          <div className="absolute top-4 right-4 z-40">
            <button 
              onClick={() => onEditSection('content')}
              className="bg-brand-primary hover:bg-rose-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg border-2 border-white flex items-center gap-1.5 cursor-pointer"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Konten Beranda</span>
            </button>
          </div>
        )}
        {/* Background Decorative Playful Shapes */}
        <div className="absolute top-10 left-5 w-20 h-20 bg-brand-primary/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute bottom-20 right-5 w-32 h-32 bg-brand-secondary/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-brand-accent/10 rounded-full blur-xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
              >
                <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.1] tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-rose-500 to-brand-secondary">
                    {heroTitle}
                  </span>
                </h1>
                
                <p className="font-sans text-base sm:text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {heroSubtitle}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <button
                  onClick={() => setActiveTab('spmb')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-rose-600 text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:shadow-brand-primary/30 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <GraduationCap className="w-5.5 h-5.5" />
                  <span>Daftar SPMB [2026/2027]</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 font-bold text-base px-8 py-4 rounded-2xl border-2 border-slate-200 hover:border-slate-300 shadow-xs transition-all duration-300 cursor-pointer"
                >
                  <span>Pelajari Profil Kami</span>
                </button>
              </motion.div>

              {/* Trust Badge/Stats Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 gap-4 pt-6 max-w-sm mx-auto lg:mx-0 text-center"
              >
                <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-100 shadow-xs">
                  <p className="font-display font-black text-2xl text-brand-primary">1989</p>
                  <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Tahun Berdiri</p>
                </div>
                <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-100 shadow-xs">
                  <p className="font-display font-black text-2xl text-brand-secondary">100%</p>
                  <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Guru Tersertifikasi</p>
                </div>
              </motion.div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 1 }}
                className="relative mx-auto max-w-md lg:max-w-none"
              >
                {/* Decorative Photo Frame Accent */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-brand-secondary via-brand-primary to-brand-accent rounded-[2.5rem] opacity-30 blur-md -rotate-2" />
                
                {/* Image Container */}
                <div className="relative rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl bg-slate-100 aspect-4/3">
                  <img
                    src="https://lh3.googleusercontent.com/d/14y2f5scYOhp8QEduKDbfn6QXiCK02Plk"
                    alt="Foto Anak-Anak TK Pertiwi II"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback to stylized illustration if Drive image fails
                      e.currentTarget.style.display = 'none';
                      const fallback = document.getElementById('hero-fallback');
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  {/* Fallback View */}
                  <div id="hero-fallback" className="hidden absolute inset-0 bg-rose-50 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-800">Bermain & Belajar Bersama</h3>
                    <p className="text-sm text-slate-500 mt-2">Membentuk pribadi anak yang mandiri, ceria, dan penuh imajinasi kreatif.</p>
                  </div>
                  
                  {/* Overlay Accent */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                      <Heart className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500">Lingkungan Belajar</p>
                      <p className="text-sm font-black text-slate-800">Penuh Kasih Sayang & Keceriaan</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Keunggulan Kami Section (3 Kolom Ringkas) */}
      <section className="bg-white py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Mengapa Memilih <span className="text-brand-primary">TK Pertiwi II</span>?
            </h2>
            <div className="w-20 h-1.5 bg-brand-secondary mx-auto rounded-full" />
            <p className="text-slate-600 font-sans text-base md:text-lg">
              Kami merancang setiap program dan fasilitas untuk memastikan anak tumbuh cerdas, mandiri, dan berakhlaq mulia.
            </p>
          </div>

          {/* Cards Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Keunggulan A: Fasilitas Aman & Nyaman */}
            <motion.div 
              variants={itemVariants}
              className="group relative bg-slate-50 hover:bg-white p-8 rounded-3xl border border-slate-100 hover:border-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-brand-accent/10 text-brand-accent rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white shadow-xs transition-all duration-300">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="text-center mt-4 space-y-3">
                <h3 className="font-display font-bold text-xl text-slate-900">Fasilitas Aman & Nyaman</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Bermain sambil belajar di lingkungan yang asri, hijau, bersih, dan terpantau aman untuk mengoptimalkan eksplorasi anak.
                </p>
              </div>
            </motion.div>

            {/* Keunggulan B: Pendidik Profesional */}
            <motion.div 
              variants={itemVariants}
              className="group relative bg-slate-50 hover:bg-white p-8 rounded-3xl border border-slate-100 hover:border-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white shadow-xs transition-all duration-300">
                <Heart className="w-7 h-7" />
              </div>
              <div className="text-center mt-4 space-y-3">
                <h3 className="font-display font-bold text-xl text-slate-900">Pendidik Profesional</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Didampingi oleh guru-guru yang sangat ramah, sabar, penyayang, tersertifikasi, dan memahami betul psikologi perkembangan anak.
                </p>
              </div>
            </motion.div>

            {/* Keunggulan C: Kurikulum Interaktif */}
            <motion.div 
              variants={itemVariants}
              className="group relative bg-slate-50 hover:bg-white p-8 rounded-3xl border border-slate-100 hover:border-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-brand-secondary/10 text-brand-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-secondary group-hover:text-white shadow-xs transition-all duration-300">
                <Award className="w-7 h-7" />
              </div>
              <div className="text-center mt-4 space-y-3">
                <h3 className="font-display font-bold text-xl text-slate-900">Kurikulum Interaktif</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Fokus pada eksplorasi mandiri, stimulasi sensorik-motorik, serta partisipasi aktif anak dalam kegiatan kreatif bermakna.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Contact Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-3xl p-8 border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-2 text-center md:text-left">
              <h4 className="font-display font-bold text-slate-800 text-lg">Tertarik untuk berkunjung langsung melihat fasilitas kami?</h4>
              <p className="text-sm text-slate-600 font-sans">Kami dengan senang hati menyambut kehadiran Ayah, Bunda, dan si kecil ke sekolah kami.</p>
            </div>
            <button
              onClick={() => setActiveTab('contact')}
              className="bg-brand-success hover:bg-teal-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 shadow-sm shrink-0 cursor-pointer"
            >
              Atur Jadwal Kunjungan
            </button>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
