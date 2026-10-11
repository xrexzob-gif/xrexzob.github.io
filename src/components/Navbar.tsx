import React from 'react';
import { OWNER_CONTACT } from '../data/storeData';
import { useTheme } from '../context/ThemeContext';
import {
  MessageCircle,
  Instagram,
  Github,
  Map,
  Zap,
  UploadCloud,
  Sun,
  Moon,
  PackageCheck
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenDeployGuide: () => void;
  onOpenTrackModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onOpenDeployGuide,
  onOpenTrackModal,
}) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors ${
      isDark
        ? 'border-slate-800/80 bg-[#070b12]/95 text-slate-100'
        : 'border-slate-200/90 bg-white/95 text-slate-800 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 h-16">
        {/* Zone 1: Brand title wordmark */}
        <button
          onClick={() => setActiveSection('home')}
          className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
            X
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                xrexzob
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Online" />
            </div>
            <p className="text-[10px] font-mono text-cyan-500 leading-none">DEV & SERVICES</p>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className={`hidden lg:flex items-center gap-5 text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          <button
            onClick={() => setActiveSection('maps')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              activeSection === 'maps'
                ? isDark ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400' : 'text-cyan-600 font-semibold border-b-2 border-cyan-600'
                : isDark ? 'hover:text-slate-200' : 'hover:text-slate-900'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Jualan Map</span>
          </button>

          <button
            onClick={() => setActiveSection('smm')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              activeSection === 'smm'
                ? isDark ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400' : 'text-cyan-600 font-semibold border-b-2 border-cyan-600'
                : isDark ? 'hover:text-slate-200' : 'hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Suntik Sosmed</span>
          </button>

          <button
            onClick={() => setActiveSection('github')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              activeSection === 'github'
                ? isDark ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400' : 'text-cyan-600 font-semibold border-b-2 border-cyan-600'
                : isDark ? 'hover:text-slate-200' : 'hover:text-slate-900'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>GitHub & Repos</span>
          </button>

          {/* Track Order Button */}
          <button
            onClick={onOpenTrackModal}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              isDark ? 'text-emerald-400 hover:text-emerald-300 font-medium' : 'text-emerald-600 hover:text-emerald-800 font-medium'
            }`}
          >
            <PackageCheck className="w-4 h-4" />
            <span>Lacak Pesanan</span>
          </button>

          <button
            onClick={() => setActiveSection('profile')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              activeSection === 'profile'
                ? isDark ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400' : 'text-cyan-600 font-semibold border-b-2 border-cyan-600'
                : isDark ? 'hover:text-slate-200' : 'hover:text-slate-900'
            }`}
          >
            <Instagram className="w-4 h-4" />
            <span>Profil WA & IG</span>
          </button>

          <button
            onClick={onOpenDeployGuide}
            className={`whitespace-nowrap shrink-0 font-medium py-1 flex items-center gap-1.5 cursor-pointer ${
              isDark ? 'text-cyan-300 hover:text-cyan-200' : 'text-cyan-700 hover:text-cyan-900'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Pasang di GitHub</span>
          </button>
        </nav>

        {/* Zone 3: Direct WA Action Button, IG, Theme Toggle & Track button */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Lacak Pesanan button for mobile & small screens */}
          <button
            onClick={onOpenTrackModal}
            title="Lacak Status Pesanan WhatsApp"
            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium lg:hidden ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-emerald-400 hover:bg-slate-800'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <PackageCheck className="w-4 h-4" />
          </button>

          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            title={isDark ? 'Ganti ke Mode Terang (Siang Hari)' : 'Ganti ke Mode Gelap (Malam Hari)'}
            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-800 hover:border-amber-400/50'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 hover:border-slate-400'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline font-mono text-[11px] text-slate-300">Terang</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span className="hidden sm:inline font-mono text-[11px] text-slate-700">Gelap</span>
              </>
            )}
          </button>

          {/* Instagram Link */}
          <a
            href={OWNER_CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram @xrexzob"
            className={`p-2 rounded-xl border transition-colors ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-pink-400 hover:text-pink-300 hover:border-pink-500/50'
                : 'bg-pink-50 border-pink-200 text-pink-600 hover:bg-pink-100'
            }`}
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* WhatsApp Action */}
          <a
            href={OWNER_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span className="hidden xs:inline">WA {OWNER_CONTACT.whatsapp}</span>
            <span className="xs:hidden">WA</span>
          </a>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className={`lg:hidden flex items-center overflow-x-auto gap-2 px-4 py-2 border-t text-xs ${
        isDark ? 'border-slate-800/60 bg-slate-950/80 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'
      }`}>
        <button
          onClick={() => setActiveSection('home')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeSection === 'home'
              ? isDark ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'bg-cyan-100 text-cyan-800 font-semibold'
              : ''
          }`}
        >
          Beranda
        </button>
        <button
          onClick={onOpenTrackModal}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer flex items-center gap-1 ${
            isDark ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/60 font-medium' : 'bg-emerald-100 text-emerald-800 font-semibold'
          }`}
        >
          <PackageCheck className="w-3.5 h-3.5" />
          <span>Lacak Order</span>
        </button>
        <button
          onClick={() => setActiveSection('maps')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeSection === 'maps'
              ? isDark ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'bg-cyan-100 text-cyan-800 font-semibold'
              : ''
          }`}
        >
          Katalog Map
        </button>
        <button
          onClick={() => setActiveSection('smm')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeSection === 'smm'
              ? isDark ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'bg-cyan-100 text-cyan-800 font-semibold'
              : ''
          }`}
        >
          Suntik Sosmed
        </button>
        <button
          onClick={() => setActiveSection('github')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeSection === 'github'
              ? isDark ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'bg-cyan-100 text-cyan-800 font-semibold'
              : ''
          }`}
        >
          GitHub Dev
        </button>
        <button
          onClick={() => setActiveSection('profile')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeSection === 'profile'
              ? isDark ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'bg-cyan-100 text-cyan-800 font-semibold'
              : ''
          }`}
        >
          Kontak & IG
        </button>
      </div>
    </header>
  );
};
