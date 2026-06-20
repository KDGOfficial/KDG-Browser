const fs = require('fs');
const path = require('path');

const CHROMIUM_SRC = process.cwd();

console.log('Applying Chrome Web Store C++ Network Patches...');

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

// 1. Spoof User Agent so it looks like Official Google Chrome
replaceInFile(
  'components/embedder_support/user_agent_utils.cc',
  /product = "Chromium\/";/g,
  'product = "Chrome/"; // Spoofed for CWS'
);

replaceInFile(
  'components/embedder_support/user_agent_utils.cc',
  /std::string GetProduct\(\) \{/g,
  'std::string GetProduct() {\n  return "Chrome/131.0.6778.205"; // Hardcoded spoof'
);

// 2. Bypass WebStore Domain checks in extensions API
replaceInFile(
  'chrome/common/extensions/extension_constants.cc',
  /const char kGalleryStoreUrls\[\]\[\d+\] = \{/g,
  'const char kGalleryStoreUrls[][100] = {\n    "https://chrome.google.com/webstore",\n    "https://chromewebstore.google.com",\n'
);

replaceInFile(
  'chrome/browser/extensions/webstore_installer.cc',
  /bool IsWebstoreDomain\(const GURL& url\) \{/g,
  'bool IsWebstoreDomain(const GURL& url) {\n  return true; // KDG: Allow all Webstore domains'
);

console.log('Web Store patches applied successfully.');
