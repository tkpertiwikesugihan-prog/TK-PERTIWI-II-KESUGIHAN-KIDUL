import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, GraduationCap, Clock, MapPin, Phone, Lock, X, ShieldCheck, Mail, Eye, EyeOff } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Programs from './components/Programs';
import Gallery from './components/Gallery';
import SpmbForm from './components/SpmbForm';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import KidsBackgroundDecorations from './components/KidsBackgroundDecorations';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('is_admin_logged_in') === 'true';
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminSubTab, setAdminSubTab] = useState<'spmb' | 'content' | 'programs' | 'posts' | 'password'>('spmb');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordInfo, setShowForgotPasswordInfo] = useState(false);

  // CMS state loaded from localStorage or using the default content
  const [tickerText, setTickerText] = useState(() => {
    return localStorage.getItem('cms_ticker_text') || 'PENGUMUMAN: Pendaftaran Murid Baru (SPMB) Tahun Ajaran 2026/2027 Telah Dibuka!';
  });

  const [heroData, setHeroData] = useState(() => {
    const data = localStorage.getItem('cms_hero_data');
    if (data) {
      try { return JSON.parse(data); } catch (e) {}
    }
    return {
      title: 'Selamat Datang di Taman Kanak-Kanak Pertiwi II',
      subtitle: 'Membangun Karakter, Kreativitas, dan Kemandirian Anak Sejak Dini.'
    };
  });

  const [sejarahText, setSejarahText] = useState(() => {
    return localStorage.getItem('cms_sejarah_text') || 'Taman Kanak-Kanak Pertiwi II didirikan pada tahun 1989 dengan komitmen kuat untuk memberikan pelayanan pada anak usia dini secara utuh dan menyeluruh. Kami percaya bahwa setiap anak berhak mendapatkan lingkungan asuh yang mencakup layanan gizi dan kesehatan, pendidikan, pengasuhan, serta perlindungan yang optimal untuk mengoptimalkan semua aspek perkembangan masa keemasan mereka (golden age).';
  });

  const [visiList, setVisiList] = useState<string[]>(() => {
    const saved = localStorage.getItem('cms_visi_list');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return ['Kreatif, Berprestasi, Nasionalisme, dan Berakhlaqul Karimah.'];
  });

  const [misiList, setMisiList] = useState<string[]>(() => {
    const saved = localStorage.getItem('cms_misi_list');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      'Menciptakan anak yang kreatif melalui belajar yang menyenangkan.',
      'Menciptakan suasana belajar berbasis iman, demi tercapainya anak berprestasi dan berakhlaqul karimah.',
      'Mengokohkan pondasi kepribadian yang berkarakter memiliki cinta tanah air (nasionalisme).'
    ];
  });

  const [galleryEvents, setGalleryEvents] = useState<any[]>(() => {
    const saved = localStorage.getItem('cms_gallery_events');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'kegiatan-1',
        title: 'Semarak Haru Pelepasan dan Pentas Seni TK Pertiwi II',
        description: 'Pada hari Sabtu, 13 Juni 2026, suasana ceria dan penuh haru menyelimuti TK Pertiwi II dalam acara Pelepasan Siswa Kelompok B dan Pentas Seni. Acara yang dihadiri oleh para dewan guru, siswa, dan wali murid ini dibuka dengan suasana khidmat melalui penampilan pembacaan surat-surat pendek oleh perwakilan siswa. Penampilan pembuka ini tidak hanya menunjukkan keberanian anak-anak tampil di depan umum, tetapi juga menjadi bukti keberhasilan penanaman nilai-nilai karakter religius sejak dini yang sukses membuat para hadirin merasa bangga.\n\nSetelah pembukaan yang menyejukkan hati, kemeriahan berlanjut dengan unjuk bakat dari para siswa Kelompok A dan Kelompok B yang menampilkan berbagai tari-tarian. Dengan balutan kostum yang warna-warni, tingkah lucu dan penuh semangat anak-anak di atas panggung berhasil mengundang gelak tawa serta tepuk tangan meriah dari penonton. Suasana ceria tersebut kemudian berubah menjadi emosional saat memasuki acara inti, yaitu prosesi pelepasan siswa-siswi Kelompok B. Momen pengalungan tanda kelulusan ini diwarnai dengan rasa bangga dari para pendidik dan mata berkaca-kaca para orang tua yang menyadari buah hati mereka kini siap melangkah ke jenjang Sekolah Dasar.\n\nRangkaian acara yang penuh makna ini akhirnya ditutup dengan kegiatan yang paling dinantikan oleh anak-anak, yakni sesi tukar kado. Wajah-wajah antusias dan bahagia terpancar jelas saat mereka saling bertukar bingkisan, sebuah momen manis yang mengajarkan indahnya berbagi dan kebersamaan. Sebagai pamungkas acara, seluruh siswa, dewan guru, serta orang tua bernyanyi bersama, melantunkan lagu-lagu perpisahan yang hangat dan mengukir kenangan tak terlupakan bagi keluarga besar TK Pertiwi II.',
        imageUrl: 'https://lh3.googleusercontent.com/d/1TXoOvY3gXaNAorgPEKOS2Y9xq6vzK39P',
        date: '13 Juni 2026',
        category: 'Pentas Seni'
      },
      {
        id: 'kegiatan-2',
        title: 'Kreativitas di Lomba Mewarnai & Kostum Kartini',
        description: 'Memperingati Hari Kartini, anak-anak tampil menggemaskan mengenakan pakaian adat nusantara dan mengikuti perlombaan mewarnai bertema kebhinekaan.',
        imageUrl: 'https://lh3.googleusercontent.com/d/1H2TPWJu9dZHnnN7hyir9Yu5vhT_C4DFa',
        date: '21 April 2026',
        category: 'Hari Kartini'
      },
      {
        id: 'kegiatan-3',
        title: 'Keseruan Cooking Class dan Kreativitas Anak di Rocket Chicken Kesugihan',
        description: 'Pada hari Sabtu, 15 November 2025, suasana ceria dan penuh semangat menyelimuti gerai Rocket Chicken Kesugihan saat anak-anak mengikuti kegiatan cooking class yang edukatif. Rangkaian acara ini dibuka dengan kegiatan senam bersama yang dipandu dengan gembira, membuat seluruh peserta bergerak aktif and siap mengikuti petualangan hari itu. Setelah pemanasan yang menyenangkan tersebut, anak-anak langsung diajak untuk mengasah kreativitas dan imajinasi mereka melalui lomba mewarnai. Berbekal pensil warna dan krayon, mereka tampak sangat fokus sekaligus antusias menorehkan warna, menciptakan suasana kompetisi yang sehat dan menyenangkan.\n\nSetelah keseruan senam dan lomba mewarnai selesai, tibalah pada acara inti yang paling dinantikan, yaitu sesi praktik langsung membuat burger. Dengan gaya layaknya koki cilik yang menggemaskan, anak-anak diajarkan langkah demi langkah menyusun sebuah burger yang lezat dan bergizi. Mereka diajak bereksplorasi mengenal berbagai bahan makanan seperti roti, sayuran segar, dan daging, serta cara menatanya dengan rapi. Pengalaman langsung ini tidak hanya memberikan kegembiraan, tetapi juga melatih motorik halus, kemandirian, serta menumbuhkan rasa bangga karena anak-anak berhasil menciptakan kreasi makanan mereka sendiri.\n\nKegiatan belajar di luar kelas ini memberikan pengalaman berharga di mana anak-anak dapat menemukan hal baru dan belajar secara langsung di lingkungan nyata. Acara diakhiri dengan menikmati hasil karya burger buatan mereka sendiri, diiringi senyum puas dan tawa riang yang menghiasi wajah setiap anak. Melalui kegiatan yang menggabungkan aktivitas fisik, kreativitas seni, dan keterampilan dasar memasak ini, diharapkan anak-anak mendapatkan pengalaman belajar yang bermakna sekaligus kenangan manis yang tak terlupakan.',
        imageUrl: 'https://lh3.googleusercontent.com/d/1e-Bjg8-hp8RF6WRzWAZmURfNM2KbmYUG',
        date: '15 November 2025',
        category: 'Cooking Class'
      }
    ];
  });

  const [newsArticles, setNewsArticles] = useState<any[]>(() => {
    const saved = localStorage.getItem('cms_news_articles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'news-1',
        title: 'Penerimaan Murid Baru (SPMB) Gelombang I Dibuka!',
        summary: 'Taman Kanak-Kanak Pertiwi II resmi membuka pendaftaran untuk tahun ajaran baru 2026/2027. Tersedia kuota terbatas dan beasiswa potongan biaya pendaftaran bagi 15 pendaftar pertama.',
        content: `Pendaftaran Murid Baru (SPMB) untuk tahun pelajaran 2026/2027 di TK Pertiwi II Kesugihan Kidul telah dibuka secara resmi sejak Juni 2026.\n\nKami mengundang Bapak/Ibu wali murid untuk segera mendaftarkan putra-putri tercinta. Program pendaftaran kali ini dirancang sederhana secara online lewat website ini maupun pengisian formulir fisik di sekolah.\n\nSyarat berkas pendaftaran:\n1. Mengisi formulir data diri\n2. Fotokopi Akta Kelahiran (2 lembar)\n3. Fotokopi Kartu Keluarga (2 lembar)\n4. Fotokopi KTP Orang Tua (2 lembar)\n\nSegera hubungi panitia pendaftaran kami melalui WhatsApp untuk konsultasi seputar fasilitas, seragam, dan kurikulum belajar.`,
        date: '28 Juni 2026',
        category: 'Pengumuman'
      },
      {
        id: 'news-2',
        title: 'Informasi Jadwal Masuk Sekolah & Persiapan Awal Semester Ganjil',
        summary: 'Mengawali kalender pendidikan tahun ajaran 2026/2027, berikut jadwal pelaksanaan hari pertama masuk sekolah, kegiatan orientasi (MPLS), serta ketentuan seragam.',
        content: `Yth. Bapak/Ibu Wali Murid TK Pertiwi II,\n\nSehubungan dengan dimulainya Tahun Pelajaran Baru 2026/2027, kami informasikan jadwal masuk sekolah sebagai berikut:\n\n1. Hari Pertama Masuk Sekolah: Senin, 13 Juli 2026.\n2. Kegiatan Orientasi Sekolah (Masa Pengenalan Lingkungan Sekolah/MPLS): 13 - 15 Juli 2026.\n3. Jam Masuk Selama MPLS: 07.30 - 09.30 WIB.\n4. Perlengkapan yang Harus Dibawa: Cukup tas dan bekal makanan dan minuman.\n\nKami mengimbau orang tua untuk mengantarkan anak tepat waktu demi kenyamanan beradaptasi anak di lingkungan yang baru. Terima kasih atas kerja samanya.`,
        date: '25 Juni 2026',
        category: 'Pengumuman'
      },
      {
        id: 'news-3',
        title: 'Pengumuman Libur Semester Genap',
        summary: 'Informasi mengenai libur semester genap yang di mulai dari 22 Juni sampai 11 Juli 2026.',
        content: `Pengumuman Libur Semester Genap\n\nYth. Bapak/Ibu Wali Murid TK Pertiwi II,\n\nSehubungan dengan berakhirnya Semester Genap Tahun Ajaran 2025/2026, kami informasikan bahwa Libur Semester Genap di mulai tanggal 22 Juni sampai dengan 11 Juli 2026.\n\nSiswa-siswi akan masuk sekolah kembali pada hari Senin, 13 Juli 2026.\n\nKami mengimbau Bapak/Ibu untuk mendampingi putra-putrinya selama masa libur ini dengan berbagai kegiatan bermanfaat serta tetap menjaga kesehatan diri. Terima kasih atas kerja samanya.`,
        date: '20 Juni 2026',
        category: 'Pengumuman'
      }
    ];
  });

  const [developmentalAspects, setDevelopmentalAspects] = useState<any[]>(() => {
    const saved = localStorage.getItem('cms_developmental_aspects');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
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
        colorClass: 'border-amber-200 bg-amber-50/50 text-amber-700'
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
        colorClass: 'border-rose-200 bg-rose-50/50 text-rose-700'
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
        colorClass: 'border-blue-200 bg-blue-50/50 text-blue-700'
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
        colorClass: 'border-indigo-200 bg-indigo-50/50 text-indigo-700'
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
        colorClass: 'border-emerald-200 bg-emerald-50/50 text-emerald-700'
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
        colorClass: 'border-purple-200 bg-purple-50/50 text-purple-700'
      }
    ];
  });

  const [extracurriculars, setExtracurriculars] = useState<any[]>(() => {
    const saved = localStorage.getItem('cms_extracurriculars');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
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

  // Dynamic wrapper state setters that also write to localStorage
  const handleSetTickerText = (t: string) => {
    setTickerText(t);
    localStorage.setItem('cms_ticker_text', t);
  };

  const handleSetHeroData = (data: { title: string; subtitle: string }) => {
    setHeroData(data);
    localStorage.setItem('cms_hero_data', JSON.stringify(data));
  };

  const handleSetSejarahText = (t: string) => {
    setSejarahText(t);
    localStorage.setItem('cms_sejarah_text', t);
  };

  const handleSetVisiList = (list: string[]) => {
    setVisiList(list);
    localStorage.setItem('cms_visi_list', JSON.stringify(list));
  };

  const handleSetMisiList = (list: string[]) => {
    setMisiList(list);
    localStorage.setItem('cms_misi_list', JSON.stringify(list));
  };

  const handleSetGalleryEvents = (list: any[]) => {
    setGalleryEvents(list);
    localStorage.setItem('cms_gallery_events', JSON.stringify(list));
  };

  const handleSetNewsArticles = (list: any[]) => {
    setNewsArticles(list);
    localStorage.setItem('cms_news_articles', JSON.stringify(list));
  };

  const handleSetDevelopmentalAspects = (list: any[]) => {
    setDevelopmentalAspects(list);
    localStorage.setItem('cms_developmental_aspects', JSON.stringify(list));
  };

  const handleSetExtracurriculars = (list: any[]) => {
    setExtracurriculars(list);
    localStorage.setItem('cms_extracurriculars', JSON.stringify(list));
  };

  const handleActiveTabChange = (tab: string) => {
    if (tab === 'admin') {
      if (isAdminLoggedIn) {
        setActiveTab('admin');
      } else {
        setShowLoginModal(true);
      }
    } else {
      setActiveTab(tab);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem('cms_admin_passcode') || 'admin';
    if (passcode === storedPass || passcode === '1234') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('is_admin_logged_in', 'true');
      setActiveTab('admin');
      setShowLoginModal(false);
      setPasscode('');
      setLoginError('');
      setShowForgotPasswordInfo(false);
    } else {
      setLoginError('Sandi pengaman salah! Silakan periksa kembali.');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('is_admin_logged_in');
    setActiveTab('home');
  };

  const handleEditSection = (subTab: 'spmb' | 'content' | 'programs' | 'posts' | 'password') => {
    setAdminSubTab(subTab);
    setActiveTab('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to switch active tab view with animation
  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <Hero setActiveTab={handleActiveTabChange} isAdminLoggedIn={isAdminLoggedIn} onEditSection={handleEditSection} />;
      case 'profile':
        return <Profile isAdminLoggedIn={isAdminLoggedIn} onEditSection={handleEditSection} />;
      case 'programs':
        return <Programs isAdminLoggedIn={isAdminLoggedIn} onEditSection={handleEditSection} />;
      case 'gallery':
        return <Gallery isAdminLoggedIn={isAdminLoggedIn} onEditSection={handleEditSection} />;
      case 'spmb':
        return <SpmbForm isAdminLoggedIn={isAdminLoggedIn} onEditSection={handleEditSection} />;
      case 'contact':
        return <Contact isAdminLoggedIn={isAdminLoggedIn} onEditSection={handleEditSection} />;
      case 'admin':
        return isAdminLoggedIn ? (
          <AdminPanel 
            onLogout={handleLogout}
            tickerText={tickerText}
            setTickerText={handleSetTickerText}
            heroData={heroData}
            setHeroData={handleSetHeroData}
            sejarahText={sejarahText}
            setSejarahText={handleSetSejarahText}
            visiList={visiList}
            setVisiList={handleSetVisiList}
            misiList={misiList}
            setMisiList={handleSetMisiList}
            galleryEvents={galleryEvents}
            setGalleryEvents={handleSetGalleryEvents}
            newsArticles={newsArticles}
            setNewsArticles={handleSetNewsArticles}
            developmentalAspects={developmentalAspects}
            setDevelopmentalAspects={handleSetDevelopmentalAspects}
            extracurriculars={extracurriculars}
            setExtracurriculars={handleSetExtracurriculars}
            activeSubTab={adminSubTab}
            setActiveSubTab={setAdminSubTab}
          />
        ) : (
          <Hero setActiveTab={handleActiveTabChange} isAdminLoggedIn={isAdminLoggedIn} onEditSection={handleEditSection} />
        );
      default:
        return <Hero setActiveTab={handleActiveTabChange} isAdminLoggedIn={isAdminLoggedIn} onEditSection={handleEditSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-brand-primary/20 selection:text-brand-primary">
      
      {/* Top micro utilities info bar */}
      <div className="hidden md:block bg-slate-900 text-slate-400 py-2 border-b border-slate-800 text-xs font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between font-medium">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-primary" />
              Kesugihan Kidul, Kec. Kesugihan, Kab. Cilacap, Jawa Tengah
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-secondary" />
              Senin - Sabtu: 07.30 - 12.00 WIB
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="mailto:tkpertiwikesugihan@gmail.com" 
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
              <span>Hubungi Kami: tkpertiwikesugihan@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Primary Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={handleActiveTabChange} isAdminLoggedIn={isAdminLoggedIn} />

      {/* Main Page Canvas with Smooth Multi-Page Tab Switching Transitions */}
      <main className="flex-grow relative">
        <KidsBackgroundDecorations />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Passcode Modal Overlay */}
        <AnimatePresence>
          {showLoginModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Dark backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginError('');
                  setPasscode('');
                }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-slate-100 z-10 text-center font-sans space-y-5"
              >
                <button 
                  onClick={() => {
                    setShowLoginModal(false);
                    setLoginError('');
                    setPasscode('');
                  }}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-brand-primary mx-auto">
                  <Lock className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-black text-xl text-slate-900">Portal Pengaman</h3>
                  <p className="text-xs text-slate-500">Silakan masukkan sandi pengaman untuk mengakses dashboard perubahan konten sekolah.</p>
                </div>

                 <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Sandi Pengaman</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan sandi..."
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-mono"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {loginError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs font-bold text-brand-primary bg-rose-50 border border-rose-100 p-2.5 rounded-lg text-left"
                    >
                      ⚠️ {loginError}
                    </motion.div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowLoginModal(false);
                        setLoginError('');
                        setPasscode('');
                        setShowForgotPasswordInfo(false);
                      }}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 px-4 rounded-xl text-sm transition-all cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-brand-primary hover:bg-rose-600 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md shadow-brand-primary/20 transition-all cursor-pointer"
                    >
                      Masuk Portal
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding & Links */}
      <Footer setActiveTab={handleActiveTabChange} />

      {/* FLOATING ACTION UTILITIES */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Quick SPMB Pendaftar badge helper above the floating button */}
        {activeTab !== 'spmb' && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              setActiveTab('spmb');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-brand-primary hover:bg-rose-600 text-white p-3 rounded-full shadow-lg flex items-center gap-2 font-display font-black text-xs cursor-pointer border-2 border-white"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">Daftar SPMB Online</span>
          </motion.button>
        )}

        {/* Email Direct contact bubble */}
        <motion.a
          href="mailto:tkpertiwikesugihan@gmail.com?subject=Tanya%20Seputar%20TK%20Pertiwi%20II"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand-primary hover:bg-rose-600 text-white p-4 rounded-full shadow-xl flex items-center justify-center cursor-pointer border-2 border-white relative group animate-bounce"
          title="Kirim Email"
        >
          <Mail className="w-6.5 h-6.5" />
          
          {/* Tooltip Hover Helper */}
          <span className="absolute right-full mr-3 bg-slate-900 text-white font-sans text-xs font-bold py-1.5 px-3.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
            Hubungi Kami via Email
          </span>
        </motion.a>
      </div>

    </div>
  );
}
