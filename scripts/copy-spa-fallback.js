// scripts/copy-spa-fallback.js
// After build, copy index.html to 404.html so deep links work on GitHub Pages with React Router
const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, '..', 'build');
const src = path.join(buildDir, 'index.html');
const dest = path.join(buildDir, '404.html');

if (!fs.existsSync(buildDir)) {
  console.error('Build directory not found. Run `npm run build` first.');
  process.exit(1);
}

fs.copyFileSync(src, dest);
console.log('Copied index.html to 404.html for SPA fallback.');
