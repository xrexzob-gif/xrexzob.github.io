import React, { useState, useMemo } from 'react';
import { OPEN_SOURCE_PROJECTS, OpenSourceProject } from '../data/openSourceData';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  Star,
  GitFork,
  ExternalLink,
  Search,
  BookOpen,
  Filter,
  CheckCircle2
} from 'lucide-react';

export const OpenSourceFinder: React.FC = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const languages = ['all', 'TypeScript', 'Python', 'Rust'];

  const filteredProjects = useMemo(() => {
    return OPEN_SOURCE_PROJECTS.filter((proj) => {
      const matchSearch =
        proj.name.toLowerCase().includes(search.toLowerCase()) ||
        proj.description.toLowerCase().includes(search.toLowerCase()) ||
        proj.repo.toLowerCase().includes(search.toLowerCase());
      const matchLang = selectedLanguage === 'all' || proj.language === selectedLanguage;
      return matchSearch && matchLang;
    });
  }, [search, selectedLanguage]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {t('openSourceTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {t('openSourceSubtitle')}
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari proyek open source (misal: react, typescript, python)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-2 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                selectedLanguage === lang
                  ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {lang === 'all' ? t('filterAll') : lang}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.repo}
            className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-white text-base hover:text-cyan-400 transition-colors">
                    <a
                      href={`https://github.com/${project.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.name}
                    </a>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500">
                    {project.repo}
                  </span>
                </div>
                <span className="text-xs font-mono text-cyan-400 shrink-0">
                  {project.language}
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-2.5 line-clamp-3 leading-relaxed">
                {project.description}
              </p>

              {/* Topics */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.topics.map((topic) => (
                  <span
                    key={topic}
                    className="text-[10px] text-slate-400 font-mono"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  {project.stars.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  {project.forks.toLocaleString()}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={project.goodFirstIssuesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-2.5 rounded-lg bg-emerald-950/40 border border-emerald-700/50 hover:bg-emerald-900/40 text-emerald-300 font-medium text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Good First Issues</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={`https://github.com/${project.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
