import { GraduationCap, MapPin, Mail, Clock, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-brand-primary flex items-center justify-center p-1">
                <img 
                  src="https://lh3.googleusercontent.com/d/1gknch-nZBzBEd5j86NsnFLvefz4blJ62" 
                  alt="Logo TK Pertiwi II" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-base leading-tight tracking-tight">
                  TK PERTIWI II
                </h3>
                <p className="font-sans text-xs text-brand-primary font-bold tracking-wider">
                  KESUGIHAN KIDUL
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Membangun karakter anak yang kreatif, berprestasi, berjiwa nasionalisme, dan berakhlaqul karimah sejak usia dini secara utuh dan terpadu.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://instagram.com/tkpertiwi2_kesugihan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-primary hover:text-white flex items-center justify-center transition-all duration-300 text-slate-400"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://facebook.com/TKpertiwi.Kesugihan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-accent hover:text-white flex items-center justify-center transition-all duration-300 text-slate-400"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-6 pb-2 border-b border-slate-800">
              Peta Situs
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { id: 'home', label: 'Beranda' },
                { id: 'profile', label: 'Profil Sekolah' },
                { id: 'programs', label: 'Program Belajar' },
                { id: 'gallery', label: 'Kegiatan & Galeri' },
                { id: 'spmb', label: 'Pendaftaran SPMB' },
                { id: 'contact', label: 'Hubungi Kami' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="hover:text-white text-slate-400 transition-colors duration-200 cursor-pointer flex items-center gap-1.5 hover:translate-x-1 transform transition-transform"
                  >
                    <span className="text-brand-primary font-bold">•</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-6 pb-2 border-b border-slate-800">
              Kontak Kami
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <span>Jalan Kebon Jambu RT 003 RW 003, Kesugihan Kidul, Kec. Kesugihan, Kab. Cilacap, Jawa Tengah</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-accent shrink-0" />
                <a href="mailto:tkpertiwikesugihan@gmail.com" className="hover:text-white transition-colors duration-200">
                  tkpertiwikesugihan@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-secondary shrink-0" />
                <span>Senin - Sabtu: 07.30 - 12.00 WIB</span>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter/SPMB Banner */}
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800">
            <h4 className="font-display font-bold text-white text-base leading-tight mb-2 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-brand-primary" />
              Pendaftaran 2026/2027
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Masa penerimaan murid baru (SPMB) sedang berlangsung. Segera daftarkan buah hati tercinta untuk mendapatkan masa depan yang gemilang.
            </p>
            <button
              onClick={() => handleLinkClick('spmb')}
              className="w-full bg-brand-primary hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-xl text-xs shadow transition-all duration-300 cursor-pointer"
            >
              Mulai Pendaftaran Online
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 mt-8 text-center md:flex md:justify-between md:items-center text-xs text-slate-500 font-sans">
          <p>© {currentYear} TK Pertiwi II Kesugihan Kidul. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 md:mt-0">
            <p>Fasilitas • Pendidikan • Karakter Berakhlaqul Karimah</p>
            <span className="hidden sm:inline text-slate-700">•</span>
            <button 
              onClick={() => handleLinkClick('admin')} 
              className="hover:text-brand-primary text-slate-500 font-semibold transition-colors duration-200 cursor-pointer"
            >
              Portal Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
