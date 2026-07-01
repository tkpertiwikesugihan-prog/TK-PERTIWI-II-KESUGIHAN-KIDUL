import { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, Phone } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdminLoggedIn?: boolean;
}

export default function Navbar({ activeTab, setActiveTab, isAdminLoggedIn }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'profile', label: 'Profil Kami' },
    { id: 'programs', label: 'Program' },
    { id: 'gallery', label: 'Kegiatan & Berita' },
    { id: 'spmb', label: 'Pendaftaran SPMB' },
    { id: 'contact', label: 'Kontak' },
    ...(isAdminLoggedIn ? [{ id: 'admin', label: 'Portal Admin' }] : []),
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md py-3' 
        : 'bg-white py-4 border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-brand-primary/20 flex items-center justify-center shadow-sm p-1">
              <img 
                src="https://lh3.googleusercontent.com/d/1gknch-nZBzBEd5j86NsnFLvefz4blJ62" 
                alt="Logo TK Pertiwi II" 
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to high-quality icon if Drive image fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('logo-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div id="logo-fallback" className="hidden text-brand-primary">
                <GraduationCap className="w-8 h-8" />
              </div>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg leading-tight text-slate-800 tracking-tight group-hover:text-brand-primary transition-colors duration-200">
                TK PERTIWI II
              </h1>
              <p className="font-sans text-xs font-semibold text-slate-500 tracking-wider">
                KESUGIHAN KIDUL
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-sm shadow-brand-primary/25'
                      : 'text-slate-600 hover:text-brand-primary hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('spmb')}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-rose-400 hover:from-rose-500 hover:to-brand-primary text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Daftar SPMB 2026/2027</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl py-4 px-4 transition-all duration-300 ease-in-out">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary/10 text-brand-primary border-l-4 border-brand-primary'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-brand-primary'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <button
              onClick={() => handleNavClick('spmb')}
              className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white py-3 rounded-xl font-bold text-sm shadow-md"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Daftar SPMB 2026/2027</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
