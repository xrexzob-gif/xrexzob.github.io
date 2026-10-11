import React, { useState, useMemo } from 'react';
import { GIT_RECIPES } from '../data/gitCommandsData';
import { GitRecipe } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  Terminal,
  Search,
  Copy,
  Check,
  AlertTriangle,
  Info,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export const GitPlaybook: React.FC = () => {
  const { lang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Store interactive param values per recipe id and key
  const [paramValues, setParamValues] = useState<Record<string, Record<string, string>>>(() => {
    const initial: Record<string, Record<string, string>> = {};
    GIT_RECIPES.forEach((recipe) => {
      if (recipe.interactiveParams) {
        initial[recipe.id] = {};
        recipe.interactiveParams.forEach((param) => {
          initial[recipe.id][param.key] = param.defaultValue;
        });
      }
    });
    return initial;
  });

  const handleParamChange = (recipeId: string, paramKey: string, value: string) => {
    setParamValues((prev) => ({
      ...prev,
      [recipeId]: {
        ...(prev[recipeId] || {}),
        [paramKey]: value,
      },
    }));
  };

  const computeCommand = (recipe: GitRecipe) => {
    let cmd = recipe.commandTemplate;
    const currentParams = paramValues[recipe.id] || {};

    if (recipe.interactiveParams) {
      recipe.interactiveParams.forEach((param) => {
        const val = currentParams[param.key] ?? param.defaultValue;
        cmd = cmd.replace(new RegExp(`\\{${param.key}\\}`, 'g'), val);
      });
    }

    return cmd;
  };

  const handleCopy = (recipe: GitRecipe) => {
    const cmd = computeCommand(recipe);
    navigator.clipboard.writeText(cmd);
    setCopiedId(recipe.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    return GIT_RECIPES.filter((r) => {
      const title = lang === 'id' ? r.titleId : r.titleEn;
      const desc = lang === 'id' ? r.descId : r.descEn;
      const matchesSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.commandTemplate.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = activeCategory === 'all' || r.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, activeCategory, lang]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {t('gitTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {t('gitSubtitle')}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari solusi Git (contoh: batalkan komit, squash, stash, reset, conflict)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                activeCategory === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('categoryAll')}
            </button>
            <button
              onClick={() => setActiveCategory('undo')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                activeCategory === 'undo'
                  ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('categoryUndo')}
            </button>
            <button
              onClick={() => setActiveCategory('branching')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                activeCategory === 'branching'
                  ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('categoryBranch')}
            </button>
            <button
              onClick={() => setActiveCategory('remote')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                activeCategory === 'remote'
                  ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('categoryRemote')}
            </button>
            <button
              onClick={() => setActiveCategory('stash')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                activeCategory === 'stash'
                  ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('categoryStash')}
            </button>
            <button
              onClick={() => setActiveCategory('advanced')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                activeCategory === 'advanced'
                  ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('categoryAdvanced')}
            </button>
          </div>
        </div>
      </div>

      {/* Recipes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecipes.map((recipe) => {
          const title = lang === 'id' ? recipe.titleId : recipe.titleEn;
          const desc = lang === 'id' ? recipe.descId : recipe.descEn;
          const warning = lang === 'id' ? recipe.warningId : recipe.warningEn;
          const command = computeCommand(recipe);
          const isCopied = copiedId === recipe.id;

          return (
            <div
              key={recipe.id}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-white text-sm sm:text-base leading-snug">
                    {title}
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 shrink-0">
                    {recipe.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {desc}
                </p>

                {/* Interactive Parameter Controls */}
                {recipe.interactiveParams && recipe.interactiveParams.length > 0 && (
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2 mt-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 font-mono">
                      <SlidersHorizontal className="w-3 h-3 text-cyan-400" />
                      <span>Sesuaikan Parameter:</span>
                    </div>

                    {recipe.interactiveParams.map((param) => {
                      const paramLabel = lang === 'id' ? param.labelId : param.labelEn;
                      const currentValue =
                        paramValues[recipe.id]?.[param.key] ?? param.defaultValue;

                      return (
                        <div key={param.key} className="space-y-1">
                          <label className="text-[11px] text-slate-400 block">
                            {paramLabel}
                          </label>
                          {param.options ? (
                            <select
                              value={currentValue}
                              onChange={(e) =>
                                handleParamChange(recipe.id, param.key, e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-cyan-300 font-mono focus:outline-none"
                            >
                              {param.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              value={currentValue}
                              onChange={(e) =>
                                handleParamChange(recipe.id, param.key, e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-cyan-300 font-mono focus:outline-none"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Terminal Command Bar */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 space-y-2">
                <div className="relative group rounded-lg bg-slate-950 border border-slate-800 p-3 font-mono text-xs text-emerald-400 flex items-center justify-between gap-3">
                  <div className="overflow-x-auto whitespace-pre pr-2 selection:bg-emerald-800 selection:text-white">
                    <span className="text-slate-600 select-none mr-2">$</span>
                    {command}
                  </div>
                  <button
                    onClick={() => handleCopy(recipe)}
                    title={t('copyCommand')}
                    className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors shrink-0 cursor-pointer"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {warning && (
                  <div className="flex items-start gap-1.5 text-[11px] text-amber-300/90 leading-tight">
                    <Info className="w-3 h-3 shrink-0 mt-0.5 text-amber-400" />
                    <span>{warning}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
