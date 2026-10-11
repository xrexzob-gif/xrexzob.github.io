import React, { useState, useMemo } from 'react';
import { SMM_SERVICES, OWNER_CONTACT, TRUST_POINTS } from '../data/storeData';
import { SMMService } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  Zap,
  Instagram,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
  MessageCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Sliders
} from 'lucide-react';

interface SMMBoosterProps {
  onOpenOrder: (title: string, price: string, detail: string, targetAccount?: string, quantity?: number) => void;
}

export const SMMBooster: React.FC<SMMBoosterProps> = ({ onOpenOrder }) => {
  const { isDark } = useTheme();
  const [selectedPlatform, setSelectedPlatform] = useState<'instagram' | 'tiktok' | 'youtube' | 'telegram' | 'twitter'>('instagram');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('ig-followers-indo');
  const [quantity, setQuantity] = useState<number>(1000);
  const [targetAccount, setTargetAccount] = useState<string>('');

  const platforms = [
    { id: 'instagram', label: 'Instagram', icon: '📸' },
    { id: 'tiktok', label: 'TikTok', icon: '🎵' },
    { id: 'youtube', label: 'YouTube', icon: '▶️' },
    { id: 'telegram', label: 'Telegram', icon: '✈️' },
    { id: 'twitter', label: 'Twitter / X', icon: '🐦' },
  ];

  // Services available for the active platform
  const activeServices = useMemo(() => {
    return SMM_SERVICES.filter((s) => s.platform === selectedPlatform);
  }, [selectedPlatform]);

  // Current selected service
  const currentService = useMemo(() => {
    return (
      activeServices.find((s) => s.id === selectedServiceId) ||
      activeServices[0] ||
      SMM_SERVICES[0]
    );
  }, [activeServices, selectedServiceId]);

  // Auto-switch selected service when platform changes
  const handlePlatformChange = (pId: any) => {
    setSelectedPlatform(pId);
    const firstForPlatform = SMM_SERVICES.find((s) => s.platform === pId);
    if (firstForPlatform) {
      setSelectedServiceId(firstForPlatform.id);
      setQuantity(firstForPlatform.minOrder > 1000 ? firstForPlatform.minOrder : 1000);
    }
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenOrder(
      `Suntik Sosmed: ${currentService.serviceName}`,
      'Tanya Harga Promo di WA',
      `Platform: ${currentService.platformLabel} • Target: ${targetAccount || 'Belum diisi'} • Jumlah: ${quantity.toLocaleString('id-ID')} ${currentService.unitLabel}`,
      targetAccount,
      quantity
    );
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className={`border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <h2 className={`text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          <Zap className="w-6 h-6 text-pink-500" />
          <span>Kalkulator & Pemesanan Suntik Sosmed xrexzob</span>
        </h2>
        <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Tingkatkan kredibilitas akun Instagram, TikTok, dan YouTube Anda secara aman, instan, dan bergaransi resmi tanpa butuh password. Harga terbaik & nego langsung di WhatsApp!
        </p>
      </div>

      {/* Platform Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs sm:text-sm">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => handlePlatformChange(p.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all cursor-pointer whitespace-nowrap font-medium ${
              selectedPlatform === p.id
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-500 shadow-md shadow-pink-500/20'
                : isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 shadow-xs'
            }`}
          >
            <span>{p.icon}</span>
            <span>{p.label}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Service Selector (5 cols) */}
        <div className={`lg:col-span-5 space-y-3 border rounded-3xl p-5 ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-xs'
        }`}>
          <label className={`text-xs font-bold block uppercase tracking-wider font-mono ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Pilih Layanan {selectedPlatform.toUpperCase()}
          </label>

          <div className="space-y-2">
            {activeServices.map((svc) => {
              const isSelected = svc.id === currentService.id;

              return (
                <button
                  key={svc.id}
                  onClick={() => {
                    setSelectedServiceId(svc.id);
                    if (quantity < svc.minOrder) setQuantity(svc.minOrder);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-pink-950/30 border-pink-500/60 text-white'
                        : 'bg-pink-50 border-pink-400 text-slate-900 shadow-xs'
                      : isDark
                        ? 'bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-xs sm:text-sm leading-snug">
                      {svc.serviceName}
                    </span>
                    <span className="text-xs font-mono font-bold text-pink-500 whitespace-nowrap">
                      {svc.priceLabel || 'Tanya di WA'}
                    </span>
                  </div>

                  <p className={`text-[11px] mt-1 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {svc.quality}
                  </p>

                  <div className={`flex items-center gap-3 mt-2 text-[10px] font-mono ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-500" />
                      {svc.speed}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-500">
                      <ShieldCheck className="w-3 h-3" />
                      {svc.guarantee}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Order Customizer & Inquiry (7 cols) */}
        <div className={`lg:col-span-7 border rounded-3xl p-6 space-y-5 shadow-xl ${
          isDark ? 'bg-[#090e18] border-slate-800' : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}>
            <div>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                isDark ? 'text-pink-400 bg-pink-950/60 border-pink-800/80' : 'text-pink-800 bg-pink-50 border-pink-200'
              }`}>
                KONSULTASI PESANAN
              </span>
              <h3 className={`text-base sm:text-lg font-bold mt-1 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {currentService.serviceName}
              </h3>
            </div>
            <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Min: {currentService.minOrder.toLocaleString()} | Max: {currentService.maxOrder.toLocaleString()}
            </span>
          </div>

          <form onSubmit={handleOrderSubmit} className="space-y-4">
            {/* Target Account Input */}
            <div>
              <label className={`text-xs font-medium block mb-1 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Target Username / Link Postingan <span className="text-pink-500">*</span>
              </label>
              <input
                type="text"
                required
                value={targetAccount}
                onChange={(e) => setTargetAccount(e.target.value)}
                placeholder={currentService.placeholderTarget}
                className={`w-full px-4 py-2.5 border rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:border-pink-500 ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
              <span className={`text-[11px] mt-1 block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Contoh: {currentService.placeholderTarget} (Akun WAJIB tidak boleh di-private)
              </span>
            </div>

            {/* Quantity Controls */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Kebutuhan Jumlah {currentService.unitLabel}:
                </label>
                <span className="font-mono font-bold text-cyan-500 text-sm">
                  {quantity.toLocaleString('id-ID')} {currentService.unitLabel}
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min={currentService.minOrder}
                max={Math.min(currentService.maxOrder, 20000)}
                step={currentService.minOrder >= 1000 ? 500 : 100}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-pink-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                {[500, 1000, 2000, 5000, 10000].map((preset) => {
                  if (preset < currentService.minOrder || preset > currentService.maxOrder) return null;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setQuantity(preset)}
                      className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-colors cursor-pointer ${
                        quantity === preset
                          ? 'bg-pink-500 text-white font-bold'
                          : isDark
                            ? 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                            : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-300'
                      }`}
                    >
                      +{preset.toLocaleString('id-ID')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Inquiry Summary Box */}
            <div className={`p-4 rounded-2xl border space-y-2 ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`flex items-center justify-between text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <span>Skema Harga:</span>
                <span className="font-mono text-pink-500 font-semibold">Tanya Promo & Nego di WhatsApp</span>
              </div>
              <div className={`flex items-center justify-between text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <span>Estimasi Kecepatan:</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-300">{currentService.speed}</span>
              </div>
              <div className={`flex items-center justify-between text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <span>Garansi:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">{currentService.guarantee}</span>
              </div>

              <div className={`pt-2 border-t flex items-center justify-between ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Harga Spesial & Diskon:
                </span>
                <span className={`text-xs sm:text-sm font-bold font-mono px-2.5 py-1 rounded border ${
                  isDark
                    ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60'
                    : 'text-emerald-800 bg-emerald-50 border-emerald-300'
                }`}>
                  Konsultasi via WA (083135445588)
                </span>
              </div>
            </div>

            {/* Submit Button to WhatsApp */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition-all cursor-pointer active:scale-98"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
              <span>Tanya Harga & Pesan via WA 083135445588</span>
            </button>
          </form>
        </div>
      </div>

      {/* Trust Points Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {TRUST_POINTS.map((tp, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border space-y-1 transition-all ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 text-slate-100'
                : 'bg-white border-slate-200 text-slate-800 shadow-xs'
            }`}
          >
            <span className={`text-xs font-bold flex items-center gap-1.5 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              {tp.title}
            </span>
            <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {tp.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
