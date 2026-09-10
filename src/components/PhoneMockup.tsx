import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Plus,
  X,
  RotateCcw,
  Maximize2,
  Minimize2,
  Smartphone,
  Check,
  Receipt,
  Utensils,
  Bus,
  ShoppingBag,
  Home,
  MoreHorizontal,
  Expand,
  Sparkles,
} from 'lucide-react';

export interface ExpenseItem {
  id: string;
  amount: number;
  category: 'Food' | 'Transport' | 'Shopping' | 'Bills' | 'Rent' | 'Other';
  note: string;
  date: string;
}

export interface CategoryDef {
  id: ExpenseItem['category'];
  label: string;
  icon: typeof Utensils;
  backgroundColor: string;
  iconColor: string;
}

export const EXPENSE_CATEGORIES: CategoryDef[] = [
  {
    id: 'Food',
    label: 'Food & Dining',
    icon: Utensils,
    backgroundColor: '#E0F2FE',
    iconColor: '#2563EB',
  },
  {
    id: 'Transport',
    label: 'Transportation',
    icon: Bus,
    backgroundColor: '#E8F5E9',
    iconColor: '#059669',
  },
  {
    id: 'Shopping',
    label: 'Shopping',
    icon: ShoppingBag,
    backgroundColor: '#F3E8FF',
    iconColor: '#9333EA',
  },
  {
    id: 'Bills',
    label: 'Bills & Utilities',
    icon: Receipt,
    backgroundColor: '#FFEDD5',
    iconColor: '#EA580C',
  },
  {
    id: 'Rent',
    label: 'Rent',
    icon: Home,
    backgroundColor: '#FEF3C7',
    iconColor: '#D97706',
  },
  {
    id: 'Other',
    label: 'Others',
    icon: MoreHorizontal,
    backgroundColor: '#F1F5F9',
    iconColor: '#64748B',
  },
];

const INITIAL_EXPENSES: ExpenseItem[] = [
  { id: 'e1', amount: 1450, category: 'Food', note: 'Groceries & organic vegetables', date: '2026-09-04' },
  { id: 'e2', amount: 480, category: 'Transport', note: 'Metro card refill & commute', date: '2026-09-03' },
  { id: 'e3', amount: 2600, category: 'Shopping', note: 'Ergonomic mouse & desk lamp', date: '2026-09-02' },
  { id: 'e4', amount: 1850, category: 'Bills', note: 'Broadband internet & mobile bill', date: '2026-09-01' },
  { id: 'e5', amount: 12500, category: 'Rent', note: 'Monthly housing & maintenance', date: '2026-08-30' },
];

