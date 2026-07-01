import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Tag, ArrowRight, X, Sparkles, Newspaper, BookOpen, Edit } from 'lucide-react';

interface GalleryEvent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  category: string;
}

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: 'Pengumuman' | 'Berita' | 'Prestasi';
  imageUrl?: string;
}

interface GalleryProps {
  isAdminLoggedIn?: boolean;
  onEditSection?: (subTab: 'spmb' | 'content' | 'programs' | 'posts' | 'password') => void;
}

export default function Gallery({ isAdminLoggedIn, onEditSection }: GalleryProps = {}) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryEvent | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [activeFilter, setActiveFilter] = useState<'semua' | 'kegiatan' | 'berita'>('semua');

  const [galleryEvents] = useState<GalleryEvent[]>(() => {
    const saved = localStorage.getItem('cms_gallery_events');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
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
        description: 'Pada hari Sabtu, 15 November 2025, suasana ceria dan penuh semangat menyelimuti gerai Rocket Chicken Kesugihan saat anak-anak mengikuti kegiatan cooking class yang edukatif. Rangkaian acara ini dibuka dengan kegiatan senam bersama yang dipandu dengan gembira, membuat seluruh peserta bergerak aktif and siap mengikuti petualangan hari itu. Setelah pemanasan yang menyenangkan tersebut, anak-anak langsung diajak untuk mengasah kreativitas dan imajinasi mereka melalui lomba mewarnai. Berbekal pensil warna dan krayon, mereka tampak sangat fokus sekaligus antusias menorehkan warna, menciptakan suasana kompetisi yang sehat dan menyenangkan.\n\nSetelah keseruan senam dan lomba mewarnai selesai, tibalah pada acara inti yang paling dinantikan, yaitu sesi praktik langsung membuat burger. Dengan gaya layaknya koki cilik yang menggemaskan, anak-anak diajarkan langkah demi langkah menyusun sebuah burger yang lezat dan bergizi. Mereka diajak bereksplorasi mengenal berbagai bahan makanan seperti roti, sayuran segar, dan daging, serta cara menatanya dengan rpi. Pengalaman langsung ini tidak hanya memberikan kegembiraan, tetapi juga melatih motorik halus, kemandirian, serta menumbuhkan rasa bangga karena anak-anak berhasil menciptakan kreasi makanan mereka sendiri.\n\nKegiatan belajar di luar kelas ini memberikan pengalaman berharga di mana anak-anak dapat menemukan hal baru dan belajar secara langsung di lingkungan nyata. Acara diakhiri dengan menikmati hasil karya burger buatan mereka sendiri, diiringi senyum puas dan tawa riang yang menghiasi wajah setiap anak. Melalui kegiatan yang menggabungkan aktivitas fisik, kreativitas seni, dan keterampilan dasar memasak ini, diharapkan anak-anak mendapatkan pengalaman belajar yang bermakna sekaligus kenangan manis yang tak terlupakan.',
        imageUrl: 'https://lh3.googleusercontent.com/d/1e-Bjg8-hp8RF6WRzWAZmURfNM2KbmYUG',
        date: '15 November 2025',
        category: 'Cooking Class'
      }
    ];
  });

  const [newsArticles] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('cms_news_articles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
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

  return (
    <div className="bg-slate-50/50 py-12 md:py-20 relative">
      {isAdminLoggedIn && onEditSection && (
        <div className="absolute top-4 right-4 z-40">
          <button 
            onClick={() => onEditSection('posts')}
            className="bg-brand-primary hover:bg-rose-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg border-2 border-white flex items-center gap-1.5 cursor-pointer"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Galeri & Berita</span>
          </button>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-brand-primary font-bold text-xs uppercase tracking-widest font-sans px-3 py-1 rounded-full bg-rose-50 border border-rose-100">
            Kabar & Aktivitas
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Berita & <span className="text-brand-primary">Galeri Kegiatan</span>
          </h2>
          <div className="w-16 h-1 bg-brand-secondary mx-auto rounded-full mt-2" />
          <p className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            Ikuti berbagai keseruan, pencapaian prestasi siswa, serta berita pengumuman penting terbaru seputar aktivitas pendidikan kami.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center gap-3">
          {[
            { id: 'semua', label: 'Semua Artikel & Galeri' },
            { id: 'kegiatan', label: 'Galeri Kegiatan' },
            { id: 'berita', label: 'Pengumuman & Berita' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'bg-white text-slate-600 hover:text-brand-primary border border-slate-200/60'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* SECTION 1: ALBUM KEGIATAN UNGGULAN */}
        {(activeFilter === 'semua' || activeFilter === 'kegiatan') && (
          <div className="space-y-8">
            <div className="border-l-4 border-brand-primary pl-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-primary" />
              <h3 className="font-display font-black text-xl sm:text-2xl text-slate-800">Album Kegiatan Unggulan</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {galleryEvents.map((event) => (
                <div 
                  key={event.id}
                  className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100 shrink-0">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // fallback image UI if drive fails
                        e.currentTarget.src = "https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    {/* Category Overlay tag */}
                    <div className="absolute top-4 left-4 bg-brand-primary/95 text-white font-display font-black text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-lg shadow-sm">
                      {event.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{event.date}</span>
                      </div>
                      <h4 className="font-display font-extrabold text-base sm:text-lg text-slate-800 group-hover:text-brand-primary transition-colors duration-200 line-clamp-2">
                        {event.title}
                      </h4>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans">
                        {event.description}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedPhoto(event)}
                      className="inline-flex items-center gap-2 text-xs font-black text-brand-primary hover:text-rose-600 transition-colors duration-200 mt-4 cursor-pointer"
                    >
                      <span>Lihat Foto Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: BERITA & PENGUMUMAN */}
        {(activeFilter === 'semua' || activeFilter === 'berita') && (
          <div className="space-y-8 pt-8 border-t border-slate-100">
            <div className="border-l-4 border-brand-secondary pl-4 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-brand-secondary" />
              <h3 className="font-display font-black text-xl sm:text-2xl text-slate-800">Berita & Informasi Sekolah</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {newsArticles.map((article) => (
                <div 
                  key={article.id}
                  className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                        article.category === 'Prestasi' 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-rose-100 text-brand-primary'
                      }`}>
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-sans">
                        <Calendar className="w-3 h-3" />
                        <span>{article.date}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-base sm:text-lg text-slate-800 line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans">
                        {article.summary}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedNews(article)}
                    className="w-full text-center bg-slate-50 hover:bg-brand-primary/10 text-slate-600 hover:text-brand-primary font-bold text-xs py-2.5 rounded-xl border border-slate-100 transition-all duration-300 mt-6 cursor-pointer"
                  >
                    Baca Selengkapnya
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LIGHTBOX MODAL FOR IMAGES */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedPhoto(null)} />
            <div className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl z-10 flex flex-col md:flex-row">
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 bg-slate-900/60 text-white hover:bg-slate-900 p-2 rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:w-3/5 bg-black flex items-center justify-center aspect-4/3 md:aspect-auto">
                <img 
                  src={selectedPhoto.imageUrl} 
                  alt={selectedPhoto.title}
                  className="max-h-[70vh] w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:w-2/5 p-8 flex flex-col justify-between gap-6 bg-white overflow-y-auto max-h-[50vh] md:max-h-none">
                <div className="space-y-4">
                  <span className="inline-block bg-brand-primary/10 text-brand-primary font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="font-display font-black text-xl text-slate-900 leading-tight">
                    {selectedPhoto.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedPhoto.date}</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed font-sans">
                    {selectedPhoto.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">TK Pertiwi II Kesugihan</span>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="text-xs font-bold text-slate-600 hover:text-brand-primary transition-colors cursor-pointer"
                  >
                    Tutup Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NEWS DETAIL MODAL */}
        {selectedNews && (
          <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedNews(null)} />
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl z-10 space-y-6">
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 bg-slate-100 text-slate-500 hover:bg-slate-200 p-2 rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3">
                <span className="bg-brand-secondary/10 text-brand-secondary font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedNews.category}
                </span>
                <h3 className="font-display font-black text-2xl text-slate-900 leading-tight pr-6">
                  {selectedNews.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedNews.date}</span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none prose-sm sm:prose-base font-sans whitespace-pre-wrap text-slate-600 leading-relaxed border-t border-b border-slate-100 py-6">
                {selectedNews.content}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Tutup Bacaan
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
