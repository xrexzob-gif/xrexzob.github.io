import React, { useState } from 'react';
import { KeyRound, X, ExternalLink, ShieldCheck, Check } from 'lucide-react';

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  onSaveToken: (token: string) => void;
}

export const TokenModal: React.FC<TokenModalProps> = ({
  isOpen,
  onClose,
  token,
  onSaveToken,
}) => {
  const [inputVal, setInputVal] = useState(token);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveToken(inputVal.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setInputVal('');
    onSaveToken('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative space-y-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">GitHub Personal Token</h3>
            <p className="text-xs text-slate-400">Tingkatkan batas API dari 60 ke 5.000 req/jam</p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            Secara default, GitHub membatasi 60 permintaan/jam untuk API publik tanpa login. Memasukkan token pribadi (Fine-grained atau Classic Token dengan scope public read-only) memberikan akses leluasa.
          </p>
          <div className="flex items-center gap-1.5 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-emerald-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Token disimpan secara lokal di browser Anda (localStorage) dan tidak pernah dikirim ke server luar manapun selain api.github.com.</span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-300 block">Personal Access Token (ghp_...)</label>
          <input
            type="password"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <a
            href="https://github.com/settings/tokens"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>Buat Token di GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          {inputVal && (
            <button
              onClick={handleClear}
              className="text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
            >
              Hapus Token
            </button>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-950" />
                <span>Tersimpan!</span>
              </>
            ) : (
              <span>Simpan Token</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
