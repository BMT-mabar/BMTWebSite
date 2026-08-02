import fs from 'fs';
import path from 'path';

function findExtractedMedia(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findExtractedMedia(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.mp4', '.mov', '.avi', '.wmv', '.mpg', '.mpeg'].includes(ext)) {
        console.log(`Media found: ${fullPath} (${(stat.size / (1024 * 1024)).toFixed(2)} MB)`);
      }
    }
  }
}

console.log('--- Extracted Media Files ---');
findExtractedMedia('c:\\Users\\RoeyTamir\\Downloads\\Website BMT\\scratch\\pptx_extracted');
console.log('Done scanning.');
