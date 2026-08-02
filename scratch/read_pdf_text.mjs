import fs from 'fs';

const pdf1 = fs.readFileSync('public/BMT-Products-Catalogue.pdf');
const pdf2 = fs.readFileSync('public/BMT-Products-Catalogue2.pdf');

console.log('PDF 1 size:', pdf1.length);
console.log('PDF 2 size:', pdf2.length);

// Simple text extraction from raw PDF buffer looking for strings
const extractStrings = (buf) => {
  const str = buf.toString('latin1');
  const matches = str.match(/\(([^()]{3,100})\)\s*Tj/g) || [];
  return matches.map(m => m.replace(/^\(|\)\s*Tj$/g, ''));
};

console.log('--- PDF 1 STRINGS ---');
console.log(extractStrings(pdf1).slice(0, 40).join('\n'));

console.log('--- PDF 2 STRINGS ---');
console.log(extractStrings(pdf2).slice(0, 40).join('\n'));
