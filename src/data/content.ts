import { FeatureItem, FaqItem } from '../types';

export const APP_CONFIG = {
  name: 'Expense Manager',
  tagline: 'Track Expenses. Control Budgets. Keep Your Financial Data 100% Private.',
  description:
    'A lightweight, offline-first Android expense manager built to give you total control over your money without tracking your data or requiring cloud sign-ins.',
  developerName: 'khandur759',
  developerEmail: 'khandur759@gmail.com',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.khandur759.expensemanager',
  apkDownloadUrl: 'https://files.catbox.moe/595pa2.apk',
  version: '1.0.0',
  androidVersion: 'Android 8.0 (Oreo) or higher',
  appSize: '~8.2 MB',
  license: 'Apache 2.0 / Open Source',
  lastUpdatedDate: 'September 2026',
  privacyEffectiveDate: 'September 4, 2026',
};

export const CORE_FEATURES: FeatureItem[] = [
  {
    id: 'salary-budgeting',
    iconName: 'Target',
    title: 'Monthly Salary & Budget Progress',
    badge: 'Real-time Balance',
    description:
      'Set your monthly income with one tap. Watch your spending progress bar adapt automatically and see remaining balance calculations in real-time.',
    highlights: ['Interactive salary setter', 'Dynamic spent % progress indicator', 'Instant over-budget alerts'],
  },
  {
    id: 'quick-entry',
    iconName: 'ReceiptText',
    title: 'Rapid Transaction Entry',
    badge: 'Under 5 Seconds',
    description:
      'Log expenses in seconds with quick suggestion chips (+100, +500, +1000, +2000), 6 categorized icons, and optional note descriptions.',
    highlights: ['Quick amount suggestion chips', '6 essential expense categories', 'Custom note descriptions'],
  },
  {
    id: 'offline-local-storage',
    iconName: 'ShieldCheck',
    title: '100% Offline Room Database',
    badge: 'Zero Cloud Tracking',
    description:
      'Your financial records stay exclusively on your phone. Powered by Android Jetpack Room database with zero server sync and zero cloud telemetry.',
    highlights: ['No account or login required', 'No external server uploads', 'Zero third-party trackers or ads'],
  },
  {
    id: 'launcher-shortcut',
    iconName: 'Smartphone',
    title: 'Home Screen Quick-Add Shortcut',
    badge: 'Native Android',
    description:
      'Pin an Android launcher shortcut directly to your home screen or long-press the app icon to open the quick expense sheet in an instant.',
    highlights: ['One-tap launcher pinned shortcut', 'QuickAddExpenseActivity mode', 'Zero lag launch speed'],
  },
  {
    id: 'safe-management',
    iconName: 'FileSpreadsheet',
    title: 'Guarded Deletion & Clear All',
    badge: 'Complete Control',
    description:
      'Safely manage every logged transaction. Delete single records with confirmation safety guards or clear your full history with one tap.',
    highlights: ['Confirmation dialog protection', 'One-click clear all option', 'Instant transaction counter'],
  },
  {
    id: 'material-compose',
    iconName: 'PieChart',
    title: 'Jetpack Compose Material 3 UI',
    badge: 'Fast & Lightweight',
    description:
      'Crafted natively with Jetpack Compose. Clean Slate typography, smooth bottom sheets, responsive touch states, and zero background battery drain.',
    highlights: ['High-contrast Slate design', 'Smooth animated bottom sheets', 'Compact APK size (~8 MB)'],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Does Expense Manager connect to my bank account or credit cards?',
    answer:
      'No. Expense Manager does not connect to any bank APIs, read your SMS messages, or request banking credentials. You have complete manual control over logging your transactions, ensuring total financial privacy.',
    category: 'privacy',
  },
  {
    question: 'Where is my expense data stored?',
    answer:
      'All data is saved strictly on your local Android device using an encrypted local Room/SQLite database. It is never transmitted, synced, or sold to any remote server or cloud provider.',
    category: 'security',
  },
  {
    question: 'How do I add an expense quickly from my home screen?',
    answer:
      'You can long-press the Expense Manager app icon on your Android launcher and select "Add Expense", or pin the Quick Add shortcut directly to your home screen for one-tap access.',
    category: 'features',
  },
  {
    question: 'Is the app free to use?',
    answer:
      'Yes, Expense Manager is completely free, open source under the Apache 2.0 license, and contains no intrusive ads, subscriptions, or paywalls.',
    category: 'features',
  },
  {
    question: 'How do I delete all my data or reset the app?',
    answer:
      'You can tap "Clear All" on the Recent Expenses list inside the app, or clear storage anytime through Android Settings > Apps > Expense Manager > Storage > Clear Data.',
    category: 'privacy',
  },
];
