import React from 'react';
import { OWNER_CONTACT } from '../data/storeData';
import { useTheme } from '../context/ThemeContext';
import {
  MessageCircle,
  Instagram,
  Github,
  Mail,
  ShieldCheck,
  Heart,
  UploadCloud
} from 'lucide-react';

interface FooterProps {
  onOpenDeployGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeployGuide }) => {
  const { isDark } = useTheme();

  return (
    <footer className={`mt-20 border-t py-12 px-4 sm:px-6 transition-colors ${
      isDark ? 'border-slate-800/80 bg-[#060a12] text-slate-400' : 'border-slate-200 bg-white text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-sm">
                X
              </div>
              <span className={`text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                xrexzob
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                isDark ? 'bg-cyan-950/80 border-cyan-800/60 text-cyan-300' : 'bg-cyan-50 border-cyan-200 text-cyan-800'
              }`}>
                OFFICIAL
              </span>
            </div>

            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Pusat pembuatan custom game maps (FiveM, GTA V, Roblox), jasa suntik akun sosmed bergaransi resmi, dan repositori developer GitHub.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={OWNER_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                isDark
                  ? 'bg-emerald-950/40 border-emerald-800/60 hover:border-emerald-500/80 text-emerald-300'
                  : 'bg-emerald-50 border-emerald-200 hover:border-emerald-500 text-emerald-800'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>WA 083135445588</span>
            </a>

            <a
              href={OWNER_CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                isDark
                  ? 'bg-pink-950/40 border-pink-800/60 hover:border-pink-500/80 text-pink-300'
                  : 'bg-pink-50 border-pink-200 hover:border-pink-500 text-pink-800'
              }`}
            >
              <Instagram className="w-4 h-4" />
              <span>IG @xrexzob</span>
            </a>

            <a
              href={OWNER_CONTACT.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                  : 'bg-slate-100 border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <button
              onClick={onOpenDeployGuide}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                isDark
                  ? 'bg-cyan-950/40 border-cyan-800/60 hover:border-cyan-500 text-cyan-300'
                  : 'bg-cyan-50 border-cyan-200 hover:border-cyan-400 text-cyan-800'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>Pasang di GitHub</span>
            </button>
          </div>
        </div>

        <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono ${
          isDark ? 'border-slate-800/60 text-slate-500' : 'border-slate-200 text-slate-500'
        }`}>
          <span>
            © {new Date().getFullYear()} xrexzob • Dikelola langsung oleh developer xrexzob.
          </span>

          <div className="flex items-center gap-4">
            <span className={`flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Transaksi Aman Terverifikasi</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
