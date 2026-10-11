import React, { useState, useEffect } from 'react';
import { OWNER_CONTACT } from '../data/storeData';
import { GitHubUser, GitHubRepo } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  Github,
  BookOpen,
  Star,
  GitFork,
  ExternalLink,
  Code2,
  Terminal,
  Check,
  Copy,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export const GitHubSection: React.FC = () => {
  const { isDark } = useTheme();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedClone, setCopiedClone] = useState<string | null>(null);

  const fallbackRepos: GitHubRepo[] = [
    {
      id: 101,
      name: 'xrexzob.github.io',
      full_name: 'xrexzob/xrexzob.github.io',
      html_url: `https://github.com/${OWNER_CONTACT.githubUser}/xrexzob.github.io`,
      description: 'Official website repository of xrexzob - Game Maps, Suntik Sosmed & Developer Hub.',
      stargazers_count: 14,
      forks_count: 3,
      language: 'TypeScript',
      updated_at: '2026-10-11T12:00:00Z',
    },
    {
      id: 102,
      name: 'fivem-custom-mlo-maps',
      full_name: 'xrexzob/fivem-custom-mlo-maps',
      html_url: `https://github.com/${OWNER_CONTACT.githubUser}/fivem-custom-mlo-maps`,
      description: 'Free sample map resources, ymap templates, and doorlock scripts for GTA V & FiveM servers.',
      stargazers_count: 28,
      forks_count: 7,
      language: 'Lua',
      updated_at: '2026-10-09T08:00:00Z',
    },
    {
      id: 103,
      name: 'sosmed-smm-order-bot',
      full_name: 'xrexzob/sosmed-smm-order-bot',
      html_url: `https://github.com/${OWNER_CONTACT.githubUser}/sosmed-smm-order-bot`,
      description: 'Automated Telegram & WhatsApp order notifier bot for digital store services.',
      stargazers_count: 19,
      forks_count: 5,
      language: 'JavaScript',
      updated_at: '2026-10-05T14:30:00Z',
    }
  ];

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.github.com/users/${OWNER_CONTACT.githubUser}`);
      if (res.ok) {
        const data = await res.json();
        setUser(data);

        const repoRes = await fetch(
          `https://api.github.com/users/${OWNER_CONTACT.githubUser}/repos?sort=updated&per_page=10`
        );
        if (repoRes.ok) {
          const repoData = await repoRes.json();
          if (repoData && repoData.length > 0) {
            setRepos(repoData);
          } else {
            setRepos(fallbackRepos);
          }
        } else {
          setRepos(fallbackRepos);
        }
      } else {
        // Fallback default
        setUser({
          login: OWNER_CONTACT.githubUser,
          id: 999999,
          avatar_url: `https://avatars.githubusercontent.com/${OWNER_CONTACT.githubUser}`,
          html_url: `https://github.com/${OWNER_CONTACT.githubUser}`,
          name: 'xrexzob Developer',
          company: 'xrexzob Store',
          blog: 'https://xrexzob.github.io',
          location: 'Indonesia',
          email: OWNER_CONTACT.email,
          bio: 'Custom 3D Game Maps Developer, SMM Automation & Full-stack Web Tools.',
          public_repos: 6,
          followers: 42,
          following: 12,
          created_at: '2023-01-01T00:00:00Z',
        });
        setRepos(fallbackRepos);
      }
    } catch {
      setUser({
        login: OWNER_CONTACT.githubUser,
        id: 999999,
        avatar_url: `https://avatars.githubusercontent.com/${OWNER_CONTACT.githubUser}`,
        html_url: `https://github.com/${OWNER_CONTACT.githubUser}`,
        name: 'xrexzob Developer',
        company: 'xrexzob Store',
        blog: 'https://xrexzob.github.io',
        location: 'Indonesia',
        email: OWNER_CONTACT.email,
        bio: 'Custom 3D Game Maps Developer, SMM Automation & Full-stack Web Tools.',
        public_repos: 6,
        followers: 42,
        following: 12,
        created_at: '2023-01-01T00:00:00Z',
      });
      setRepos(fallbackRepos);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleCopyClone = (repoUrl: string, repoName: string) => {
    navigator.clipboard.writeText(`git clone ${repoUrl}.git`);
    setCopiedClone(repoName);
    setTimeout(() => setCopiedClone(null), 2000);
  };

  return (
    <section className="space-y-6">
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div>
          <h2 className={`text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <Github className="w-6 h-6 text-cyan-500" />
            <span>GitHub Profile & Repositori @{OWNER_CONTACT.githubUser}</span>
          </h2>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Terhubung langsung dengan profil GitHub pengembang untuk proyek open-source, script gratis, dan template map.
          </p>
        </div>

        <a
          href={OWNER_CONTACT.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
            isDark
              ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
              : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-xs'
          }`}
        >
          <span>Buka di GitHub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Developer Profile Header */}
      {user && (
        <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl ${
          isDark
            ? 'bg-[#090e18] border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800 shadow-slate-200/50'
        }`}>
          <div className="flex items-center gap-4 sm:gap-5">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 overflow-hidden shadow-md flex items-center justify-center font-bold text-2xl ${
              isDark
                ? 'bg-slate-800 border-cyan-500/40 text-cyan-400'
                : 'bg-slate-100 border-cyan-500/50 text-cyan-600'
            }`}>
              <Github className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {user.name || user.login}
                </h3>
                <span className="text-xs font-mono text-cyan-500">
                  @{user.login}
                </span>
              </div>
              <p className={`text-xs sm:text-sm max-w-xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {user.bio || 'Game Map Developer & Social Media Automation Engineer.'}
              </p>
              <div className={`flex items-center gap-4 text-xs pt-1 font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <span>{user.public_repos} Repositori</span>
                <span>•</span>
                <span>{user.followers} Pengikut</span>
                <span>•</span>
                <span>Indonesia</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto">
            <a
              href={`https://github.com/${user.login}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-cyan-500/20"
            >
              <Code2 className="w-4 h-4" />
              <span>Lihat Semua Repositori</span>
            </a>
          </div>
        </div>
      )}

      {/* Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className={`p-5 rounded-3xl border transition-all flex flex-col justify-between group ${
              isDark
                ? 'bg-[#090e18] border-slate-800 hover:border-cyan-500/50'
                : 'bg-white border-slate-200 hover:border-cyan-500 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <h4 className={`font-bold group-hover:text-cyan-500 transition-colors text-sm sm:text-base truncate ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h4>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                  isDark ? 'text-cyan-400 bg-cyan-950/60 border-cyan-800/80' : 'text-cyan-800 bg-cyan-50 border-cyan-200'
                }`}>
                  {repo.language || 'Code'}
                </span>
              </div>

              <p className={`text-xs mt-2 line-clamp-3 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {repo.description || 'Proyek kode dan sumber daya resmi oleh xrexzob.'}
              </p>
            </div>

            <div className={`mt-5 pt-3 border-t space-y-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <div className={`flex items-center justify-between text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  {repo.forks_count}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyClone(repo.html_url, repo.name)}
                  className={`flex-1 py-1.5 px-3 rounded-lg border font-mono text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {copiedClone === repo.name ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>git clone</span>
                    </>
                  )}
                </button>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-1.5 rounded-lg border ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-cyan-400'
                      : 'bg-slate-100 border-slate-200 hover:border-slate-300 text-cyan-600'
                  }`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
