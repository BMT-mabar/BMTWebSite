import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import productsDatabase from '../data/productsDatabase';
import ProductCard from '../components/ProductCard';

export default function CatalogPage({ category, onOpenRfq }) {
  const { lang, _, isRtl } = useLanguage();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const allProducts = productsDatabase.filter(p => p.category === category);
  const subCats = ['All', ...new Set(allProducts.map(p => p.subCat))];
  
  const filteredProducts = allProducts.filter(p => {
    const matchCat = filter === 'All' || p.subCat === filter;
    const term = searchTerm.toLowerCase();
    const titleHe = p.title.he?.toLowerCase() || '';
    const titleEn = p.title.en?.toLowerCase() || '';
    const titleRu = p.title.ru?.toLowerCase() || '';
    const titleAr = p.title.ar?.toLowerCase() || '';
    const matchSearch = titleHe.includes(term) || titleEn.includes(term) || titleRu.includes(term) || titleAr.includes(term) || p.id.includes(term);
    return matchCat && matchSearch;
  });

  const pageTitle = category === 'b2b' ? _('nav.b2b') : _('nav.b2c');
  const pageDesc = category === 'b2b' ? _('catalog.b2bDesc') : _('catalog.b2cDesc');

  return (
    <div className="animate-fade-in py-16 lg:py-24 bg-slate-50 min-h-screen relative overflow-hidden">
      <Helmet>
        <title>{`${pageTitle} | BMT Diagnostics`}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={`${pageTitle} | BMT Diagnostics`} />
        <meta property="og:description" content={pageDesc} />
        <meta name="keywords" content={`Rapid Diagnostic Tests, BMT Diagnostics, ${category === 'b2b' ? 'Clinical, OEM, Labs, Hospitals' : 'OTC, Pharmacy, Home Tests'}`} />
      </Helmet>

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/40 rounded-full blur-[100px] mix-blend-multiply pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Page Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">{pageTitle}</h1>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-light">
            {pageDesc}
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="mb-12 max-w-5xl mx-auto">
          <div className="relative mb-8 shadow-sm group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder={_('catalog.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-16 pr-6 py-5 border border-slate-200 rounded-2xl leading-5 bg-white/80 backdrop-blur-md placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg shadow-sm"
            />
          </div>
          
          {/* Sub-category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {subCats.map(sc => (
              <button 
                key={sc} 
                onClick={() => setFilter(sc)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${filter === sc ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
              >
                {sc === 'All' ? _('catalog.filterAll') : _(`catalog.cat${sc}`)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {filteredProducts.map(prod => (
            <ProductCard 
              key={prod.id} 
              prod={prod} 
              lang={lang} 
              isRtl={isRtl} 
              _={_} 
              nav={(pageName, prodObj) => navigate(`/product/${prodObj.id}`)} 
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
           <div className="text-center py-32 text-slate-400 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-slate-200/50 shadow-sm mt-8">
              <Search className="w-20 h-20 mx-auto mb-6 opacity-20"/>
              <p className="text-2xl font-medium">No products match your search.</p>
           </div>
        )}

        {/* B2B Contact / Volume Quote Callout Banner */}
        {category === 'b2b' && filteredProducts.length > 0 && (
          <div className="text-center bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-[3rem] p-12 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('home-main-image.png')] opacity-10 mix-blend-screen object-cover"></div>
            <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay"></div>
            <h3 className="relative z-10 text-2xl md:text-3xl font-extrabold mb-8 tracking-tight">{_('catalog.viewAllText')}</h3>
            <button 
              onClick={onOpenRfq} 
              className="relative z-10 bg-white text-blue-900 px-10 py-4 rounded-2xl font-bold hover:bg-slate-100 transition shadow-xl text-lg hover:-translate-y-1"
            >
              {_('nav.quote')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
