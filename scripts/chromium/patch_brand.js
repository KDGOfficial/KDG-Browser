const fs = require('fs');
const path = require('path');

const CHROMIUM_SRC = process.cwd();

console.log('Applying KDG Brand Patches...');

function replaceInFile(filePath, searchRegex, replaceString) {
  const fullPath = path.join(CHROMIUM_SRC, filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`[WARNING] File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  content = content.replace(searchRegex, replaceString);
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`[OK] Patched: ${filePath}`);
}

// 1. BRANDING file
const brandingPath = 'chrome/app/theme/chromium/BRANDING';
if (fs.existsSync(path.join(CHROMIUM_SRC, brandingPath))) {
  let branding = fs.readFileSync(path.join(CHROMIUM_SRC, brandingPath), 'utf8');
  branding = branding.replace(/COMPANY_FULLNAME=.*/g, 'COMPANY_FULLNAME=KDGOfficial');
  branding = branding.replace(/COMPANY_SHORTNAME=.*/g, 'COMPANY_SHORTNAME=KDG');
  branding = branding.replace(/PRODUCT_FULLNAME=.*/g, 'PRODUCT_FULLNAME=KDG Browser');
  branding = branding.replace(/PRODUCT_SHORTNAME=.*/g, 'PRODUCT_SHORTNAME=KDG Browser');
  branding = branding.replace(/MAC_BUNDLE_ID=.*/g, 'MAC_BUNDLE_ID=com.kdg.browser');
  fs.writeFileSync(path.join(CHROMIUM_SRC, brandingPath), branding, 'utf8');
  console.log(`[OK] Patched BRANDING`);
}

// 2. Chromium Strings GRD
replaceInFile('chrome/app/chromium_strings.grd', /Chromium/g, 'KDG Browser');

// 3. Installer Paths
replaceInFile('chrome/installer/util/util_constants.cc', /"Chromium"/g, '"KDG Browser"');
replaceInFile('chrome/common/chrome_paths_win.cc', /L"Chromium"/g, 'L"KDG Browser"');

console.log('Brand patches applied successfully.');
