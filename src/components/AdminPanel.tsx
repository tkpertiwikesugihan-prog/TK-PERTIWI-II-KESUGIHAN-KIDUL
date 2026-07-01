import React, { useState, useEffect } from 'react';
import { 
  Shield, Settings, Users, FileText, Image, Megaphone, 
  Trash2, Edit, Plus, Save, RefreshCw, Eye, Check, X,
  Lock, Unlock, ArrowRight, HelpCircle, Sparkles
} from 'lucide-react';
import { RegistrationRecord } from '../types';

interface AdminPanelProps {
  onLogout: () => void;
  // Dynamic contents passed from App.tsx state
  tickerText: string;
  setTickerText: (t: string) => void;
  heroData: { title: string; subtitle: string };
  setHeroData: (data: { title: string; subtitle: string }) => void;
  sejarahText: string;
  setSejarahText: (t: string) => void;
  visiList: string[];
  setVisiList: (list: string[]) => void;
  misiList: string[];
  setMisiList: (list: string[]) => void;
  
  // Lists
  galleryEvents: any[];
  setGalleryEvents: (list: any[]) => void;
  newsArticles: any[];
  setNewsArticles: (list: any[]) => void;
  developmentalAspects: any[];
  setDevelopmentalAspects: (list: any[]) => void;
  extracurriculars: any[];
  setExtracurriculars: (list: any[]) => void;
  activeSubTab: 'spmb' | 'content' | 'programs' | 'posts' | 'password';
  setActiveSubTab: (tab: 'spmb' | 'content' | 'programs' | 'posts' | 'password') => void;
}

