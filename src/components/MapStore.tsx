import React, { useState, useMemo } from 'react';
import { MAP_PRODUCTS, OWNER_CONTACT } from '../data/storeData';
import { GameMapProduct } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  Map,
  Layers,
  Check,
  Sparkles,
  ExternalLink,
  MessageCircle,
  FileCode,
  ShieldCheck,
  ChevronRight,
  Eye,
  X
} from 'lucide-react';

interface MapStoreProps {
  onOpenOrder: (title: string, price: string, detail: string) => void;
}

export const MapStore: React.FC<MapStoreProps> = ({ onOpenOrder }) => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<GameMapProduct | null>(null);

  const categories = [
    { id: 'all', label: 'Semua Map' },
    { id: 'fivem', label: 'FiveM / GTA V' },
    { id: 'roblox', label: 'Roblox Studio' },
    { id: 'custom', label: 'Custom Order' },
  ];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return MAP_PRODUCTS;
    return MAP_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div>
          <h2 className={`text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <Map className="w-6 h-6 text-cyan-500" />
            <span>Katalog Map & 3D Assets Game xrexzob</span>
          </h2>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Map berkualitas tinggi siap pakai untuk FiveM (MLO Interiors), GTA V, Roblox, dan pesanan custom. Harga bersahabat & bisa nego langsung di WA!
          </p>
        </div>

        {/* Filter categories */}
        <div className={`flex items-center gap-1.5 p-1 border rounded-xl overflow-x-auto text-xs ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`group rounded-3xl border transition-all flex flex-col justify-between overflow-hidden shadow-lg ${
              isDark
                ? 'border-slate-800 bg-[#090e18] hover:border-slate-700 shadow-cyan-950/5'
                : 'border-slate-200 bg-white hover:border-cyan-400 shadow-slate-200/50'
            }`}
          >
            {/* Visual Card Banner Header */}
            <div
              className={`p-5 border-b relative ${isDark ? 'border-slate-800/80' : 'border-slate-100'}`}
              style={{
                background: isDark
                  ? `linear-gradient(135deg, ${product.accentColor}18, #090e18 70%)`
                  : `linear-gradient(135deg, ${product.accentColor}12, #ffffff 75%)`,
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isDark ? 'text-slate-300 bg-slate-900/90 border-slate-700' : 'text-slate-700 bg-white border-slate-200'
                }`}>
                  {product.categoryLabel}
                </span>
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                  style={{
                    backgroundColor: `${product.accentColor}25`,
                    color: product.accentColor,
                  }}
                >
                  {product.tag}
                </span>
              </div>

              <h3 className={`text-lg font-bold group-hover:text-cyan-500 transition-colors leading-snug ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {product.title}
              </h3>

              {/* Price Label (Negotiable / Ask via WA) */}
              <div className="mt-3 flex items-center gap-2">
                <span className={`text-xs sm:text-sm font-bold font-mono px-3 py-1 rounded-xl border flex items-center gap-1.5 ${
                  isDark
                    ? 'text-cyan-300 bg-cyan-950/60 border-cyan-800/60'
                    : 'text-cyan-800 bg-cyan-50 border-cyan-200'
                }`}>
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{product.priceLabel || 'Tanya Harga di WA'}</span>
                </span>
              </div>
            </div>

            {/* Description & Specs */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {product.description}
              </p>

              {/* Feature Points */}
              <div className={`space-y-1.5 pt-2 border-t text-xs ${
                isDark ? 'border-slate-800/60 text-slate-300' : 'border-slate-100 text-slate-700'
              }`}>
                {product.features.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>

              <div className={`text-[11px] font-mono pt-2 border-t flex items-center justify-between ${
                isDark ? 'border-slate-800/60 text-slate-400' : 'border-slate-100 text-slate-500'
              }`}>
                <span>Format: {product.fileFormat.split('/')[0]}</span>
                <span>Nego: Bisa Banget</span>
              </div>
            </div>

            {/* Actions */}
            <div className={`p-4 border-t flex items-center gap-2 ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <button
                onClick={() => setActiveModalProduct(product)}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Detail</span>
              </button>

              <button
                onClick={() =>
                  onOpenOrder(
                    product.title,
                    product.priceLabel || 'Tanya Harga via WA',
                    `Kategori: ${product.categoryLabel} • Format: ${product.fileFormat}`
                  )
                }
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                <span>Tanya Harga di WA</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL MODAL */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className={`w-full max-w-lg border rounded-3xl p-6 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto ${
            isDark ? 'bg-[#0b101c] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                isDark ? 'text-cyan-400 bg-cyan-950/60 border-cyan-800/80' : 'text-cyan-800 bg-cyan-50 border-cyan-200'
              }`}>
                {activeModalProduct.categoryLabel}
              </span>
              <h3 className={`text-xl font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {activeModalProduct.title}
              </h3>
              <div className="mt-2">
                <span className={`text-sm font-bold font-mono px-3 py-1 rounded-xl border inline-flex items-center gap-1.5 ${
                  isDark ? 'text-cyan-300 bg-cyan-950/60 border-cyan-800/60' : 'text-cyan-800 bg-cyan-50 border-cyan-200'
                }`}>
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{activeModalProduct.priceLabel || 'Tanya Harga di WA'}</span>
                </span>
              </div>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {activeModalProduct.description}
            </p>

            <div className={`space-y-2 p-4 rounded-2xl border ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Fitur & Keunggulan:
              </span>
              <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {activeModalProduct.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`block text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Kompatibilitas</span>
                <span className={`font-semibold mt-0.5 block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {activeModalProduct.compatibility}
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`block text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Format File</span>
                <span className={`font-semibold mt-0.5 block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {activeModalProduct.fileFormat}
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setActiveModalProduct(null)}
                className={`py-2.5 px-4 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                }`}
              >
                Tutup
              </button>

              <button
                onClick={() => {
                  const prod = activeModalProduct;
                  setActiveModalProduct(null);
                  onOpenOrder(
                    prod.title,
                    prod.priceLabel || 'Tanya Harga via WA',
                    `Kategori: ${prod.categoryLabel} • Format: ${prod.fileFormat}`
                  );
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Chat WA & Cek Harga (083135445588)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
