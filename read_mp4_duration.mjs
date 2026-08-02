import fs from 'fs';
import path from 'path';

function getMp4Duration(filePath) {
  const fd = fs.openSync(filePath, 'r');
  const buffer = Buffer.alloc(100000); // Read first 100KB which usually contains mvhd
  fs.readSync(fd, buffer, 0, 100000, 0);
  fs.closeSync(fd);

  // Search for the 'mvhd' atom
  const mvhdOffset = buffer.indexOf(Buffer.from('mvhd'));
  if (mvhdOffset === -1) {
    return null;
  }

  // mvhd start is at mvhdOffset
  // The 'mvhd' text starts at mvhdOffset.
  // The fields start after the type (4 bytes):
  // 1 byte version, 3 bytes flags
  const version = buffer.readUInt8(mvhdOffset + 4);
  
  let timescaleOffset, durationOffset, isVersion1 = false;
  if (version === 0) {
    // version 0:
    // creation_time: 4 bytes (offset 8)
    // modification_time: 4 bytes (offset 12)
    // timescale: 4 bytes (offset 16)
    // duration: 4 bytes (offset 20)
    timescaleOffset = mvhdOffset + 4 + 4 + 4 + 4; // offset + 20
    durationOffset = timescaleOffset + 4; // offset + 24
  } else if (version === 1) {
    // version 1:
    // creation_time: 8 bytes (offset 8)
    // modification_time: 8 bytes (offset 16)
    // timescale: 4 bytes (offset 24)
    // duration: 8 bytes (offset 28)
    isVersion1 = true;
    timescaleOffset = mvhdOffset + 4 + 4 + 8 + 8; // offset + 28
    durationOffset = timescaleOffset + 4; // offset + 32
  } else {
    return null;
  }

  if (durationOffset + 8 > buffer.length) {
    return null;
  }

  const timescale = buffer.readUInt32BE(timescaleOffset);
  let duration;
  if (isVersion1) {
    // Read 64-bit uint BE
    const high = buffer.readUInt32BE(durationOffset);
    const low = buffer.readUInt32BE(durationOffset + 4);
    duration = high * 4294967296 + low;
  } else {
    duration = buffer.readUInt32BE(durationOffset);
  }

  if (timescale === 0) return null;
  return duration / timescale;
}

// Find all .mp4 files
function scanDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        scanDirectory(fullPath, fileList);
      }
    } else if (file.endsWith('.mp4')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const baseDir = 'c:\\Users\\RoeyTamir\\Downloads\\Website BMT';
const mp4Files = scanDirectory(baseDir);

console.log('--- MP4 DURATIONS ---');
for (const file of mp4Files) {
  try {
    const duration = getMp4Duration(file);
    const relativePath = path.relative(baseDir, file);
    const sizeMB = (fs.statSync(file).size / (1024 * 1024)).toFixed(2);
    if (duration !== null) {
      console.log(`${relativePath}: ${duration.toFixed(2)}s (${sizeMB} MB)`);
    } else {
      console.log(`${relativePath}: Could not read duration (${sizeMB} MB)`);
    }
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
  }
}
