import { build } from 'esbuild';
import fs from 'fs';

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
      '@google/generative-ai'
    ],
    minify: true,
    outExtension: { '.js': '.cjs' }
  });
  console.log('Production compilation of main process complete.');
}

compileMain().catch((err) => {
  console.error(err);
  process.exit(1);
});
