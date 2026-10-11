import React from 'react';
import { OWNER_CONTACT } from '../data/storeData';
import { useTheme } from '../context/ThemeContext';
import { MessageCircle, Instagram, Github, MapPin, Sparkles, ShieldCheck, ArrowRight, Code2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreMaps: () => void;
  onExploreSMM: () => void;
  onOpenOrder: (title: string, price: number | string, detail: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMaps,
  onExploreSMM,
  onOpenOrder,
}) => {
  const { isDark } = useTheme();

  return (
    <section className={`relative overflow-hidden rounded-3xl border p-6 sm:p-12 shadow-2xl transition-all ${
      isDark
        ? 'border-slate-800 bg-gradient-to-b from-[#0b1326] via-[#090f1d] to-[#070b12] text-slate-100 shadow-cyan-950/20'
        : 'border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-800 shadow-slate-200/60'
    }`}>
      {/* Background glow effects */}
      <div className={`absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/15'
      }`} />
      <div className={`absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-blue-600/10' : 'bg-blue-500/10'
      }`} />

      <div className="relative max-w-4xl space-y-6">
        {/* Verification & Status */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono ${
            isDark
              ? 'bg-cyan-950/60 border border-cyan-800/80 text-cyan-300'
              : 'bg-cyan-100 border border-cyan-300 text-cyan-900'
          }`}>
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>OFFICIAL STORE & DEV HUB</span>
          </div>
          <span className="text-slate-400">·</span>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className={isDark ? 'text-slate-300' : 'text-slate-700 font-medium'}>
              100% Aman & Terpercaya
            </span>
          </div>
          <span className="text-slate-400">·</span>
          <span className={`font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            xrexzob.github.io
          </span>
        </div>

        {/* Big Bold Headline */}
        <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Solusi <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Custom Map 3D</span> &{' '}
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">Suntik Sosmed</span> Berkualitas
        </h1>

        <p className={`text-sm sm:text-lg max-w-2xl leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Selamat datang di website resmi <strong className={isDark ? 'text-white' : 'text-slate-900'}>xrexzob</strong>. Kami melayani pembuatan map game kustom (FiveM MLO, GTA V, Roblox), booster akun sosmed bergaransi (Instagram, TikTok, YouTube), dan pengembangan script/tools via GitHub.
        </p>

        {/* Featured Contact Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp Card */}
          <a
            href={OWNER_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all group cursor-pointer ${
              isDark
                ? 'bg-slate-900/90 border-emerald-900/60 hover:border-emerald-500/80'
                : 'bg-white border-emerald-200 hover:border-emerald-500 shadow-xs'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${
              isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
            }`}>
              <MessageCircle className="w-5 h-5 fill-emerald-500/20" />
            </div>
            <div className="overflow-hidden">
              <span className={`text-[11px] block font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                WHATSAPP OFFICIAL
              </span>
              <span className={`text-xs sm:text-sm font-bold block truncate group-hover:text-emerald-500 transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {OWNER_CONTACT.whatsapp}
              </span>
            </div>
          </a>

          {/* Instagram Card */}
          <a
            href={OWNER_CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all group cursor-pointer ${
              isDark
                ? 'bg-slate-900/90 border-pink-900/60 hover:border-pink-500/80'
                : 'bg-white border-pink-200 hover:border-pink-500 shadow-xs'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${
              isDark ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-600'
            }`}>
              <Instagram className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <span className={`text-[11px] block font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                INSTAGRAM RESMI
              </span>
              <span className={`text-xs sm:text-sm font-bold block truncate group-hover:text-pink-500 transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                @{OWNER_CONTACT.instagram}
              </span>
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href={OWNER_CONTACT.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all group cursor-pointer ${
              isDark
                ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/80'
                : 'bg-white border-slate-200 hover:border-cyan-500 shadow-xs'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${
              isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-600'
            }`}>
              <Github className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <span className={`text-[11px] block font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                GITHUB DEV
              </span>
              <span className={`text-xs sm:text-sm font-bold block truncate group-hover:text-cyan-500 transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                github.com/{OWNER_CONTACT.githubUser}
              </span>
            </div>
          </a>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-3">
          <button
            onClick={onExploreMaps}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <span>Katalog Map Game</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreSMM}
            className={`px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm border transition-colors cursor-pointer flex items-center gap-2 active:scale-95 ${
              isDark
                ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-xs'
            }`}
          >
            <span>Layanan Suntik Sosmed</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </button>

          <a
            href={OWNER_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm border transition-colors flex items-center gap-2 active:scale-95 ${
              isDark
                ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-300'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Langsung di WA</span>
          </a>
        </div>
      </div>
    </section>
  );
};
