const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CHROMIUM_SRC = process.cwd();
const REACT_DIST = path.resolve(__dirname, '../../dist');
const KDG_UI_DIR = path.join(CHROMIUM_SRC, 'chrome/browser/resources/kdg_ui');

console.log('Injecting KDG Browser React UI into Chromium...');

function replaceInFile(filePath, searchRegex, replaceString) {
  const fullPath = path.join(CHROMIUM_SRC, filePath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  content = content.replace(searchRegex, replaceString);
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`[OK] Patched: ${filePath}`);
}

// 1. Copy React Dist
if (!fs.existsSync(KDG_UI_DIR)) {
  fs.mkdirSync(KDG_UI_DIR, { recursive: true });
}
if (fs.existsSync(REACT_DIST)) {
  execSync(`cp -r "${REACT_DIST}"/* "${KDG_UI_DIR}/"`);
  console.log('[OK] Copied React build to KDG_UI directory');
} else {
  console.warn('[WARN] React build not found in dist. Ensure you ran npm run build.');
}

// 2. Create BUILD.gn for the WebUI resources
const buildGnContent = `
import("//ui/webui/resources/tools/generate_grd.gni")

generate_grd("build_grd") {
  grd_prefix = "kdg_ui"
  out_grd = "$target_gen_dir/resources.grd"
  input_files = [
    "index.html",
  ]
  input_files_base_dir = rebase_path(".", "//")
}
`;
fs.writeFileSync(path.join(KDG_UI_DIR, 'BUILD.gn'), buildGnContent);
console.log('[OK] Created BUILD.gn for WebUI');

// 3. Patch BrowserView to load chrome://kdg-ui instead of native Views
replaceInFile(
  'chrome/browser/ui/views/frame/browser_view.cc',
  /void BrowserView::InitElements\(\) \{/g,
  `void BrowserView::InitElements() {
  // KDG: Load React WebUI instead of native views
  auto* web_contents = content::WebContents::Create(content::WebContents::CreateParams(browser_->profile()));
  web_contents->GetController().LoadURL(GURL("chrome://kdg-ui/"), content::Referrer(), ui::PAGE_TRANSITION_AUTO_TOPLEVEL, std::string());
  contents_web_view_->SetWebContents(web_contents);
`
);

console.log('React UI injected successfully.');
