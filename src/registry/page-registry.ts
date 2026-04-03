import type { PageEntry } from './types';

const Placeholder = () => null;

export const PAGE_REGISTRY: readonly PageEntry[] = [
  {
    slug: 'customer-churn-analysis',
    title: 'Customer Churn Prediction',
    subtitle: 'ML pipeline predicting telco churn with XGBoost, SHAP explainability, K-Means segmentation, and actionable retention strategies.',
    date: '2026-03',
    tags: ['Python', 'scikit-learn', 'XGBoost', 'SHAP', 'K-Means'],
    featured: true,
    color: '#7C3AED',
    component: Placeholder,
    github: 'https://github.com/AldrichVin/customer-churn-analysis',
  },
  {
    slug: 'ecommerce-business-analytics',
    title: 'E-Commerce Business Analytics',
    subtitle: 'End-to-end SQL analytics on 100K orders — revenue trends, RFM segmentation, product performance, and statistical hypothesis testing.',
    date: '2026-03',
    tags: ['SQL', 'Python', 'SQLite', 'Pandas', 'SciPy'],
    featured: true,
    color: '#059669',
    component: Placeholder,
    github: 'https://github.com/AldrichVin/ecommerce-business-analytics',
  },
  {
    slug: 'asx-market-dashboard',
    title: 'ASX Market Dashboard',
    subtitle: 'Real-time analytics for Australian Securities Exchange equities — price charts, risk metrics, sector analysis, and portfolio backtesting.',
    date: '2026-04',
    tags: ['Python', 'Streamlit', 'Plotly', 'yfinance', 'Pandas'],
    featured: true,
    color: '#1E3A5F',
    component: Placeholder,
    externalUrl: 'https://asx-market-dashboard-qfogxyora7ake9jpkjj5gf.streamlit.app',
    github: 'https://github.com/AldrichVin/asx-market-dashboard',
  },
];

export function getPageBySlug(slug: string): PageEntry | undefined {
  return PAGE_REGISTRY.find((p) => p.slug === slug);
}
