import React, { useState } from 'react';
import { OWNER_CONTACT } from '../data/storeData';
import { useTheme } from '../context/ThemeContext';
import {
  Instagram,
  MessageCircle,
  Github,
  Mail,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  User,
  QrCode
} from 'lucide-react';

export const ProfileCard: React.FC = () => {
  const { isDark } = useTheme();
  const [copiedWa, setCopiedWa] = useState(false);
  const [copiedIg, setCopiedIg] = useState(false);

  const handleCopyWa = () => {
    navigator.clipboard.writeText(OWNER_CONTACT.whatsapp);
    setCopiedWa(true);
    setTimeout(() => setCopiedWa(false), 2000);
  };

  const handleCopyIg = () => {
    navigator.clipboard.writeText(`https://www.instagram.com/${OWNER_CONTACT.instagram}`);
    setCopiedIg(true);
    setTimeout(() => setCopiedIg(false), 2000);
  };

  return (
    <section className="space-y-6">
      <div className={`border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <h2 className={`text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          <span>Profil Resmi & Kontak xrexzob</span>
          <CheckCircle2 className="w-5 h-5 text-cyan-500 fill-cyan-500/20" />
        </h2>
        <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Hubungi kami langsung melalui WhatsApp atau ikuti update portofolio terbaru di Instagram resmi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* INSTAGRAM PROFILE CARD */}
        <div className={`relative overflow-hidden rounded-3xl border p-6 shadow-xl flex flex-col justify-between transition-all ${
          isDark
            ? 'border-pink-900/60 bg-gradient-to-br from-[#180a1c] via-[#110815] to-[#070b12]'
            : 'border-pink-200 bg-gradient-to-br from-pink-50/70 via-white to-pink-50/40 text-slate-800 shadow-pink-100/50'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-pink-500 text-xs font-mono uppercase tracking-wider">
                <Instagram className="w-4 h-4" />
                <span>INSTAGRAM OFFICIAL</span>
              </div>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                isDark
                  ? 'bg-pink-500/10 border border-pink-500/30 text-pink-300'
                  : 'bg-pink-100 border border-pink-300 text-pink-800'
              }`}>
                Verified Creator
              </span>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="relative">
                <div className="w-18 h-18 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 shadow-md">
                  <div className={`w-full h-full rounded-full flex items-center justify-center font-black text-2xl ${
                    isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
                  }`}>
                    X
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] border-2 border-white dark:border-slate-950">
                  ✓
                </div>
              </div>

              <div>
                <h3 className={`text-xl font-bold flex items-center gap-1.5 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <span>@{OWNER_CONTACT.instagram}</span>
                </h3>
                <p className={`text-xs mt-0.5 font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  xrexzob • Digital Creator
                </p>
                <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-pink-200' : 'text-pink-900'}`}>
                  Custom Game Mapping • SMM Booster • Developer Portfolio
                </p>
              </div>
            </div>

            {/* Quick stats banner */}
            <div className={`grid grid-cols-3 gap-2 py-3 px-4 rounded-xl text-center text-xs border ${
              isDark
                ? 'bg-slate-950/60 border-pink-900/40 text-slate-300'
                : 'bg-white border-pink-100 text-slate-700 shadow-xs'
            }`}>
              <div>
                <span className={`block text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Layanan</span>
                <span className={`font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>Map & SMM</span>
              </div>
              <div className={isDark ? 'border-x border-slate-800' : 'border-x border-slate-200'}>
                <span className={`block text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Respon</span>
                <span className="font-bold text-emerald-500 font-mono">Fast (24/7)</span>
              </div>
              <div>
                <span className={`block text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Status</span>
                <span className="font-bold text-cyan-600 font-mono">Open Order</span>
              </div>
            </div>
          </div>

          <div className={`pt-4 border-t flex items-center gap-2 ${
            isDark ? 'border-pink-900/40' : 'border-pink-200'
          }`}>
            <a
              href={OWNER_CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:opacity-90 text-white font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-all shadow-md shadow-pink-500/20"
            >
              <Instagram className="w-4 h-4" />
              <span>Buka Profil Instagram @{OWNER_CONTACT.instagram}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleCopyIg}
              title="Salin Link Instagram"
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {copiedIg ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* WHATSAPP PROFILE CARD */}
        <div className={`relative overflow-hidden rounded-3xl border p-6 shadow-xl flex flex-col justify-between transition-all ${
          isDark
            ? 'border-emerald-900/60 bg-gradient-to-br from-[#081a14] via-[#07130f] to-[#070b12]'
            : 'border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/40 text-slate-800 shadow-emerald-100/50'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-500 text-xs font-mono uppercase tracking-wider">
                <MessageCircle className="w-4 h-4" />
                <span>WHATSAPP OFFICIAL</span>
              </div>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1 ${
                isDark
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                  : 'bg-emerald-100 border border-emerald-300 text-emerald-800'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Online & Siap Chat</span>
              </span>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="w-18 h-18 rounded-full p-1 bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-md flex items-center justify-center">
                <div className={`w-full h-full rounded-full flex items-center justify-center text-emerald-500 ${
                  isDark ? 'bg-slate-950' : 'bg-white'
                }`}>
                  <PhoneCall className="w-7 h-7" />
                </div>
              </div>

              <div>
                <h3 className={`text-xl font-bold flex items-center gap-1.5 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <span>{OWNER_CONTACT.whatsappFormatted}</span>
                </h3>
                <p className={`text-xs mt-0.5 font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  083135445588 • Customer Service
                </p>
                <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-emerald-200' : 'text-emerald-900'}`}>
                  Layanan cepat tanya harga map custom, promo suntik sosmed, dan konsultasi script.
                </p>
              </div>
            </div>

            {/* WhatsApp Benefits */}
            <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
              isDark
                ? 'bg-slate-950/60 border-emerald-900/40 text-slate-300'
                : 'bg-white border-emerald-100 text-slate-700 shadow-xs'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Konsultasi gratis & respon cepat tanpa antre</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Bisa nego harga & diskon paket grosir / reseller</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Format pesan pemesanan otomatis dibuatkan di website ini</span>
              </div>
            </div>
          </div>

          <div className={`pt-4 border-t flex items-center gap-2 ${
            isDark ? 'border-emerald-900/40' : 'border-emerald-200'
          }`}>
            <a
              href={OWNER_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs text-center flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Chat WhatsApp ({OWNER_CONTACT.whatsapp})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleCopyWa}
              title="Salin Nomor WhatsApp"
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {copiedWa ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