export default function AdminPanel({
  onLogout,
  tickerText,
  setTickerText,
  heroData,
  setHeroData,
  sejarahText,
  setSejarahText,
  visiList,
  setVisiList,
  misiList,
  setMisiList,
  galleryEvents,
  setGalleryEvents,
  newsArticles,
  setNewsArticles,
  developmentalAspects,
  setDevelopmentalAspects,
  extracurriculars,
  setExtracurriculars,
  activeSubTab,
  setActiveSubTab
}: AdminPanelProps) {
  
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [selectedReg, setSelectedReg] = useState<RegistrationRecord | null>(null);
  
  // Editing temp states
  const [tempTicker, setTempTicker] = useState(tickerText);
  const [tempHeroTitle, setTempHeroTitle] = useState(heroData.title);
  const [tempHeroSubtitle, setTempHeroSubtitle] = useState(heroData.subtitle);
  const [tempSejarah, setTempSejarah] = useState(sejarahText);
  const [tempVisi, setTempVisi] = useState(visiList.join('\n'));
  const [tempMisi, setTempMisi] = useState(misiList.join('\n'));

  // Notification toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Password change states
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem('cms_admin_passcode') || 'admin';
    if (currentPasswordInput !== storedPass) {
      showToast('Kata sandi saat ini salah!', 'error');
      return;
    }
    if (newPasswordInput.trim() === '') {
      showToast('Kata sandi baru tidak boleh kosong!', 'error');
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      showToast('Konfirmasi kata sandi baru tidak cocok!', 'error');
      return;
    }
    localStorage.setItem('cms_admin_passcode', newPasswordInput);
    showToast('Sandi pengaman berhasil diperbarui!');
    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
  };

  // Load Registrations
  useEffect(() => {
    const loadRegs = () => {
      const stored = localStorage.getItem('tk_pertiwi_registrations');
      if (stored) {
        try {
          setRegistrations(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    };
    loadRegs();
    // Add event listener to listen for additions
    window.addEventListener('storage', loadRegs);
    return () => window.removeEventListener('storage', loadRegs);
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Save General Content
  const handleSaveGeneralContent = () => {
    setTickerText(tempTicker);
    setHeroData({ title: tempHeroTitle, subtitle: tempHeroSubtitle });
    setSejarahText(tempSejarah);
    setVisiList(tempVisi.split('\n').filter(line => line.trim() !== ''));
    setMisiList(tempMisi.split('\n').filter(line => line.trim() !== ''));
    
    // Trigger localStorage save implicitly via states which App.tsx manages
    showToast('Konten Beranda & Profil berhasil disimpan!');
  };

  // Manage SPMB Registrations
  const updateRegStatus = (id: string, status: 'Menunggu Verifikasi' | 'Diterima' | 'Hubungi Admin' | string) => {
    const updated = registrations.map(r => r.id === id ? { ...r, status } : r);
    setRegistrations(updated);
    localStorage.setItem('tk_pertiwi_registrations', JSON.stringify(updated));
    showToast(`Status pendaftaran berhasil diubah ke: ${status}`);
    if (selectedReg && selectedReg.id === id) {
      setSelectedReg({ ...selectedReg, status });
    }
  };

  const deleteReg = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus catatan pendaftaran ini?')) {
      const filtered = registrations.filter(r => r.id !== id);
      setRegistrations(filtered);
      localStorage.setItem('tk_pertiwi_registrations', JSON.stringify(filtered));
      showToast('Catatan pendaftaran berhasil dihapus');
      if (selectedReg && selectedReg.id === id) {
        setSelectedReg(null);
      }
    }
  };

  // News and Gallery Form Handling
  const [editingPostType, setEditingPostType] = useState<'gallery' | 'news' | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postForm, setPostForm] = useState({
    title: '',
    summary: '',
    description: '',
    content: '',
    imageUrl: '',
    category: '',
    date: ''
  });

  const handleOpenPostForm = (type: 'gallery' | 'news', item: any = null) => {
    setEditingPostType(type);
    if (item) {
      setEditingPostId(item.id);
      setPostForm({
        title: item.title || '',
        summary: item.summary || '',
        description: item.description || '',
        content: item.content || '',
        imageUrl: item.imageUrl || '',
        category: item.category || '',
        date: item.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      });
    } else {
      setEditingPostId(null);
      setPostForm({
        title: '',
        summary: '',
        description: '',
        content: '',
        imageUrl: 'https://lh3.googleusercontent.com/d/19ULkJbQSSxmp2whBq0AZslHusMGA9tyc',
        category: type === 'gallery' ? 'Kegiatan' : 'Pengumuman',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      });
    }
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPostType === 'gallery') {
      if (editingPostId) {
        const updated = galleryEvents.map(item => item.id === editingPostId ? { ...item, ...postForm } : item);
        setGalleryEvents(updated);
        showToast('Galeri Kegiatan berhasil diperbarui!');
      } else {
        const newEvent = {
          id: `gallery-${Date.now()}`,
          ...postForm
        };
        setGalleryEvents([newEvent, ...galleryEvents]);
        showToast('Galeri Kegiatan baru berhasil ditambahkan!');
      }
    } else {
      if (editingPostId) {
        const updated = newsArticles.map(item => item.id === editingPostId ? { ...item, ...postForm } : item);
        setNewsArticles(updated);
        showToast('Artikel Berita berhasil diperbarui!');
      } else {
        const newNews = {
          id: `news-${Date.now()}`,
          ...postForm
        };
        setNewsArticles([newNews, ...newsArticles]);
        showToast('Artikel Berita baru berhasil ditambahkan!');
      }
    }
    setEditingPostType(null);
    setEditingPostId(null);
  };

  const handleDeletePost = (type: 'gallery' | 'news', id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus item ini dari website?')) {
      if (type === 'gallery') {
        setGalleryEvents(galleryEvents.filter(item => item.id !== id));
        showToast('Item galeri berhasil dihapus');
      } else {
        setNewsArticles(newsArticles.filter(item => item.id !== id));
        showToast('Artikel berita berhasil dihapus');
      }
    }
  };

  // Program / Aspects edit handling
  const [editingAspectId, setEditingAspectId] = useState<string | null>(null);
  const [aspectForm, setAspectForm] = useState({ title: '', description: '', detailsText: '' });

  const handleOpenAspectForm = (aspect: any) => {
    setEditingAspectId(aspect.id);
    setAspectForm({
      title: aspect.title,
      description: aspect.description,
      detailsText: aspect.details.join('\n')
    });
  };

  const handleSaveAspect = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = developmentalAspects.map(aspect => {
      if (aspect.id === editingAspectId) {
        return {
          ...aspect,
          title: aspectForm.title,
          description: aspectForm.description,
          details: aspectForm.detailsText.split('\n').filter(line => line.trim() !== '')
        };
      }
      return aspect;
    });
    setDevelopmentalAspects(updated);
    setEditingAspectId(null);
    showToast('Aspek perkembangan berhasil diperbarui!');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-14 font-sans relative">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-24 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-bounce">
          <Check className="w-5 h-5 text-brand-secondary" />
          <span className="text-xs sm:text-sm font-bold font-sans">{toast.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header Banner */}
        <div className="bg-slate-900 text-white p-6 sm:p-10 rounded-[2.5rem] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-brand-primary opacity-10 rounded-full blur-3xl" />
          <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-brand-secondary opacity-15 rounded-full blur-2xl" />

          <div className="space-y-3 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-slate-800 text-brand-primary text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-slate-700">
              <Shield className="w-4 h-4 text-brand-primary animate-pulse" />
              <span>Portal Admin Sekolah</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              Dashboard <span className="text-brand-primary">TK Pertiwi II</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Gunakan dashboard interaktif ini untuk melakukan pengeditan konten, mengelola berita, serta memantau dan memvalidasi formulir pendaftaran murid baru secara berkala.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <button
              onClick={onLogout}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-3 rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              Keluar Sesi
            </button>
          </div>
        </div>

        {/* Dashboard Stat Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">Pendaftar SPMB</span>
              <Users className="w-4 h-4 text-brand-primary" />
            </div>
            <p className="font-display font-black text-2xl text-slate-800">{registrations.length} Anak</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">Galeri Kegiatan</span>
              <Image className="w-4 h-4 text-brand-secondary" />
            </div>
            <p className="font-display font-black text-2xl text-slate-800">{galleryEvents.length} Item</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">Artikel & Pengumuman</span>
              <Megaphone className="w-4 h-4 text-brand-accent" />
            </div>
            <p className="font-display font-black text-2xl text-slate-800">{newsArticles.length} Rilis</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">Aspek Fokus</span>
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
            <p className="font-display font-black text-2xl text-slate-800">{developmentalAspects.length} Bidang</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 overflow-x-auto pb-px scrollbar-none gap-2">
          <button
            onClick={() => { setActiveSubTab('spmb'); setEditingPostType(null); }}
            className={`px-5 py-3 font-bold text-sm rounded-t-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'spmb'
                ? 'bg-white border border-b-white border-slate-200 text-brand-primary shadow-xs'
                : 'text-slate-500 hover:text-slate-950 hover:bg-slate-150'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Pendaftar Baru ({registrations.length})</span>
          </button>
          
          <button
            onClick={() => { setActiveSubTab('content'); setEditingPostType(null); }}
            className={`px-5 py-3 font-bold text-sm rounded-t-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'content'
                ? 'bg-white border border-b-white border-slate-200 text-brand-primary shadow-xs'
                : 'text-slate-500 hover:text-slate-950 hover:bg-slate-150'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Konten Beranda & Profil</span>
          </button>

          <button
            onClick={() => { setActiveSubTab('programs'); setEditingPostType(null); }}
            className={`px-5 py-3 font-bold text-sm rounded-t-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'programs'
                ? 'bg-white border border-b-white border-slate-200 text-brand-primary shadow-xs'
                : 'text-slate-500 hover:text-slate-950 hover:bg-slate-150'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Program Belajar</span>
          </button>

          <button
            onClick={() => { setActiveSubTab('posts'); }}
            className={`px-5 py-3 font-bold text-sm rounded-t-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'posts'
                ? 'bg-white border border-b-white border-slate-200 text-brand-primary shadow-xs'
                : 'text-slate-500 hover:text-slate-950 hover:bg-slate-150'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Kelola Galeri & Berita</span>
          </button>

          <button
            onClick={() => { setActiveSubTab('password'); setEditingPostType(null); }}
            className={`px-5 py-3 font-bold text-sm rounded-t-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'password'
                ? 'bg-white border border-b-white border-slate-200 text-brand-primary shadow-xs'
                : 'text-slate-500 hover:text-slate-950 hover:bg-slate-150'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Ubah Kata Sandi</span>
          </button>
        </div>

        {/* SUB-TAB CONTENTS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs min-h-[350px]">
          
          {/* TAB 1: SPMB LIST */}
          {activeSubTab === 'spmb' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-display font-black text-xl text-slate-900">Formulir Pendaftaran Masuk</h3>
                  <p className="text-slate-500 text-xs sm:text-sm">Berikut rincian pendaftar online yang masuk dari website resmi.</p>
                </div>
              </div>

              {registrations.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 space-y-2">
                  <Users className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
                  <p className="font-bold text-slate-600 text-sm">Belum ada pendaftar baru</p>
                  <p className="text-xs max-w-md mx-auto">Semua formulir yang dikirimkan wali murid via menu "Pendaftaran SPMB" akan otomatis terekam secara lengkap di sini.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 font-sans text-xs uppercase tracking-wider font-extrabold border-b border-slate-100">
                        <th className="p-4">No. Registrasi</th>
                        <th className="p-4">Nama Anak</th>
                        <th className="p-4">Wali Murid</th>
                        <th className="p-4">No. HP WA</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 text-xs sm:text-sm font-sans">
                      {registrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold text-brand-primary">{reg.registrationNumber}</td>
                          <td className="p-4 font-extrabold text-slate-950">{reg.childName}</td>
                          <td className="p-4">{reg.parentName}</td>
                          <td className="p-4">{reg.phoneNumber}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              reg.status === 'Diterima' 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                : reg.status === 'Hubungi Admin'
                                ? 'bg-rose-50 text-rose-700 border border-rose-100'
                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                              {reg.status || 'Menunggu Verifikasi'}
                            </span>
                          </td>
                          <td className="p-4 text-center flex items-center justify-center gap-1">
                            <button
                              onClick={() => setSelectedReg(reg)}
                              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                              title="Detail"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteReg(reg.id)}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: GENERAL HOMEPAGE & PROFILE CONTENT */}
          {activeSubTab === 'content' && (
            <div className="space-y-6">
              <div className="space-y-1 pb-4 border-b border-slate-100">
                <h3 className="font-display font-black text-xl text-slate-900">Ubah Teks & Informasi Beranda</h3>
                <p className="text-slate-500 text-xs sm:text-sm">Sesuaikan teks headline utama, pengumuman berjalan, dan rincian visi-misi sekolah secara instan.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ticker Section */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans flex items-center gap-1">
                    <Megaphone className="w-3.5 h-3.5" />
                    <span>Papan Pengumuman Berjalan (Ticker)</span>
                  </label>
                  <input
                    type="text"
                    value={tempTicker}
                    onChange={(e) => setTempTicker(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/20 text-sm font-semibold"
                    placeholder="Contoh: Pendaftaran Murid Baru Gelombang 1 Telah Dibuka!"
                  />
                </div>

                {/* Hero Title */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans flex items-center gap-1">
                    <Settings className="w-3.5 h-3.5" />
                    <span>Headline Utama Beranda</span>
                  </label>
                  <input
                    type="text"
                    value={tempHeroTitle}
                    onChange={(e) => setTempHeroTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/20 text-sm font-bold"
                  />
                </div>

                {/* Hero Subtitle */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">Sub-Headline Beranda</label>
                  <input
                    type="text"
                    value={tempHeroSubtitle}
                    onChange={(e) => setTempHeroSubtitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/20 text-sm"
                  />
                </div>

                {/* Sejarah Text */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Teks Sejarah Kami (Profil)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={tempSejarah}
                    onChange={(e) => setTempSejarah(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/20 text-sm leading-relaxed"
                  />
                </div>

                {/* Visi */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">
                    Visi Sekolah (Satu baris per poin)
                  </label>
                  <textarea
                    rows={3}
                    value={tempVisi}
                    onChange={(e) => setTempVisi(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/20 text-sm"
                  />
                </div>

                {/* Misi */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">
                    Misi Sekolah (Satu baris per poin)
                  </label>
                  <textarea
                    rows={3}
                    value={tempMisi}
                    onChange={(e) => setTempMisi(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/20 text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleSaveGeneralContent}
                  className="inline-flex items-center gap-2 bg-brand-primary hover:bg-sky-600 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-md cursor-pointer transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Teks</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PROGRAMS EDIT */}
          {activeSubTab === 'programs' && (
            <div className="space-y-6">
              <div className="space-y-1 pb-4 border-b border-slate-100">
                <h3 className="font-display font-black text-xl text-slate-900">Ubah Program & Aspek Perkembangan</h3>
                <p className="text-slate-500 text-xs sm:text-sm">Kelola fokus bimbingan akademik dan kurikulum merdeka pada sekolah.</p>
              </div>

              {editingAspectId ? (
                /* Edit Aspect Sub-Form */
                <form onSubmit={handleSaveAspect} className="space-y-4 max-w-xl bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-display font-black text-base text-slate-800 flex items-center justify-between">
                    <span>Edit Detail Aspek</span>
                    <button 
                      type="button" 
                      onClick={() => setEditingAspectId(null)}
                      className="text-slate-400 hover:text-slate-900 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </h4>

                  <div className="space-y-3 font-sans text-xs sm:text-sm">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Judul Aspek</label>
                      <input 
                        type="text"
                        required
                        value={aspectForm.title}
                        onChange={(e) => setAspectForm({ ...aspectForm, title: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none text-sm font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Deskripsi Singkat</label>
                      <textarea
                        required
                        rows={2}
                        value={aspectForm.description}
                        onChange={(e) => setAspectForm({ ...aspectForm, description: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Metode & Sasaran (Satu per baris)</label>
                      <textarea
                        required
                        rows={4}
                        value={aspectForm.detailsText}
                        onChange={(e) => setAspectForm({ ...aspectForm, detailsText: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none text-sm"
                        placeholder="Contoh: Mengembangkan motorik halus...\nMelatih otot fisik..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingAspectId(null)}
                      className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="bg-brand-primary text-white px-4 py-2 rounded-lg font-bold text-xs cursor-pointer"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              ) : (
                /* Aspects Grid list */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {developmentalAspects.map((aspect) => (
                    <div 
                      key={aspect.id}
                      className="p-5 rounded-2xl border border-slate-100 shadow-xs flex items-start justify-between gap-4 hover:border-brand-primary/20 transition-all bg-slate-50/50"
                    >
                      <div className="space-y-1">
                        <h4 className="font-display font-extrabold text-base text-slate-800">{aspect.title}</h4>
                        <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{aspect.description}</p>
                        <p className="text-[10px] font-bold text-slate-400">{aspect.details.length} poin pencapaian</p>
                      </div>
                      <button
                        onClick={() => handleOpenAspectForm(aspect)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-brand-primary shrink-0 transition-colors cursor-pointer"
                        title="Edit Aspek"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: POSTS (NEWS & GALLERY) */}
          {activeSubTab === 'posts' && (
            <div className="space-y-6">
              
              {editingPostType ? (
                /* Add/Edit Form */
                <form onSubmit={handleSavePost} className="space-y-4 max-w-2xl bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h4 className="font-display font-black text-base text-slate-800 flex items-center gap-1.5">
                      <FileText className="w-5 h-5 text-brand-primary" />
                      <span>{editingPostId ? 'Edit Rilis' : 'Tambah Rilis Baru'} ({editingPostType === 'gallery' ? 'Galeri Kegiatan' : 'Artikel Berita'})</span>
                    </h4>
                    <button 
                      type="button" 
                      onClick={() => { setEditingPostType(null); setEditingPostId(null); }}
                      className="text-slate-400 hover:text-slate-900 cursor-pointer"
                    >
                      <X className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs sm:text-sm">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="font-bold text-slate-500">Judul Kegiatan / Berita</label>
                      <input 
                        type="text"
                        required
                        value={postForm.title}
                        onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none text-sm font-semibold"
                        placeholder="Contoh: Keseruan Kegiatan Lomba Kemerdekaan..."
                      />
                    </div>

                    {editingPostType === 'news' && (
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-slate-500">Ringkasan Singkat (Summary)</label>
                        <input 
                          type="text"
                          required
                          value={postForm.summary}
                          onChange={(e) => setPostForm({ ...postForm, summary: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none text-sm"
                          placeholder="Ringkasan satu kalimat yang muncul di halaman beranda/daftar."
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Kategori / Label</label>
                      <input 
                        type="text"
                        required
                        value={postForm.category}
                        onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none text-sm"
                        placeholder="Contoh: Pengumuman, Prestasi, Cooking Class..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Tanggal Rilis</label>
                      <input 
                        type="text"
                        required
                        value={postForm.date}
                        onChange={(e) => setPostForm({ ...postForm, date: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none text-sm font-mono"
                        placeholder="Contoh: 20 Juni 2026"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="font-bold text-slate-500">Tautan Foto / Image URL</label>
                      <input 
                        type="text"
                        required
                        value={postForm.imageUrl}
                        onChange={(e) => setPostForm({ ...postForm, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none text-xs font-mono"
                      />
                    </div>

                    {editingPostType === 'gallery' ? (
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-slate-500">Teks Isi Artikel Lengkap (Gunakan \n untuk baris baru)</label>
                        <textarea
                          required
                          rows={6}
                          value={postForm.description}
                          onChange={(e) => setPostForm({ ...postForm, description: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none text-xs sm:text-sm leading-relaxed"
                          placeholder="Tulis artikel kegiatan secara lengkap dan detail di sini..."
                        />
                      </div>
                    ) : (
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-slate-500">Teks Isi Artikel Lengkap (Gunakan \n untuk baris baru)</label>
                        <textarea
                          required
                          rows={6}
                          value={postForm.content}
                          onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none text-xs sm:text-sm leading-relaxed"
                          placeholder="Tulis isi pengumuman/berita lengkap secara mendalam di sini..."
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 justify-end pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => { setEditingPostType(null); setEditingPostId(null); }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="bg-brand-primary hover:bg-sky-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Simpan Konten rilis
                    </button>
                  </div>
                </form>
              ) : (
                /* Post Tabs List */
                <div className="space-y-8">
                  {/* Gallery Items Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-black text-lg text-slate-800 flex items-center gap-2">
                        <Image className="w-4.5 h-4.5 text-brand-primary" />
                        <span>Koleksi Galeri Kegiatan ({galleryEvents.length})</span>
                      </h4>
                      <button
                        onClick={() => handleOpenPostForm('gallery')}
                        className="inline-flex items-center gap-1 bg-brand-primary hover:bg-sky-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Foto Galeri</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {galleryEvents.map((item) => (
                        <div key={item.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="h-28 rounded-lg overflow-hidden bg-white border border-slate-100">
                              <img src={item.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="space-y-1">
                              <span className="bg-slate-200 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{item.category}</span>
                              <h5 className="font-display font-extrabold text-sm text-slate-800 line-clamp-1">{item.title}</h5>
                              <p className="text-slate-500 text-[11px] line-clamp-2">{item.description}</p>
                            </div>
                          </div>
                          <div className="flex justify-end gap-1 pt-2 border-t border-slate-200/60">
                            <button
                              onClick={() => handleOpenPostForm('gallery', item)}
                              className="p-1.5 text-slate-500 hover:text-brand-primary hover:bg-white rounded transition-colors cursor-pointer"
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeletePost('gallery', item.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* News Articles Section */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-black text-lg text-slate-800 flex items-center gap-2">
                        <Megaphone className="w-4.5 h-4.5 text-brand-secondary" />
                        <span>Rilis Berita & Pengumuman ({newsArticles.length})</span>
                      </h4>
                      <button
                        onClick={() => handleOpenPostForm('news')}
                        className="inline-flex items-center gap-1 bg-brand-secondary hover:bg-amber-500 text-slate-900 font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Berita Baru</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {newsArticles.map((article) => (
                        <div key={article.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="bg-slate-200 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{article.category}</span>
                              <span className="text-[10px] font-mono text-slate-400">{article.date}</span>
                            </div>
                            <h5 className="font-display font-extrabold text-sm text-slate-800">{article.title}</h5>
                            <p className="text-slate-500 text-xs line-clamp-1">{article.summary}</p>
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <button
                              onClick={() => handleOpenPostForm('news', article)}
                              className="p-2 text-slate-500 hover:text-brand-primary hover:bg-white rounded-lg transition-colors cursor-pointer"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePost('news', article.id)}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 5: CHANGE PASSWORD */}
          {activeSubTab === 'password' && (
            <div className="space-y-6 max-w-md">
              <div className="space-y-1 pb-4 border-b border-slate-100">
                <h3 className="font-display font-black text-xl text-slate-900">Ubah Sandi Pengaman Portal</h3>
                <p className="text-slate-500 text-xs sm:text-sm">Silakan ubah sandi pengaman untuk membatasi akses perubahan konten website.</p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-1.5 font-sans">
                  <label className="text-xs font-bold text-slate-500 uppercase">Sandi Saat Ini</label>
                  <input 
                    type="password"
                    required
                    placeholder="Sandi lama Anda..."
                    value={currentPasswordInput}
                    onChange={(e) => setCurrentPasswordInput(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                  />
                </div>

                <div className="space-y-1.5 font-sans">
                  <label className="text-xs font-bold text-slate-500 uppercase">Sandi Baru</label>
                  <input 
                    type="password"
                    required
                    placeholder="Minimal 4 karakter..."
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                  />
                </div>

                <div className="space-y-1.5 font-sans">
                  <label className="text-xs font-bold text-slate-500 uppercase">Konfirmasi Sandi Baru</label>
                  <input 
                    type="password"
                    required
                    placeholder="Ulangi sandi baru..."
                    value={confirmPasswordInput}
                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                  />
                </div>

                <div className="pt-2 flex justify-start">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-brand-primary hover:bg-rose-600 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Perbarui Kata Sandi</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>

      {/* REGISTRATION DETAIL MODAL */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative space-y-6">
            <button
              onClick={() => setSelectedReg(null)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-900 p-1.5 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-slate-100 pb-4">
              <span className="text-[10px] font-black tracking-widest text-brand-primary uppercase font-sans">Detail Formulir Siswa</span>
              <h3 className="font-display font-black text-2xl text-slate-900">
                {selectedReg.childName}
              </h3>
              <p className="text-slate-400 text-xs font-semibold">
                No. Pendaftaran: <span className="font-mono text-brand-primary font-bold">{selectedReg.registrationNumber}</span> | Tanggal: {selectedReg.createdAt ? new Date(selectedReg.createdAt).toLocaleDateString('id-ID') : 'N/A'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm font-sans text-slate-600">
              <div className="space-y-1">
                <p className="font-bold text-slate-400 text-[10px] uppercase">Nama Panggilan</p>
                <p className="font-semibold text-slate-900">{selectedReg.nickname || '-'}</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-400 text-[10px] uppercase">Jenis Kelamin</p>
                <p className="font-semibold text-slate-900">{selectedReg.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-400 text-[10px] uppercase">Tempat, Tgl Lahir</p>
                <p className="font-semibold text-slate-900">{selectedReg.birthPlace}, {selectedReg.birthDate}</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-400 text-[10px] uppercase">Agama Anak</p>
                <p className="font-semibold text-slate-900">{selectedReg.religion}</p>
              </div>
              <div className="col-span-2 space-y-1 pt-2 border-t border-slate-100">
                <p className="font-bold text-slate-400 text-[10px] uppercase">Alamat Lengkap Rumah</p>
                <p className="font-semibold text-slate-900 leading-relaxed">{selectedReg.address}</p>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                <div className="space-y-1">
                  <p className="font-bold text-slate-400 text-[10px] uppercase">Nama Ayah</p>
                  <p className="font-semibold text-slate-900">{selectedReg.fatherName || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-400 text-[10px] uppercase">Pekerjaan Ayah</p>
                  <p className="font-semibold text-slate-900">{selectedReg.fatherOccupation || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-400 text-[10px] uppercase">Nama Ibu</p>
                  <p className="font-semibold text-slate-900">{selectedReg.motherName}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-400 text-[10px] uppercase">Pekerjaan Ibu</p>
                  <p className="font-semibold text-slate-900">{selectedReg.motherOccupation}</p>
                </div>
              </div>
              <div className="col-span-2 space-y-1 pt-2 border-t border-slate-100">
                <p className="font-bold text-slate-400 text-[10px] uppercase">Kontak Wali Murid (No. HP/WA)</p>
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{selectedReg.phoneNumber}</span>
                  <a 
                    href={`https://wa.me/${selectedReg.phoneNumber.replace(/^0/, '62')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-brand-success hover:underline font-bold"
                  >
                    (Buka Chat WA)
                  </a>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Status Validasi:</span>
                <select
                  value={selectedReg.status || 'Menunggu Verifikasi'}
                  onChange={(e) => updateRegStatus(selectedReg.id, e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-extrabold text-slate-800 outline-none"
                >
                  <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                  <option value="Diterima">Diterima</option>
                  <option value="Hubungi Admin">Hubungi Admin</option>
                </select>
              </div>

              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setSelectedReg(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
