import fs from 'fs';
import path from 'path';

function readUtf16Le(filePath) {
  if (!fs.existsSync(filePath)) return `File ${filePath} not found.`;
  try {
    const buffer = fs.readFileSync(filePath);
    return buffer.toString('utf16le');
  } catch (err) {
    return `Error reading ${filePath}: ${err.message}`;
  }
}

const txtFiles = ['extracted_intro.txt', 'extracted_intro2.txt', 'extracted_short.txt'];

let output = '=== EXTRACTED BMT TEXT FILES ===\n\n';

for (const file of txtFiles) {
  output += `\n\n--- FILE: ${file} ---\n`;
  const content = readUtf16Le(file);
  output += content;
}

fs.writeFileSync('extracted_docs_summary.txt', output, 'utf8');
console.log('Successfully written compiled texts to extracted_docs_summary.txt');
