export type ActivePage = 'home' | 'privacy' | 'terms' | 'data-deletion';

export interface FeatureItem {
  id: string;
  iconName: string;
  title: string;
  badge?: string;
  description: string;
  highlights: string[];
}

export interface MockupScreen {
  id: 'dashboard' | 'analytics' | 'budgets' | 'add';
  label: string;
  subtitle: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'privacy' | 'features' | 'security' | 'backup';
}
