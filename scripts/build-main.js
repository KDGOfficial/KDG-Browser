import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import JavaScriptObfuscator from 'javascript-obfuscator';

function getSHA256(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

const obfuscatorConfig = {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  renameGlobals: false,
  selfDefending: false,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.75,
  unicodeEscapeSequence: false
};

async function compileMain() {
  console.log('Compiling main process for production...');
  if (!fs.existsSync('dist-electron')) {
    fs.mkdirSync('dist-electron');
  }

  await build({
    entryPoints: [
      'main/index.ts',
      'main/preload.ts',
      'main/ipc-handlers.ts'
    ],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    outdir: 'dist-electron',
    external: [
      'electron', 
      '@cliqz/adblocker-electron', 
      'cross-fetch', 
      'electron-updater',
      '@google/generative-ai',
      'better-sqlite3'
    ],
    minify: true,
    outExtension: { '.js': '.cjs' }
  });

  // 1. Obfuscate preload.cjs and ipc-handlers.cjs first
  const helperFiles = [
    'dist-electron/preload.cjs',
    'dist-electron/ipc-handlers.cjs'
  ];

  console.log('Obfuscating main helper files...');
  for (const file of helperFiles) {
    if (fs.existsSync(file)) {
      const originalCode = fs.readFileSync(file, 'utf8');
      const obfuscationResult = JavaScriptObfuscator.obfuscate(originalCode, obfuscatorConfig);
      fs.writeFileSync(file, obfuscationResult.getObfuscatedCode(), 'utf8');
      console.log(`Obfuscated and updated: ${file}`);
    }
  }

  // 2. Compute hashes of the obfuscated preload.cjs, ipc-handlers.cjs, and dist/index.html
  console.log('Calculating checksums of compiled components...');
  const preloadHash = getSHA256('dist-electron/preload.cjs');
  const ipcHandlersHash = getSHA256('dist-electron/ipc-handlers.cjs');
  const indexHtmlHash = getSHA256('dist/index.html');

  console.log(`- preload.cjs: ${preloadHash}`);
  console.log(`- ipc-handlers.cjs: ${ipcHandlersHash}`);
  console.log(`- index.html: ${indexHtmlHash}`);

  // 3. Inject hashes into index.cjs
  console.log('Injecting checksums into index.cjs...');
  const indexFile = 'dist-electron/index.cjs';
  let indexCode = fs.readFileSync(indexFile, 'utf8');

  // Replace placeholders in order
  indexCode = indexCode.replace('DEVELOPMENT_PLACEHOLDER', preloadHash);
  indexCode = indexCode.replace('DEVELOPMENT_PLACEHOLDER', ipcHandlersHash);
  indexCode = indexCode.replace('DEVELOPMENT_PLACEHOLDER', indexHtmlHash);

  fs.writeFileSync(indexFile, indexCode, 'utf8');

  // 4. Obfuscate index.cjs last
  console.log('Obfuscating main index.cjs...');
  const obfuscationResult = JavaScriptObfuscator.obfuscate(indexCode, obfuscatorConfig);
  fs.writeFileSync(indexFile, obfuscationResult.getObfuscatedCode(), 'utf8');
  console.log('Obfuscated and updated: dist-electron/index.cjs');

  console.log('Production compilation, hashing, and obfuscation of main process complete.');
}

compileMain().catch((err) => {
  console.error(err);
  process.exit(1);
});
