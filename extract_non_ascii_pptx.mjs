import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const baseDir = 'c:\\Users\\RoeyTamir\\Downloads\\Website BMT';

function extractAndScan(srcFile, tempName) {
  const fullSrcPath = path.join(baseDir, srcFile);
  if (!fs.existsSync(fullSrcPath)) {
    console.log(`Source file does not exist: ${srcFile}`);
    return;
  }
  
  const tempPptx = path.join(baseDir, 'scratch', tempName + '.pptx');
  const targetDir = path.join(baseDir, 'scratch', 'extracted_' + tempName);
  
  console.log(`Copying ${srcFile} to ${tempPptx}...`);
  fs.copyFileSync(fullSrcPath, tempPptx);
  
  console.log(`Extracting to ${targetDir}...`);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  try {
    execSync(`tar -xf "${tempPptx}" -C "${targetDir}"`);
    console.log('Extraction success! Scanning for media...');
    scanForMedia(targetDir);
  } catch (err) {
    console.error(`Error unzipping ${tempName}:`, err.message);
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

extractAndScan('BMT - Presentation אפליקציה 2023 .pptx', 'temp_presentation_app');
extractAndScan('דפי הדרכה לביצוע בדיקת דלקת בגרון Strep A.pptx', 'temp_instruction_strep');
console.log('Done scanning non-ASCII pptx.');
