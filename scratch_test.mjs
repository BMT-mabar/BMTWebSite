import translations from './src/data/translations.js';
import productsDatabase from './src/data/productsDatabase.js';

console.log('SUCCESS: Translations loaded successfully!');
console.log('Supported languages:', Object.keys(translations));
console.log('SUCCESS: Products Database loaded successfully!');
console.log('Product count:', productsDatabase.length);
