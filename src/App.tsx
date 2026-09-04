import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ScreenshotsGallery from './components/ScreenshotsGallery';
import FaqSection from './components/FaqSection';
import PolicyViewer from './components/PolicyViewer';
import Footer from './components/Footer';
import { ActivePage } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');

  // Handle URL hash & search parameters for direct Google Play Console links
  useEffect(() => {
    const handleUrlRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page')?.toLowerCase();

      if (hash === '#privacy' || pageParam === 'privacy') {
        setActivePage('privacy');
      } else if (hash === '#terms' || pageParam === 'terms') {
        setActivePage('terms');
      } else if (
        hash === '#data-deletion' ||
        hash === '#deletion' ||
        pageParam === 'data-deletion' ||
        pageParam === 'deletion'
      ) {
        setActivePage('data-deletion');
      } else if (hash === '#support' || hash === '#faq') {
        setActivePage('home');
        setTimeout(() => {
          const el = document.getElementById(hash === '#support' ? 'support' : 'faq-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (hash === '#features') {
        setActivePage('home');
        setTimeout(() => {
          const el = document.getElementById('features-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (hash === '#download') {
        setActivePage('home');
        setTimeout(() => {
          const el = document.getElementById('hero-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (hash === '#showcase' || hash === '#screenshots') {
        setActivePage('home');
        setTimeout(() => {
          const el = document.getElementById('showcase-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    handleUrlRoute();
    window.addEventListener('hashchange', handleUrlRoute);
    window.addEventListener('popstate', handleUrlRoute);

    return () => {
      window.removeEventListener('hashchange', handleUrlRoute);
      window.removeEventListener('popstate', handleUrlRoute);
    };
  }, []);

  // When active page changes, update document title and URL hash smoothly
  const handlePageChange = (newPage: ActivePage) => {
    setActivePage(newPage);
    if (newPage === 'privacy') {
      window.location.hash = 'privacy';
      document.title = 'Privacy Policy - Expense Manager';
    } else if (newPage === 'terms') {
      window.location.hash = 'terms';
      document.title = 'Terms of Service - Expense Manager';
    } else if (newPage === 'data-deletion') {
      window.location.hash = 'data-deletion';
      document.title = 'Data Deletion & Safety - Expense Manager';
    } else {
      if (window.location.hash) {
        history.pushState('', document.title, window.location.pathname + window.location.search);
      }
      document.title = 'Expense Manager - Official App & Privacy Policy';
    }
  };

  return (
    <div id="expense-manager-app" className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Main Navigation Bar */}
      <Header activePage={activePage} setActivePage={handlePageChange} />

      {/* Page Content */}
      <main className="flex-1">
        {activePage === 'home' ? (
          <>
            <Hero setActivePage={handlePageChange} />
            <Features />
            <ScreenshotsGallery />
            <FaqSection />
          </>
        ) : (
          <PolicyViewer initialPage={activePage} setActivePage={handlePageChange} />
        )}
      </main>

      {/* Global Footer */}
      <Footer setActivePage={handlePageChange} />
    </div>
  );
}
