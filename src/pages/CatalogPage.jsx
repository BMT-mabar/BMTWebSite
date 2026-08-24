import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronLeft, ChevronRight, FileSpreadsheet, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import productsDatabase from '../data/productsDatabase';
import fullCatalogDatabase from '../data/fullCatalogDatabase';
import ProductCard from '../components/ProductCard';

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
      const descHe = p.shortDesc?.he?.toLowerCase() || '';
      const descEn = p.shortDesc?.en?.toLowerCase() || '';
      const id = p.id.toLowerCase();
      const specType = p.specs?.type?.toLowerCase() || '';

      const matchSearch = titleHe.includes(term) || titleEn.includes(term) || descHe.includes(term) || descEn.includes(term) || id.includes(term) || specType.includes(term);
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
      
      const isBloodSearch = /דם|blood|wb|serum|plasma|סרום|פלזמה/i.test(term) && /wb|blood|s\/p|s \/ p|serum|plasma/i.test(spec);
      const isSwabSearch = /מטוש|משטח|גרון|swab|throat|nasal/i.test(term) && /swab|throat|nasal/i.test(spec);
      const isUrineSearch = /שתן|urine/i.test(term) && /urine/i.test(spec);
      const isFecesSearch = /צואה|feces|stool/i.test(term) && /feces/i.test(spec);
      
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
        } else {
          textarea.value = `Hello, I would like to request a quote for catalog item:\nCat No: ${catNo}\nProduct Name: ${productName}\nThank you.`;
        }
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, 100);
  };

  const formatSpecimenName = (specimen) => {
    if (!specimen) return '-';
    if (/wb/i.test(specimen) || /s\/p/i.test(specimen) || /plasma/i.test(specimen) || /blood/i.test(specimen)) {
      return isHe ? `דם / סרום / פלזמה (${specimen})` : `Blood / Serum / Plasma (${specimen})`;
    }
    if (/throat/i.test(specimen)) {
      return isHe ? 'מטוש גרון (Throat Swab)' : 'Throat Swab';
    }
    if (/nasal/i.test(specimen)) {
      return isHe ? 'מטוש אף (Nasal Swab)' : 'Nasal Swab';
    }
    if (/swab/i.test(specimen)) {
      return isHe ? 'מטוש (Swab)' : 'Swab';
    }
    if (/urine/i.test(specimen)) {
      return isHe ? 'שתן (Urine)' : 'Urine';
    }
    if (/feces/i.test(specimen)) {
      return isHe ? 'צואה (Feces)' : 'Feces';
    }
    return specimen;
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

  const featuredHeader = isHe 
    ? 'מוצרים מובילים ומערכות פטנט' 
    : (lang === 'ar' ? 'أبرز المنتجات والأنظمة المحمية ببراءات اختراع' 
    : (lang === 'fr' ? 'Produits Phares & Systèmes Brevetés' 
    : (lang === 'de' ? 'Ausgewählte Produkte & Patentsysteme' 
    : (lang === 'ru' ? 'Ведущие продукты и запатентованные системы' 
    : 'Featured Highlight Solutions'))));

  const countSuffix = isHe 
    ? 'מוצרים' 
    : (lang === 'ar' ? 'منتجات' 
    : (lang === 'fr' ? 'Produits' 
    : (lang === 'de' ? 'Produkte' 
    : (lang === 'ru' ? 'Продуктов' 
    : 'Products'))));

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
                {featuredHeader}
              </h2>
              <span className="text-xs bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-black border border-blue-100/50 uppercase tracking-widest shadow-sm">
                {filteredFeatured.length} {countSuffix}
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
                <p className="text-slate-500 font-medium mb-4">{isHe ? 'לא נמצאו מוצרים התואמים את החיפוש.' : 'No products matched your search filters.'}</p>
                <button
                  onClick={() => { setSearchTerm(''); setFilter('All'); }}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{isHe ? 'איפוס סינונים' : 'Reset Filters'}</span>
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
                    {isHe ? 'מפתח קטלוג מלא (538 בדיקות)' : 'Complete Catalog Index (538 Parameters)'}
                  </h2>
                  <p className="text-sm text-slate-500 font-light mt-1">
                    {isHe ? 'חיפוש וסינון קליני רחב לפי מק"ט, שם, דגימה או פורמט מתוך הקטלוג הרשמי' : 'Comprehensive PDF database mapping for hospitals, laboratories, and clinics'}
                  </p>
                </div>
              </div>
              
              <div className="shrink-0 flex items-center gap-3">
                <span className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-extrabold border border-blue-100 shadow-sm">
                  {fullTableProducts.length} {isHe ? 'מוצרים נמצאו' : 'Products Found'}
                </span>
                {(tableSearch || tableFilter !== 'All' || specimenFilter !== 'All') && (
                  <button
                    onClick={resetTableFilters}
                    className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 border border-slate-200 px-3 py-2 rounded-xl bg-slate-50 font-bold transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isHe ? 'איפוס' : 'Reset'}</span>
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
                  placeholder={isHe ? 'חפש לפי מק"ט BMT, שם בדיקה, דגימה (למשל Throat, Urine, Swab)...' : 'Search by BMT Cat No, parameter, specimen format...'}
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
                  <option value="All">{isHe ? 'כל הקטגוריות (538 בדיקות)' : 'All Categories (538 Tests)'}</option>
                  <option value="Infectious Diseases">{isHe ? 'מחלות זיהומיות (Infectious Diseases)' : 'Infectious Diseases'}</option>
                  <option value="Women's Health">{isHe ? 'בריאות האישה והריון (Women\'s Health)' : 'Women\'s Health'}</option>
                  <option value="Drugs of Abuse">{isHe ? 'סמים ואלכוהול (Drugs of Abuse)' : 'Drugs of Abuse'}</option>
                  <option value="Tumor Markers">{isHe ? 'סמני סרטן (Tumor Markers)' : 'Tumor Markers'}</option>
                  <option value="Cardiac Markers">{isHe ? 'סמני לב (Cardiac Markers)' : 'Cardiac Markers'}</option>
                  <option value="Others">{isHe ? 'בדיקות שתן ומיוחדים (Others)' : 'Others & Urinalysis'}</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <select
                  value={specimenFilter}
                  onChange={(e) => { setSpecimenFilter(e.target.value); setTablePage(1); }}
                  className="w-full bg-slate-50/50 border border-slate-200 p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white outline-none transition text-sm font-extrabold appearance-none cursor-pointer pr-10 rtl:pr-4"
                >
                  <option value="All">{isHe ? 'כל סוגי הדגימות' : 'All Specimen Types'}</option>
                  <option value="Swab">{isHe ? 'מטוש / גרון (Swab / Throat)' : 'Swab / Throat'}</option>
                  <option value="Blood">{isHe ? 'דם מלא / סרום / פלזמה' : 'Whole Blood / Serum'}</option>
                  <option value="Urine">{isHe ? 'שתן (Urine)' : 'Urine'}</option>
                  <option value="Feces">{isHe ? 'צואה (Feces)' : 'Feces'}</option>
                </select>
              </div>
            </div>

            {/* The Clinical Table */}
            <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-inner bg-slate-50/20">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50 text-slate-700 font-extrabold text-xs uppercase tracking-widest text-start">
                  <tr>
                    <th scope="col" className="px-6 py-5 text-start w-24 font-black">
                      {isHe ? 'מק"ט BMT' : (lang === 'ar' ? 'رقم الصنف BMT' : (lang === 'fr' ? 'Réf. BMT' : (lang === 'de' ? 'BMT Art.-Nr.' : (lang === 'ru' ? 'Артикул BMT' : 'BMT Cat No'))))}
                    </th>
                    <th scope="col" className="px-6 py-5 text-start">
                      {isHe ? 'תיאור בדיקה קלינית' : (lang === 'ar' ? 'وصف الفحص السريري' : (lang === 'fr' ? 'Description Clinique' : (lang === 'de' ? 'Klinische Beschreibung' : (lang === 'ru' ? 'Клиническое описание' : 'Clinical Description'))))}
                    </th>
                    <th scope="col" className="px-6 py-5 text-start w-32">
                      {isHe ? 'קטגוריה' : (lang === 'ar' ? 'الفئة' : (lang === 'fr' ? 'Catégorie' : (lang === 'de' ? 'Kategorie' : (lang === 'ru' ? 'Категория' : 'Category'))))}
                    </th>
                    <th scope="col" className="px-6 py-5 text-start w-32">
                      {isHe ? 'סוג דגימה' : (lang === 'ar' ? 'نوع العينة' : (lang === 'fr' ? 'Échantillon' : (lang === 'de' ? 'Probentyp' : (lang === 'ru' ? 'Образец' : 'Specimen'))))}
                    </th>
                    <th scope="col" className="px-6 py-5 text-start w-32">
                      {isHe ? 'פורמט' : (lang === 'ar' ? 'الشكل' : (lang === 'fr' ? 'Format' : (lang === 'de' ? 'Format' : (lang === 'ru' ? 'Формат' : 'Format'))))}
                    </th>
                    <th scope="col" className="px-6 py-5 text-start w-28">
                      {isHe ? 'מארז' : (lang === 'ar' ? 'حجم العبوة' : (lang === 'fr' ? 'Conditionnement' : (lang === 'de' ? 'Packungsgröße' : (lang === 'ru' ? 'Упаковка' : 'Kit Size'))))}
                    </th>
                    <th scope="col" className="px-6 py-5 text-center w-36">
                      {isHe ? 'פעולה' : (lang === 'ar' ? 'طلب تسعيرة' : (lang === 'fr' ? 'Action' : (lang === 'de' ? 'Aktion' : (lang === 'ru' ? 'Запрос' : 'Action'))))}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200 text-sm font-medium text-slate-800">
                  {paginatedTableProducts.length > 0 ? (
                    paginatedTableProducts.map((p) => {
                      const titleStr = typeof p.title === 'object' ? (p.title[lang] || p.title.he || p.title.en) : p.title;
                      return (
                        <tr key={p.catNo} className="hover:bg-blue-50/40 transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-slate-900">{p.catNo}</td>
                          <td className="px-6 py-4 font-bold text-slate-900">
                            <div>{titleStr}</div>
                            {p.title?.en && p.title?.he && (
                              <div className="text-xs text-slate-400 font-normal font-mono">{p.title.en}</div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-lg font-bold border border-slate-200">
                              {p.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-600 font-semibold">{formatSpecimenName(p.specimen)}</td>
                          <td className="px-6 py-4 text-slate-600 font-semibold">{p.format}</td>
                          <td className="px-6 py-4 font-mono text-slate-700 font-bold">{p.kitSize}</td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleRequestQuote(p.catNo, titleStr)}
                              className="bg-burgundy hover:brightness-110 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition shadow-sm btn-bouncy"
                            >
                              {isHe ? 'צור קשר' : 'RFQ'}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-slate-400 font-medium">
                        {isHe ? 'לא נמצאו מוצרים התואמים את החיפוש.' : 'No catalog items found matching search filters.'}
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
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" /> {isHe ? 'הקודם' : 'Previous'}
                </button>

                <div className="font-mono text-slate-500 text-xs">
                  {isHe ? `עמוד ${tablePage} מתוך ${totalPages}` : `Page ${tablePage} of ${totalPages}`}
                </div>

                <button
                  disabled={tablePage === totalPages}
                  onClick={() => setTablePage(prev => Math.min(totalPages, prev + 1))}
                  className="inline-flex items-center gap-2 border border-slate-200 bg-white text-slate-650 hover:bg-slate-55 px-5 py-3 rounded-2xl transition disabled:opacity-55 disabled:cursor-not-allowed font-bold"
                >
                  {isHe ? 'הבא' : 'Next'} <ChevronRight className="w-4 h-4 rtl:rotate-180" />
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
              {category === 'b2b'
                ? (isHe ? 'זקוקים למפרט המלא של כל 538 הבדיקות הקליניות?' : 'Need the complete specifications for all 538 clinical parameters?')
                : (isHe ? 'רוצים להכיר את כל פורטפוליו מוצרי הפארם לשימוש ביתי?' : 'Want to explore the entire pharmacy retail home testing portfolio?')}
            </h3>
            <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
              {category === 'b2b'
                ? (isHe ? 'הורידו כעת את הקטלוג הקליני הרשמי המלא בפורמט PDF הכולל רגישויות, ספציפיות, סוגי דגימות ומק"טים של BMT Diagnostics.' : 'Download the official, comprehensive Clinical Catalog PDF mapping all rapid test suites, sensitivity, and clinical validations.')
                : (isHe ? 'הורידו את קטלוג מוצרי הצריכה והרוקחות המלא בפורמט PDF לעיון נוח בבית או במשרד.' : 'Download the complete consumer pharmacy catalog PDF for comprehensive details on home diagnostic kits.')}
            </p>
            
            <a
              href={category === 'b2b' ? './BMT-Products-Catalogue.pdf' : './BMT-Products-Catalogue2.pdf'}
              download
              className="inline-flex items-center gap-3 bg-burgundy text-white hover:bg-burgundy-650 font-extrabold px-10 py-5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-burgundy/30 text-sm md:text-base uppercase tracking-wider"
            >
              <FileSpreadsheet className="w-5 h-5 text-white/95" />
              <span>
                {category === 'b2b'
                  ? (isHe ? 'הורד קטלוג מלא (PDF)' : 'Download Full Catalog (PDF)')
                  : (isHe ? 'הורד קטלוג פארם מלא (PDF)' : 'Download Full Catalog (PDF)')}
              </span>
            </a>
          </div>
        </div>

        {/* --- SECTION 4: CONTACT US BANNER AT PAGE BOTTOM --- */}
        <div className="text-center bg-gradient-to-br from-blue-50/90 via-sky-50 to-slate-50 text-slate-900 rounded-[3rem] p-12 md:p-16 shadow-lg border border-sky-200/80 relative overflow-hidden mt-16 max-w-5xl mx-auto">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/[0.05] rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-400/[0.08] rounded-full blur-3xl pointer-events-none"></div>
          
          <h3 className="relative z-10 text-2xl md:text-4xl font-black mb-4 tracking-tight max-w-3xl mx-auto leading-tight text-slate-900">
            {isHe ? 'מעוניינים בהצעת מחיר או ייעוץ קליני מותאם?' : 'Interested in Commercial Pricing or Custom Clinical Consultation?'}
          </h3>
          <p className="relative z-10 text-slate-600 text-base md:text-lg mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
            {isHe ? 'צוות המומחים של BMT Diagnostics זמין לכל פנייה, דרישת מק"ט או פיתוח מותאם למוסדות רפואיים ורשתות פארם.' : 'Our team is ready to assist with catalog parameters, commercial terms, or custom OEM manufacturing.'}
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
