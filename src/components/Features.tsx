import {
  ShieldCheck,
  ReceiptText,
  PieChart,
  Target,
  FileSpreadsheet,
  Smartphone,
  CheckCircle2,
  Lock,
  Zap,
  HardDriveDownload,
} from 'lucide-react';
import { CORE_FEATURES } from '../data/content';

export default function Features() {
  const iconMap: Record<string, typeof ShieldCheck> = {
    ShieldCheck,
    ReceiptText,
    PieChart,
    Target,
    FileSpreadsheet,
    Smartphone,
  };

  return (
    <section id="features-section" className="py-20 bg-slate-100/60 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Engineered For Daily Use
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Everything You Need To Master Spending,{' '}
            <span className="text-emerald-600">Zero Unnecessary Bloat</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Carefully crafted for Android users who prioritize speed, clear visual budgeting, and uncompromising data security.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_FEATURES.map((feature) => {
            const Icon = iconMap[feature.iconName] || ShieldCheck;
            return (
              <div
                key={feature.id}
                id={`feature-card-${feature.id}`}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-slate-200/90 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    {feature.badge && (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  {feature.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Architecture Spotlight: Local Privacy Box */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>100% Offline Local Architecture</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                No Cloud Accounts. No Passwords. No Data Leaks.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Conventional finance apps require bank logins, cloud accounts, and sync your financial transactions to remote servers where they can be profiled or breached. Expense Manager runs entirely sandboxed on your Android device. Your income, expenses, and savings remain exclusively yours.
              </p>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                <div className="text-2xl font-black text-emerald-400">0 KB</div>
                <div className="text-[11px] text-slate-300 font-medium mt-1">Data Uploaded to Cloud</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                <div className="text-2xl font-black text-emerald-400">100%</div>
                <div className="text-[11px] text-slate-300 font-medium mt-1">Offline Availability</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                <div className="text-2xl font-black text-emerald-400">0</div>
                <div className="text-[11px] text-slate-300 font-medium mt-1">Ads & Trackers</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                <div className="text-2xl font-black text-emerald-400">~8.2 MB</div>
                <div className="text-[11px] text-slate-300 font-medium mt-1">Lightweight APK</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
