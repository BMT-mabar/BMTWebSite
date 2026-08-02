import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RfqModal from './components/RfqModal';
import AccessibilityWidget from './components/AccessibilityWidget';
import SocialFloatingWidget from './components/SocialFloatingWidget';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import TechPage from './pages/TechPage';
import ClinicalPage from './pages/ClinicalPage';
import AboutPage from './pages/AboutPage';

// ScrollToTop observer: automatically resets window scroll coordinate on navigation changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  const [isRfqOpen, setIsRfqOpen] = useState(false);

  return (
    <HelmetProvider>
      <LanguageProvider>
        <HashRouter>
          <ScrollToTop />
          <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
            {/* Skip-to-content link — visible on keyboard focus (WCAG 2.4.1 / Israeli T"I 5568) */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-blue-700 focus:text-white focus:px-6 focus:py-3 focus:rounded-full focus:font-extrabold focus:shadow-xl focus:ring-4 focus:ring-white focus:outline-none transition-all"
            >
              דלג לתוכן הראשי / Skip to main content
            </a>
            
            {/* Header Sticky Navbar (Semantic) */}
            <header className="sticky top-0 z-[100] w-full shadow-md bg-white/95 backdrop-blur-md" role="banner">
              <Navbar onOpenRfq={() => setIsRfqOpen(true)} />
            </header>
            
            {/* Main Page Layout Switcher (Semantic) */}
            <main id="main-content" className="flex-grow focus:outline-none animate-fade-in-up" tabIndex="-1">
              <Routes>
                <Route path="/" element={<HomePage onOpenRfq={() => setIsRfqOpen(true)} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/catalog/b2b" element={<CatalogPage category="b2b" onOpenRfq={() => setIsRfqOpen(true)} />} />
                <Route path="/catalog/b2c" element={<CatalogPage category="b2c" onOpenRfq={() => setIsRfqOpen(true)} />} />
                <Route path="/product/:id" element={<ProductPage onOpenRfq={() => setIsRfqOpen(true)} />} />
                <Route path="/tech" element={<TechPage />} />
                <Route path="/clinical" element={<ClinicalPage />} />
                
                {/* Routing Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            
            {/* Footer Contact Details & Quicklinks (Semantic) */}
            <Footer />
            
            {/* Global Lead Capture Modal */}
            <RfqModal isOpen={isRfqOpen} onClose={() => setIsRfqOpen(false)} />

            {/* Floating Accessibility Widget */}
            <AccessibilityWidget />

            {/* Floating Social Media Action Widget (YouTube, Facebook, LinkedIn, WhatsApp) */}
            <SocialFloatingWidget />
          </div>
        </HashRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}
