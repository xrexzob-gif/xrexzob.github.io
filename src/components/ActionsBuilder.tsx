import React, { useState, useMemo } from 'react';
import { WORKFLOW_TEMPLATES, ActionWorkflowTemplate } from '../data/actionsTemplates';
import { useLanguage } from '../context/LanguageContext';
import {
  FileCode,
  Copy,
  Check,
  Download,
  Settings,
  Workflow,
  Sparkles
} from 'lucide-react';

export const ActionsBuilder: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('node-ci');
  const [branch, setBranch] = useState('main');
  const [runtimeVersion, setRuntimeVersion] = useState('20.x');
  const [packageManager, setPackageManager] = useState('npm');
  const [buildCommand, setBuildCommand] = useState('npm run build');
  const [copied, setCopied] = useState(false);

  const currentTemplate = useMemo(() => {
    return WORKFLOW_TEMPLATES.find((t) => t.id === selectedTemplateId) || WORKFLOW_TEMPLATES[0];
  }, [selectedTemplateId]);

  const generatedYaml = useMemo(() => {
    return currentTemplate.generateYaml({
      branch,
      runtimeVersion,
      packageManager,
      buildCommand,
    });
  }, [currentTemplate, branch, runtimeVersion, packageManager, buildCommand]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedYaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplateId}.yml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {t('actionsTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {t('actionsSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Config Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-5 bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              {t('chooseTemplate')}
            </label>
            <div className="space-y-2">
              {WORKFLOW_TEMPLATES.map((tmpl) => {
                const name = lang === 'id' ? tmpl.nameId : tmpl.nameEn;
                const desc = lang === 'id' ? tmpl.descId : tmpl.descEn;
                const isSelected = selectedTemplateId === tmpl.id;

                return (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedTemplateId(tmpl.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-500/50 text-white'
                        : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs sm:text-sm">{name}</span>
                      <span className="text-[10px] font-mono uppercase text-cyan-400">
                        {tmpl.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-2">
                      {desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Config Controls */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold text-cyan-300 font-mono uppercase tracking-wider">
              Parameter Workflow
            </h4>

            <div>
              <label className="text-xs text-slate-400 block mb-1">{t('triggerBranch')}</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            {selectedTemplateId === 'node-ci' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">
                      {t('runtimeVersion')}
                    </label>
                    <select
                      value={runtimeVersion}
                      onChange={(e) => setRuntimeVersion(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                    >
                      <option value="20.x">Node 20.x (LTS)</option>
                      <option value="18.x">Node 18.x</option>
                      <option value="22.x">Node 22.x (Current)</option>
                      <option value="18.x, 20.x, 22.x">Matrix (18, 20, 22)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">
                      {t('packageManager')}
                    </label>
                    <select
                      value={packageManager}
                      onChange={(e) => {
                        setPackageManager(e.target.value);
                        setBuildCommand(`${e.target.value} run build`);
                      }}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                    >
                      <option value="npm">npm</option>
                      <option value="pnpm">pnpm</option>
                      <option value="yarn">yarn</option>
                      <option value="bun">bun</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Perintah Build</label>
                  <input
                    type="text"
                    value={buildCommand}
                    onChange={(e) => setBuildCommand(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none font-mono"
                  />
                </div>
              </>
            )}

            {selectedTemplateId === 'github-pages' && (
              <div>
                <label className="text-xs text-slate-400 block mb-1">Package Manager</label>
                <select
                  value={packageManager}
                  onChange={(e) => setPackageManager(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                >
                  <option value="npm">npm</option>
                  <option value="pnpm">pnpm</option>
                  <option value="yarn">yarn</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Right Preview Panel (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/80">
            <span className="font-mono text-xs text-slate-400">
              .github/workflows/{selectedTemplateId}.yml
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t('copiedToast') : t('copyWorkflow')}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('downloadWorkflow')}</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-950/90 overflow-x-auto min-h-[460px]">
            <pre className="font-mono text-xs text-emerald-300 leading-relaxed whitespace-pre select-all">
              {generatedYaml}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
