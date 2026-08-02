import fs from 'fs';
import path from 'path';

const rawText = fs.readFileSync('extracted_pdf_catalog.txt', 'utf8');
const lines = rawText.split('\n');

const products = [];
let currentCategory = 'Infectious'; // fallback

const categoriesMap = {
  'Women’s Health': 'Womens',
  'Infectious Disease': 'Infectious',
  'Drugs of Abuse': 'Doa',
  'Tumor Markers': 'Tumor',
  'Cardiac Markers': 'Cardiac',
  'Others': 'Other'
};

// Formats we look for
const formatsList = ['Dipstick', 'Cassette', 'Panel', 'Cup', 'Midstream', 'Device', 'Reagent', 'Assay'];
// Specimens we look for
const specimensList = [
  'Urine', 'Feces', 'WB / S/ P', 'S / P', 'WB / S / P', 'WB/S/P', 
  'Whole Blood', 'WB', 'Serum', 'Plasma', 'Swab', 'Oral Fluid', 
  'Powder', 'Stain', 'Vaginal Discharge', 'Vaginal', 'Sperm', 'Breast Milk',
  'Nasal Swab', 'Throat Swab'
];

for (let line of lines) {
  line = line.trim();
  if (!line) continue;

  // Check if we hit a category header
  let foundCat = false;
  for (const [title, catKey] of Object.entries(categoriesMap)) {
    if (line.includes(title) && !line.includes('Cat. No.') && !line.includes('BMT')) {
      currentCategory = catKey;
      foundCat = true;
      break;
    }
  }
  if (foundCat) continue;

  // Match 5-digit catalog numbers (BMT Catalog format)
  // Example: 51001 Adenovirus Rapid Test Cassette Feces Cassette 25 T
  const match = line.match(/^(\d{5})\s+(.+)$/);
  if (match) {
    const catNo = match[1];
    const rest = match[2].trim();

    let title = '';
    let specimen = 'Urine'; // default
    let format = 'Cassette'; // default
    let kitSize = '25 T'; // default

    // Parse the fields out of 'rest'
    // Simple parsing by scanning for known specimens and formats
    let parsedSpecimen = '';
    let parsedFormat = '';

    // Look for format
    for (const f of formatsList) {
      const idx = rest.toLowerCase().lastIndexOf(f.toLowerCase());
      if (idx !== -1) {
        parsedFormat = f;
        break;
      }
    }

    // Look for specimen
    for (const s of specimensList) {
      const idx = rest.toLowerCase().lastIndexOf(s.toLowerCase());
      if (idx !== -1 && idx > 5) {
        parsedSpecimen = s;
        break;
      }
    }

    // Attempt to parse out kit size at the end
    // E.g. "25 T", "50 T", "40 T", "100 T", "1 T"
    let parsedKitSize = '25 T';
    const kitMatch = rest.match(/(\d+\s*T(ests)?|\d+\s*parameters|100\s*Strips\/Tube|No Box)$/i);
    if (kitMatch) {
      parsedKitSize = kitMatch[1];
    }

    // Clean up title
    // Remove kit size, format, specimen from description if they are trailing
    let cleanedTitle = rest;
    cleanedTitle = cleanedTitle.replace(/(\d+\s*T(ests)?|\d+\s*parameters|100\s*Strips\/Tube|No Box)$/i, '').trim();
    
    // Set variables
    title = cleanedTitle;
    specimen = parsedSpecimen || 'Urine';
    format = parsedFormat || 'Cassette';
    kitSize = parsedKitSize;

    // Simple language translations helper for the table
    const enTitle = title;
    // Simple Hebrew translation rules for categories / common words
    let heTitle = title
      .replace(/Rapid Test/gi, 'בדיקה מהירה')
      .replace(/Dipstick/gi, 'מקלון (Dipstick)')
      .replace(/Cassette/gi, 'קסטה')
      .replace(/Combo/gi, 'משולבת')
      .replace(/Enhanced Sensitivity/gi, 'רגישות מוגברת')
      .replace(/Pregnancy/gi, 'הריון')
      .replace(/Ovulation/gi, 'ביוץ')
      .replace(/Antibody/gi, 'נוגדנים')
      .replace(/Antigen/gi, 'אנטיגן')
      .replace(/Device/gi, 'התקן')
      .replace(/Cup/gi, 'כוס')
      .replace(/Home Test/gi, 'בדיקה ביתית')
      .replace(/Urinalysis/gi, 'בדיקת שתן')
      .replace(/Strep A/gi, 'סטראפ A')
      .replace(/Influenza/gi, 'שפעת');

    products.push({
      catNo,
      title: { en: enTitle, he: heTitle },
      category: currentCategory,
      specimen,
      format,
      kitSize
    });
  }
}

// Generate the output file
const fileContent = `// --- AUTOMATICALLY GENERATED COMPREHENSIVE BMT PDF CATALOGUE DATABASE ---
// Total parsed items: ${products.length}
const fullCatalogDatabase = ${JSON.stringify(products, null, 2)};

export default fullCatalogDatabase;
`;

fs.writeFileSync('src/data/fullCatalogDatabase.js', fileContent, 'utf8');
console.log(`Successfully generated src/data/fullCatalogDatabase.js with ${products.length} products!`);
