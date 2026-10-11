import React, { useState, useEffect } from 'react';
import { OWNER_CONTACT } from '../data/storeData';
import { OrderItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  MessageCircle,
  X,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  CreditCard,
  QrCode,
  PackageCheck
} from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItem: OrderItem | null;
  onOpenTrackModal?: (code: string) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  orderItem,
  onOpenTrackModal,
}) => {
  const { isDark } = useTheme();
  const [buyerName, setBuyerName] = useState('');
  const [buyerNotes, setBuyerNotes] = useState('');
  const [targetAccountInput, setTargetAccountInput] = useState('');
  const [copiedText, setCopiedText] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const newId = `XRZ-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedOrderId(newId);
    }
  }, [isOpen]);

  if (!isOpen || !orderItem) return null;

  const target = targetAccountInput || orderItem.targetAccount || 'Sesuai kesepakatan';

  const saveOrderLocally = () => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('xrexzob_user_orders') || '[]');
      const newEntry = {
        orderId: generatedOrderId,
        serviceTitle: orderItem.title,
        category: orderItem.type,
        targetInfo: target,
        orderDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'in_progress',
        statusLabel: 'Pesanan Terkirim ke WhatsApp & Menunggu Konfirmasi',
        progressPercent: 30,
        estimatedCompletion: 'Menunggu konfirmasi admin di WhatsApp',
        adminNote: `Pesanan telah diteruskan ke admin xrexzob via WhatsApp (ID: ${generatedOrderId}).`,
      };
      const updated = [newEntry, ...savedOrders.filter((o: any) => o.orderId !== generatedOrderId)].slice(0, 5);
      localStorage.setItem('xrexzob_user_orders', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const generateWhatsappText = () => {
    let msg = `Halo xrexzob! Saya ingin menanyakan harga & order via website resmi:\n\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🔖 *Kode Order:* ${generatedOrderId}\n`;
    msg += `📦 *Produk / Layanan:* ${orderItem.title}\n`;
    msg += `📝 *Detail:* ${orderItem.detail}\n`;
    if (orderItem.type === 'smm' || orderItem.targetAccount || targetAccountInput) {
      msg += `🎯 *Target / Akun:* ${target}\n`;
    }
    if (buyerName.trim()) {
      msg += `👤 *Nama Pembeli:* ${buyerName.trim()}\n`;
    }
    if (buyerNotes.trim()) {
      msg += `💬 *Catatan Khusus:* ${buyerNotes.trim()}\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    msg += `Berapa harga terbaiknya dan apakah ada promo saat ini? Mohon info rekening jika sudah deal (QRIS / DANA / GoPay / BCA). Terima kasih!`;

    return msg;
  };

  const handleSendWhatsapp = () => {
    saveOrderLocally();
    const rawMsg = generateWhatsappText();
    const encoded = encodeURIComponent(rawMsg);
    const waUrl = `https://wa.me/6283135445588?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  const handleCopyMessage = () => {
    saveOrderLocally();
    navigator.clipboard.writeText(generateWhatsappText());
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleTrackThisOrder = () => {
    saveOrderLocally();
    onClose();
    if (onOpenTrackModal) {
      onOpenTrackModal(generatedOrderId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className={`w-full max-w-lg border rounded-3xl p-6 sm:p-7 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto ${
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
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
            <MessageCircle className="w-6 h-6 fill-emerald-500/20" />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Tanya Harga & Konsultasi Pesanan
            </h3>
            <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              WhatsApp: {OWNER_CONTACT.whatsapp} • xrexzob
            </p>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className={`p-4 rounded-2xl border space-y-2.5 ${
          isDark ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                  isDark ? 'text-cyan-400 bg-cyan-950/60 border-cyan-800/80' : 'text-cyan-800 bg-cyan-50 border-cyan-200'
                }`}>
                  {orderItem.type === 'map' ? 'MAP GAME ASSET' : 'SUNTIK SOSMED'}
                </span>
                <span className="text-[11px] font-mono font-bold text-cyan-500">
                  #{generatedOrderId}
                </span>
              </div>
              <h4 className={`text-sm font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {orderItem.title}
              </h4>
            </div>
            <span className={`text-xs font-bold font-mono px-2 py-1 rounded border whitespace-nowrap ${
              isDark ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60' : 'text-emerald-800 bg-emerald-50 border-emerald-200'
            }`}>
              Nego via WA
            </span>
          </div>

          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {orderItem.detail}
          </p>

          <div className="pt-2 border-t flex items-center justify-between text-[11px] text-slate-400 font-mono border-slate-200 dark:border-slate-800">
            <span>Kode Order Anda: <strong>{generatedOrderId}</strong></span>
            <button
              onClick={handleTrackThisOrder}
              className="text-cyan-500 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Lacak Pesanan Ini</span>
            </button>
          </div>
        </div>

        {/* Input Details */}
        <div className="space-y-3">
          {orderItem.type === 'smm' && !orderItem.targetAccount && (
            <div>
              <label className={`text-xs font-medium block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Username / Link Target Akun
              </label>
              <input
                type="text"
                value={targetAccountInput}
                onChange={(e) => setTargetAccountInput(e.target.value)}
                placeholder="@username atau link postingan"
                className={`w-full px-3.5 py-2 border rounded-xl text-xs font-mono focus:outline-none focus:border-cyan-500 ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`text-xs font-medium block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Nama Anda (Opsional)
              </label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                placeholder="Contoh: Rex / Budi"
                className={`w-full px-3.5 py-2 border rounded-xl text-xs focus:outline-none focus:border-cyan-500 ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
            <div>
              <label className={`text-xs font-medium block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Catatan / Kebutuhan Khusus
              </label>
              <input
                type="text"
                value={buyerNotes}
                onChange={(e) => setBuyerNotes(e.target.value)}
                placeholder="Misal: butuh cepat / request custom..."
                className={`w-full px-3.5 py-2 border rounded-xl text-xs focus:outline-none focus:border-cyan-500 ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Benefits Notice */}
        <div className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
          isDark ? 'bg-slate-950/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <span className={`font-semibold block text-[11px] ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            Keuntungan Menghubungi Langsung via WhatsApp:
          </span>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
            <span className={`px-2 py-0.5 rounded border ${isDark ? 'bg-slate-900 border-slate-800 text-cyan-300' : 'bg-white border-slate-300 text-cyan-800'}`}>Bisa Nego Harga</span>
            <span className={`px-2 py-0.5 rounded border ${isDark ? 'bg-slate-900 border-slate-800 text-cyan-300' : 'bg-white border-slate-300 text-cyan-800'}`}>Promo Paket Bundling</span>
            <span className={`px-2 py-0.5 rounded border ${isDark ? 'bg-slate-900 border-slate-800 text-cyan-300' : 'bg-white border-slate-300 text-cyan-800'}`}>QRIS / DANA / BCA</span>
            <span className={`px-2 py-0.5 rounded border ${isDark ? 'bg-slate-900 border-slate-800 text-cyan-300' : 'bg-white border-slate-300 text-cyan-800'}`}>Respon Kilat</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleCopyMessage}
            className={`py-3 px-4 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              isDark ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            {copiedText ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Format Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Pesan WA</span>
              </>
            )}
          </button>

          <button
            onClick={handleSendWhatsapp}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer transition-all active:scale-98"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Kirim Pesan ke WA (083135445588)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
