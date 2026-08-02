const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(publicDir).filter(f => /\.(jpg|jpeg|png|webp|JPG)$/i.test(f));

console.log('--- ALL PUBLIC IMAGES ---');
files.forEach((f, i) => {
  const stat = fs.statSync(path.join(publicDir, f));
  console.log(`${i+1}. ${f} (${(stat.size / 1024).toFixed(1)} KB)`);
});
