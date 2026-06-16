import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const cacheDir = path.join(os.homedir(), 'AppData/Local/electron-builder/Cache/winCodeSign');
const targetDir = path.join(cacheDir, 'winCodeSign-2.6.0');

function fix() {
  console.log('Checking winCodeSign cache...');
  if (fs.existsSync(targetDir)) {
    console.log('winCodeSign is already prepared in cache.');
    return;
  }

  if (!fs.existsSync(cacheDir)) {
    console.log('Cache directory does not exist yet. Creating...');
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  const files = fs.readdirSync(cacheDir);
  const archiveFile = files.find(f => f.endsWith('.7z'));

  if (!archiveFile) {
    console.log('No cached .7z file found in winCodeSign cache. Please run the build command once so electron-builder downloads it first.');
    return;
  }

  const archivePath = path.join(cacheDir, archiveFile);
  const _7zaPath = path.resolve('node_modules/7zip-bin/win/x64/7za.exe');

  console.log(`Found cached archive: ${archivePath}`);
  console.log(`Using 7za from: ${_7zaPath}`);
  console.log('Extracting winCodeSign while excluding darwin and linux folders...');

  const cmd = `"${_7zaPath}" x "${archivePath}" "-o${targetDir}" -xr!darwin -xr!linux -y`;
  console.log(`Running: ${cmd}`);

  try {
    execSync(cmd, { stdio: 'inherit' });
    console.log('Extraction completed successfully!');
  } catch (err) {
    console.error('Extraction failed:', err);
  }
}

fix();