function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatCompactInr(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}k`;
  }
  return `₹${amount}`;
}

function formatDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

// 3D Wallet Logo matching ic_app_wallet_logo.xml exactly
function WalletLogoIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Wallet Outer C-shaped Body */}
      <path
        d="M 14,9 L 37.25,9 C 38.8,9 40,10.2 40,11.75 C 40,13.3 38.8,14.5 37.25,14.5 L 22,14.5 C 20.3,14.5 19,15.8 19,17.5 L 19,30.5 C 19,32.2 20.3,33.5 22,33.5 L 37.25,33.5 C 38.8,33.5 40,34.7 40,36.25 C 40,37.8 38.8,39 37.25,39 L 14,39 C 10.7,39 8,36.3 8,33 L 8,15 C 8,11.7 10.7,9 14,9 Z"
        fill="#FFFFFF"
      />
      {/* Wallet Flap */}
      <path
        d="M 25,18.5 L 37.5,18.5 C 38.9,18.5 40,19.6 40,21 L 40,27 C 40,28.4 38.9,29.5 37.5,29.5 L 25,29.5 C 23.6,29.5 22.5,28.4 22.5,27 L 22.5,21 C 22.5,19.6 23.6,18.5 25,18.5 Z"
        fill="#FFFFFF"
      />
      {/* Snap Button */}
      <circle cx="31.25" cy="24" r="2.8" fill="#0A0F1D" />
    </svg>
  );
}

export default function PhoneMockup() {
  const [activeActivity, setActiveActivity] = useState<'main' | 'quick_add'>('main');
  const [viewMode, setViewMode] = useState<'phone' | 'expanded'>('phone');
  const [isFullscreenModal, setIsFullscreenModal] = useState<boolean>(false);
  const [salary, setSalary] = useState<number>(50000);
  const [isEditingSalary, setIsEditingSalary] = useState<boolean>(false);
  const [salaryInput, setSalaryInput] = useState<string>('50000');
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);

  // Add Expense Sheet State
  const [showAddSheet, setShowAddSheet] = useState<boolean>(false);
  const [amountInput, setAmountInput] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseItem['category']>('Food');
  const [noteInput, setNoteInput] = useState<string>('');

  // Bar Chart State
  const [selectedChartCategoryId, setSelectedChartCategoryId] = useState<string | null>(null);

  // Confirmation dialog states
  const [showClearAllConfirmation, setShowClearAllConfirmation] = useState<boolean>(false);
  const [expenseToDelete, setExpenseToDelete] = useState<ExpenseItem | null>(null);

  // Android Toast notification simulation
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const totalSpent = useMemo(() => expenses.reduce((sum, item) => sum + item.amount, 0), [expenses]);
  const remainingBalance = salary - totalSpent;
  const hasSalary = salary > 0 && !isEditingSalary;
  const spentPercentage = salary > 0 ? Math.min(Math.max(totalSpent / salary, 0), 1) : 0;
  const spentPercentText = Math.round(spentPercentage * 100);

  // Category Spend Aggregation for CategorySpendingBarChart
  const categoryDataList = useMemo(() => {
    const expenseMap = new Map<string, ExpenseItem[]>();
    expenses.forEach((item) => {
      const list = expenseMap.get(item.category) || [];
      list.push(item);
      expenseMap.set(item.category, list);
    });

    return EXPENSE_CATEGORIES.map((cat) => {
      const catExpenses = expenseMap.get(cat.id) || [];
      const sum = catExpenses.reduce((s, e) => s + e.amount, 0);
      const count = catExpenses.length;
      const pct = totalSpent > 0 ? (sum / totalSpent) * 100 : 0;
      return {
        category: cat,
        totalAmount: sum,
        count,
        percentage: pct,
      };
    });
  }, [expenses, totalSpent]);

  const maxCategoryAmount = useMemo(() => {
    const max = Math.max(...categoryDataList.map((d) => d.totalAmount), 0);
    return max > 0 ? max : 1000;
  }, [categoryDataList]);

  const selectedChartData = useMemo(() => {
    return categoryDataList.find((d) => d.category.id === selectedChartCategoryId);
  }, [selectedChartCategoryId, categoryDataList]);

  const handleSaveSalary = () => {
    const amt = parseInt(salaryInput, 10);
    if (!isNaN(amt) && amt > 0) {
      setSalary(amt);
      setIsEditingSalary(false);
      showToast(`Monthly salary updated to ${formatInr(amt)}`);
    }
  };

  const handleAddExpense = () => {
    const amt = parseInt(amountInput, 10);
    if (isNaN(amt) || amt <= 0) return;

    const today = new Date().toISOString().split('T')[0];
    const newExpense: ExpenseItem = {
      id: 'e_' + Date.now().toString().slice(-6),
      amount: amt,
      category: selectedCategory,
      note: noteInput.trim(),
      date: today,
    };

    setExpenses([newExpense, ...expenses]);
    setAmountInput('');
    setNoteInput('');
    setShowAddSheet(false);
    if (activeActivity === 'quick_add') {
      setActiveActivity('main');
    }
    showToast(`Expense recorded: ${formatInr(amt)} for ${selectedCategory}`);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
    setExpenseToDelete(null);
    showToast('Expense deleted');
  };

  const handleClearAll = () => {
    const count = expenses.length;
    setExpenses([]);
    setShowClearAllConfirmation(false);
    showToast(`Cleared ${count} expenses`);
  };

  const handleResetDemoData = () => {
    setSalary(50000);
    setExpenses(INITIAL_EXPENSES);
    setIsEditingSalary(false);
    setSelectedChartCategoryId(null);
    showToast('Demo data reset to default');
  };

  const handlePinShortcut = () => {
    showToast("Pinned 'Quick Expense' shortcut to home screen");
  };

  const getCategoryDef = (catId: string) => {
    return EXPENSE_CATEGORIES.find((c) => c.id === catId) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];
  };

  // Reusable core Jetpack Compose Screen Body
  const renderAppScreenContent = () => (
    <div className="relative w-full h-full bg-[#F8FAFC] flex flex-col font-sans select-none text-slate-900">
      {/* Android Status Bar */}
      <div className="h-8 px-6 pt-2 flex items-center justify-between text-[11px] font-medium text-slate-600 z-20 bg-[#F8FAFC]">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span>5G</span>
          <div className="w-4 h-2 rounded-[2px] border border-slate-500 p-[1px] flex items-center">
            <div className="h-full w-full bg-slate-900 rounded-[1px]"></div>
          </div>
        </div>
      </div>

      {/* Android Jetpack Compose Content Container */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-28 pt-2 text-xs scrollbar-thin scrollbar-thumb-slate-200">
        {/* Header matching ExpenseScreen.kt */}
        <div className="pt-2 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 3D Elevated Logo Tile Matching Reference */}
            <div className="w-11 h-11 rounded-[13px] bg-gradient-to-b from-[#161E2E] to-[#0A0F1D] border border-[#38455B]/60 shadow-[0_6px_16px_rgba(10,15,29,0.35)] flex items-center justify-center text-white flex-shrink-0">
              <WalletLogoIcon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#0F172A] leading-tight">Expense Manager</h3>
              <p className="text-[12px] font-semibold text-[#475569] mt-0.5">Monthly budget overview</p>
            </div>
          </div>

          {/* Badge */}
          <div className="h-8 px-3.5 rounded-full bg-white border border-[#CBD5E1] shadow-[0_2px_4px_rgba(15,23,42,0.06)] flex items-center justify-center text-[12px] font-bold text-[#1E293B]">
            {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
          </div>
        </div>

        {/* Monthly Salary Section (3D Card Effect) */}
        <div className="rounded-[20px] bg-white border border-[#CBD5E1] p-5 sm:p-6 mb-4 shadow-[0_6px_20px_rgba(15,23,42,0.07)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-[1.2px] text-[#475569] uppercase">
              MONTHLY SALARY
            </span>
            {hasSalary && (
              <button
                onClick={() => {
                  setSalaryInput(salary.toString());
                  setIsEditingSalary(true);
                }}
                className="h-7 px-3 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-[12px] font-bold text-[#1E293B] hover:bg-slate-200 transition-colors"
              >
                Edit
              </button>
            )}
          </div>

          <p className="text-[13px] font-medium text-[#334155] mt-1.5">
            Set your monthly income to track balance.
          </p>

          {hasSalary ? (
            <div className="mt-4">
              <div className="text-[32px] font-extrabold text-[#0F172A] tracking-tight leading-none">
                {formatInr(salary)}
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-[12px] font-bold text-[#1E293B] mb-2">
                  <span>Spent {spentPercentText}%</span>
                  <span className="font-semibold text-[#475569]">
                    {formatInr(totalSpent)} of {formatInr(salary)}
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#E2E8F0] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      spentPercentage >= 1 ? 'bg-[#DC2626]' : 'bg-[#0F172A]'
                    }`}
                    style={{ width: `${spentPercentage * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <div className="text-[12px] font-bold text-[#1E293B] mb-2">Enter Amount</div>
              <div className="flex items-center gap-2.5">
                <div className="flex-1 h-12 rounded-[12px] bg-[#F8FAFC] border border-[#CBD5E1] px-3.5 flex items-center shadow-inner">
                  <span className="text-base font-bold text-[#334155] mr-2">₹</span>
                  <input
                    type="number"
                    value={salaryInput}
                    onChange={(e) => setSalaryInput(e.target.value)}
                    placeholder="0"
                    className="w-full text-base font-semibold text-[#0F172A] bg-transparent focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleSaveSalary}
                  disabled={!salaryInput || parseInt(salaryInput, 10) <= 0}
                  className="h-12 px-4 rounded-[12px] bg-[#0F172A] hover:bg-slate-800 disabled:bg-slate-300 text-white font-semibold text-[13px] transition-colors shadow-md"
                >
                  Save Salary
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stat Cards Grid: Total Spent & Remaining Balance (3D Elevation) */}
        <div className="grid grid-cols-2 gap-3.5 mb-6">
          {/* Total Spent Card */}
          <div className="rounded-[18px] bg-white border border-[#CBD5E1] p-4 shadow-[0_5px_15px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] font-bold tracking-[1px] text-[#475569] uppercase">
              TOTAL SPENT
            </div>
            <div className="text-[22px] font-extrabold text-[#0F172A] mt-2.5 tracking-tight leading-tight">
              {totalSpent === 0 ? '₹0' : formatInr(totalSpent)}
            </div>
            <div className="inline-block mt-2 px-2 py-0.5 rounded-[8px] bg-[#F1F5F9] border border-[#E2E8F0] text-[11px] font-semibold text-[#334155]">
              {expenses.length} {expenses.length === 1 ? 'transaction' : 'transactions'}
            </div>
          </div>

          {/* Remaining Balance Card */}
          {(() => {
            const isNegative = remainingBalance < 0;
            const balanceColor = isNegative ? 'text-[#DC2626]' : 'text-[#059669]';
            const statusBg = isNegative ? 'bg-[#FEF2F2] border-red-200' : 'bg-[#ECFDF5] border-emerald-200';
            const statusColor = isNegative ? 'text-[#DC2626]' : 'text-[#059669]';
            const statusText = isNegative ? 'Over budget' : salary > 0 ? 'Available' : 'Set salary';

            return (
              <div className="rounded-[18px] bg-white border border-[#CBD5E1] p-4 shadow-[0_5px_15px_rgba(15,23,42,0.06)]">
                <div className="text-[11px] font-bold tracking-[1px] text-[#475569] uppercase">
                  REMAINING BALANCE
                </div>
                <div className={`text-[22px] font-extrabold mt-2.5 tracking-tight leading-tight ${balanceColor}`}>
                  {salary === 0 ? '₹0' : formatInr(remainingBalance)}
                </div>
                <div className={`inline-block mt-2 px-2 py-0.5 rounded-[8px] border text-[11px] font-bold ${statusBg} ${statusColor}`}>
                  {statusText}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Expenses Section Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-[15px] font-bold text-[#0F172A]">Expenses</div>
          {expenses.length > 0 && (
            <button
              onClick={() => setShowClearAllConfirmation(true)}
              className="text-[12px] font-semibold text-[#475569] hover:text-red-600 transition-colors p-1"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Expense List (3D Elevated Container matching ExpenseScreen.kt) */}
        {expenses.length === 0 ? (
          <div className="rounded-[18px] bg-white border border-[#CBD5E1] p-8 text-center shadow-[0_4px_12px_rgba(15,23,42,0.05)] mb-6">
            <div className="w-12 h-12 rounded-[14px] bg-[#F1F5F9] border border-[#CBD5E1] flex items-center justify-center mx-auto text-[#475569]">
              <Receipt className="w-5 h-5" />
            </div>
            <p className="text-[13px] font-bold text-[#0F172A] mt-3.5">
              No expenses yet. Tap Add Expense to get started.
            </p>
            <p className="text-[12px] font-medium text-[#475569] mt-1">
              Your transactions will appear here.
            </p>
          </div>
        ) : (
          <div className="rounded-[18px] bg-white border border-[#CBD5E1] shadow-[0_4px_14px_rgba(15,23,42,0.06)] overflow-hidden mb-6 divide-y divide-[#E2E8F0]">
            {expenses.map((expense) => {
              const cat = getCategoryDef(expense.category);
              const Icon = cat.icon;
              return (
                <div
                  key={expense.id}
                  className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
                >
                  {/* Category Icon Box with custom category background and icon tint */}
                  <div
                    className="w-11 h-11 rounded-[14px] border flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: cat.backgroundColor,
                      borderColor: `${cat.iconColor}55`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: cat.iconColor }} />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-semibold text-[#0F172A] leading-snug">
                      {cat.label}
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] text-[#475569] mt-0.5 truncate">
                      {expense.note && (
                        <>
                          <span className="text-[#334155] font-medium truncate">{expense.note}</span>
                          <span className="text-[#64748B]">·</span>
                        </>
                      )}
                      <span className="text-[#475569] flex-shrink-0">{formatDate(expense.date)}</span>
                    </div>
                  </div>

                  {/* Amount and delete */}
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-[15px] font-bold text-[#0F172A]">
                      {formatInr(expense.amount)}
                    </span>
                    <button
                      onClick={() => setExpenseToDelete(expense)}
                      className="w-6 h-6 rounded-[6px] hover:bg-red-50 flex items-center justify-center text-[#64748B] hover:text-red-600 transition-colors"
                      title="Remove expense"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Buttons: Add Expense FAB + Quick Shortcut */}
        <div className="space-y-3 mb-8">
          <button
            onClick={() => setShowAddSheet(true)}
            className="w-full h-14 rounded-[16px] bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(15,23,42,0.25)] active:scale-[0.99] transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Add Expense</span>
          </button>

          <button
            onClick={handlePinShortcut}
            className="w-full h-12 rounded-[14px] bg-white hover:bg-slate-50 border border-[#CBD5E1] text-[#1E293B] font-semibold text-[13px] flex items-center justify-center gap-2 shadow-[0_2px_6px_rgba(15,23,42,0.06)] active:scale-[0.99] transition-all"
          >
            <span>Add 'Quick Expense' to Home Screen</span>
          </button>
        </div>

        {/* Monthly Spending Breakdown by Category (CategorySpendingBarChart.kt) */}
        <div className="rounded-[22px] bg-white border border-[#CBD5E1] p-5 sm:p-6 shadow-[0_6px_22px_rgba(15,23,42,0.08)] mb-6">
          <div className="text-[11px] font-bold tracking-[1.2px] text-[#475569] uppercase mb-3.5">
            MONTHLY SPENDING
          </div>

          {/* Recharts-Style Interactive Tooltip Box */}
          {selectedChartData && selectedChartData.totalAmount > 0 && (
            <div className="mb-3 rounded-[14px] bg-[#0F172A] p-3 text-white flex items-center justify-between shadow-lg animate-fadeIn">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: selectedChartData.category.iconColor }}
                ></div>
                <div>
                  <div className="text-[12px] font-semibold text-slate-200">
                    {selectedChartData.category.label}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[15px] font-bold text-white">
                      {formatInr(selectedChartData.totalAmount)}
                    </span>
                    <span className="text-[11px] font-medium text-slate-300">
                      • {selectedChartData.percentage.toFixed(1)}% ({selectedChartData.count} txns)
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedChartCategoryId(null)}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {expenses.length === 0 ? (
            /* Faint Ghost Bars Preview */
            <div className="py-2">
              <div className="relative h-32 w-full border-b border-[#CBD5E1]">
                <div className="absolute top-1/2 left-0 right-0 border-b border-dashed border-[#CBD5E1]"></div>
                <div className="h-full flex items-end justify-between px-2">
                  {[0.45, 0.7, 0.3, 0.85, 0.5, 0.25].map((frac, idx) => {
                    const cat = EXPENSE_CATEGORIES[idx];
                    return (
                      <div key={idx} className="flex-1 flex justify-center">
                        <div
                          className="w-7 rounded-t-lg transition-all"
                          style={{
                            height: `${frac * 100}%`,
                            backgroundColor: `${cat.iconColor}22`,
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-[11px] text-center text-[#64748B] font-medium mt-3">
                Log expenses to unlock interactive spending analytics
              </p>
            </div>
          ) : (
            <div>
              {/* Interactive Bar Chart Canvas */}
              <div className="relative h-44 w-full pt-4">
                {/* 100% dashed line */}
                <div className="absolute top-4 left-0 right-0 border-b border-dashed border-[#CBD5E1]"></div>
                {/* 50% dashed line */}
                <div className="absolute top-[55%] left-0 right-0 border-b border-dashed border-[#CBD5E1]"></div>
                {/* Baseline */}
                <div className="absolute bottom-0 left-0 right-0 border-b-2 border-[#94A3B8]"></div>

                {/* Bars Row */}
                <div className="relative h-full flex items-end justify-between px-1">
                  {categoryDataList.map((item) => {
                    const isSelected = selectedChartCategoryId === item.category.id;
                    const isAnySelected = selectedChartCategoryId !== null;
                    const hasSpend = item.totalAmount > 0;
                    const fraction = hasSpend
                      ? Math.min(Math.max(item.totalAmount / maxCategoryAmount, 0.05), 1)
                      : 0.03;

                    const barAlpha = !hasSpend ? 0.35 : !isAnySelected || isSelected ? 1 : 0.45;

                    return (
                      <div
                        key={item.category.id}
                        onClick={() => {
                          if (hasSpend) {
                            setSelectedChartCategoryId(isSelected ? null : item.category.id);
                          }
                        }}
                        className={`flex-1 flex flex-col items-center justify-end h-full cursor-pointer group`}
                      >
                        {/* Compact value label above bar */}
                        {isSelected && hasSpend && (
                          <span
                            className="text-[10px] font-bold mb-1"
                            style={{ color: item.category.iconColor }}
                          >
                            {formatCompactInr(item.totalAmount)}
                          </span>
                        )}

                        {/* Bar Pillar */}
                        <div
                          className={`w-7 sm:w-8 rounded-t-lg transition-all duration-300 ${
                            isSelected ? 'ring-2 ring-[#0F172A] scale-[1.03]' : ''
                          }`}
                          style={{
                            height: `${fraction * 82}%`,
                            background: hasSpend
                              ? `linear-gradient(to bottom, ${item.category.iconColor}, ${item.category.iconColor}B0)`
                              : '#E2E8F0',
                            opacity: barAlpha,
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* X-Axis Category Icons & Labels */}
              <div className="flex items-center justify-between px-1 mt-2.5">
                {categoryDataList.map((item) => {
                  const isSelected = selectedChartCategoryId === item.category.id;
                  const Icon = item.category.icon;
                  return (
                    <div
                      key={item.category.id}
                      onClick={() => {
                        if (item.totalAmount > 0) {
                          setSelectedChartCategoryId(isSelected ? null : item.category.id);
                        }
                      }}
                      className="flex-1 flex flex-col items-center cursor-pointer"
                    >
                      <div
                        className="w-6 h-6 rounded-[7px] flex items-center justify-center transition-colors"
                        style={{
                          backgroundColor: isSelected
                            ? item.category.iconColor
                            : item.category.backgroundColor,
                        }}
                      >
                        <Icon
                          className="w-3.5 h-3.5"
                          style={{
                            color: isSelected ? '#FFFFFF' : item.category.iconColor,
                          }}
                        />
                      </div>
                      <span
                        className={`text-[10px] mt-1 truncate max-w-[44px] text-center ${
                          isSelected
                            ? 'font-bold text-[#0F172A]'
                            : 'font-semibold text-[#475569]'
                        }`}
                      >
                        {item.category.id}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Category Breakdown Progress Bars Details */}
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-[#475569] uppercase mb-2">
                  <span>BREAKDOWN SUMMARY</span>
                  <span className="font-semibold text-slate-500">
                    {categoryDataList.filter((c) => c.totalAmount > 0).length} categories
                  </span>
                </div>

                {categoryDataList
                  .filter((c) => c.totalAmount > 0)
                  .sort((a, b) => b.totalAmount - a.totalAmount)
                  .map((item) => {
                    const isSelected = selectedChartCategoryId === item.category.id;
                    const Icon = item.category.icon;
                    return (
                      <div
                        key={item.category.id}
                        onClick={() =>
                          setSelectedChartCategoryId(isSelected ? null : item.category.id)
                        }
                        className={`p-2 rounded-[12px] flex items-center gap-3 transition-colors cursor-pointer ${
                          isSelected ? 'bg-slate-100 ring-1 ring-[#CBD5E1]' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: item.category.backgroundColor }}
                        >
                          <Icon className="w-4 h-4" style={{ color: item.category.iconColor }} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-[13px] font-semibold text-[#1E293B]">
                            <span>{item.category.label}</span>
                            <span className="font-bold text-[#0F172A]">
                              {formatInr(item.totalAmount)}
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden mt-1.5">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${item.percentage}%`,
                                backgroundColor: item.category.iconColor,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="w-12 text-center py-0.5 rounded-[6px] bg-[#F1F5F9] border border-[#E2E8F0] text-[11px] font-bold text-[#334155] flex-shrink-0">
                          {Math.round(item.percentage)}%
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Android System Navigation Pill */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-400 rounded-full z-20 pointer-events-none opacity-80"></div>

      {/* Add Expense Dialog / Full Screen Sheet (AddExpenseSheet.kt) */}
      {(showAddSheet || activeActivity === 'quick_add') && (
        <div className="absolute inset-0 z-40 bg-black/50 flex flex-col justify-end backdrop-blur-[2px] animate-fadeIn">
          <div className="bg-white rounded-t-[24px] sm:rounded-t-[28px] p-5 max-h-[92%] overflow-y-auto border-t border-[#CBD5E1] shadow-2xl animate-slideUp">
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#E2E8F0]">
              <div>
                <span className="text-[11px] font-semibold tracking-[1px] text-[#64748B] uppercase block">
                  ADD EXPENSE
                </span>
                <h4 className="text-[18px] font-semibold text-[#0F172A] mt-0.5">
                  Enter Amount
                </h4>
              </div>
              <button
                onClick={() => {
                  setShowAddSheet(false);
                  if (activeActivity === 'quick_add') {
                    setActiveActivity('main');
                  }
                }}
                className="w-9 h-9 rounded-[12px] bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-center text-[#334155] hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Amount Input */}
            <div className="mt-4">
              <label className="text-[12px] font-semibold text-[#1E293B] block mb-2">
                Amount (₹)
              </label>
              <div className="h-14 rounded-[12px] bg-white border-[1.2px] border-[#CBD5E1] px-4 flex items-center shadow-sm focus-within:border-slate-900 focus-within:ring-2 focus-within:ring-slate-900/10 transition-all">
                <span className="text-[20px] font-bold text-[#334155] mr-3">₹</span>
                <input
                  type="number"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  placeholder="0"
                  autoFocus
                  className="w-full text-[22px] font-semibold text-[#0F172A] bg-transparent focus:outline-none placeholder:text-slate-400"
                />
              </div>

              {/* Quick Amount Suggestion Chips */}
              <div className="flex items-center gap-2 mt-2.5 overflow-x-auto pb-1">
                {[100, 500, 1000, 2000].map((quickAmt) => (
                  <button
                    key={quickAmt}
                    onClick={() => setAmountInput(quickAmt.toString())}
                    className="px-3 py-1.5 rounded-[10px] bg-[#F1F5F9] hover:bg-slate-200 text-[#334155] text-[11px] font-semibold transition-colors flex-shrink-0 border border-[#E2E8F0]"
                  >
                    +₹{quickAmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Category: 2 Columns matching AddExpenseSheet.kt CategoryButton */}
            <div className="mt-5">
              <label className="text-[12px] font-semibold text-[#1E293B] block mb-2.5">
                Select Category
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {EXPENSE_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`h-14 px-3 rounded-[14px] border-[1.2px] flex items-center gap-2.5 text-left transition-all ${
                        isSelected
                          ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-md'
                          : 'bg-white border-[#CBD5E1] text-[#1E293B] hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{
                          backgroundColor: isSelected ? cat.iconColor : cat.backgroundColor,
                        }}
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: isSelected ? '#FFFFFF' : cat.iconColor }}
                        />
                      </div>
                      <span className="text-[13px] font-semibold truncate leading-tight">
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Note (optional) input */}
            <div className="mt-4">
              <label className="text-[12px] font-semibold text-[#1E293B] block mb-2">
                Note (optional)
              </label>
              <div className="h-12 rounded-[12px] bg-white border-[1.2px] border-[#CBD5E1] px-3.5 flex items-center shadow-sm">
                <input
                  type="text"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="e.g. Groceries, Fuel, Rent"
                  className="w-full text-[14px] font-medium text-[#0F172A] bg-transparent focus:outline-none placeholder:text-[#64748B]"
                />
              </div>
            </div>

            {/* Bottom action buttons */}
            <div className="mt-5 pt-3.5 border-t border-[#E2E8F0] flex items-center gap-3">
              <button
                onClick={() => {
                  setShowAddSheet(false);
                  if (activeActivity === 'quick_add') {
                    setActiveActivity('main');
                  }
                }}
                className="flex-1 h-12 rounded-[12px] bg-[#F8FAFC] hover:bg-slate-100 border-[1.2px] border-[#CBD5E1] text-[#1E293B] font-semibold text-[14px] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExpense}
                disabled={!amountInput || parseInt(amountInput, 10) <= 0}
                className="flex-[1.3] h-12 rounded-[12px] bg-[#0F172A] hover:bg-slate-800 disabled:bg-slate-400 text-white font-semibold text-[13px] transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Save Expense</span>
                {amountInput && parseInt(amountInput, 10) > 0 && (
                  <span className="text-slate-300 font-normal">
                    · {formatInr(parseInt(amountInput, 10))}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Single Expense Deletion (AlertDialog) */}
      {expenseToDelete && (
        <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-[1px]">
          <div className="bg-white rounded-[16px] p-5 w-full max-w-[310px] shadow-2xl border border-[#CBD5E1] text-left animate-scaleIn">
            <h4 className="text-[18px] font-semibold text-[#0F172A]">Delete expense?</h4>
            <p className="text-[14px] text-[#334155] mt-2 leading-relaxed">
              Are you sure you want to delete the {formatInr(expenseToDelete.amount)} expense for{' '}
              {expenseToDelete.category}
              {expenseToDelete.note ? ` ("${expenseToDelete.note}")` : ''}?
            </p>
            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setExpenseToDelete(null)}
                className="px-3.5 py-2 text-[13px] font-semibold text-[#334155] hover:text-slate-900 rounded-[10px]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteExpense(expenseToDelete.id)}
                className="px-4 py-2 text-[13px] font-semibold text-white bg-[#DC2626] hover:bg-red-700 rounded-[10px] shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Clear All (AlertDialog) */}
      {showClearAllConfirmation && (
        <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-[1px]">
          <div className="bg-white rounded-[16px] p-5 w-full max-w-[310px] shadow-2xl border border-[#CBD5E1] text-left animate-scaleIn">
            <h4 className="text-[18px] font-semibold text-[#0F172A]">Clear all expenses?</h4>
            <p className="text-[14px] text-[#334155] mt-2 leading-relaxed">
              Are you sure you want to delete all {expenses.length} expenses? This action cannot be undone.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowClearAllConfirmation(false)}
                className="px-3.5 py-2 text-[13px] font-semibold text-[#334155] hover:text-slate-900 rounded-[10px]"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-[13px] font-semibold text-white bg-[#DC2626] hover:bg-red-700 rounded-[10px] shadow-sm"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Realistic Android Toast Notification Pill */}
      {toastMessage && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#1E293B]/95 text-white text-[12px] font-medium shadow-xl border border-slate-700/50 backdrop-blur-sm pointer-events-none animate-fadeIn whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </div>
  );

  return (
    <div id="phone-mockup-wrapper" className="flex flex-col items-center w-full">
      {/* Interactive Toolbar & Controls */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2.5 p-2 bg-slate-200/80 rounded-2xl mb-4 border border-slate-300 text-xs font-semibold shadow-sm">
        {/* Activity Mode Switcher matching Android Repo architecture */}
        <div className="flex items-center gap-1.5">
          <button
            id="switch-main-activity-btn"
            onClick={() => {
              setActiveActivity('main');
              setShowAddSheet(false);
            }}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeActivity === 'main' && !showAddSheet
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-950 bg-white/50'
            }`}
          >
            MainActivity
          </button>
          <button
            id="switch-quick-add-btn"
            onClick={() => {
              setActiveActivity('quick_add');
              setShowAddSheet(true);
            }}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeActivity === 'quick_add' || showAddSheet
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-950 bg-white/50'
            }`}
          >
            QuickAdd Sheet
          </button>
        </div>

        {/* View Layout Controls (Bigger Phone Frame / Full Screen Mode) */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={() => setViewMode(viewMode === 'phone' ? 'expanded' : 'phone')}
            title={viewMode === 'phone' ? 'Expand to Full Screen View' : 'Switch to Phone Bezel'}
            className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700 hover:text-slate-900 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 transition-colors shadow-xs"
          >
            {viewMode === 'phone' ? (
              <>
                <Expand className="w-3.5 h-3.5 text-emerald-600" />
                <span>Screen Size</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-slate-700" />
                <span>Phone Frame</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsFullscreenModal(true)}
            title="Launch Fullscreen Demo"
            className="flex items-center gap-1 text-[11px] font-medium text-slate-700 hover:text-slate-900 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 transition-colors shadow-xs"
          >
            <Maximize2 className="w-3 h-3" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>

          <button
            onClick={handleResetDemoData}
            title="Reset Interactive Preview"
            className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 px-2 py-1.5 rounded-xl hover:bg-slate-300/60 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Main Demo Display: Phone Frame vs Expanded Screen Size */}
      {viewMode === 'phone' ? (
        /* Realistic Android Hardware Frame (Now Larger: 440px - 480px width, 880px height) */
        <div
          id="android-phone-frame"
          className="relative w-full max-w-[440px] sm:max-w-[470px] md:max-w-[490px] h-[820px] sm:h-[880px] bg-slate-950 rounded-[48px] p-3 sm:p-3.5 shadow-2xl ring-1 ring-slate-800 border-[5px] border-slate-700/80 transition-all duration-300"
        >
          {/* Front Camera Punchhole */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
            <div className="w-4 h-4 bg-slate-950 rounded-full border border-slate-800 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
            </div>
          </div>

          {/* Screen Window */}
          <div className="relative w-full h-full rounded-[38px] overflow-hidden">
            {renderAppScreenContent()}
          </div>
        </div>
      ) : (
        /* Expanded Full Screen Container (Spans size of screen for that section) */
        <div
          id="android-expanded-screen-frame"
          className="relative w-full max-w-2xl h-[820px] sm:h-[880px] bg-white rounded-3xl border-2 border-slate-300 shadow-2xl overflow-hidden transition-all duration-300 ring-1 ring-slate-200"
        >
          {renderAppScreenContent()}
        </div>
      )}

      {/* Caption & Repo Architecture Note under phone */}
      <div className="text-center mt-3.5 text-slate-500 text-xs">
        <p className="font-semibold text-slate-800">
          Interactive Live Demo • Repository Jetpack Compose Architecture
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Faithful implementation of <span className="font-mono text-slate-700">ExpenseScreen.kt</span>,{' '}
          <span className="font-mono text-slate-700">CategorySpendingBarChart.kt</span>, &{' '}
          <span className="font-mono text-slate-700">AddExpenseSheet.kt</span>
        </p>
      </div>

      {/* Fullscreen Modal View Mode (100% Viewport Experience) */}
      {isFullscreenModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-6 animate-fadeIn">
          <div className="w-full max-w-[500px] flex items-center justify-between text-white pb-3 px-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="font-bold text-sm tracking-tight">Expense Manager • Fullscreen Demo</span>
            </div>
            <button
              onClick={() => setIsFullscreenModal(false)}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-xs"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Exit Fullscreen</span>
            </button>
          </div>

          <div className="relative w-full max-w-[480px] h-[92vh] max-h-[920px] bg-slate-950 rounded-[44px] p-3 shadow-2xl border-4 border-slate-700">
            {/* Camera Hole */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
              <div className="w-3.5 h-3.5 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
              </div>
            </div>
            <div className="relative w-full h-full rounded-[34px] overflow-hidden">
              {renderAppScreenContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
