import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProfileCard } from './components/ProfileCard';
import { MapStore } from './components/MapStore';
import { SMMBooster } from './components/SMMBooster';
import { GitHubSection } from './components/GitHubSection';
import { GitHubDeployGuide } from './components/GitHubDeployGuide';
import { OrderModal } from './components/OrderModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { Footer } from './components/Footer';
import { OrderItem } from './types';
import { OWNER_CONTACT } from './data/storeData';
import { MessageCircle, Instagram, Github, UploadCloud, ArrowUp, PackageCheck } from 'lucide-react';

function MainApp() {
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isTrackOrderModalOpen, setIsTrackOrderModalOpen] = useState(false);
  const [trackInitialCode, setTrackInitialCode] = useState<string>('');
  const [currentOrderItem, setCurrentOrderItem] = useState<OrderItem | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleOpenOrder = (
    title: string,
    price: number | string,
    detail: string,
    targetAccount?: string,
    quantity?: number
  ) => {
    setCurrentOrderItem({
      type: title.toLowerCase().includes('map') ? 'map' : 'smm',
      title,
      price,
      detail,
      targetAccount,
      quantity,
    });
    setIsOrderModalOpen(true);
  };

  const handleOpenTrackModalWithCode = (code: string) => {
    setTrackInitialCode(code);
    setIsTrackOrderModalOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 selection:bg-cyan-500 selection:text-slate-950 ${
      isDark ? 'bg-[#070b12] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      {/* Top Navbar with Theme Toggle & Track Order */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onOpenTrackModal={() => {
          setTrackInitialCode('');
          setIsTrackOrderModalOpen(true);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-12">
        {/* HERO SECTION */}
        <HeroSection
          onExploreMaps={() => setActiveSection('maps')}
          onExploreSMM={() => setActiveSection('smm')}
          onOpenOrder={handleOpenOrder}
        />

        {/* PROFIL RESMI WA & IG SPOTLIGHT */}
        <section id="profile" className="scroll-mt-20">
          <ProfileCard />
        </section>

        {/* SECTION TOGGLE VIEW / ALL-IN-ONE NAVIGATION */}
        {activeSection === 'home' && (
          <div className="space-y-16">
            {/* JUALAN MAP */}
            <section id="maps" className="scroll-mt-20">
              <MapStore onOpenOrder={handleOpenOrder} />
            </section>

            {/* SUNTIK SOSMED */}
            <section id="smm" className="scroll-mt-20">
              <SMMBooster onOpenOrder={handleOpenOrder} />
            </section>

            {/* GITHUB & DEV REPOS */}
            <section id="github" className="scroll-mt-20">
              <GitHubSection />
            </section>
          </div>
        )}

        {activeSection === 'maps' && (
          <section id="maps" className="scroll-mt-20">
            <MapStore onOpenOrder={handleOpenOrder} />
          </section>
        )}

        {activeSection === 'smm' && (
          <section id="smm" className="scroll-mt-20">
            <SMMBooster onOpenOrder={handleOpenOrder} />
          </section>
        )}

        {activeSection === 'github' && (
          <section id="github" className="scroll-mt-20">
            <GitHubSection />
          </section>
        )}

        {activeSection === 'profile' && (
          <div className="space-y-10">
            <div className={`p-8 rounded-3xl border text-center space-y-3 ${
              isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Butuh Solusi Custom atau Kerjasama?
              </h3>
              <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Silakan hubungi WhatsApp <strong>083135445588</strong> atau DM Instagram <strong>@xrexzob</strong>. Kami siap berdiskusi untuk proyek map server Anda atau pesanan suntik sosmed dalam jumlah besar (reseller welcome).
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <a
                  href={OWNER_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Chat WA 083135445588</span>
                </a>
                <a
                  href={OWNER_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-pink-500/20"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Follow @xrexzob</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Scroll to Top Button (visible when scrolled > 300px) */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            title="Kembali ke atas halaman"
            className={`p-3 rounded-full border shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer animate-in fade-in slide-in-from-bottom-2 ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-cyan-400 hover:bg-slate-800 hover:border-cyan-500/50 shadow-cyan-950/40'
                : 'bg-white border-slate-200 text-cyan-600 hover:bg-slate-50 hover:border-cyan-400 shadow-slate-200'
            }`}
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}

        {/* Quick Track Order floating pill */}
        <button
          onClick={() => {
            setTrackInitialCode('');
            setIsTrackOrderModalOpen(true);
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full border shadow-lg text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-cyan-300 hover:bg-slate-800'
              : 'bg-white border-slate-300 text-cyan-800 hover:bg-slate-50'
          }`}
          title="Lacak Status Pesanan"
        >
          <PackageCheck className="w-4 h-4 text-cyan-500" />
          <span>Lacak Order</span>
        </button>

        {/* WhatsApp Quick Chat */}
        <a
          href={OWNER_CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm rounded-full shadow-2xl shadow-emerald-500/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Chat WhatsApp 083135445588"
        >
          <MessageCircle className="w-5 h-5 fill-slate-950" />
          <span className="hidden sm:inline">Order via WA 083135445588</span>
        </a>
      </div>

      {/* Deploy to GitHub Guide Modal */}
      <GitHubDeployGuide
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />

      {/* WhatsApp Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        orderItem={currentOrderItem}
        onOpenTrackModal={handleOpenTrackModalWithCode}
      />

      {/* Track Order Modal */}
      <TrackOrderModal
        isOpen={isTrackOrderModalOpen}
        onClose={() => setIsTrackOrderModalOpen(false)}
        initialCode={trackInitialCode}
      />

      {/* Footer */}
      <Footer onOpenDeployGuide={() => setIsDeployGuideOpen(true)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
