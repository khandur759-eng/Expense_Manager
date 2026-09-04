import { useState } from 'react';
import {
  Wallet,
  Plus,
  X,
  Trash2,
  Utensils,
  Bus,
  ShoppingBag,
  Receipt,
  Home,
  MoreHorizontal,
  RotateCcw,
  Sparkles,
  Smartphone,
  Check,
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
}

export const EXPENSE_CATEGORIES: CategoryDef[] = [
  { id: 'Food', label: 'Food & Dining', icon: Utensils },
  { id: 'Transport', label: 'Transportation', icon: Bus },
  { id: 'Shopping', label: 'Shopping', icon: ShoppingBag },
  { id: 'Bills', label: 'Bills & Utilities', icon: Receipt },
  { id: 'Rent', label: 'Rent', icon: Home },
  { id: 'Other', label: 'Others', icon: MoreHorizontal },
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

function formatDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

export default function PhoneMockup() {
  const [activeActivity, setActiveActivity] = useState<'main' | 'quick_add'>('main');
  const [salary, setSalary] = useState<number>(50000);
  const [isEditingSalary, setIsEditingSalary] = useState<boolean>(false);
  const [salaryInput, setSalaryInput] = useState<string>('50000');
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);

  // Add Expense Sheet State
  const [showAddSheet, setShowAddSheet] = useState<boolean>(false);
  const [amountInput, setAmountInput] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseItem['category']>('Food');
  const [noteInput, setNoteInput] = useState<string>('');

  // Confirmation dialog states
  const [showClearAllConfirmation, setShowClearAllConfirmation] = useState<boolean>(false);
  const [expenseToDelete, setExpenseToDelete] = useState<ExpenseItem | null>(null);

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remainingBalance = salary - totalSpent;
  const hasSalary = salary > 0 && !isEditingSalary;
  const spentPercentage = salary > 0 ? Math.min(Math.max(totalSpent / salary, 0), 1) : 0;
  const spentPercentText = Math.round(spentPercentage * 100);

  const handleSaveSalary = () => {
    const amt = parseInt(salaryInput, 10);
    if (!isNaN(amt) && amt > 0) {
      setSalary(amt);
      setIsEditingSalary(false);
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
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
    setExpenseToDelete(null);
  };

  const handleClearAll = () => {
    setExpenses([]);
    setShowClearAllConfirmation(false);
  };

  const handleResetDemoData = () => {
    setSalary(50000);
    setExpenses(INITIAL_EXPENSES);
    setIsEditingSalary(false);
  };

  const getCategoryDef = (catId: string) => {
    return EXPENSE_CATEGORIES.find((c) => c.id === catId) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];
  };

  return (
    <div id="phone-mockup-wrapper" className="flex flex-col items-center w-full max-w-sm mx-auto">
      {/* Activity Mode Switcher matching Android Repo architecture */}
      <div className="w-full flex items-center justify-between gap-2 px-2 py-1.5 bg-slate-200/90 rounded-2xl mb-4 border border-slate-300 text-xs font-semibold">
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
                : 'text-slate-700 hover:text-slate-950'
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
                : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            QuickAdd Sheet
          </button>
        </div>

        <button
          onClick={handleResetDemoData}
          title="Reset Interactive Preview"
          className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 px-2 py-1 rounded-lg hover:bg-slate-300/60 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Realistic Android Hardware Frame */}
      <div
        id="android-phone-frame"
        className="relative w-[320px] sm:w-[350px] h-[670px] bg-slate-950 rounded-[44px] p-3 shadow-2xl ring-1 ring-slate-800 border-4 border-slate-700/80 transition-all"
      >
        {/* Front Camera Punchhole */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
          <div className="w-3.5 h-3.5 bg-slate-950 rounded-full border border-slate-800 shadow-inner flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
          </div>
        </div>

        {/* Screen Window */}
        <div className="relative w-full h-full bg-white rounded-[34px] overflow-hidden flex flex-col font-sans select-none text-slate-900">
          {/* Android Status Bar */}
          <div className="h-8 px-6 pt-2 flex items-center justify-between text-[11px] font-medium text-slate-600 z-20 bg-white">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <div className="w-4 h-2 rounded-[2px] border border-slate-500 p-[1px] flex items-center">
                <div className="h-full w-full bg-slate-900 rounded-[1px]"></div>
              </div>
            </div>
          </div>

          {/* Android Jetpack Compose Content Container */}
          <div className="flex-1 overflow-y-auto px-4 pb-20 pt-2 text-xs scrollbar-none relative">
            {/* Top Bar matching ExpenseScreen.kt */}
            <div className="pt-2 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                  <Wallet className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 leading-tight">Expense Manager</h3>
                  <p className="text-[11px] font-medium text-slate-500">Monthly budget overview</p>
                </div>
              </div>

              <div className="h-7 px-2.5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[11px] font-medium text-slate-600">
                {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
              </div>
            </div>

            <div className="h-px bg-slate-100 mb-3.5"></div>

            {/* Monthly Salary Section */}
            <div className="rounded-xl bg-white border border-slate-200 p-3.5 mb-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              <div className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">MONTHLY SALARY</div>
              <div className="text-[11px] font-medium text-slate-600 mt-0.5">Set your monthly income to track balance.</div>

              {hasSalary ? (
                <div className="mt-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl font-semibold text-slate-900 tracking-tight">
                      {formatInr(salary)}
                    </span>
                    <button
                      onClick={() => {
                        setSalaryInput(salary.toString());
                        setIsEditingSalary(true);
                      }}
                      className="h-6 px-2.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          spentPercentage >= 1 ? 'bg-red-600' : 'bg-slate-900'
                        }`}
                        style={{ width: `${spentPercentage * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 mt-1.5">
                      <span>Spent {spentPercentText}% of budget</span>
                      <span className={remainingBalance < 0 ? 'text-red-600 font-semibold' : 'text-emerald-700 font-semibold'}>
                        {remainingBalance >= 0 ? `${formatInr(remainingBalance)} left` : `${formatInr(Math.abs(remainingBalance))} over`}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-2.5">
                  <div className="text-[11px] font-medium text-slate-700 mb-1.5">Enter Amount</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-9 rounded-xl bg-white border border-slate-200 px-2.5 flex items-center">
                      <span className="text-slate-400 font-medium mr-1.5 text-xs">₹</span>
                      <input
                        type="number"
                        value={salaryInput}
                        onChange={(e) => setSalaryInput(e.target.value)}
                        placeholder="0"
                        className="w-full text-xs font-semibold text-slate-900 bg-transparent focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={handleSaveSalary}
                      className="h-9 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-[11px] transition-colors"
                    >
                      Save Salary
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Stat Cards Grid (Total Spent & Remaining Balance) */}
            <div className="grid grid-cols-2 gap-2.5 mb-3.5">
              {/* Total Spent */}
              <div className="rounded-xl bg-white border border-slate-200 p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">TOTAL SPENT</div>
                <div className="text-base font-semibold text-slate-900 mt-1 tracking-tight">
                  {formatInr(totalSpent)}
                </div>
                <div className="text-[10px] font-medium text-slate-500 mt-0.5">
                  {expenses.length} {expenses.length === 1 ? 'transaction' : 'transactions'}
                </div>
              </div>

              {/* Remaining Balance */}
              <div className="rounded-xl bg-white border border-slate-200 p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">REMAINING BALANCE</div>
                <div
                  className={`text-base font-semibold mt-1 tracking-tight ${
                    remainingBalance < 0 ? 'text-red-600' : 'text-emerald-700'
                  }`}
                >
                  {formatInr(remainingBalance)}
                </div>
                <div className="text-[10px] font-medium text-slate-500 mt-0.5">
                  {remainingBalance >= 0 ? 'Within budget' : 'Over budget'}
                </div>
              </div>
            </div>

            {/* Recent Expenses List Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">RECENT EXPENSES</div>
              {expenses.length > 0 && (
                <button
                  onClick={() => setShowClearAllConfirmation(true)}
                  className="text-[11px] font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Expenses List */}
            {expenses.length === 0 ? (
              <div className="p-6 rounded-xl border border-dashed border-slate-200 text-center text-slate-500 my-4">
                <p className="text-xs">No expenses recorded yet.</p>
                <p className="text-[11px] text-slate-400 mt-1">Tap '+ Add Expense' below to log your first transaction.</p>
              </div>
            ) : (
              <div className="space-y-2 pb-2">
                {expenses.map((expense) => {
                  const cat = getCategoryDef(expense.category);
                  const Icon = cat.icon;
                  return (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)] gap-2.5"
                    >
                      {/* Category Icon */}
                      <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-semibold text-slate-900">
                            {formatInr(expense.amount)}
                          </span>
                          <span className="px-1.5 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-medium text-slate-600">
                            {cat.label}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                          {expense.note ? expense.note : cat.label}
                          <span className="text-slate-400"> · {formatDate(expense.date)}</span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => setExpenseToDelete(expense)}
                        className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-red-50 hover:border-red-200 flex items-center justify-center text-slate-400 hover:text-red-600 transition-colors flex-shrink-0"
                        title="Delete expense"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sticky Bottom Add Expense Button (ExpenseScreen.kt bottom bar) */}
          <div className="absolute bottom-3 inset-x-3 z-20 bg-white/95 backdrop-blur-sm pt-1 pb-1">
            <button
              onClick={() => {
                setShowAddSheet(true);
                setActiveActivity('main');
              }}
              className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-[0.99] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Expense</span>
            </button>
          </div>

          {/* Add Expense Bottom Sheet Modal (AddExpenseSheet.kt) */}
          {showAddSheet && (
            <div className="absolute inset-0 z-40 bg-black/40 flex flex-col justify-end backdrop-blur-[2px] animate-fadeIn">
              <div className="bg-white rounded-t-3xl p-4 max-h-[92%] overflow-y-auto border-t border-slate-200 shadow-2xl animate-slideUp">
                {/* Sheet Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Add Expense</h4>
                    <p className="text-[11px] text-slate-500">Log a new transaction to track spending</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowAddSheet(false);
                      setActiveActivity('main');
                    }}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Amount Input */}
                <div className="mt-3">
                  <label className="text-[11px] font-medium text-slate-700 block mb-1">Amount</label>
                  <div className="h-12 rounded-xl bg-white border border-slate-200 px-3 flex items-center shadow-sm">
                    <span className="text-base font-semibold text-slate-400 mr-2">₹</span>
                    <input
                      type="number"
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                      placeholder="0"
                      autoFocus
                      className="w-full text-lg font-semibold text-slate-900 bg-transparent focus:outline-none"
                    />
                  </div>

                  {/* Quick Amount Suggestion Chips */}
                  <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1">
                    {[100, 500, 1000, 2000].map((quickAmt) => (
                      <button
                        key={quickAmt}
                        onClick={() => setAmountInput(quickAmt.toString())}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold transition-colors flex-shrink-0"
                      >
                        +₹{quickAmt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Selector (2 Columns matching Jetpack Compose grid) */}
                <div className="mt-3.5">
                  <label className="text-[11px] font-medium text-slate-700 block mb-2">Select Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {EXPENSE_CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`h-11 px-2.5 rounded-xl border flex items-center gap-2 text-left transition-all ${
                            isSelected
                              ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-white' : 'text-slate-600'}`} />
                          <span className="text-[11px] font-medium truncate">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Note Input */}
                <div className="mt-3.5">
                  <label className="text-[11px] font-medium text-slate-700 block mb-1">Note (optional)</label>
                  <div className="h-10 rounded-xl bg-white border border-slate-200 px-3 flex items-center">
                    <input
                      type="text"
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      placeholder="e.g. Groceries, Fuel, Rent"
                      className="w-full text-xs text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShowAddSheet(false);
                      setActiveActivity('main');
                    }}
                    className="flex-1 h-10 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddExpense}
                    disabled={!amountInput || parseInt(amountInput, 10) <= 0}
                    className="flex-[1.4] h-10 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Save Expense</span>
                    {amountInput && parseInt(amountInput, 10) > 0 && (
                      <span className="text-[10px] text-slate-300">· ₹{amountInput}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Single Expense Confirmation Dialog (ExpenseScreen.kt) */}
          {expenseToDelete && (
            <div className="absolute inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-[1px]">
              <div className="bg-white rounded-2xl p-4 w-full max-w-[280px] shadow-2xl border border-slate-200 text-left animate-scaleIn">
                <h4 className="text-sm font-semibold text-slate-900">Delete expense?</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Are you sure you want to delete the {formatInr(expenseToDelete.amount)} expense for{' '}
                  {expenseToDelete.category}
                  {expenseToDelete.note ? ` ("${expenseToDelete.note}")` : ''}?
                </p>
                <div className="mt-4 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setExpenseToDelete(null)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteExpense(expenseToDelete.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Clear All Confirmation Dialog (ExpenseScreen.kt) */}
          {showClearAllConfirmation && (
            <div className="absolute inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-[1px]">
              <div className="bg-white rounded-2xl p-4 w-full max-w-[280px] shadow-2xl border border-slate-200 text-left animate-scaleIn">
                <h4 className="text-sm font-semibold text-slate-900">Clear all expenses?</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Are you sure you want to delete all {expenses.length} expenses? This action cannot be undone.
                </p>
                <div className="mt-4 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setShowClearAllConfirmation(false)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Caption under phone */}
      <div className="text-center mt-3 text-slate-500 text-xs">
        <p className="font-medium text-slate-700">Interactive In-App Demo</p>
        <p className="text-[11px]">Exact Compose UI from the repository with live state</p>
      </div>
    </div>
  );
}
