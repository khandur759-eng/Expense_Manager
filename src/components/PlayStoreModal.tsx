import { useEffect } from 'react';
import { X, Download, Clock, Sparkles } from 'lucide-react';
import { APP_CONFIG } from '../data/content';

interface PlayStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlayStoreModal({ isOpen, onClose }: PlayStoreModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="playstore-coming-soon-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="playstore-modal-title"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-center transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-playstore-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Play Store Logo / Clock Icon Badge */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 shadow-inner">
          <div className="relative">
            <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
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
            <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-amber-500 text-white">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Headline requested by user: The app will be on playstore soon */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Coming Soon</span>
        </div>

        <h3
          id="playstore-modal-title"
          className="text-2xl font-black text-slate-900 tracking-tight mb-2"
        >
          The app will be on playstore soon
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          We are in the process of publishing <strong>Expense Manager</strong> to the Google Play Store. In the meantime, you can download and install the official APK directly onto your device right now!
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            id="modal-download-apk-btn"
            href={APP_CONFIG.apkDownloadUrl}
            download="ExpenseManager.apk"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl"
          >
            <Download className="w-4 h-4" />
            <span>Download APK Now</span>
          </a>

          <button
            id="modal-close-dismiss-btn"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
