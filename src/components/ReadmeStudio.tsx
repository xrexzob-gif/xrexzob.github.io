import React, { useState, useMemo } from 'react';
import { TECH_STACKS } from '../data/techStacksData';
import { MarkdownRenderer } from './MarkdownRenderer';
import { useLanguage } from '../context/LanguageContext';
import {
  Copy,
  Check,
  Download,
  Eye,
  Code,
  Sparkles,
  Plus,
  Trash2,
  Share2,
  FileText
} from 'lucide-react';

export const ReadmeStudio: React.FC = () => {
  const { t } = useLanguage();
  const [activeType, setActiveType] = useState<'profile' | 'repo'>('profile');
  const [previewTab, setPreviewTab] = useState<'preview' | 'raw'>('preview');
  const [copied, setCopied] = useState(false);

  // Profile README States
  const [username, setUsername] = useState('xrexzob');
  const [fullName, setFullName] = useState('Rexzob Developer');
  const [role, setRole] = useState('Full Stack Software Engineer');
  const [bio, setBio] = useState('Berdedikasi mengembangkan aplikasi web modern, performa tinggi, dan ramah pengguna.');
  const [location, setLocation] = useState('Indonesia');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([
    'React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'Git'
  ]);
  const [showStatsCard, setShowStatsCard] = useState(true);
  const [showStreakCard, setShowStreakCard] = useState(true);
  const [showTopLangs, setShowTopLangs] = useState(true);
  const [statsTheme, setStatsTheme] = useState('tokyonight');
  const [linkedinUser, setLinkedinUser] = useState('');
  const [twitterUser, setTwitterUser] = useState('');
  const [emailContact, setEmailContact] = useState('');

  // Repo README States
  const [repoName, setRepoName] = useState('awesome-github-toolkit');
  const [repoTagline, setRepoTagline] = useState('Platform produktivitas lengkap untuk pengembang GitHub.');
  const [demoUrl, setDemoUrl] = useState('https://gitforge.example.app');
  const [license, setLicense] = useState('MIT');
  const [features, setFeatures] = useState<string[]>([
    '⚡ Analisis profil & repositori GitHub secara real-time',
    '🎨 Generator README profil & repositori dengan visual interaktif',
    '🛠️ Kamus perintah Git praktis dengan penyesuaian parameter',
    '🚀 Pembuat workflow GitHub Actions CI/CD siap pakai',
    '🛡️ Generator .gitignore multi-stack untuk mencegah commit file sensitif'
  ]);
  const [newFeature, setNewFeature] = useState('');
  const [packageManager, setPackageManager] = useState('npm');

  // Toggle tech stack
  const toggleTech = (techName: string) => {
    if (selectedTechs.includes(techName)) {
      setSelectedTechs(selectedTechs.filter((t) => t !== techName));
    } else {
      setSelectedTechs([...selectedTechs, techName]);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Generate Markdown based on current states
  const generatedMarkdown = useMemo(() => {
    if (activeType === 'profile') {
      let md = `<div align="center">\n\n`;
      md += `# Halo, Saya ${fullName} 👋\n\n`;
      md += `### ${role}\n\n`;
      if (location) {
        md += `📍 Berbasis di **${location}**\n\n`;
      }
      md += `</div>\n\n`;

      md += `## 🚀 Tentang Saya\n\n`;
      md += `${bio}\n\n`;
      md += `- 🔭 Sedang mengerjakan proyek inovatif open-source\n`;
      md += `- 🌱 Terus mendalami arsitektur cloud, performa web, dan otomatisasi\n`;
      md += `- 💬 Tanyakan kepada saya tentang **React, TypeScript, Backend API & Git**\n\n`;

      if (selectedTechs.length > 0) {
        md += `## 💻 Tech Stack & Peralatan\n\n`;
        md += `<p align="left">\n`;
        selectedTechs.forEach((tName) => {
          const item = TECH_STACKS.find((s) => s.name === tName);
          if (item) {
            md += `  <img src="https://img.shields.io/badge/${item.badgeSlug}&style=for-the-badge" alt="${item.name}" />\n`;
          }
        });
        md += `</p>\n\n`;
      }

      if (showStatsCard || showStreakCard || showTopLangs) {
        md += `## 📊 Statistik GitHub\n\n`;
        md += `<p align="center">\n`;
        if (showStatsCard) {
          md += `  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${statsTheme}&hide_border=true" alt="GitHub Stats" />\n`;
        }
        if (showTopLangs) {
          md += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${statsTheme}&hide_border=true" alt="Top Langs" />\n`;
        }
        if (showStreakCard) {
          md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${statsTheme}&hide_border=true" alt="GitHub Streak" />\n`;
        }
        md += `</p>\n\n`;
      }

      if (linkedinUser || twitterUser || emailContact) {
        md += `## 📬 Hubungi Saya\n\n`;
        md += `<p align="left">\n`;
        if (linkedinUser) {
          md += `  <a href="https://linkedin.com/in/${linkedinUser}"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>\n`;
        }
        if (twitterUser) {
          md += `  <a href="https://twitter.com/${twitterUser}"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>\n`;
        }
        if (emailContact) {
          md += `  <a href="mailto:${emailContact}"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>\n`;
        }
        md += `</p>\n`;
      }

      return md;
    } else {
      // Repository README
      let md = `# ${repoName}\n\n`;
      md += `> ${repoTagline}\n\n`;

      if (demoUrl) {
        md += `[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](${demoUrl})\n`;
      }
      md += `[![License: ${license}](https://img.shields.io/badge/License-${license}-blue.svg)](LICENSE)\n\n`;

      if (selectedTechs.length > 0) {
        md += `### Teknologi yang Digunakan\n\n`;
        selectedTechs.forEach((tName) => {
          const item = TECH_STACKS.find((s) => s.name === tName);
          if (item) {
            md += `![${item.name}](https://img.shields.io/badge/${item.badgeSlug}&style=flat-square) `;
          }
        });
        md += `\n\n`;
      }

      md += `## ✨ Fitur Utama\n\n`;
      features.forEach((feat) => {
        md += `- ${feat}\n`;
      });
      md += `\n`;

      md += `## 🚀 Memulai (Quick Start)\n\n`;
      md += `### Prasyarat\n`;
      md += `- Node.js 18+ terpasang di sistem Anda\n`;
      md += `- Git\n\n`;

      md += `### Instalasi\n\n`;
      md += `\`\`\`bash\n`;
      md += `# 1. Clone repositori ini\n`;
      md += `git clone https://github.com/${username}/${repoName}.git\n\n`;
      md += `# 2. Masuk ke direktori proyek\n`;
      md += `cd ${repoName}\n\n`;
      md += `# 3. Pasang semua dependensi\n`;
      md += `${packageManager === 'npm' ? 'npm install' : packageManager === 'pnpm' ? 'pnpm install' : 'yarn install'}\n\n`;
      md += `# 4. Jalankan server lokal\n`;
      md += `${packageManager === 'npm' ? 'npm run dev' : packageManager === 'pnpm' ? 'pnpm dev' : 'yarn dev'}\n`;
      md += `\`\`\`\n\n`;

      md += `Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.\n\n`;

      md += `## 🤝 Kontribusi\n\n`;
      md += `Kontribusi selalu disambut dengan hangat! Silakan ikuti langkah berikut:\n\n`;
      md += `1. Fork repositori ini\n`;
      md += `2. Buat branch fitur baru (\`git checkout -b feature/fitur-baru\`)\n`;
      md += `3. Komit perubahan Anda (\`git commit -m 'feat: tambah fitur baru'\`)\n`;
      md += `4. Push ke branch Anda (\`git push origin feature/fitur-baru\`)\n`;
      md += `5. Buka Pull Request (PR)\n\n`;

      md += `## 📄 Lisensi\n\n`;
      md += `Didistribusikan di bawah Lisensi ${license}. Lihat \`LICENSE\` untuk informasi lebih lanjut.\n`;

      return md;
    }
  }, [
    activeType,
    username,
    fullName,
    role,
    bio,
    location,
    selectedTechs,
    showStatsCard,
    showStreakCard,
    showTopLangs,
    statsTheme,
    linkedinUser,
    twitterUser,
    emailContact,
    repoName,
    repoTagline,
    demoUrl,
    license,
    features,
    packageManager
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const filename = activeType === 'profile' ? 'README.md' : `${repoName}-README.md`;
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header and Type Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t('readmeTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t('readmeSubtitle')}
          </p>
        </div>

        {/* Tab switch between Profile README vs Repo README */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            onClick={() => setActiveType('profile')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              activeType === 'profile'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('tabProfileReadme')}
          </button>
          <button
            onClick={() => setActiveType('repo')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              activeType === 'repo'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('tabRepoReadme')}
          </button>
        </div>
      </div>

      {/* Main Split Layout: Editor Form on Left, Live Output on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Configuration Forms (5 cols) */}
        <div className="lg:col-span-5 space-y-5 bg-slate-900/60 border border-slate-800 rounded-xl p-5 max-h-[820px] overflow-y-auto">
          {activeType === 'profile' ? (
            /* Profile Form */
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider font-mono">
                Informasi Profil
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Username GitHub</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">{t('yourName')}</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">{t('yourRole')}</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">{t('yourBio')}</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Lokasi</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Tech Stack Chooser */}
              <div className="pt-2 border-t border-slate-800">
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  {t('selectTechStack')} ({selectedTechs.length} dipilih)
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-1 bg-slate-950/70 border border-slate-800/80 rounded-lg">
                  {TECH_STACKS.map((tech) => {
                    const isSelected = selectedTechs.includes(tech.name);
                    return (
                      <button
                        key={tech.name}
                        onClick={() => toggleTech(tech.name)}
                        className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                            : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {tech.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* GitHub Stats Toggles */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Kartu Statistik GitHub
                </label>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showStatsCard}
                      onChange={(e) => setShowStatsCard(e.target.checked)}
                      className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                    />
                    <span>{t('includeStatsCards')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showTopLangs}
                      onChange={(e) => setShowTopLangs(e.target.checked)}
                      className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                    />
                    <span>{t('includeTopLangs')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showStreakCard}
                      onChange={(e) => setShowStreakCard(e.target.checked)}
                      className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                    />
                    <span>{t('includeStreak')}</span>
                  </label>
                </div>

                <div className="pt-1">
                  <label className="text-[11px] text-slate-400 block mb-1">Tema Kartu Statistik</label>
                  <select
                    value={statsTheme}
                    onChange={(e) => setStatsTheme(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="tokyonight">Tokyo Night</option>
                    <option value="radical">Radical</option>
                    <option value="dracula">Dracula</option>
                    <option value="github_dark">GitHub Dark</option>
                    <option value="nord">Nord</option>
                    <option value="merko">Merko</option>
                  </select>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  {t('socialLinks')}
                </label>
                <input
                  type="text"
                  placeholder="Username LinkedIn (opsional)"
                  value={linkedinUser}
                  onChange={(e) => setLinkedinUser(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Username Twitter / X (opsional)"
                  value={twitterUser}
                  onChange={(e) => setTwitterUser(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Kontak (opsional)"
                  value={emailContact}
                  onChange={(e) => setEmailContact(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            /* Repo Form */
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider font-mono">
                Informasi Proyek Repositori
              </h3>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Nama Repositori / Proyek</label>
                <input
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Tagline Singkat</label>
                <textarea
                  rows={2}
                  value={repoTagline}
                  onChange={(e) => setRepoTagline(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">URL Live Demo</label>
                  <input
                    type="text"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Lisensi</label>
                  <select
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                  >
                    <option value="MIT">MIT</option>
                    <option value="Apache-2.0">Apache 2.0</option>
                    <option value="GPL-3.0">GPL 3.0</option>
                    <option value="BSD-3-Clause">BSD 3-Clause</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Package Manager untuk Script</label>
                <select
                  value={packageManager}
                  onChange={(e) => setPackageManager(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                >
                  <option value="npm">npm</option>
                  <option value="pnpm">pnpm</option>
                  <option value="yarn">yarn</option>
                  <option value="bun">bun</option>
                </select>
              </div>

              {/* Dynamic Features List */}
              <div className="pt-2 border-t border-slate-800">
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Daftar Fitur Utama
                </label>
                <div className="space-y-1.5 mb-2.5 max-h-40 overflow-y-auto">
                  {features.map((feat, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-200"
                    >
                      <span className="truncate">{feat}</span>
                      <button
                        onClick={() => removeFeature(index)}
                        className="text-slate-500 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addFeature()}
                    placeholder="Tambah fitur baru..."
                    className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                  />
                  <button
                    onClick={addFeature}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg text-xs font-medium transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Tech Stack for Repo */}
              <div className="pt-2 border-t border-slate-800">
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Teknologi Utama Proyek
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 bg-slate-950/70 border border-slate-800/80 rounded-lg">
                  {TECH_STACKS.map((tech) => {
                    const isSelected = selectedTechs.includes(tech.name);
                    return (
                      <button
                        key={tech.name}
                        onClick={() => toggleTech(tech.name)}
                        className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                            : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {tech.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Output & Controls (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
          {/* Output Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/80">
            <div className="flex items-center gap-1 p-0.5 bg-slate-900 border border-slate-800 rounded-md">
              <button
                onClick={() => setPreviewTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                  previewTab === 'preview'
                    ? 'bg-slate-800 text-cyan-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t('previewMode')}</span>
              </button>
              <button
                onClick={() => setPreviewTab('raw')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                  previewTab === 'raw'
                    ? 'bg-slate-800 text-cyan-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>{t('rawMarkdownMode')}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t('copiedToast') : t('btnCopyMarkdown')}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('btnDownloadMarkdown')}</span>
              </button>
            </div>
          </div>

          {/* Output Content Area */}
          <div className="p-6 overflow-y-auto max-h-[760px] bg-slate-950/40 min-h-[500px]">
            {previewTab === 'preview' ? (
              <MarkdownRenderer content={generatedMarkdown} />
            ) : (
              <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap select-all leading-relaxed">
                {generatedMarkdown}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
