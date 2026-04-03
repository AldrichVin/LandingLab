import type { PageEntry } from './types';

const Placeholder = () => null;

export const PAGE_REGISTRY: readonly PageEntry[] = [
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
