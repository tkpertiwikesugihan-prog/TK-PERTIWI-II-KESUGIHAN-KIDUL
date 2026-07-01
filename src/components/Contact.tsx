import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Send, CheckCircle2, ChevronDown, MessageSquare, Edit } from 'lucide-react';

interface ContactProps {
  isAdminLoggedIn?: boolean;
  onEditSection?: (subTab: 'spmb' | 'content' | 'programs' | 'posts' | 'password') => void;
}

export default function Contact({ isAdminLoggedIn, onEditSection }: ContactProps = {}) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'Pendaftaran Murid Baru',
    message: ''
  });

  const faqItems = [
    {
      q: 'Kapan pendaftaran murid baru (SPMB) tahun ajaran 2026/2027 dibuka?',
      a: 'Pendaftaran Gelombang I telah dibuka resmi mulai Juni 2026 hingga akhir Juli 2026. Ayah dan Bunda dapat mendaftarkan si kecil secara langsung melalui Formulir Online di website ini atau formulir fisik di sekolah.'
    },
    {
      q: 'Berapakah usia minimal untuk masuk ke TK Pertiwi II?',
      a: 'Sesuai dengan pedoman pendidikan nasional, kami menerima murid usia 4 - 5 tahun untuk Kelompok A (TK-A) dan usia 5 - 6 tahun untuk Kelompok B (TK-B).'
    },
    {
      q: 'Apakah TK Pertiwi II menyediakan program makanan sehat/tambahan?',
      a: 'Ya. Sebagai bagian dari Pelayanan Holistik-Integratif (layanan gizi dan kesehatan), kami membagikan Pemberian Makanan Tambahan (PMT) bergizi secara berkala serta melaksanakan pemeriksaan kesehatan dan tumbuh kembang anak bekerja sama dengan bidan desa/Puskesmas.'
    },
    {
      q: 'Bagaimana metode pembelajaran yang diterapkan?',
      a: 'Kami mengadopsi Kurikulum Merdeka PAUD yang dipadukan dengan pembelajaran berbasis minat bakat anak. Anak didorong untuk belajar melalui bermain, eksplorasi sensorik, kerja kelompok, serta pembiasaan karakter luhur berlandaskan nilai agama.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      // Clear form
      setFormData({
        name: '',
        phone: '',
        subject: 'Pendaftaran Murid Baru',
        message: ''
      });
    }, 2000);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-slate-50/50 py-12 md:py-20 relative">
      {isAdminLoggedIn && onEditSection && (
        <div className="absolute top-4 right-4 z-40">
          <button 
            onClick={() => onEditSection('content')}
            className="bg-brand-primary hover:bg-rose-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg border-2 border-white flex items-center gap-1.5 cursor-pointer"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Informasi Kontak</span>
          </button>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-brand-success font-bold text-xs uppercase tracking-widest font-sans px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
            Hubungi Kami
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Hubungi <span className="text-brand-success">TK Pertiwi II Kesugihan</span>
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full mt-2" />
          <p className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            Apakah Ayah dan Bunda memiliki pertanyaan seputar pendaftaran, biaya, atau program belajar? Kami sangat senang mendengarnya dan siap membantu kapan saja.
          </p>
        </div>

        {/* Contact Info & Direct message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact cards */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display font-bold text-xl text-slate-900">Informasi Kontak & Lokasi</h3>
            
            <div className="space-y-4">
              {/* Address Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-success flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1 font-sans">
                  <p className="font-bold text-sm text-slate-400 uppercase tracking-wider">Alamat Lengkap</p>
                  <p className="text-slate-700 text-sm sm:text-base font-semibold leading-relaxed">
                    Jalan Kebon Jambu RT 003 RW 003, Kesugihan Kidul, Kec. Kesugihan, Kab. Cilacap, Jawa Tengah
                  </p>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-brand-secondary flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1 font-sans">
                  <p className="font-bold text-sm text-slate-400 uppercase tracking-wider">Jam Operasional Administrasi</p>
                  <p className="text-slate-700 text-sm sm:text-base font-semibold">
                    Senin - Sabtu: 07.30 - 12.00 WIB
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-accent flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-1 font-sans">
                  <p className="font-bold text-sm text-slate-400 uppercase tracking-wider">Email Sekolah</p>
                  <a href="mailto:tkpertiwikesugihan@gmail.com" className="text-brand-accent hover:underline text-sm sm:text-base font-semibold block break-all">
                    tkpertiwikesugihan@gmail.com
                  </a>
                </div>
              </div>

              {/* Social Media Link Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3">
                <p className="font-sans font-bold text-xs text-slate-400 uppercase tracking-wider">Ikuti Media Sosial Kami</p>
                <div className="flex flex-col gap-2.5">
                  <a 
                    href="https://instagram.com/tkpertiwi2_kesugihan" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-600 hover:text-brand-primary transition-colors py-1 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-brand-primary">
                      <Instagram className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-sm font-semibold font-sans">@tkpertiwi2_kesugihan</span>
                  </a>
                  <a 
                    href="https://facebook.com/TKpertiwi.Kesugihan" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-600 hover:text-brand-accent transition-colors py-1 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-brand-accent">
                      <Facebook className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-sm font-semibold font-sans">TKpertiwi Kesugihan</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Messaging Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl">
            <h3 className="font-display font-black text-xl text-slate-900 border-b border-slate-100 pb-4 mb-6">Kirim Pesan Langsung</h3>
            
            <form onSubmit={handleSendMessage} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5 font-sans">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap Anda</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Contoh: Ibu Rahma" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-success/20 focus:border-brand-success text-sm transition-all"
                  />
                </div>
                <div className="space-y-1.5 font-sans">
                  <label className="text-xs font-bold text-slate-500 uppercase">No. WhatsApp</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder="Contoh: 0812xxxxxxxx" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-success/20 focus:border-brand-success text-sm transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5 font-sans">
                <label className="text-xs font-bold text-slate-500 uppercase">Topik Pertanyaan</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-success/20 focus:border-brand-success text-sm transition-all font-semibold"
                >
                  <option value="Pendaftaran Murid Baru">Pertanyaan Pendaftaran Murid Baru (SPMB)</option>
                  <option value="Biaya Pendidikan">Pertanyaan Rincian Biaya & Seragam</option>
                  <option value="Kurikulum & Fasilitas">Pertanyaan Fasilitas & Jam Kegiatan Belajar</option>
                  <option value="Lainnya">Kemitraan atau Lainnya</option>
                </select>
              </div>

              <div className="space-y-1.5 font-sans">
                <label className="text-xs font-bold text-slate-500 uppercase">Isi Pesan Pertanyaan Anda</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  placeholder="Ketik rincian pertanyaan Anda di sini..." 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-success/20 focus:border-brand-success text-sm transition-all"
                />
              </div>

              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-emerald-50 border border-emerald-150 rounded-2xl flex items-center gap-3 text-brand-success"
                >
                  <CheckCircle2 className="w-5.5 h-5.5 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold font-sans">Pesan Anda berhasil dikirim! Kami akan menghubungi Anda kembali via WhatsApp secepatnya.</span>
                </motion.div>
              ) : (
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-success hover:bg-teal-700 text-white font-extrabold text-sm py-4 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan Melalui Sistem</span>
                </button>
              )}
            </form>
          </div>

        </div>

        {/* Section 3: Frequently Asked Questions (FAQ) */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-6 sm:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900">Pertanyaan Sering Diajukan (FAQ)</h3>
            <p className="text-slate-500 text-xs sm:text-sm font-sans">Berikut jawaban cepat untuk berbagai keraguan umum seputar TK Pertiwi II.</p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {faqItems.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/40"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-display font-extrabold text-sm sm:text-base text-slate-800 leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
