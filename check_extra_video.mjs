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

  const version = buffer.readUInt8(mvhdOffset + 4);
  
  let timescaleOffset, durationOffset, isVersion1 = false;
  if (version === 0) {
    timescaleOffset = mvhdOffset + 20;
    durationOffset = timescaleOffset + 4;
  } else if (version === 1) {
    isVersion1 = true;
    timescaleOffset = mvhdOffset + 28;
    durationOffset = timescaleOffset + 4;
  } else {
    return null;
  }

  if (durationOffset + 8 > buffer.length) {
    return null;
  }

  const timescale = buffer.readUInt32BE(timescaleOffset);
  let duration;
  if (isVersion1) {
    const high = buffer.readUInt32BE(durationOffset);
    const low = buffer.readUInt32BE(durationOffset + 4);
    duration = high * 4294967296 + low;
  } else {
    duration = buffer.readUInt32BE(durationOffset);
  }

  if (timescale === 0) return null;
  return duration / timescale;
}

const files = [
  'c:\\Users\\RoeyTamir\\Downloads\\video1793085496.mp4',
  'c:\\Users\\RoeyTamir\\Downloads\\LabOnTime Flu Rapid Test.mp4'
];

for (const file of files) {
  try {
    const dur = getMp4Duration(file);
    console.log(`${file}: ${dur ? dur.toFixed(2) + 's' : 'Could not parse'}`);
  } catch (err) {
    console.error(err.message);
  }
}
