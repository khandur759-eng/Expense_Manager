import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import { FAQ_ITEMS, APP_CONFIG } from '../data/content';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to know about Expense Manager, privacy, data storage, and exports.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5 mb-14">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{item.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support & Contact Box (Play Store Support Requirement) */}
        <div id="support" className="rounded-3xl bg-emerald-900 text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-emerald-600/30 rounded-full blur-2xl pointer-events-none"></div>

          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/80 px-2.5 py-1 rounded-full inline-block">
              Developer Support & Feedback
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Need Help or Want to Request a Feature?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              We actively maintain Expense Manager and welcome bug reports, user suggestions, and feature contributions from the community.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                id="support-email-btn"
                href={`mailto:${APP_CONFIG.developerEmail}?subject=Expense%20Manager%20Support`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-emerald-950 font-bold text-xs sm:text-sm shadow-md hover:bg-emerald-50 transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-700" />
                <span>Contact {APP_CONFIG.developerEmail}</span>
              </a>

              <a
                id="feedback-email-btn"
                href={`mailto:${APP_CONFIG.developerEmail}?subject=Expense%20Manager%20Feedback%20or%20Feature%20Request`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors border border-emerald-700"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Submit Feedback & Suggestions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
