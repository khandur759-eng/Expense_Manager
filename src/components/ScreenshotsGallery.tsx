import { useState } from 'react';
import {
  Wallet,
  Receipt,
  Smartphone,
  Trash2,
  CheckCircle2,
  Layers,
  Plus,
  Utensils,
  Bus,
  ShoppingBag,
  Home,
  MoreHorizontal,
} from 'lucide-react';

export default function ScreenshotsGallery() {
  const [activeWorkflow, setActiveWorkflow] = useState<number>(0);

  const workflows = [
    {
      title: 'Monthly Salary & Budget Meter',
      subtitle: 'Dynamic Budget Balancing in Real-Time',
      description:
        'Set your monthly income in seconds. The interactive progress bar monitors your spent percentage dynamically and calculates your exact remaining balance as you log transactions.',
      stats: [
        { label: 'Calculation Mode', value: 'Live Auto-Sum' },
        { label: 'Currency Support', value: 'INR (₹)' },
      ],
      highlights: [
        'Single-tap salary configuration with quick editing',
        'Visual progress bar dynamically shifts color on budget limits',
        'Instant remaining balance calculation with over-budget alerts',
      ],
      previewContent: {
        type: 'salary',
        salary: '₹50,000',
        spent: '₹18,380',
        remaining: '₹31,620',
        percentage: 37,
      },
    },
    {
      title: 'Quick 5-Second Expense Entry',
      subtitle: 'Fast Animated Bottom Sheet',
      description:
        'Log any expense immediately using pre-configured quick suggestion chips (+₹100, +₹500, +₹1,000, +₹2,000) and 6 essential categories with custom notes.',
      stats: [
        { label: 'Logging Speed', value: '< 5 seconds' },
        { label: 'Categories', value: '6 Built-in' },
      ],
      highlights: [
        'Quick amount suggestion chips for rapid entry',
        'Pre-configured categories: Food, Transport, Shopping, Bills, Rent & Others',
        'Optional descriptive notes for future reference',
      ],
      previewContent: {
        type: 'add',
        suggestedAmount: '₹1,450',
        selectedCategory: 'Food & Dining',
      },
    },
    {
      title: 'Recent Expense Ledger & Safe Delete',
      subtitle: 'Complete Control Over Every Record',
      description:
        'Browse every recorded transaction with clean category icons, timestamps, and amounts. Safeguard your data with confirmation dialogs before deleting single records or clearing history.',
      stats: [
        { label: 'Database Engine', value: 'Android Room' },
        { label: 'Protection', value: 'Guard Dialogs' },
      ],
      highlights: [
        'Organized list with category icons and timestamps',
        'Guarded single-item deletion dialogs prevent accidental taps',
        'One-click Clear All option to reset or start fresh',
      ],
      previewContent: {
        type: 'ledger',
        count: 5,
        totalSpent: '₹18,380',
      },
    },
    {
      title: 'Android Home Screen Shortcut',
      subtitle: 'Instant Pinned Launcher Access',
      description:
        'Add expenses directly without navigating through menus. Pin a dedicated launcher shortcut to your Android home screen to launch the Quick Add sheet with a single tap.',
      stats: [
        { label: 'Shortcut Type', value: 'Pinned Shortcut' },
        { label: 'Launch Time', value: 'Instant' },
      ],
      highlights: [
        'Pin directly from Android app info or long-press menu',
        'QuickAddExpenseActivity mode opens right into the entry sheet',
        'Automatically saves to local Room database and closes cleanly',
      ],
      previewContent: {
        type: 'shortcut',
        shortcutName: 'Add Expense',
        activity: 'QuickAddExpenseActivity',
      },
    },
  ];

  return (
    <section id="showcase-section" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            App Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Designed for Speed, Simplicity & Control
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Explore the core workflows built into the Expense Manager Android application.
          </p>
        </div>

        {/* Workflow Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 gap-1.5">
            {workflows.map((wf, idx) => (
              <button
                key={idx}
                id={`workflow-tab-${idx}`}
                onClick={() => setActiveWorkflow(idx)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeWorkflow === idx
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {wf.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Workflow Card */}
        {(() => {
          const current = workflows[activeWorkflow];
          return (
            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Workflow Details */}
                <div className="lg:col-span-6 space-y-5 text-left">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                      {current.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                      {current.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {current.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 py-2">
                    {current.stats.map((st, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                        <div className="text-xs text-slate-500">{st.label}</div>
                        <div className="text-lg font-bold text-slate-900 mt-0.5">{st.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {current.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Representation */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-md bg-slate-900 rounded-3xl p-6 text-white shadow-xl border border-slate-800 font-sans">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Layers className="w-3.5 h-3.5 text-emerald-400" />
                        Workflow {activeWorkflow + 1} of 4
                      </span>
                      <span className="font-mono text-[11px] text-emerald-400">ExpenseManager.apk</span>
                    </div>

                    {current.previewContent.type === 'salary' && (
                      <div className="space-y-3.5">
                        <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                              MONTHLY SALARY
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-slate-700 text-[10px] text-slate-300">
                              Active Budget
                            </span>
                          </div>
                          <div className="text-3xl font-black text-white mt-1">
                            {current.previewContent.salary}
                          </div>

                          <div className="mt-3">
                            <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                              <div
                                className="h-full bg-emerald-400 rounded-full"
                                style={{ width: `${current.previewContent.percentage}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs mt-2 text-slate-300">
                              <span>Spent {current.previewContent.percentage}% of budget</span>
                              <span className="text-emerald-400 font-semibold">
                                {current.previewContent.remaining} left
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 text-xs">
                          <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">TOTAL SPENT</span>
                            <p className="text-base font-bold text-white mt-0.5">{current.previewContent.spent}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">REMAINING</span>
                            <p className="text-base font-bold text-emerald-400 mt-0.5">{current.previewContent.remaining}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {current.previewContent.type === 'add' && (
                      <div className="space-y-3">
                        <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700">
                          <div className="flex items-center justify-between text-xs mb-2">
                            <span className="font-semibold text-white">Add Expense Sheet</span>
                            <span className="text-[10px] text-emerald-400 font-mono">Bottom Sheet</span>
                          </div>
                          <div className="h-10 rounded-xl bg-slate-900 border border-slate-700 px-3 flex items-center mb-2.5">
                            <span className="text-slate-400 font-bold mr-1.5">₹</span>
                            <span className="text-lg font-bold text-white">1,450</span>
                          </div>

                          <div className="grid grid-cols-3 gap-1.5 mb-3">
                            <span className="p-1.5 rounded-lg bg-slate-900 text-center text-[10px] text-emerald-400 font-bold border border-emerald-500/30">
                              Food & Dining
                            </span>
                            <span className="p-1.5 rounded-lg bg-slate-700/50 text-center text-[10px] text-slate-300">
                              Transport
                            </span>
                            <span className="p-1.5 rounded-lg bg-slate-700/50 text-center text-[10px] text-slate-300">
                              Shopping
                            </span>
                          </div>

                          <button className="w-full h-9 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5">
                            <Plus className="w-3.5 h-3.5" />
                            <span>Save Expense · ₹1,450</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {current.previewContent.type === 'ledger' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs px-1 text-slate-400">
                          <span className="uppercase text-[10px] tracking-wider font-semibold">RECENT TRANSACTIONS</span>
                          <span className="text-rose-400 text-[11px] font-medium">Clear All</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-emerald-400">
                              <Utensils className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white">₹1,450</div>
                              <div className="text-[10px] text-slate-400">Groceries & vegetables</div>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400">Today</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-emerald-400">
                              <Bus className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white">₹480</div>
                              <div className="text-[10px] text-slate-400">Metro card & commute</div>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400">Yesterday</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-emerald-400">
                              <Home className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white">₹12,500</div>
                              <div className="text-[10px] text-slate-400">Apartment rent & maintenance</div>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400">Aug 30</span>
                        </div>
                      </div>
                    )}

                    {current.previewContent.type === 'shortcut' && (
                      <div className="space-y-3.5 text-center">
                        <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700">
                          <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto text-white shadow-lg mb-3">
                            <Smartphone className="w-7 h-7" />
                          </div>
                          <h4 className="text-sm font-bold text-white">Expense Manager Shortcut</h4>
                          <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                            Pinned Android Launcher shortcut directly opens the quick transaction logging modal
                          </p>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-emerald-400 text-xs font-mono mt-3">
                            <span>QuickAddExpenseActivity</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
