import { useState } from 'react';
import {
  Wallet,
  Menu,
  X,
  Shield,
  FileText,
  Trash2,
  Download,
  ChevronRight,
} from 'lucide-react';
import { ActivePage } from '../types';
import { APP_CONFIG } from '../data/content';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

export default function Header({ activePage, setActivePage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page: ActivePage, anchorId?: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    if (page === 'home' && anchorId) {
      setTimeout(() => {
        const element = document.getElementById(anchorId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <button
            id="brand-logo-btn"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900 block leading-tight">
                Expense Manager
              </span>
              <span className="text-[11px] font-medium text-emerald-600 block">
                Official Android App
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <button
              id="nav-home-btn"
              onClick={() => navigateTo('home')}
              className={`hover:text-emerald-600 transition-colors ${
                activePage === 'home' ? 'text-emerald-600 font-bold' : ''
              }`}
            >
              Overview
            </button>
            <button
              id="nav-features-btn"
              onClick={() => navigateTo('home', 'features-section')}
              className="hover:text-emerald-600 transition-colors"
            >
              Features
            </button>
            <button
              id="nav-screens-btn"
              onClick={() => navigateTo('home', 'showcase-section')}
              className="hover:text-emerald-600 transition-colors"
            >
              App Preview
            </button>
            <button
              id="nav-faq-btn"
              onClick={() => navigateTo('home', 'faq-section')}
              className="hover:text-emerald-600 transition-colors"
            >
              FAQ
            </button>
            <button
              id="nav-privacy-btn"
              onClick={() => navigateTo('privacy')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
                activePage === 'privacy'
                  ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200'
                  : 'hover:text-emerald-600 hover:bg-slate-50'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Privacy Policy</span>
            </button>
            <button
              id="nav-terms-btn"
              onClick={() => navigateTo('terms')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
                activePage === 'terms'
                  ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200'
                  : 'hover:text-emerald-600 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Terms</span>
            </button>
            <button
              id="nav-deletion-btn"
              onClick={() => navigateTo('data-deletion')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
                activePage === 'data-deletion'
                  ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200'
                  : 'hover:text-emerald-600 hover:bg-slate-50'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Data Deletion</span>
            </button>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              id="header-download-btn"
              href={APP_CONFIG.apkDownloadUrl}
              download="ExpenseManager.apk"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download APK</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <button
              onClick={() => navigateTo('home')}
              className={`p-2.5 rounded-lg text-left ${
                activePage === 'home' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 bg-slate-50'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => navigateTo('home', 'features-section')}
              className="p-2.5 rounded-lg text-left text-slate-700 bg-slate-50"
            >
              Features
            </button>
            <button
              onClick={() => navigateTo('home', 'showcase-section')}
              className="p-2.5 rounded-lg text-left text-slate-700 bg-slate-50"
            >
              App Preview
            </button>
            <button
              onClick={() => navigateTo('home', 'faq-section')}
              className="p-2.5 rounded-lg text-left text-slate-700 bg-slate-50"
            >
              FAQ
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Legal & Policies</p>
            <button
              onClick={() => navigateTo('privacy')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                Privacy Policy
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => navigateTo('terms')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-600" />
                Terms of Service
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => navigateTo('data-deletion')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-800 text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-rose-500" />
                Data & Account Deletion
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="pt-3">
            <a
              href={APP_CONFIG.apkDownloadUrl}
              download="ExpenseManager.apk"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download APK</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
