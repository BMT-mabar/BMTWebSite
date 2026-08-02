import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronLeft, ChevronRight, FileSpreadsheet, Quote } from 'lucide-react';
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
  const allFeatured = productsDatabase.filter(p => p.category === category || (Array.isArray(p.category) && p.category.includes(category)));
  const subCats = ['All', ...new Set(allFeatured.map(p => p.subCat))];
  
  const filteredFeatured = allFeatured.filter(p => {
    const matchCat = filter === 'All' || p.subCat === filter;
    const term = searchTerm.toLowerCase();
    const titleHe = p.title.he?.toLowerCase() || '';
    const titleEn = p.title.en?.toLowerCase() || '';
    const matchSearch = titleHe.includes(term) || titleEn.includes(term) || p.id.includes(term);
    return matchCat && matchSearch;
  });

  const limitCount = category === 'b2b' ? 20 : 10;
  const displayedFeatured = useMemo(() => filteredFeatured.slice(0, limitCount), [filteredFeatured, limitCount]);

  // Filter full PDF database (538 clinical products)
  const fullTableProducts = useMemo(() => {
    return fullCatalogDatabase.filter(p => {
      // Filter by category dropdown
      const matchCat = tableFilter === 'All' || p.category === tableFilter;
      
      // Filter by specimen dropdown
      const matchSpecimen = specimenFilter === 'All' || p.specimen.toLowerCase().includes(specimenFilter.toLowerCase());

      // Filter by search term
      const term = tableSearch.toLowerCase();
      const catNo = p.catNo.toLowerCase();
      const titleEn = p.title.en.toLowerCase();
      const titleHe = p.title.he.toLowerCase();
      const specimen = p.specimen.toLowerCase();
      const format = p.format.toLowerCase();
      
      const matchSearch = 
        catNo.includes(term) || 
        titleEn.includes(term) || 
        titleHe.includes(term) || 
        specimen.includes(term) || 
        format.includes(term);
        
      return matchCat && matchSpecimen && matchSearch;
    });
  }, [tableSearch, tableFilter, specimenFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(fullTableProducts.length / itemsPerPage);
  const paginatedTableProducts = useMemo(() => {
    const start = (tablePage - 1) * itemsPerPage;
    return fullTableProducts.slice(start, start + itemsPerPage);
  }, [fullTableProducts, tablePage]);

  const handleTableSearchChange = (e) => {
    setTableSearch(e.target.value);
    setTablePage(1); // reset to page 1
  };

  const handleTableFilterChange = (cat) => {
    setTableFilter(cat);
    setTablePage(1); // reset to page 1
  };

  // Open RFQ and pre-fill selected product details
  const handleRequestQuote = (catNo, productName) => {
    onOpenRfq();
    // Pre-fill the textarea in the modal using a micro-timeout to ensure modal has mounted
    setTimeout(() => {
      const textarea = document.querySelector('textarea[name="message"]');
      if (textarea) {
        if (lang === 'he') {
          textarea.value = `שלום, אבקש לקבל הצעת מחיר עבור מוצר מהקטלוג:\nמק"ט: ${catNo}\nשם פריט: ${productName}\nתודה.`;
        } else {
          textarea.value = `Hello, I would like to request a quote for catalog item:\nCat No: ${catNo}\nProduct Name: ${productName}\nThank you.`;
        }
        // Dispatch input event so React state registers change
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, 100);
  };

  const pageTitle = category === 'b2b' ? (isHe ? 'קטלוג לשימוש מקצועי' : 'Catalog for Professional Use') : _('nav.b2c');
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

      {/* Majestic Widescreen Header Banner with Grid pattern */}
      <section 
        className="relative py-24 md:py-32 overflow-hidden text-white border-b border-slate-100"
        style={{ background: 'linear-gradient(135deg, #005EAD 0%, #003B70 100%)' }}
      >
        <div aria-hidden="true" className="absolute top-0 left-0 w-[500px] h-[250px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-0 right-0 w-[500px] h-[250px] bg-sky-400/20 rounded-full blur-[80px] pointer-events-none" />
        
        {/* Subtle Tech Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">{pageTitle}</h1>
          <p className="text-lg md:text-xl text-slate-100 font-light leading-relaxed opacity-95 max-w-3xl mx-auto">
            {pageDesc}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 relative z-10 mt-16">
        
        {/* --- SECTION 1: FEATURED HIGHLIGHTS (B2C Only) --- */}
        {category !== 'b2b' && (
          <>
            <div className="mb-12 flex items-center justify-between border-b border-slate-200 pb-5 max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {lang === 'he' ? 'מוצרים מובילים ומערכות פטנט' : 'Featured Highlight Solutions'}
              </h2>
              <span className="text-xs bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-black border border-blue-100/50 uppercase tracking-widest shadow-sm">
                {filteredFeatured.length} {lang === 'he' ? 'מוצרים' : 'Products'}
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
                    {sc === 'All' ? _('catalog.filterAll') : _(`catalog.cat${sc}`)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Featured Products Grid */}
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
          </>
        )}

        {/* --- SECTION 1: FULL CLINICAL INDEX TABLE (FIRST FOR B2B CATALOGUE) --- */}
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
                    {lang === 'he' ? 'מפתח קטלוג מלא (538 בדיקות)' : 'Complete Catalog Index (538 Parameters)'}
                  </h2>
                  <p className="text-sm text-slate-500 font-light mt-1">
                    {lang === 'he' ? 'חיפוש וסינון קליני רחב לפי מק"ט, שם, דגימה או פורמט מתוך הקטלוג הרשמי' : 'Comprehensive PDF database mapping for hospitals, laboratories, and clinics'}
                  </p>
                </div>
              </div>
              
              <div className="shrink-0 flex items-center gap-3">
                <span className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-extrabold border border-blue-100 shadow-sm">
                  {fullTableProducts.length} {lang === 'he' ? 'מוצרים נמצאו' : 'Products Found'}
                </span>
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
                  placeholder={lang === 'he' ? 'חפש לפי מק"ט BMT, שם בדיקה, דגימה (למשל Throat, Urine, Swab)...' : 'Search by BMT Cat No, parameter, specimen format...'}
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
                  <option value="All">{lang === 'he' ? 'כל הקטגוריות' : 'All Categories'}</option>
                  <option value="Infectious">{lang === 'he' ? 'מחלות זיהומיות (Infectious)' : 'Infectious Diseases'}</option>
                  <option value="Womens">{lang === 'he' ? 'בריאות האישה (Women\'s Health)' : 'Women\'s Health'}</option>
                  <option value="Doa">{lang === 'he' ? 'סמים ואלכוהול (Drugs of Abuse)' : 'Drugs of Abuse'}</option>
                  <option value="Tumor">{lang === 'he' ? 'סמני סרטן (Tumor Markers)' : 'Tumor Markers'}</option>
                  <option value="Cardiac">{lang === 'he' ? 'סמני לב (Cardiac Markers)' : 'Cardiac Markers'}</option>
                  <option value="Other">{lang === 'he' ? 'בדיקות שתן ומיוחדים (Others)' : 'Others & Urinalysis'}</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <select
                  value={specimenFilter}
                  onChange={(e) => { setSpecimenFilter(e.target.value); setTablePage(1); }}
                  className="w-full bg-slate-50/50 border border-slate-200 p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white outline-none transition text-sm font-extrabold appearance-none cursor-pointer pr-10 rtl:pr-4"
                >
                  <option value="All">{lang === 'he' ? 'כל סוגי הדגימות' : 'All Specimen Types'}</option>
                  <option value="Swab">{lang === 'he' ? 'מטוש / גרון (Swab / Throat)' : 'Swab / Throat'}</option>
                  <option value="Blood">{lang === 'he' ? 'דם מלא / סרום / פלזמה' : 'Whole Blood / Serum'}</option>
                  <option value="Urine">{lang === 'he' ? 'שתן (Urine)' : 'Urine'}</option>
                  <option value="Feces">{lang === 'he' ? 'צואה (Feces)' : 'Feces'}</option>
                </select>
              </div>
            </div>

            {/* The Clinical Table */}
            <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-inner bg-slate-50/20">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50 text-slate-700 font-extrabold text-xs uppercase tracking-widest text-start">
                  <tr>
                    <th scope="col" className="px-6 py-5 text-start w-24 font-black">{lang === 'he' ? 'מק"ט BMT' : 'BMT Cat No'}</th>
                    <th scope="col" className="px-6 py-5 text-start">{lang === 'he' ? 'תיאור בדיקה קלינית' : 'Clinical Description'}</th>
                    <th scope="col" className="px-6 py-5 text-start w-32">{lang === 'he' ? 'קטגוריה' : 'Category'}</th>
                    <th scope="col" className="px-6 py-5 text-start w-32">{lang === 'he' ? 'סוג דגימה' : 'Specimen'}</th>
                    <th scope="col" className="px-6 py-5 text-start w-32">{lang === 'he' ? 'פורמט' : 'Format'}</th>
                    <th scope="col" className="px-6 py-5 text-start w-28">{lang === 'he' ? 'מארז' : 'Kit Size'}</th>
                    <th scope="col" className="px-6 py-5 text-center w-36">{lang === 'he' ? 'פעולה' : 'Action'}</th>
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
                          <td className="px-6 py-4 text-slate-600 font-semibold">{p.specimen}</td>
                          <td className="px-6 py-4 text-slate-600 font-semibold">{p.format}</td>
                          <td className="px-6 py-4 font-mono text-slate-700 font-bold">{p.kitSize}</td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleRequestQuote(p.catNo, titleStr)}
                              className="bg-burgundy hover:brightness-110 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition shadow-sm btn-bouncy"
                            >
                              {lang === 'he' ? 'צור קשר' : 'RFQ'}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-slate-400 font-medium">
                        {lang === 'he' ? 'לא נמצאו מוצרים התואמים את החיפוש.' : 'No catalog items found matching search filters.'}
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
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" /> {lang === 'he' ? 'הקודם' : 'Previous'}
                </button>

                <div className="font-mono text-slate-500 text-xs">
                  {lang === 'he' ? `עמוד ${tablePage} מתוך ${totalPages}` : `Page ${tablePage} of ${totalPages}`}
                </div>

                <button
                  disabled={tablePage === totalPages}
                  onClick={() => setTablePage(prev => Math.min(totalPages, prev + 1))}
                  className="inline-flex items-center gap-2 border border-slate-200 bg-white text-slate-650 hover:bg-slate-55 px-5 py-3 rounded-2xl transition disabled:opacity-55 disabled:cursor-not-allowed font-bold"
                >
                  {lang === 'he' ? 'הבא' : 'Next'} <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- SECTION 2: PDF CATALOG DOWNLOAD CTA SECTION (AFTER TABLE FOR B2B) --- */}
        <div className="text-center mb-20 mt-12 max-w-5xl mx-auto">
          <div className="bg-slate-50 border border-slate-200/80 rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/[0.02] rounded-full blur-[60px] pointer-events-none"></div>
            
            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-snug">
              {category === 'b2b'
                ? (lang === 'he' ? 'זקוקים למפרט המלא של כל 538 הבדיקות הקליניות?' : 'Need the complete specifications for all 538 clinical parameters?')
                : (lang === 'he' ? 'רוצים להכיר את כל פורטפוליו מוצרי הפארם לשימוש ביתי?' : 'Want to explore the entire pharmacy retail home testing portfolio?')}
            </h3>
            <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
              {category === 'b2b'
                ? (lang === 'he' ? 'הורידו כעת את הקטלוג הקליני הרשמי המלא בפורמט PDF הכולל רגישויות, ספציפיות, סוגי דגימות ומק"טים של BMT Diagnostics.' : 'Download the official, comprehensive Clinical Catalog PDF mapping all rapid test suites, sensitivity, and clinical validations.')
                : (lang === 'he' ? 'הורידו את קטלוג מוצרי הצריכה והרוקחות המלא בפורמט PDF לעיון נוח בבית או במשרד.' : 'Download the complete consumer pharmacy catalog PDF for comprehensive details on home diagnostic kits.')}
            </p>
            
            <a
              href={category === 'b2b' ? './BMT-Products-Catalogue.pdf' : './BMT-Products-Catalogue2.pdf'}
              download
              className="inline-flex items-center gap-3 bg-burgundy text-white hover:bg-burgundy-650 font-extrabold px-10 py-5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-burgundy/30 text-sm md:text-base uppercase tracking-wider"
            >
              <FileSpreadsheet className="w-5 h-5 text-white/95" />
              <span>
                {category === 'b2b'
                  ? (lang === 'he' ? 'הורד קטלוג מלא (PDF)' : 'Download Full Catalog (PDF)')
                  : (lang === 'he' ? 'הורד קטלוג פארם מלא (PDF)' : 'Download Full Catalog (PDF)')}
              </span>
            </a>
          </div>
        </div>

        {/* --- SECTION 3: CONTACT US BANNER AT PAGE BOTTOM (LIGHT HERO PALETTE) --- */}
        <div className="text-center bg-gradient-to-br from-blue-50/90 via-sky-50 to-slate-50 text-slate-900 rounded-[3rem] p-12 md:p-16 shadow-lg border border-sky-200/80 relative overflow-hidden mt-16 max-w-5xl mx-auto">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/[0.05] rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-400/[0.08] rounded-full blur-3xl pointer-events-none"></div>
          
          <h3 className="relative z-10 text-2xl md:text-4xl font-black mb-4 tracking-tight max-w-3xl mx-auto leading-tight text-slate-900">
            {lang === 'he' ? 'מעוניינים בהצעת מחיר או ייעוץ קליני מותאם?' : 'Interested in Commercial Pricing or Custom Clinical Consultation?'}
          </h3>
          <p className="relative z-10 text-slate-600 text-base md:text-lg mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
            {lang === 'he' ? 'צוות המומחים של BMT Diagnostics זמין לכל פנייה, דרישת מק"ט או פיתוח מותאם למוסדות רפואיים ורשתות פארם.' : 'Our team is ready to assist with catalog parameters, commercial terms, or custom OEM manufacturing.'}
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
