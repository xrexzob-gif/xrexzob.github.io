import React, { useState, useEffect } from 'react';
import { OWNER_CONTACT } from '../data/storeData';
import { useTheme } from '../context/ThemeContext';
import {
  Search,
  CheckCircle2,
  Clock,
  PackageCheck,
  AlertCircle,
  X,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  FileCode,
  MapPin
} from 'lucide-react';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
}

export interface TrackedOrder {
  orderId: string;
  customerPhone?: string;
  serviceTitle: string;
  category: 'map' | 'smm';
  targetInfo: string;
  orderDate: string;
  status: 'pending' | 'in_progress' | 'quality_check' | 'completed';
  statusLabel: string;
  progressPercent: number;
  estimatedCompletion: string;
  adminNote: string;
}

// Built-in sample orders so testing is rich and immediate
const MOCK_ORDERS: Record<string, TrackedOrder> = {
  'XRZ-2041': {
    orderId: 'XRZ-2041',
    customerPhone: '081234567890',
    serviceTitle: 'Modern Police Station MLO & Interior (3 Lantai)',
    category: 'map',
    targetInfo: 'FiveM Server: Batavia Roleplay',
    orderDate: '10 Okt 2026',
    status: 'in_progress',
    statusLabel: 'Sedang Proses Pengerjaan & Texturing',
    progressPercent: 65,
    estimatedCompletion: 'Hari ini pukul 20:00 WIB',
    adminNote: 'Interior lantai 1 dan 2 sudah selesai, sedang penyesuaian doorlock dan helipad rooftop.',
  },
  'XRZ-3092': {
    orderId: 'XRZ-3092',
    customerPhone: '083135445588',
    serviceTitle: 'Suntik Sosmed: 2.000 Followers TikTok Organik',
    category: 'smm',
    targetInfo: '@rexzob_gaming (TikTok)',
    orderDate: '11 Okt 2026',
    status: 'in_progress',
    statusLabel: 'Injeksi Sistem Berjalan (1.420 / 2.000 Masuk)',
    progressPercent: 75,
    estimatedCompletion: '1-3 Jam ke depan',
    adminNote: 'Proses injeksi followers aman bertahap untuk menjaga retensi algoritma FYP.',
  },
  'XRZ-7714': {
    orderId: 'XRZ-7714',
    customerPhone: '085712345678',
    serviceTitle: 'Roblox Tactical PvP Military Base & Arena',
    category: 'map',
    targetInfo: 'Roblox Place ID: 9482910',
    orderDate: '09 Okt 2026',
    status: 'completed',
    statusLabel: 'Selesai & File Terkirim ke WhatsApp',
    progressPercent: 100,
    estimatedCompletion: 'Selesai Tepat Waktu',
    adminNote: 'File .rbxl dan script spawner sudah dikirim via WhatsApp. Garansi revisi aktif 7 hari.',
  },
};

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  initialCode = '',
}) => {
  const { isDark } = useTheme();
  const [searchInput, setSearchInput] = useState(initialCode);
  const [activeOrder, setActiveOrder] = useState<TrackedOrder | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [recentOrders, setRecentOrders] = useState<TrackedOrder[]>([]);

  // Load user's recent locally saved orders
  useEffect(() => {
    try {
      const saved = localStorage.getItem('xrexzob_user_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        setRecentOrders(parsed);
      }
    } catch {
      // ignore
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialCode) {
      setSearchInput(initialCode);
      handleSearch(initialCode);
    }
  }, [initialCode, isOpen]);

  const handleSearch = (codeToSearch: string) => {
    const query = codeToSearch.trim().toUpperCase();
    if (!query) return;

    setNotFound(false);

    // 1. Check local recent orders first
    const fromLocal = recentOrders.find(
      (o) =>
        o.orderId.toUpperCase() === query ||
        (o.customerPhone && o.customerPhone.includes(query))
    );

    if (fromLocal) {
      setActiveOrder(fromLocal);
      return;
    }

    // 2. Check mock orders
    if (MOCK_ORDERS[query]) {
      setActiveOrder(MOCK_ORDERS[query]);
      return;
    }

    // 3. Search by partial phone or dynamic generated order
    const mockByPhone = Object.values(MOCK_ORDERS).find(
      (o) => o.customerPhone && o.customerPhone.includes(query)
    );
    if (mockByPhone) {
      setActiveOrder(mockByPhone);
      return;
    }

    // Dynamic fallback generation for any valid XRZ- format
    if (query.startsWith('XRZ-') && query.length >= 7) {
      const dynamicOrder: TrackedOrder = {
        orderId: query,
        customerPhone: 'WhatsApp User',
        serviceTitle: 'Pesanan Layanan xrexzob Official',
        category: 'smm',
        targetInfo: 'Akun Target Terdaftar',
        orderDate: 'Hari Ini',
        status: 'in_progress',
        statusLabel: 'Sedang Diverifikasi & Diproses Sistem',
        progressPercent: 50,
        estimatedCompletion: 'Sedang dikonfirmasi via WhatsApp',
        adminNote: 'Pesanan Anda sedang ditangani oleh admin xrexzob. Hubungi WhatsApp untuk info real-time.',
      };
      setActiveOrder(dynamicOrder);
      return;
    }

    setActiveOrder(null);
    setNotFound(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchInput);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className={`w-full max-w-xl border rounded-3xl p-6 sm:p-7 shadow-2xl relative space-y-6 max-h-[92vh] overflow-y-auto ${
        isDark ? 'bg-[#090e18] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
            <PackageCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Lacak Status Pesanan Map & Sosmed
            </h3>
            <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Masukkan Kode Transaksi (misal: XRZ-2041 atau XRZ-3092)
            </p>
          </div>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setNotFound(false);
                }}
                placeholder="Ketik Kode Order (contoh: XRZ-2041 atau nomor WA)..."
                className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:border-cyan-500 ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md shadow-cyan-500/20 whitespace-nowrap active:scale-95"
            >
              Cek Status
            </button>
          </div>

          {/* Quick preset tests */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
            <span>Contoh Kode Tes:</span>
            {['XRZ-2041', 'XRZ-3092', 'XRZ-7714'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setSearchInput(code);
                  handleSearch(code);
                }}
                className={`px-2 py-0.5 rounded font-mono transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 text-cyan-300 hover:bg-slate-800'
                    : 'bg-slate-100 text-cyan-800 hover:bg-slate-200'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </form>

        {/* Not Found Alert */}
        {notFound && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Kode Pesanan Tidak Ditemukan</span>
              <p className="mt-0.5 leading-relaxed text-amber-600 dark:text-amber-400">
                Pastikan kode transaksi sudah benar. Jika Anda baru saja memesan via WhatsApp, silakan konfirmasi langsung ke nomor WA <strong>083135445588</strong>.
              </p>
            </div>
          </div>
        )}

        {/* ACTIVE ORDER DETAIL VIEW */}
        {activeOrder && (
          <div className={`p-5 rounded-2xl border space-y-4 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-xs'
          }`}>
            {/* Top Bar of Order */}
            <div className="flex items-start justify-between gap-3 border-b pb-3 border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-500">
                    #{activeOrder.orderId}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300">
                    {activeOrder.category === 'map' ? 'MAP ASSET' : 'SUNTIK SOSMED'}
                  </span>
                </div>
                <h4 className={`text-sm sm:text-base font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {activeOrder.serviceTitle}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  Target: {activeOrder.targetInfo} • Tanggal: {activeOrder.orderDate}
                </p>
              </div>

              {/* Status Badge */}
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xl whitespace-nowrap border ${
                activeOrder.status === 'completed'
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
              }`}>
                {activeOrder.status === 'completed' ? '✓ Selesai' : '⏳ Diproses'}
              </span>
            </div>

            {/* Progress Bar & Status Text */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  {activeOrder.statusLabel}
                </span>
                <span className="font-mono font-bold text-cyan-500">
                  {activeOrder.progressPercent}%
                </span>
              </div>

              <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${activeOrder.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Progress Step Nodes */}
            <div className="grid grid-cols-4 gap-1 text-center text-[10px] pt-1 text-slate-400 font-mono">
              <div className="space-y-1">
                <div className={`w-3 h-3 mx-auto rounded-full ${activeOrder.progressPercent >= 25 ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
                <span>Diterima</span>
              </div>
              <div className="space-y-1">
                <div className={`w-3 h-3 mx-auto rounded-full ${activeOrder.progressPercent >= 50 ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
                <span>Pengerjaan</span>
              </div>
              <div className="space-y-1">
                <div className={`w-3 h-3 mx-auto rounded-full ${activeOrder.progressPercent >= 75 ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
                <span>Quality Check</span>
              </div>
              <div className="space-y-1">
                <div className={`w-3 h-3 mx-auto rounded-full ${activeOrder.progressPercent >= 100 ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
                <span>Terkirim</span>
              </div>
            </div>

            {/* Admin Note Box */}
            <div className={`p-3 rounded-xl border text-xs space-y-1 ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
            }`}>
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 font-mono">
                <span>CATATAN PROGRESS DARI XREXZOB:</span>
                <span>Estimasi: {activeOrder.estimatedCompletion}</span>
              </div>
              <p className="leading-relaxed">
                {activeOrder.adminNote}
              </p>
            </div>

            {/* Follow-up via WA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400">
                Ada kendala atau ingin ubah target? Hubungi WA xrexzob.
              </span>
              <a
                href={`https://wa.me/6283135445588?text=${encodeURIComponent(
                  `Halo xrexzob! Saya ingin menanyakan update order ID: ${activeOrder.orderId} (${activeOrder.serviceTitle}). Terima kasih!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-emerald-500/20 whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                <span>Follow-up via WA</span>
              </a>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={`pt-2 border-t flex items-center justify-between text-xs ${
          isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
        }`}>
          <span>CS xrexzob: WA 083135445588</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
