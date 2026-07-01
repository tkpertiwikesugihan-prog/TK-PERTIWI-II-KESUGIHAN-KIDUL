import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  CheckSquare, 
  ArrowRight, 
  UserCheck, 
  MessageSquare, 
  Send, 
  FileText, 
  PlusCircle, 
  Trash2, 
  CalendarDays,
  User,
  Users,
  Briefcase,
  PhoneCall,
  Sparkles,
  Mail,
  Edit
} from 'lucide-react';
import { RegistrationInput, RegistrationRecord } from '../types';

interface SpmbProps {
  isAdminLoggedIn?: boolean;
  onEditSection?: (subTab: 'spmb' | 'content' | 'programs' | 'posts' | 'password') => void;
}

export default function SpmbForm({ isAdminLoggedIn, onEditSection }: SpmbProps = {}) {
  const [submissions, setSubmissions] = useState<RegistrationRecord[]>([]);
  const [formData, setFormData] = useState<RegistrationInput>({
    childName: '',
    nickname: '',
    birthPlace: '',
    birthDate: '',
    gender: '',
    religion: 'Islam',
    fatherName: '',
    motherName: '',
    parentJob: '',
    whatsappNumber: '',
    notes: ''
  });

  const [wizardStep, setWizardStep] = useState<number>(1);
  const [successRecord, setSuccessRecord] = useState<RegistrationRecord | null>(null);

  // Load submissions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tk_pertiwi_registrations');
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (err) {
        console.error('Error parsing registrations', err);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStepNext = () => {
    // Basic validations
    if (wizardStep === 1) {
      if (!formData.childName || !formData.birthDate || !formData.gender) {
        alert('Mohon lengkapi nama anak, tanggal lahir, dan jenis kelamin.');
        return;
      }
    } else if (wizardStep === 2) {
      if (!formData.fatherName && !formData.motherName) {
        alert('Mohon isi minimal nama Ayah atau nama Ibu.');
        return;
      }
      if (!formData.whatsappNumber) {
        alert('Mohon lengkapi nomor WhatsApp aktif.');
        return;
      }
    }
    setWizardStep(prev => prev + 1);
  };

  const handleStepBack = () => {
    setWizardStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new registration record
    const regNumber = `REG-TKP2-${Date.now().toString().slice(-6)}`;
    const newRecord: RegistrationRecord = {
      ...formData,
      id: Math.random().toString(36).substring(7),
      registrationDate: new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status: 'Menunggu Verifikasi',
      registrationNumber: regNumber
    };

    const updated = [newRecord, ...submissions];
    setSubmissions(updated);
    localStorage.setItem('tk_pertiwi_registrations', JSON.stringify(updated));
    setSuccessRecord(newRecord);

    // Reset Form
    setFormData({
      childName: '',
      nickname: '',
      birthPlace: '',
      birthDate: '',
      gender: '',
      religion: 'Islam',
      fatherName: '',
      motherName: '',
      parentJob: '',
      whatsappNumber: '',
      notes: ''
    });
    setWizardStep(1);
  };

  const deleteRecord = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus catatan pendaftaran ini?')) {
      const updated = submissions.filter(s => s.id !== id);
      setSubmissions(updated);
      localStorage.setItem('tk_pertiwi_registrations', JSON.stringify(updated));
    }
  };

  const generateWhatsAppLink = (record: RegistrationRecord) => {
    const message = `Halo TK Pertiwi II Kesugihan Kidul! 😊
Saya ingin mengonfirmasi pendaftaran murid baru online yang telah saya isi di website:

No Pendaftaran: *${record.registrationNumber}*
Nama Lengkap Anak: *${record.childName}*
Nama Panggilan: *${record.nickname || '-'}*
Tempat, Tgl Lahir: *${record.birthPlace || '-'}, ${record.birthDate}*
Jenis Kelamin: *${record.gender}*
Nama Orang Tua: *Ayah: ${record.fatherName || '-'} | Ibu: ${record.motherName || '-'}*
Nomor WhatsApp: *${record.whatsappNumber}*
Catatan Tambahan: *${record.notes || '-'}*

Mohon bantuannya untuk mengarahkan langkah verifikasi berkas selanjutnya. Terima kasih! 🙏`;

    return `https://api.whatsapp.com/send?phone=6285172265902&text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="bg-slate-50/50 py-12 md:py-20 relative">
      {isAdminLoggedIn && onEditSection && (
        <div className="absolute top-4 right-4 z-40">
          <button 
            onClick={() => onEditSection('spmb')}
            className="bg-brand-primary hover:bg-rose-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg border-2 border-white flex items-center gap-1.5 cursor-pointer"
          >
            <Edit className="w-4 h-4" />
            <span>Kelola Pendaftaran</span>
          </button>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-brand-primary font-bold text-xs uppercase tracking-widest font-sans px-3 py-1 rounded-full bg-rose-50 border border-rose-100">
            Pendaftaran On-line
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Penerimaan Murid Baru <span className="text-brand-primary">Tahun Ajaran 2026/2027</span>
          </h2>
          <div className="w-16 h-1 bg-brand-secondary mx-auto rounded-full mt-2" />
          <p className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            Selamat datang Ayah dan Bunda! Kami menyediakan kemudahan pendaftaran online agar proses pendaftaran putra-putri tercinta berjalan praktis, aman, dan lancar.
          </p>
        </div>

        {/* Section 1: Syarat & Alur */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Syarat Pendaftaran */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-md flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-brand-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-display font-black text-xl text-slate-900">Syarat Berkas Pendaftaran</h3>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed font-sans">
                Berikut kelengkapan dokumen administrasi yang perlu disiapkan oleh orang tua dan diserahkan dalam bentuk fisik saat verifikasi sekolah:
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Mengisi Formulir Pendaftaran (Bisa online di bawah ini atau forms google)',
                  'Fotokopi Akta Kelahiran Anak (2 Lembar)',
                  'Fotokopi Kartu Keluarga / KK (2 Lembar)',
                  'Fotokopi Kartu Tanda Penduduk / KTP Kedua Orang Tua (2 Lembar)'
                ].map((syarat, sIdx) => (
                  <div key={sIdx} className="flex gap-3 items-start">
                    <CheckSquare className="w-5.5 h-5.5 text-brand-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-sans text-sm sm:text-base leading-relaxed">{syarat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50/50 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-xs text-slate-500">
                <p className="font-bold">Ada pertanyaan seputar persyaratan?</p>
                <p>Tim kami siap menjawab pertanyaan Ayah & Bunda.</p>
              </div>
              <a 
                href="mailto:tkpertiwikesugihan@gmail.com"
                className="inline-flex items-center justify-center gap-1.5 bg-brand-primary hover:bg-sky-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Hubungi Kami</span>
              </a>
            </div>
          </div>

          {/* Right: Alur Pendaftaran */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-md">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-brand-secondary">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="font-display font-black text-xl text-slate-900">Alur Pendaftaran Murid Baru</h3>
              </div>

              <div className="relative border-l-2 border-dashed border-slate-200 pl-6 ml-4 space-y-8">
                {/* Alur A */}
                <div className="relative">
                  <div className="absolute -left-10 top-0.5 w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-display font-black text-xs shadow-md">
                    A
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-base text-slate-800">Mulai Pendaftaran</h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
                      Klik tombol Google Forms di bawah ini atau isi langsung <strong>Wizard Formulir Online Cepat</strong> yang telah kami sediakan di halaman ini.
                    </p>
                  </div>
                </div>

                {/* Alur B */}
                <div className="relative">
                  <div className="absolute -left-10 top-0.5 w-8 h-8 rounded-full bg-brand-secondary text-white flex items-center justify-center font-display font-black text-xs shadow-md">
                    B
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-base text-slate-800">Isi Formulir Lengkap</h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
                      Lengkapi data diri anak (nama, tanggal lahir, dsb) serta data kontak orang tua wali dengan benar agar tim kami mudah memproses data.
                    </p>
                  </div>
                </div>

                {/* Alur C */}
                <div className="relative">
                  <div className="absolute -left-10 top-0.5 w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center font-display font-black text-xs shadow-md">
                    C
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-base text-slate-800">Konfirmasi via WhatsApp</h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
                      Setelah selesai mengirimkan form, tim administrasi kami akan langsung menghubungi Bapak/Ibu melalui WhatsApp untuk verifikasi fisik berkas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Real Google Form CTA */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://forms.gle/JJ9dFNRVXDKrTATq9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-primary to-rose-400 hover:from-rose-500 hover:to-brand-primary text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <FileText className="w-4.5 h-4.5" />
                  <span>Isi Formulir Google Forms Resmi</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Section 2: Quick Registration Wizard (Formulir Cepat) */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
          <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1.5">
              <span className="text-brand-secondary text-xs font-black tracking-wider uppercase font-sans">FITUR ONLINE PREMIUM</span>
              <h3 className="font-display font-black text-xl sm:text-2xl">Wizard Pendaftaran Online Cepat</h3>
              <p className="text-xs text-slate-400 font-sans">Isi formulir instan ini untuk mendapatkan Bukti Pendaftaran digital & konfirmasi WA instan.</p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map((step) => (
                <div 
                  key={step} 
                  className={`h-2.5 w-8 rounded-full transition-all duration-300 ${
                    wizardStep === step ? 'bg-brand-secondary w-12' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: DATA ANAK */}
                {wizardStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <User className="w-5.5 h-5.5 text-brand-primary" />
                      <h4 className="font-display font-bold text-lg text-slate-800">Langkah 1: Identitas Calon Murid</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Nama Lengkap Anak *</label>
                        <input 
                          type="text" 
                          name="childName" 
                          required
                          placeholder="Contoh: Almira Safitri" 
                          value={formData.childName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm sm:text-base font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Nama Panggilan Anak</label>
                        <input 
                          type="text" 
                          name="nickname" 
                          placeholder="Contoh: Mira" 
                          value={formData.nickname}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm sm:text-base font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Tempat Lahir</label>
                        <input 
                          type="text" 
                          name="birthPlace" 
                          placeholder="Contoh: Cilacap" 
                          value={formData.birthPlace}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm sm:text-base"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Tanggal Lahir *</label>
                        <input 
                          type="date" 
                          name="birthDate" 
                          required
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm sm:text-base font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Jenis Kelamin *</label>
                        <select 
                          name="gender" 
                          required
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm sm:text-base font-medium"
                        >
                          <option value="">Pilih Jenis Kelamin</option>
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Agama</label>
                        <select 
                          name="religion" 
                          value={formData.religion}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm sm:text-base font-medium"
                        >
                          <option value="Islam">Islam</option>
                          <option value="Kristen">Kristen</option>
                          <option value="Katolik">Katolik</option>
                          <option value="Hindu">Hindu</option>
                          <option value="Budha">Budha</option>
                          <option value="Konghucu">Konghucu</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: DATA ORANG TUA */}
                {wizardStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Users className="w-5.5 h-5.5 text-brand-secondary" />
                      <h4 className="font-display font-bold text-lg text-slate-800">Langkah 2: Data Orang Tua / Wali</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Nama Ayah</label>
                        <input 
                          type="text" 
                          name="fatherName" 
                          placeholder="Contoh: Budi Santoso" 
                          value={formData.fatherName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm sm:text-base font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Nama Ibu</label>
                        <input 
                          type="text" 
                          name="motherName" 
                          placeholder="Contoh: Siti Rahma" 
                          value={formData.motherName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm sm:text-base font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Pekerjaan Orang Tua</label>
                        <input 
                          type="text" 
                          name="parentJob" 
                          placeholder="Contoh: Karyawan Swasta / Guru" 
                          value={formData.parentJob}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm sm:text-base"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">No. WhatsApp Aktif *</label>
                        <input 
                          type="tel" 
                          name="whatsappNumber" 
                          required
                          placeholder="Contoh: 081234567890" 
                          value={formData.whatsappNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm sm:text-base font-medium"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: CATATAN & REVIEW */}
                {wizardStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Sparkles className="w-5.5 h-5.5 text-brand-success" />
                      <h4 className="font-display font-bold text-lg text-slate-800">Langkah 3: Konfirmasi & Kirim</h4>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-150 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-sans">
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Identitas Calon Siswa</p>
                          <p className="font-bold text-slate-800 mt-1">{formData.childName} ({formData.nickname || '-'})</p>
                          <p className="text-slate-500 text-xs">{formData.gender} • Lahir: {formData.birthPlace || '-'}, {formData.birthDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Kontak Orang Tua / Wali</p>
                          <p className="font-bold text-slate-800 mt-1">Ayah: {formData.fatherName || '-'} / Ibu: {formData.motherName || '-'}</p>
                          <p className="text-slate-500 text-xs">Pekerjaan: {formData.parentJob || '-'} • WA: {formData.whatsappNumber}</p>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Catatan Tambahan / Kebutuhan Khusus Gizi & Kesehatan (Opsional)</label>
                        <textarea 
                          name="notes" 
                          rows={3}
                          placeholder="Contoh: Anak alergi seafood, memiliki bakat menggambar menonjol..." 
                          value={formData.notes}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm font-sans"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Navigation Actions */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                {wizardStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleStepBack}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3 rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    Kembali
                  </button>
                ) : (
                  <div />
                )}

                {wizardStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleStepNext}
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-6 py-3 rounded-xl text-sm transition-all cursor-pointer"
                  >
                    <span>Lanjutkan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-brand-primary hover:bg-rose-600 text-white font-extrabold px-8 py-3.5 rounded-xl text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <Send className="w-4.5 h-4.5" />
                    <span>Kirim Pendaftaran Online</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* SECTION 3: RIWAYAT PENDAFTARAN LOKAL */}
        {submissions.length > 0 && (
          <div className="space-y-6">
            <div className="border-l-4 border-brand-success pl-4 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-display font-black text-xl text-slate-800">Riwayat Pendaftaran Anda</h3>
                <p className="text-xs text-slate-400 font-sans">Tersimpan aman secara lokal di perangkat ini.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {submissions.map((sub) => (
                <div 
                  key={sub.id}
                  className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-success" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-brand-success bg-emerald-50 px-2.5 py-1 rounded-lg">
                        {sub.registrationNumber}
                      </span>
                      <span className="text-slate-400 text-xs font-sans">
                        {sub.registrationDate}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-display font-bold text-slate-800 text-base">{sub.childName}</h4>
                      <p className="text-slate-500 text-xs font-sans">
                        Panggilan: {sub.nickname || '-'} • Lahir: {sub.birthPlace || '-'}, {sub.birthDate}
                      </p>
                      <p className="text-slate-500 text-xs font-sans">
                        Orang Tua: Ayah {sub.fatherName || '-'} / Ibu {sub.motherName || '-'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <a 
                      href={generateWhatsAppLink(sub)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-brand-success hover:bg-teal-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Kirim Berkas via WA</span>
                    </a>

                    <button
                      onClick={() => deleteRecord(sub.id)}
                      className="text-slate-400 hover:text-rose-500 p-2 rounded-lg hover:bg-rose-50 transition-all cursor-pointer"
                      title="Hapus Catatan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUCCESS MODAL */}
        {successRecord && (
          <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 max-w-lg w-full text-center shadow-2xl relative space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-success flex items-center justify-center mx-auto shadow-sm">
                <UserCheck className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="bg-emerald-50 text-brand-success text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest font-sans">
                  Pendaftaran Berhasil Dikirim!
                </span>
                <h3 className="font-display font-black text-2xl text-slate-900">
                  Selamat, Formulir Online Telah Terdaftar!
                </h3>
                <p className="text-slate-500 font-sans text-xs sm:text-sm">
                  Nomor Pendaftaran Putra-Putri Anda: <strong className="text-brand-success font-display font-black text-base">{successRecord.registrationNumber}</strong>
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-left text-xs sm:text-sm text-slate-600 leading-relaxed font-sans space-y-1.5">
                <p><strong>Nama Anak:</strong> {successRecord.childName}</p>
                <p><strong>Langkah Selanjutnya:</strong> Sesuai alur pendaftaran, mohon kirimkan konfirmasi berkas langsung kepada tim kami via WhatsApp berikut agar jadwal verifikasi dapat segera ditentukan.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a 
                  href={generateWhatsAppLink(successRecord)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brand-success hover:bg-teal-700 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md transition-all"
                >
                  <MessageSquare className="w-4.5 h-4.5" />
                  <span>Kirim Data via WA Sekarang</span>
                </a>
                <button
                  onClick={() => setSuccessRecord(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
