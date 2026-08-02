import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const baseDir = 'c:\\Users\\RoeyTamir\\Downloads\\Website BMT';
const pptxFiles = fs.readdirSync(baseDir).filter(f => f.endsWith('.pptx'));

console.log('Found PPTX files:', pptxFiles);

for (const file of pptxFiles) {
  const nameWithoutExt = path.basename(file, '.pptx');
  const targetDir = path.join(baseDir, 'scratch', 'extracted_' + nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '_'));
  
  console.log(`Extracting ${file} to ${targetDir}...`);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  try {
    const fullPptxPath = path.join(baseDir, file);
    // Use tar to extract pptx (since it is a zip file)
    execSync(`tar -xf "${fullPptxPath}" -C "${targetDir}"`);
    
    // Scan for media files in targetDir
    scanForMedia(targetDir);
  } catch (err) {
    console.error(`Error unzipping ${file}:`, err.message);
  }
}

function scanForMedia(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanForMedia(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.mp4', '.mov', '.avi', '.wmv', '.mpg', '.mpeg'].includes(ext)) {
        console.log(`  --> Media found: ${path.relative(baseDir, fullPath)} (${(stat.size / (1024 * 1024)).toFixed(2)} MB)`);
      }
    }
  }
}

console.log('All PPTX scans completed.');
