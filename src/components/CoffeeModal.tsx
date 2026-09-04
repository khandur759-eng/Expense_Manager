import { useEffect, useState } from 'react';
import { X, Coffee, Heart, Copy, Check, ExternalLink } from 'lucide-react';

interface CoffeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CoffeeModal({ isOpen, onClose }: CoffeeModalProps) {
  const [copied, setCopied] = useState(false);
  const upiId = '9068751038@fam';
  const upiLink = `upi://pay?pa=${upiId}&pn=Expense%20Manager%20Developer&cu=INR`;

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
      setCopied(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  if (!isOpen) return null;

  return (
    <div
      id="coffee-contribution-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="coffee-modal-title"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-100 text-center transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-coffee-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Coffee Icon Badge */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 shadow-inner">
          <div className="relative">
            <span className="text-3xl">☕</span>
            <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-rose-500 text-white shadow">
              <Heart className="w-3 h-3 fill-white" />
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold mb-3">
          <Coffee className="w-3.5 h-3.5 text-amber-700" />
          <span>Support the Developer</span>
        </div>

        <h3
          id="coffee-modal-title"
          className="text-2xl font-black text-slate-900 tracking-tight mb-2"
        >
          Buy me a coffee ☕
        </h3>

        {/* Requested Text */}
        <p className="text-base text-slate-700 leading-relaxed font-medium mb-6 px-2">
          A small contribution helps me keep improving Expense Manager
        </p>

        {/* Requested Contribute Button */}
        <div className="space-y-3">
          <a
            id="coffee-contribute-btn"
            href="upi://pay?pa=9068751038@fam"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-base transition-all shadow-lg hover:shadow-xl active:scale-[0.99]"
          >
            <span>contribute</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* UPI ID Quick-Copy for desktop or alternative apps */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-xs">
            <div className="text-left overflow-hidden">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">UPI ID</span>
              <span className="font-mono font-bold text-slate-800 truncate block">{upiId}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyUpi}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold transition-colors flex-shrink-0"
              title="Copy UPI ID"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 text-[11px]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[11px]">Copy UPI</span>
                </>
              )}
            </button>
          </div>

          <button
            id="modal-coffee-dismiss-btn"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
