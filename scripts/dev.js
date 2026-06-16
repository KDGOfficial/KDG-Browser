import { spawn } from 'child_process';
import { build } from 'esbuild';
import fs from 'fs';

// Compile main files
async function compileMain() {
  console.log('Compiling main process files...');
  try {
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
      external: ['electron'],
      sourcemap: 'inline',
      outExtension: { '.js': '.cjs' }
    });
    console.log('Main process compiled successfully.');
  } catch (err) {
    console.error('Failed to compile main process:', err);
  }
}

async function start() {
  if (!fs.existsSync('dist-electron')) {
    fs.mkdirSync('dist-electron');
  }

  // Compile initially
  await compileMain();

  let electronProcess = null;

  function startElectron() {
    console.log('Launching Electron...');
    electronProcess = spawn('npx', ['electron', '.'], {
      shell: true,
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'development'
      }
    });

    electronProcess.on('close', (code) => {
      // If electron closes, kill the process
      if (viteProcess) {
        viteProcess.kill();
      }
      process.exit(code || 0);
    });
  }

  // Watch for main process changes
  fs.watch('main', { recursive: true }, async (eventType, filename) => {
    if (filename && (filename.endsWith('.ts') || filename.endsWith('.js'))) {
      console.log(`Main process file changed: ${filename}. Recompiling...`);
      await compileMain();
      if (electronProcess) {
        console.log('Restarting Electron...');
        electronProcess.kill();
        startElectron();
      }
    }
  });

  // Start Vite dev server
  console.log('Starting Vite development server...');
  const viteProcess = spawn('npx', ['vite'], {
    shell: true,
    stdio: 'inherit'
  });

  viteProcess.on('close', (code) => {
    if (electronProcess) {
      electronProcess.kill();
    }
    process.exit(code || 0);
  });

  // Delay starting Electron slightly to let Vite spin up
  setTimeout(startElectron, 2000);
}

start();
