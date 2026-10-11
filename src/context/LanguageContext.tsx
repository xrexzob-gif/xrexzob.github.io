import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navigation
    brand: 'GitForge',
    navProfile: 'Portofolio & Analitik',
    navReadme: 'Studio README',
    navGit: 'Kamus Git',
    navActions: 'GitHub Actions',
    navGitignore: '.gitignore',
    navOpenSource: 'Open Source',
    quickSearchBtn: 'Eksplorasi Profil',

    // Hero / Intro
    heroBadge: 'Platform Produktivitas Pengembang GitHub',
    heroTitle: 'Solusi Lengkap Portofolio & Otomasi GitHub Anda',
    heroSubtitle: 'Analisis profil GitHub secara instan, ubah menjadi portofolio interaktif, rancang README menakjubkan, buat alur kerja CI/CD, dan kuasai perintah Git dalam satu tempat.',

    // Profile Explorer
    inputUsernamePlaceholder: 'Ketik username GitHub (contoh: shadcn, gaearon, torvalds)...',
    btnAnalyze: 'Analisis Profil',
    btnAnalyzing: 'Menganalisis...',
    demoProfiles: 'Coba cepat:',
    viewAnalytics: 'Mode Analitik & Detail',
    viewPortfolio: 'Mode Web Portofolio',
    copyPortfolioLink: 'Salin Link Portofolio',
    exportHtml: 'Ekspor Portofolio HTML',
    totalStars: 'Total Bintang',
    totalForks: 'Total Fork',
    publicRepos: 'Repositori Publik',
    followers: 'Pengikut',
    following: 'Mengikuti',
    topLanguages: 'Distribusi Bahasa Pemrograman',
    repositories: 'Daftar Repositori',
    searchRepos: 'Cari repositori...',
    filterLanguage: 'Semua Bahasa',
    stars: 'Bintang',
    forks: 'Fork',
    updated: 'Diperbarui',
    visitGithub: 'Buka di GitHub',
    liveDemo: 'Demo Langsung',
    portfolioTheme: 'Tema Tampilan:',
    rateLimitWarning: 'Mencapai batas API GitHub publik (60 req/jam)? Masukkan GitHub Token opsional untuk akses tanpa batas.',
    tokenButton: 'Atur Token GitHub',

    // README Studio
    readmeTitle: 'Studio Pembuat README Interaktif',
    readmeSubtitle: 'Buat README profil pengembang atau dokumentasi repositori yang memukau dengan badge, statistik otomatis, dan tech stack.',
    tabProfileReadme: 'README Profil Akun',
    tabRepoReadme: 'README Repositori Proyek',
    btnCopyMarkdown: 'Salin Markdown',
    btnDownloadMarkdown: 'Unduh .md',
    copiedToast: 'Berhasil disalin ke clipboard!',
    previewMode: 'Pratinjau Langsung',
    rawMarkdownMode: 'Kode Markdown Mentah',
    yourName: 'Nama Lengkap',
    yourRole: 'Spesialisasi / Peran (cth: Fullstack Developer)',
    yourBio: 'Deskripsi Singkat',
    selectTechStack: 'Pilih Tech Stack & Tools:',
    includeStatsCards: 'Sertakan Kartu Statistik GitHub',
    includeStreak: 'Kartu Streak Komit',
    includeTopLangs: 'Kartu Bahasa Terbanyak',
    socialLinks: 'Tautan Sosial & Kontak',

    // Git Playbook
    gitTitle: 'Generator & Kamus Perintah Git',
    gitSubtitle: 'Solusi langsung untuk skenario umum: batalkan komit, atasi konflik merge, rebase, squash, dan kelola branch dengan aman.',
    categoryAll: 'Semua Kategori',
    categoryUndo: 'Batalkan & Perbaiki',
    categoryBranch: 'Branch & Rebase',
    categoryRemote: 'Sinkronisasi Remote',
    categoryStash: 'Stash & Simpan',
    categoryAdvanced: 'Tingkat Lanjut',
    copyCommand: 'Salin Perintah',
    commandCopied: 'Perintah disalin!',
    safetyNotice: 'Perhatian & Penjelasan',

    // Actions Builder
    actionsTitle: 'Pembuat Workflow GitHub Actions (CI/CD)',
    actionsSubtitle: 'Otomatisasi pengujian, build, dan deploy proyek Anda ke GitHub Pages, Vercel, atau Docker.',
    chooseTemplate: 'Pilih Jenis Template Workflow:',
    runtimeVersion: 'Versi Runtime',
    packageManager: 'Package Manager',
    triggerBranch: 'Trigger Branch',
    copyWorkflow: 'Salin YAML',
    downloadWorkflow: 'Unduh Workflow (.yml)',

    // Gitignore Generator
    gitignoreTitle: 'Generator File .gitignore Universal',
    gitignoreSubtitle: 'Pilih teknologi yang Anda gunakan untuk menghasilkan .gitignore bersih yang mencegah file sampah masuk ke repositori.',
    selectStacks: 'Pilih Tumpukan Teknologi & Environment:',
    copyGitignore: 'Salin .gitignore',
    downloadGitignore: 'Unduh .gitignore',

    // Open Source Finder
    openSourceTitle: 'Eksplorasi Proyek Open Source & Good First Issues',
    openSourceSubtitle: 'Temukan proyek open source populer dan tiket ramah pemula untuk memulai kontribusi GitHub pertama Anda.',
    filterAll: 'Semua',
    difficultyBeginner: 'Ramah Pemula',
    viewIssues: 'Lihat Isu Terbuka',

    // Footer
    footerNote: 'Dibuat untuk memberdayakan pengembang dalam mengelola repositori, portofolio, dan alur kerja GitHub dengan efisien.',
  },
  en: {
    // Navigation
    brand: 'GitForge',
    navProfile: 'Portfolio & Analytics',
    navReadme: 'README Studio',
    navGit: 'Git Playbook',
    navActions: 'GitHub Actions',
    navGitignore: '.gitignore',
    navOpenSource: 'Open Source',
    quickSearchBtn: 'Explore Profile',

    // Hero / Intro
    heroBadge: 'GitHub Developer Productivity Platform',
    heroTitle: 'Your Complete GitHub Portfolio & Automation Suite',
    heroSubtitle: 'Instantly analyze GitHub profiles, transform them into interactive live portfolios, design eye-catching READMEs, generate CI/CD workflows, and master Git commands.',

    // Profile Explorer
    inputUsernamePlaceholder: 'Enter GitHub username (e.g. shadcn, gaearon, torvalds)...',
    btnAnalyze: 'Analyze Profile',
    btnAnalyzing: 'Analyzing...',
    demoProfiles: 'Quick try:',
    viewAnalytics: 'Analytics View',
    viewPortfolio: 'Live Portfolio View',
    copyPortfolioLink: 'Copy Portfolio Link',
    exportHtml: 'Export HTML Portfolio',
    totalStars: 'Total Stars',
    totalForks: 'Total Forks',
    publicRepos: 'Public Repos',
    followers: 'Followers',
    following: 'Following',
    topLanguages: 'Languages Distribution',
    repositories: 'Repositories',
    searchRepos: 'Search repositories...',
    filterLanguage: 'All Languages',
    stars: 'Stars',
    forks: 'Forks',
    updated: 'Updated',
    visitGithub: 'Open on GitHub',
    liveDemo: 'Live Demo',
    portfolioTheme: 'Portfolio Theme:',
    rateLimitWarning: 'Hit GitHub API rate limits (60 req/hr)? Add an optional personal token for unlimited queries.',
    tokenButton: 'Set GitHub Token',

    // README Studio
    readmeTitle: 'Interactive README Studio',
    readmeSubtitle: 'Generate developer profile READMEs or project documentation with official badges, dynamic stats, and curated tech stacks.',
    tabProfileReadme: 'Profile README',
    tabRepoReadme: 'Repository README',
    btnCopyMarkdown: 'Copy Markdown',
    btnDownloadMarkdown: 'Download .md',
    copiedToast: 'Copied to clipboard!',
    previewMode: 'Live Preview',
    rawMarkdownMode: 'Raw Markdown',
    yourName: 'Full Name',
    yourRole: 'Role / Specialization (e.g. Fullstack Developer)',
    yourBio: 'Short Bio',
    selectTechStack: 'Select Tech Stack & Tools:',
    includeStatsCards: 'Include GitHub Stats Cards',
    includeStreak: 'Commit Streak Card',
    includeTopLangs: 'Top Languages Card',
    socialLinks: 'Social & Contact Links',

    // Git Playbook
    gitTitle: 'Git Interactive Command Generator',
    gitSubtitle: 'Instant commands for real-world scenarios: undo commits, resolve merge conflicts, squash, rebase, and branch safely.',
    categoryAll: 'All Categories',
    categoryUndo: 'Undo & Fix',
    categoryBranch: 'Branch & Rebase',
    categoryRemote: 'Remote Sync',
    categoryStash: 'Stash & Clean',
    categoryAdvanced: 'Advanced',
    copyCommand: 'Copy Command',
    commandCopied: 'Command copied!',
    safetyNotice: 'Safety Note & Explanation',

    // Actions Builder
    actionsTitle: 'GitHub Actions Workflow Generator',
    actionsSubtitle: 'Automate testing, build, and deployments to GitHub Pages, Vercel, or Docker containers.',
    chooseTemplate: 'Choose Workflow Template:',
    runtimeVersion: 'Runtime Version',
    packageManager: 'Package Manager',
    triggerBranch: 'Trigger Branch',
    copyWorkflow: 'Copy YAML',
    downloadWorkflow: 'Download (.yml)',

    // Gitignore Generator
    gitignoreTitle: 'Universal .gitignore Generator',
    gitignoreSubtitle: 'Select your technology stack to generate a clean, battle-tested .gitignore preventing unwanted files from entering Git.',
    selectStacks: 'Select Stacks & Environments:',
    copyGitignore: 'Copy .gitignore',
    downloadGitignore: 'Download .gitignore',

    // Open Source Finder
    openSourceTitle: 'Explore Open Source & Good First Issues',
    openSourceSubtitle: 'Discover curated popular open-source repositories and beginner-friendly issues to kickstart your contributions.',
    filterAll: 'All',
    difficultyBeginner: 'Beginner Friendly',
    viewIssues: 'View Issues',

    // Footer
    footerNote: 'Built to empower developers to analyze, showcase, automate, and streamline their GitHub workflows.',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'id',
  setLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('gitforge_lang');
    return saved === 'en' ? 'en' : 'id';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('gitforge_lang', newLang);
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations.id[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
