import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronLeft, ChevronRight, FileSpreadsheet, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import productsDatabase from '../data/productsDatabase';
import fullCatalogDatabase from '../data/fullCatalogDatabase';
import ProductCard from '../components/ProductCard';
import { getAssetPath } from '../utils/imagePath';

export default function CatalogPage({ category, onOpenRfq }) {
  const { lang, _, isRtl } = useLanguage();
  const isHe = lang === 'he';
  const navigate = useNavigate();
  
  // Featured highlights states
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Comprehensive Table states
  const [tableSearch, setTableSearch] = useState('');
  const [tableFilter, setTableFilter] = useState('All');
  const [specimenFilter, setSpecimenFilter] = useState('All');
  const [tablePage, setTablePage] = useState(1);
  const itemsPerPage = 12;

  // Filter featured catalog items
  const allFeatured = useMemo(() => {
    return productsDatabase.filter(p => p.category === category || (Array.isArray(p.category) && p.category.includes(category)));
  }, [category]);

  const subCats = useMemo(() => {
    const cats = new Set(allFeatured.map(p => p.subCat).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [allFeatured]);
  
  const filteredFeatured = useMemo(() => {
    return allFeatured.filter(p => {
      const matchCat = filter === 'All' || p.subCat === filter;
      const term = searchTerm.trim().toLowerCase();
      if (!term) return matchCat;
      
      const titleHe = p.title?.he?.toLowerCase() || '';
      const titleEn = p.title?.en?.toLowerCase() || '';
      const titleDe = p.title?.de?.toLowerCase() || '';
      const titleFr = p.title?.fr?.toLowerCase() || '';
      const titleRu = p.title?.ru?.toLowerCase() || '';
      const titleAr = p.title?.ar?.toLowerCase() || '';
      const descHe = p.shortDesc?.he?.toLowerCase() || '';
      const descEn = p.shortDesc?.en?.toLowerCase() || '';
      const id = p.id.toLowerCase();

      const matchSearch = titleHe.includes(term) || 
                          titleEn.includes(term) || 
                          titleDe.includes(term) || 
                          titleFr.includes(term) || 
                          titleRu.includes(term) || 
                          titleAr.includes(term) || 
                          descHe.includes(term) || 
                          descEn.includes(term) || 
                          id.includes(term);
      return matchCat && matchSearch;
    });
  }, [allFeatured, filter, searchTerm]);

  const limitCount = category === 'b2b' ? 20 : 20;
  const displayedFeatured = useMemo(() => filteredFeatured.slice(0, limitCount), [filteredFeatured, limitCount]);

  // Filter full PDF database (538 clinical products)
  const fullTableProducts = useMemo(() => {
    return fullCatalogDatabase.filter(p => {
      // Filter by category dropdown
      const matchCat = tableFilter === 'All' || p.category === tableFilter;
      
      // Filter by specimen dropdown
      const spec = (p.specimen || '').toLowerCase();
      let matchSpecimen = true;
      if (specimenFilter !== 'All') {
        if (specimenFilter === 'Blood') {
          matchSpecimen = /wb|blood|s\/p|s \/ p|serum|plasma|דם/i.test(spec);
        } else if (specimenFilter === 'Swab') {
          matchSpecimen = /swab|throat|nasal|משטח|מטוש/i.test(spec);
        } else if (specimenFilter === 'Urine') {
          matchSpecimen = /urine|שתן/i.test(spec);
        } else if (specimenFilter === 'Feces') {
          matchSpecimen = /feces|stool|צואה/i.test(spec);
        } else {
          matchSpecimen = spec.includes(specimenFilter.toLowerCase());
        }
      }

      // Filter by search term
      const term = tableSearch.trim().toLowerCase();
      if (!term) return matchCat && matchSpecimen;

      const catNo = p.catNo ? p.catNo.toLowerCase() : '';
      const titleEn = p.title?.en ? p.title.en.toLowerCase() : '';
      const titleHe = p.title?.he ? p.title.he.toLowerCase() : '';
      const format = p.format ? p.format.toLowerCase() : '';
      
      const isBloodSearch = /דם|blood|wb|serum|plasma|סרום|פלזמה|blut|sang|кровь|دم/i.test(term) && /wb|blood|s\/p|s \/ p|serum|plasma/i.test(spec);
      const isSwabSearch = /מטוש|משטח|גרון|swab|throat|nasal|abstrich|écouvillon|мазок|مسحة/i.test(term) && /swab|throat|nasal/i.test(spec);
      const isUrineSearch = /שתן|urine|urin|моча|بول/i.test(term) && /urine/i.test(spec);
      const isFecesSearch = /צואה|feces|stool|stuhl|selles|кал|براز/i.test(term) && /feces/i.test(spec);
      
      const matchSearch = 
        catNo.includes(term) || 
        titleEn.includes(term) || 
        titleHe.includes(term) || 
        spec.includes(term) || 
        format.includes(term) ||
        isBloodSearch ||
        isSwabSearch ||
        isUrineSearch ||
        isFecesSearch;
        
      return matchCat && matchSpecimen && matchSearch;
    });
  }, [tableSearch, tableFilter, specimenFilter]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(fullTableProducts.length / itemsPerPage));
  const paginatedTableProducts = useMemo(() => {
    const start = (tablePage - 1) * itemsPerPage;
    return fullTableProducts.slice(start, start + itemsPerPage);
  }, [fullTableProducts, tablePage, itemsPerPage]);

  const handleTableSearchChange = (e) => {
    setTableSearch(e.target.value);
    setTablePage(1);
  };

  const handleTableFilterChange = (cat) => {
    setTableFilter(cat);
    setTablePage(1);
  };

  const resetTableFilters = () => {
    setTableSearch('');
    setTableFilter('All');
    setSpecimenFilter('All');
    setTablePage(1);
  };

  // Open RFQ and pre-fill selected product details
  const handleRequestQuote = (catNo, productName) => {
    onOpenRfq();
    setTimeout(() => {
      const textarea = document.querySelector('textarea[name="message"]');
      if (textarea) {
        if (lang === 'he') {
          textarea.value = `שלום, אבקש לקבל הצעת מחיר עבור מוצר מהקטלוג:\nמק"ט: ${catNo}\nשם פריט: ${productName}\nתודה.`;
        } else if (lang === 'ar') {
          textarea.value = `مرحباً، أود طلب تسعيرة لمنتج من الكتالوج:\nرقم الصنف: ${catNo}\nاسم المنتج: ${productName}\nشكراً.`;
        } else if (lang === 'de') {
          textarea.value = `Hallo, ich möchte ein Angebot für folgendes Produkt anfordern:\nArt.-Nr.: ${catNo}\nProdukt: ${productName}\nVielen Dank.`;
        } else if (lang === 'fr') {
          textarea.value = `Bonjour, je souhaite obtenir un devis pour le produit suivant:\nRéf.: ${catNo}\nProduit: ${productName}\nMerci.`;
        } else if (lang === 'ru') {
          textarea.value = `Здравствуйте, прошу предоставить ценовое предложение на товар:\nАртикул: ${catNo}\nНаименование: ${productName}\nСпасибо.`;
        } else {
          textarea.value = `Hello, I would like to request a quote for catalog item:\nCat No: ${catNo}\nProduct Name: ${productName}\nThank you.`;
        }
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, 100);
  };

  const formatCategoryName = (cat) => {
    if (!cat) return '-';
    return _(`categories.${cat}`) || cat;
  };

  const formatFormatName = (fmt) => {
    if (!fmt) return '-';
    return _(`formats.${fmt}`) || fmt;
  };

  const formatSpecimenName = (specimen) => {
    if (!specimen) return '-';
    if (/wb/i.test(specimen) || /s\/p/i.test(specimen) || /plasma/i.test(specimen) || /blood/i.test(specimen)) {
      return _('specimens.Whole Blood / Serum / Plasma');
    }
    if (/throat/i.test(specimen)) {
      return _('specimens.Throat Swab');
    }
    if (/nasal/i.test(specimen)) {
      return _('specimens.Nasal Swab');
    }
    if (/swab/i.test(specimen)) {
      return _('specimens.Swab');
    }
    if (/urine/i.test(specimen)) {
      return _('specimens.Urine');
    }
    if (/feces|stool/i.test(specimen)) {
      return _('specimens.Feces');
    }
    if (/saliva/i.test(specimen)) {
      return _('specimens.Saliva');
    }
    return _(`specimens.${specimen}`) || specimen;
  };

  const getSubCatName = (sc) => {
    if (sc === 'All') return _('catalog.filterAll');
    if (sc === 'Infectious') return _('catalog.catInfectious');
    if (sc === 'Womens') return _('catalog.catWomens');
    if (sc === 'Tumor') return _('catalog.catTumor');
    if (sc === 'Doa') return _('catalog.catDoa');
    if (sc === 'Urine') return _('catalog.catUrine');
    if (sc === 'Cardiac') return _('catalog.catCardiac');
    const key = `catalog.cat${sc}`;
    const t = _(key);
    return t && t !== key ? t : sc;
  };

  const pageTitle = category === 'b2b' ? _('nav.b2b') : _('nav.b2c');
  const pageDesc = category === 'b2b' ? _('catalog.b2bDesc') : _('catalog.b2cDesc');

  return (
    <div className="animate-fade-in pb-24 bg-white min-h-screen relative overflow-hidden">
      <Helmet>
        <title>{`${pageTitle} | BMT Diagnostics`}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={`${pageTitle} | BMT Diagnostics`} />
        <meta property="og:description" content={pageDesc} />
        <meta name="keywords" content={`Rapid Diagnostic Tests, BMT Diagnostics, ${category === 'b2b' ? 'Clinical, Labs, Hospitals, Medical Center' : 'Pharmacy, Home Testing Kits'}`} />
      </Helmet>

      {/* Majestic Header Banner */}
      <section 
        className="relative py-24 md:py-32 overflow-hidden text-white border-b border-slate-100"
        style={{ background: 'linear-gradient(135deg, #005EAD 0%, #003B70 100%)' }}
      >
        <div aria-hidden="true" className="absolute top-0 left-0 w-[500px] h-[250px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-0 right-0 w-[500px] h-[250px] bg-sky-400/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">{pageTitle}</h1>
          <p className="text-lg md:text-xl text-slate-100 font-light leading-relaxed opacity-95 max-w-3xl mx-auto">
            {pageDesc}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 relative z-10 mt-16">
        
        {/* --- SECTION 1: FEATURED HIGHLIGHTS (B2C & OTC) --- */}
        {category !== 'b2b' && (
          <>
            <div className="mb-12 flex items-center justify-between border-b border-slate-200 pb-5 max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {_('catalog.featuredTitle')}
              </h2>
              <span className="text-xs bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-black border border-blue-100/50 uppercase tracking-widest shadow-sm">
                {filteredFeatured.length} {_('catalog.productsCount')}
              </span>
            </div>

            {/* Featured Filters and Search Bar */}
            <div className="mb-16 max-w-5xl mx-auto">
              <div className="relative mb-8 shadow-sm group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder={_('catalog.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-16 pr-6 py-5 border border-slate-200 rounded-3xl bg-slate-50/50 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all text-lg shadow-sm font-medium"
                />
              </div>
              
              {/* Sub-category Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-3">
                {subCats.map(sc => (
                  <button 
                    key={sc} 
                    onClick={() => setFilter(sc)}
                    className={`px-6 py-3 rounded-full text-sm font-extrabold transition-all duration-300 focus:outline-none ${filter === sc ? 'bg-burgundy text-white shadow-lg shadow-burgundy/15 scale-102' : 'bg-slate-50 border border-slate-200 text-slate-650 hover:bg-slate-100 hover:border-slate-350'}`}
                  >
                    {getSubCatName(sc)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Featured Products Grid */}
            {displayedFeatured.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16 max-w-7xl mx-auto">
                {displayedFeatured.map(prod => (
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
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center max-w-2xl mx-auto mb-16">
                <p className="text-slate-500 font-medium mb-4">{_('catalog.noItemsFound')}</p>
                <button
                  onClick={() => { setSearchTerm(''); setFilter('All'); }}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{_('catalog.resetFilters')}</span>
                </button>
              </div>
            )}
          </>
        )}

        {/* --- SECTION 2: FULL CLINICAL INDEX TABLE (FIRST FOR B2B CATALOGUE) --- */}
        {category === 'b2b' && (
          <div className="mt-8 bg-white border border-slate-200/80 rounded-[3rem] p-8 md:p-14 shadow-md relative overflow-hidden max-w-7xl mx-auto mb-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/[0.01] rounded-full blur-[100px] pointer-events-none"></div>
            
            {/* Table Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100/50 flex items-center justify-center shadow-sm shrink-0">
                  <FileSpreadsheet className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    {_('catalog.tableTitle')}
                  </h2>
                  <p className="text-sm text-slate-500 font-light mt-1">
                    {_('catalog.tableSub')}
                  </p>
                </div>
              </div>
              
              <div className="shrink-0 flex items-center gap-3">
                <span className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-extrabold border border-blue-100 shadow-sm">
                  {fullTableProducts.length} {_('catalog.itemsFound')}
                </span>
                {(tableSearch || tableFilter !== 'All' || specimenFilter !== 'All') && (
                  <button
                    onClick={resetTableFilters}
                    className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 border border-slate-200 px-3 py-2 rounded-xl bg-slate-50 font-bold transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{_('catalog.resetFilters')}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Table Search & Multi-Filter Controls */}
            <div className="grid md:grid-cols-12 gap-4 mb-8">
              <div className="md:col-span-6 relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder={_('catalog.tableSearchPh')}
                  value={tableSearch}
                  onChange={handleTableSearchChange}
                  className="block w-full pl-14 pr-5 py-4 border border-slate-200 rounded-2xl bg-slate-50/50 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all text-base font-medium shadow-inner"
                />
              </div>
              <div className="md:col-span-3">
                <select
                  value={tableFilter}
                  onChange={(e) => handleTableFilterChange(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white outline-none transition text-sm font-extrabold appearance-none cursor-pointer pr-10 rtl:pr-4"
                >
                  <option value="All">{_('catalog.allCategories')}</option>
                  <option value="Infectious Diseases">{_('categories.Infectious Diseases')}</option>
                  <option value="Women's Health">{_('categories.Women\'s Health')}</option>
                  <option value="Drugs of Abuse">{_('categories.Drugs of Abuse')}</option>
                  <option value="Tumor Markers">{_('categories.Tumor Markers')}</option>
                  <option value="Cardiac Markers">{_('categories.Cardiac Markers')}</option>
                  <option value="Others">{_('categories.Others')}</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <select
                  value={specimenFilter}
                  onChange={(e) => { setSpecimenFilter(e.target.value); setTablePage(1); }}
                  className="w-full bg-slate-50/50 border border-slate-200 p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white outline-none transition text-sm font-extrabold appearance-none cursor-pointer pr-10 rtl:pr-4"
                >
                  <option value="All">{_('catalog.allSpecimens')}</option>
                  <option value="Swab">{_('specimens.Throat Swab')} / {_('specimens.Swab')}</option>
                  <option value="Blood">{_('specimens.Whole Blood / Serum / Plasma')}</option>
                  <option value="Urine">{_('specimens.Urine')}</option>
                  <option value="Feces">{_('specimens.Feces')}</option>
                </select>
              </div>
            </div>

            {/* The Clinical Table */}
            <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-inner bg-slate-50/20">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50 text-slate-700 font-extrabold text-xs uppercase tracking-widest text-start">
                  <tr>
                    <th scope="col" className="px-6 py-5 text-start w-24 font-black">
                      {_('catalog.colCatNo')}
                    </th>
                    <th scope="col" className="px-6 py-5 text-start">
                      {_('catalog.colTitle')}
                    </th>
                    <th scope="col" className="px-6 py-5 text-start w-36">
                      {_('catalog.colCategory')}
                    </th>
                    <th scope="col" className="px-6 py-5 text-start w-36">
                      {_('catalog.colSpecimen')}
                    </th>
                    <th scope="col" className="px-6 py-5 text-start w-28">
                      {_('catalog.colFormat')}
                    </th>
                    <th scope="col" className="px-6 py-5 text-start w-28">
                      {_('catalog.colKitSize')}
                    </th>
                    <th scope="col" className="px-6 py-5 text-center w-36">
                      {_('catalog.colAction')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200 text-sm font-medium text-slate-800">
                  {paginatedTableProducts.length > 0 ? (
                    paginatedTableProducts.map((p) => {
                      let mainTitle = '';
                      let subTitle = null;
                      if (lang === 'he') {
                        mainTitle = p.title?.he || p.title?.en || '';
                        subTitle = p.title?.en && p.title?.he ? p.title.en : null;
                      } else {
                        mainTitle = p.title?.[lang] || p.title?.en || p.title?.he || '';
                        subTitle = null;
                      }

                      return (
                        <tr key={p.catNo} className="hover:bg-blue-50/40 transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-slate-900">{p.catNo}</td>
                          <td className="px-6 py-4 font-bold text-slate-900">
                            <div>{mainTitle}</div>
                            {subTitle && (
                              <div className="text-xs text-slate-400 font-normal font-mono">{subTitle}</div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-lg font-bold border border-slate-200">
                              {formatCategoryName(p.category)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-600 font-semibold">{formatSpecimenName(p.specimen)}</td>
                          <td className="px-6 py-4 text-slate-600 font-semibold">{formatFormatName(p.format)}</td>
                          <td className="px-6 py-4 font-mono text-slate-700 font-bold">{p.kitSize}</td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleRequestQuote(p.catNo, mainTitle)}
                              className="bg-burgundy hover:brightness-110 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition shadow-sm btn-bouncy"
                            >
                              {_('catalog.rfqAction')}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-slate-400 font-medium">
                        {_('catalog.noItemsFound')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8 text-sm font-semibold text-slate-600">
                <button
                  disabled={tablePage === 1}
                  onClick={() => setTablePage(prev => Math.max(1, prev - 1))}
                  className="inline-flex items-center gap-2 border border-slate-200 bg-white text-slate-650 hover:bg-slate-55 px-5 py-3 rounded-2xl transition disabled:opacity-55 disabled:cursor-not-allowed font-bold"
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" /> {_('catalog.prevPage')}
                </button>

                <div className="font-mono text-slate-500 text-xs">
                  {_('catalog.pageOf').replace('{current}', tablePage).replace('{total}', totalPages)}
                </div>

                <button
                  disabled={tablePage === totalPages}
                  onClick={() => setTablePage(prev => Math.min(totalPages, prev + 1))}
                  className="inline-flex items-center gap-2 border border-slate-200 bg-white text-slate-650 hover:bg-slate-55 px-5 py-3 rounded-2xl transition disabled:opacity-55 disabled:cursor-not-allowed font-bold"
                >
                  {_('catalog.nextPage')} <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- SECTION 3: PDF CATALOG DOWNLOAD CTA SECTION --- */}
        <div className="text-center mb-20 mt-12 max-w-5xl mx-auto">
          <div className="bg-slate-50 border border-slate-200/80 rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/[0.02] rounded-full blur-[60px] pointer-events-none"></div>
            
            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-snug">
              {category === 'b2b' ? _('catalog.downloadB2bPdf') : _('catalog.downloadB2cPdf')}
            </h3>
            <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
              {category === 'b2b' ? _('catalog.downloadB2bDesc') : _('catalog.downloadB2cDesc')}
            </p>
            
            <a
              href={category === 'b2b' ? getAssetPath('BMT-Products-Catalogue.pdf') : getAssetPath('BMT-Products-Catalogue2.pdf')}
              download
              className="inline-flex items-center gap-3 bg-burgundy text-white hover:bg-burgundy-650 font-extrabold px-10 py-5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-burgundy/30 text-sm md:text-base uppercase tracking-wider"
            >
              <FileSpreadsheet className="w-5 h-5 text-white/95" />
              <span>{_('catalog.downloadPdfBtn')}</span>
            </a>
          </div>
        </div>

        {/* --- SECTION 4: CONTACT US BANNER AT PAGE BOTTOM --- */}
        <div className="text-center bg-gradient-to-br from-blue-50/90 via-sky-50 to-slate-50 text-slate-900 rounded-[3rem] p-12 md:p-16 shadow-lg border border-sky-200/80 relative overflow-hidden mt-16 max-w-5xl mx-auto">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/[0.05] rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-400/[0.08] rounded-full blur-3xl pointer-events-none"></div>
          
          <h3 className="relative z-10 text-2xl md:text-4xl font-black mb-4 tracking-tight max-w-3xl mx-auto leading-tight text-slate-900">
            {_('rfq.title')}
          </h3>
          <p className="relative z-10 text-slate-600 text-base md:text-lg mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
            {_('about.sub')}
          </p>
          <button 
            onClick={onOpenRfq} 
            className="relative z-10 bg-burgundy text-white px-10 py-5 rounded-full font-extrabold hover:brightness-110 transition-all duration-300 shadow-lg text-base md:text-lg btn-bouncy"
          >
            {_('nav.quote')}
          </button>
        </div>
      </div>
    </div>
  );
}
