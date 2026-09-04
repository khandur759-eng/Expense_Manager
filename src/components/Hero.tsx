import { useState } from 'react';
import { CheckCircle2, Download, ExternalLink, ArrowRight, Smartphone, Sparkles, Coffee } from 'lucide-react';
import { APP_CONFIG } from '../data/content';
import { ActivePage } from '../types';
import PhoneMockup from './PhoneMockup';
import PlayStoreModal from './PlayStoreModal';
import CoffeeModal from './CoffeeModal';

interface HeroProps {
  setActivePage?: (page: ActivePage) => void;
}

export default function Hero({ setActivePage }: HeroProps) {
  const [isPlayStoreModalOpen, setIsPlayStoreModalOpen] = useState(false);
  const [isCoffeeModalOpen, setIsCoffeeModalOpen] = useState(false);

  return (
    <section id="hero-section" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* App Subtitle & Category Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span>100% Offline • Private Personal Finance for Android</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Master Your Expenses.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                Total Privacy, Zero Complexity.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              A clean, lightweight Android expense manager designed for speed and complete financial control.
              Set your monthly salary, log daily expenses in seconds, and track remaining budgets without cloud tracking or bank credentials.
            </p>

            {/* Value Props Bullet Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Offline Local Device Storage</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Monthly Salary & Budget Balance</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Quick-Add Shortcut for Fast Entry</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>No Ads, Subscriptions, or Account Wall</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              {/* Google Play Store Badge Button */}
              <button
                id="hero-playstore-btn"
                onClick={() => setIsPlayStoreModalOpen(true)}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all group cursor-pointer"
              >
                <div className="w-7 h-7 flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3.6 1.8A1.9 1.9 0 0 0 3 3.3v17.4c0 .6.2 1.1.6 1.5l.1.1 9.8-9.8v-.2L3.7 2.3l-.1-.5Z"
                      fill="#00D2FF"
                    />
                    <path
                      d="m16.8 15.6-3.3-3.3v-.2l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.6 0 2.2l-3.9 2.2-.1.1Z"
                      fill="#FFCE00"
                    />
                    <path
                      d="m13.5 12.3-9.9 9.9c.4.4 1 .5 1.7.1l11.5-6.5-3.3-3.5Z"
                      fill="#FF334B"
                    />
                    <path
                      d="M13.5 12.1 16.8 8.6 5.3 2.1c-.7-.4-1.3-.3-1.7.1l9.9 9.9Z"
                      fill="#00E676"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 font-normal leading-tight uppercase tracking-wider">
                    Get It On
                  </div>
                  <div className="text-sm font-bold leading-tight group-hover:text-emerald-400 transition-colors">
                    Google Play
                  </div>
                </div>
              </button>

              {/* Direct APK Download Button */}
              <a
                id="hero-download-apk-btn"
                href={APP_CONFIG.apkDownloadUrl}
                download="ExpenseManager.apk"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl"
              >
                <Download className="w-4 h-4 text-white" />
                <span>Download APK</span>
              </a>

              {/* Buy me a coffee Button */}
              <button
                id="hero-coffee-btn"
                onClick={() => setIsCoffeeModalOpen(true)}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Buy me a coffee ☕</span>
              </button>
            </div>

            {/* Free & Offline Guarantee Banner */}
            <div className="p-3.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 flex items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="font-semibold text-slate-800">100% Free & Offline:</span>
                <span className="hidden sm:inline">Built natively for Android with Kotlin & Jetpack Compose.</span>
              </div>
              <span className="text-emerald-700 font-semibold text-xs whitespace-nowrap">Zero Tracking • No Ads</span>
            </div>
          </div>

          {/* Right Column: Interactive Android Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <PhoneMockup />
          </div>
        </div>
      </div>

      {/* Google Play Store Coming Soon Modal */}
      <PlayStoreModal
        isOpen={isPlayStoreModalOpen}
        onClose={() => setIsPlayStoreModalOpen(false)}
      />

      {/* Buy Me a Coffee Contribution Modal */}
      <CoffeeModal
        isOpen={isCoffeeModalOpen}
        onClose={() => setIsCoffeeModalOpen(false)}
      />
    </section>
  );
}
