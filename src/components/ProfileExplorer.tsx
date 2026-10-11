import React, { useState, useEffect, useMemo } from 'react';
import { GitHubUser, GitHubRepo, LanguageStat } from '../types';
import { SAMPLE_PROFILES } from '../data/sampleProfiles';
import { LANGUAGE_COLORS } from '../data/techStacksData';
import { useLanguage } from '../context/LanguageContext';
import {
  Search,
  Star,
  GitFork,
  ExternalLink,
  BookOpen,
  MapPin,
  Building,
  Link as LinkIcon,
  Twitter,
  Calendar,
  Share2,
  Copy,
  Check,
  LayoutGrid,
  BarChart3,
  Code2,
  Download,
  AlertCircle
} from 'lucide-react';

interface ProfileExplorerProps {
  token: string;
}

export const ProfileExplorer: React.FC<ProfileExplorerProps> = ({ token }) => {
  const { t } = useLanguage();
  const [username, setUsername] = useState('shadcn');
  const [queryInput, setQueryInput] = useState('shadcn');
  const [user, setUser] = useState<GitHubUser>(SAMPLE_PROFILES.shadcn.user);
  const [repos, setRepos] = useState<GitHubRepo[]>(SAMPLE_PROFILES.shadcn.repos);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'analytics' | 'portfolio'>('analytics');
  const [repoSearch, setRepoSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [copiedLink, setCopiedLink] = useState(false);

  // Fetch GitHub User and Repos
  const fetchGitHubData = async (userToFetch: string) => {
    const trimmed = userToFetch.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setErrorMessage(null);

    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      // 1. Fetch User Profile
      const userRes = await fetch(`https://api.github.com/users/${trimmed}`, { headers });

      if (userRes.status === 404) {
        throw new Error(`Pengguna GitHub "${trimmed}" tidak ditemukan.`);
      }

      if (userRes.status === 403) {
        // Rate limit reached
        if (SAMPLE_PROFILES[trimmed.toLowerCase()]) {
          setUser(SAMPLE_PROFILES[trimmed.toLowerCase()].user);
          setRepos(SAMPLE_PROFILES[trimmed.toLowerCase()].repos);
          setUsername(trimmed);
          setErrorMessage('Batas API publik tercapai. Menggunakan data cache tersimpan.');
          return;
        }
        throw new Error('Batas API GitHub publik tercapai (60 req/jam). Silakan masukkan Token GitHub di tombol atas.');
      }

      if (!userRes.ok) {
        throw new Error(`Gagal mengambil data GitHub (${userRes.statusText})`);
      }

      const userData: GitHubUser = await userRes.json();

      // 2. Fetch Repositories
      const reposRes = await fetch(
        `https://api.github.com/users/${trimmed}/repos?per_page=100&sort=updated`,
        { headers }
      );
      let reposData: GitHubRepo[] = [];
      if (reposRes.ok) {
        reposData = await reposRes.json();
      }

      setUser(userData);
      setRepos(reposData);
      setUsername(trimmed);
    } catch (err: any) {
      // Fallback if network or error
      if (SAMPLE_PROFILES[trimmed.toLowerCase()]) {
        setUser(SAMPLE_PROFILES[trimmed.toLowerCase()].user);
        setRepos(SAMPLE_PROFILES[trimmed.toLowerCase()].repos);
        setUsername(trimmed);
        setErrorMessage(`Koneksi terbatas: memuat profil cache ${trimmed}.`);
      } else {
        setErrorMessage(err.message || 'Terjadi kesalahan saat mengambil data.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGitHubData(queryInput);
  };

  const handlePresetSelect = (preset: string) => {
    setQueryInput(preset);
    fetchGitHubData(preset);
  };

  // Calculate Language Distribution
  const languageStats: LanguageStat[] = useMemo(() => {
    const counts: Record<string, number> = {};
    let totalWithLang = 0;

    repos.forEach((repo) => {
      if (repo.language) {
        counts[repo.language] = (counts[repo.language] || 0) + 1;
        totalWithLang++;
      }
    });

    if (totalWithLang === 0) return [];

    const stats = Object.entries(counts).map(([lang, count]) => ({
      language: lang,
      count,
      percentage: Math.round((count / totalWithLang) * 100),
      color: LANGUAGE_COLORS[lang] || '#94A3B8',
    }));

    return stats.sort((a, b) => b.count - a.count).slice(0, 6);
  }, [repos]);

  // Aggregate stats
  const totalStars = useMemo(() => {
    return repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
  }, [repos]);

  const totalForks = useMemo(() => {
    return repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0);
  }, [repos]);

  // Filtered Repos
  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(repoSearch.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(repoSearch.toLowerCase()));
      const matchesLang =
        selectedLanguage === 'all' || repo.language === selectedLanguage;
      return matchesSearch && matchesLang;
    });
  }, [repos, repoSearch, selectedLanguage]);

  // Available unique languages for filter
  const uniqueLanguages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return Array.from(set);
  }, [repos]);

  const handleCopyPortfolio = () => {
    const portfolioUrl = `${window.location.origin}?user=${user.login}&mode=portfolio`;
    navigator.clipboard.writeText(portfolioUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleExportHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${user.name || user.login} - Developer Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-6 md:p-12 font-sans">
  <div class="max-w-4xl mx-auto space-y-8">
    <header class="flex items-center gap-6 border-b border-slate-800 pb-8">
      <img src="${user.avatar_url}" alt="${user.name || user.login}" class="w-24 h-24 rounded-full border border-slate-700 shadow-md">
      <div>
        <h1 class="text-3xl font-bold">${user.name || user.login}</h1>
        <p class="text-slate-400 font-mono">@${user.login}</p>
        <p class="text-slate-300 mt-2">${user.bio || ''}</p>
      </div>
    </header>
    <section>
      <h2 class="text-xl font-semibold mb-4">Proyek Unggulan</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${filteredRepos.slice(0, 6).map(r => `
          <div class="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
            <h3 class="font-bold text-cyan-400"><a href="${r.html_url}" target="_blank">${r.name}</a></h3>
            <p class="text-sm text-slate-300 mt-1">${r.description || 'Tidak ada deskripsi.'}</p>
            <div class="flex items-center gap-4 mt-3 text-xs text-slate-400 font-mono">
              <span>⭐ ${r.stargazers_count}</span>
              <span>🍴 ${r.forks_count}</span>
              <span>${r.language || ''}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user.login}-portfolio.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar & Preset Quick-Links */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder={t('inputUsernamePlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-semibold text-sm rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>{t('btnAnalyzing')}</span>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>{t('btnAnalyze')}</span>
              </>
            )}
          </button>
        </form>

        {/* Quick try presets */}
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
          <span>{t('demoProfiles')}</span>
          {['shadcn', 'gaearon', 'torvalds', 'yyx990803', 'sindresorhus'].map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetSelect(preset)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer font-mono"
            >
              @{preset}
            </button>
          ))}
        </div>

        {errorMessage && (
          <div className="flex items-center gap-2 mt-3 p-3 rounded-lg bg-amber-950/40 border border-amber-800/60 text-amber-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Mode Switcher: Analytics vs Live Portfolio */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            onClick={() => setViewMode('analytics')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              viewMode === 'analytics'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{t('viewAnalytics')}</span>
          </button>
          <button
            onClick={() => setViewMode('portfolio')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              viewMode === 'portfolio'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{t('viewPortfolio')}</span>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyPortfolio}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? t('copiedToast') : t('copyPortfolioLink')}</span>
          </button>
          <button
            onClick={handleExportHTML}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('exportHtml')}</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: ANALYTICS & INSPECTOR */}
      {viewMode === 'analytics' ? (
        <div className="space-y-6">
          {/* User Bio Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <img
                src={user.avatar_url}
                alt={user.name || user.login}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-slate-700 shadow-md object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {user.name || user.login}
                  </h2>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:underline"
                  >
                    @{user.login}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                {user.bio && (
                  <p className="text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                    {user.bio}
                  </p>
                )}
                <div className="flex items-center gap-3 sm:gap-4 mt-2.5 text-xs text-slate-400 flex-wrap">
                  {user.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {user.location}
                    </span>
                  )}
                  {user.company && (
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      {user.company}
                    </span>
                  )}
                  {user.blog && (
                    <a
                      href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-cyan-400 hover:underline"
                    >
                      <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
                      Website
                    </a>
                  )}
                  {user.created_at && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      Bergabung {new Date(user.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' })}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors whitespace-nowrap flex items-center gap-2 self-start md:self-auto"
            >
              <span>{t('visitGithub')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* KPI Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block">{t('totalStars')}</span>
              <span className="text-xl sm:text-2xl font-bold text-amber-400 font-mono tabular-nums block mt-1">
                ★ {totalStars.toLocaleString()}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block">{t('totalForks')}</span>
              <span className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono tabular-nums block mt-1">
                {totalForks.toLocaleString()}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block">{t('publicRepos')}</span>
              <span className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums block mt-1">
                {user.public_repos.toLocaleString()}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block">{t('followers')}</span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono tabular-nums block mt-1">
                {user.followers.toLocaleString()}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 block">{t('following')}</span>
              <span className="text-xl sm:text-2xl font-bold text-slate-300 font-mono tabular-nums block mt-1">
                {user.following.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Languages Distribution */}
          {languageStats.length > 0 && (
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{t('topLanguages')}</span>
                <span className="text-slate-400 font-mono">{repos.length} repos dianalisis</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                {languageStats.map((stat) => (
                  <div
                    key={stat.language}
                    style={{ width: `${stat.percentage}%`, backgroundColor: stat.color }}
                    className="h-full transition-all"
                    title={`${stat.language}: ${stat.percentage}% (${stat.count} repo)`}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-300">
                {languageStats.map((stat) => (
                  <div key={stat.language} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: stat.color }}
                    />
                    <span className="font-medium">{stat.language}</span>
                    <span className="text-slate-500 font-mono tabular-nums">{stat.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Repository Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <h3 className="text-lg font-semibold text-white">
              {t('repositories')} ({filteredRepos.length})
            </h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={repoSearch}
                  onChange={(e) => setRepoSearch(e.target.value)}
                  placeholder={t('searchRepos')}
                  className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-cyan-400"
              >
                <option value="all">{t('filterLanguage')}</option>
                {uniqueLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Repositories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRepos.map((repo) => (
              <div
                key={repo.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-white hover:text-cyan-400 transition-colors text-sm flex items-center gap-1.5 group"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
                      <span>{repo.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    {repo.fork && (
                      <span className="text-[10px] text-slate-400 font-mono">fork</span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {repo.description || 'Tidak ada deskripsi repositori.'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-3">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#94A3B8' }}
                        />
                        <span className="text-slate-300">{repo.language}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1 tabular-nums text-amber-300/80">
                      <Star className="w-3 h-3" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 tabular-nums">
                      <GitFork className="w-3 h-3" />
                      {repo.forks_count}
                    </span>
                  </div>

                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 font-sans flex items-center gap-1 hover:underline text-[11px]"
                    >
                      <span>{t('liveDemo')}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: LIVE PORTFOLIO WEBSITE PREVIEW */
        <div className="rounded-2xl border border-slate-800 bg-[#070b12] p-6 sm:p-10 shadow-xl space-y-10">
          {/* Portfolio Hero */}
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 border-b border-slate-800 pb-8">
            <img
              src={user.avatar_url}
              alt={user.name || user.login}
              className="w-28 h-28 rounded-2xl border-2 border-cyan-500/40 shadow-lg object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-3 flex-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {user.name || user.login}
                </h1>
                <p className="text-sm font-mono text-cyan-400">@{user.login}</p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                {user.bio || 'Software Engineer bersemangat membangun aplikasi web berkinerja tinggi dan berkontribusi pada open source.'}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-400 pt-1">
                {user.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {user.location}
                  </span>
                )}
                {user.company && (
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-cyan-400" />
                    {user.company}
                  </span>
                )}
                {user.blog && (
                  <a
                    href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-cyan-400 hover:underline"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    {user.blog.replace(/^https?:\/\//, '')}
                  </a>
                )}
              </div>

              {/* Quick links & contact */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Ikuti di GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                {user.blog && (
                  <a
                    href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    Kunjungi Blog & Website
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Featured Works */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Karya & Repositori Terpilih</h2>
                <p className="text-xs text-slate-400 mt-0.5">Koleksi proyek open source dan pustaka kode utama</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRepos.slice(0, 6).map((repo) => (
                <div
                  key={repo.id}
                  className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors text-base">
                        {repo.name}
                      </h3>
                      <span className="text-xs font-mono text-amber-300 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                        {repo.stargazers_count}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                      {repo.description || 'Repositori proyek GitHub dengan kode sumber terbuka.'}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400">{repo.language || 'Code'}</span>
                    <div className="flex items-center gap-2">
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
                        >
                          Demo
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
                      >
                        Source
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
