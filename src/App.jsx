import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RfqModal from './components/RfqModal';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import TechPage from './pages/TechPage';
import ClinicalPage from './pages/ClinicalPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  const [isRfqOpen, setIsRfqOpen] = useState(false);

  return (
    <HelmetProvider>
      <LanguageProvider>
        <HashRouter>
          <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
            {/* Header Sticky Navbar */}
            <Navbar onOpenRfq={() => setIsRfqOpen(true)} />
            
            {/* Main Page Layout Switcher */}
            <main className="flex-grow focus:outline-none animate-fade-in" tabIndex="-1">
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
            
            {/* Footer Contact Details & Quicklinks */}
            <Footer />
            
            {/* Global Lead Capture Modal */}
            <RfqModal isOpen={isRfqOpen} onClose={() => setIsRfqOpen(false)} />
          </div>
        </HashRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}
