import { Wallet, Shield, FileText, Trash2, Mail, Heart, ExternalLink } from 'lucide-react';
import { ActivePage } from '../types';
import { APP_CONFIG } from '../data/content';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const navigateTo = (page: ActivePage, anchorId?: string) => {
    setActivePage(page);
    if (page === 'home' && anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Expense Manager</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The privacy-first personal finance and expense management application for Android. 100% offline, local database storage, zero ads, and zero cloud tracking.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={`mailto:${APP_CONFIG.developerEmail}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800"
                title="Email Developer"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs">{APP_CONFIG.developerEmail}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Application</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Overview & Demo
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('home', 'features-section')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Core Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('home', 'showcase-section')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Screenshots & Workflows
                </button>
              </li>
              <li>
                <a
                  href={APP_CONFIG.apkDownloadUrl}
                  download="ExpenseManager.apk"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Download APK
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('home', 'faq-section')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  FAQ & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Privacy */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Legal & Privacy
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('privacy')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('terms')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Terms of Service</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('data-deletion')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Data & Privacy Guide</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Developer & Support Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Support & Author</h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="text-white font-semibold text-xs">
                {APP_CONFIG.developerName}
              </div>
              <p className="text-[11px] text-slate-400">Android developer focusing on privacy-centric offline utilities.</p>
              <a
                href={`mailto:${APP_CONFIG.developerEmail}?subject=Support%20Expense%20Manager`}
                className="inline-flex items-center gap-1 text-emerald-400 hover:underline text-[11px] font-semibold mt-1"
              >
                <span>Direct Email Support</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Expense Manager. Created by{' '}
            <span className="text-slate-300 font-semibold">{APP_CONFIG.developerName}</span>. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('privacy')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('terms')} className="hover:text-slate-300 transition-colors">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('data-deletion')} className="hover:text-slate-300 transition-colors">
              Data Safety
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
