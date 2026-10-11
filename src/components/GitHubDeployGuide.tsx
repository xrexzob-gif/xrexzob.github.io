import React, { useState } from 'react';
import { OWNER_CONTACT } from '../data/storeData';
import { useTheme } from '../context/ThemeContext';
import {
  UploadCloud,
  Check,
  Copy,
  Terminal,
  Globe,
  X,
  FileCode,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface GitHubDeployGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubDeployGuide: React.FC<GitHubDeployGuideProps> = ({
  isOpen,
  onClose,
}) => {
  const { isDark } = useTheme();
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  if (!isOpen) return null;

  const gitCommands = `# 1. Inisialisasi Git di komputer Anda
git init

# 2. Tambahkan semua file proyek
git add .

# 3. Buat commit pertama
git commit -m "feat: website resmi xrexzob - game maps & suntik sosmed"

# 4. Ganti nama branch utama ke main
git branch -M main

# 5. Hubungkan ke repositori GitHub xrexzob
git remote add origin https://github.com/${OWNER_CONTACT.githubUser}/xrexzob.github.io.git

# 6. Push kode ke GitHub Pages
git push -u origin main
`;

  const actionsYaml = `name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(id);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className={`w-full max-w-2xl border rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto ${
        isDark ? 'bg-[#090e18] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 shadow-md">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Panduan Pasang Website di GitHub Pages
            </h3>
            <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Domain Gratis: https://{OWNER_CONTACT.githubUser}.github.io
            </p>
          </div>
        </div>

        {/* Explanation */}
        <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 ${
          isDark
            ? 'bg-cyan-950/30 border-cyan-800/40 text-cyan-200'
            : 'bg-cyan-50 border-cyan-200 text-cyan-900'
        }`}>
          <p className="font-semibold">
            Website ini 100% kompatibel dan siap dipasang gratis selamanya di GitHub!
          </p>
          <p>
            Dengan menggunakan GitHub Pages, website <strong>xrexzob</strong> akan aktif dengan alamat <code>https://xrexzob.github.io</code> lengkap dengan SSL (HTTPS) gratis tanpa perlu sewa hosting.
          </p>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-4">
          <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Langkah Cepat Memasang (Hanya 3 Menit):
          </h4>

          {/* Step 1 */}
          <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-600 dark:text-cyan-400">
                Langkah 1: Buat Repositori di GitHub
              </span>
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
              >
                <span>Buka github.com/new</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              Beri nama repositori: <code className="text-amber-500 font-mono font-bold">{OWNER_CONTACT.githubUser}.github.io</code> dan pilih opsi <strong>Public</strong>.
            </p>
          </div>

          {/* Step 2: Terminal Commands */}
          <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                Langkah 2: Jalankan Perintah Git di Terminal
              </span>
              <button
                onClick={() => handleCopy(gitCommands, 'git')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-white border border-slate-300 text-slate-800 hover:bg-slate-100'
                }`}
              >
                {copiedStep === 'git' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Salin Perintah</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3 rounded-xl bg-[#05080e] border border-slate-800/80 font-mono text-[11px] text-emerald-300 whitespace-pre overflow-x-auto">
              {gitCommands}
            </pre>
          </div>

          {/* Step 3: GitHub Actions YAML */}
          <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-600 dark:text-purple-400">
                Langkah 3 (Opsional): Workflow Otomatis CI/CD
              </span>
              <button
                onClick={() => handleCopy(actionsYaml, 'yaml')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-white border border-slate-300 text-slate-800 hover:bg-slate-100'
                }`}
              >
                {copiedStep === 'yaml' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Salin YAML</span>
                  </>
                )}
              </button>
            </div>
            <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              Simpan di folder <code>.github/workflows/deploy.yml</code> agar setiap Anda push update baru, website langsung ter-update otomatis.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className={`pt-2 border-t flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Support: WA 083135445588
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md shadow-cyan-500/20"
          >
            Mengerti, Siap Pasang!
          </button>
        </div>
      </div>
    </div>
  );
};
