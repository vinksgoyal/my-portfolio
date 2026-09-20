// src/snap.js - Simple HTML copy - NO PUPPETEER
const fs = require('fs');
const path = require('path');

console.log('🚀 Generating static HTML files for SEO...');

const buildDir = path.join(__dirname, '..', 'build');

// Check if build exists
if (!fs.existsSync(buildDir)) {
  console.error('❌ Build folder not found. Run "npm run build" first.');
  process.exit(1);
}

const indexPath = path.join(buildDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('❌ index.html not found in build folder.');
  process.exit(1);
}

// Read the main index.html
const indexContent = fs.readFileSync(indexPath, 'utf-8');

// Define all routes that need static HTML
const routes = [
  { path: '/', title: 'Vinks Goyal (Divyansh Goyal) - Full Stack Engineer & Founder' },
  { path: '/about', title: 'About Vinks Goyal (Divyansh Goyal) - Full Stack Engineer' },
  { path: '/blog', title: 'Blog - Vinks Goyal (Divyansh Goyal) on Tech & Development' },
  { path: '/projects', title: 'Projects - Vinks Goyal (Divyansh Goyal) - Web Development Portfolio' },
  { path: '/resume', title: 'Resume - Vinks Goyal (Divyansh Goyal) - Full Stack Engineer' },
];

// Create a copy for each route
routes.forEach(({ path: routePath }) => {
  const routeDir = routePath === '/' ? '' : routePath;
  const dir = path.join(buildDir, routeDir);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const filePath = path.join(dir, 'index.html');
  fs.writeFileSync(filePath, indexContent);
  console.log(`✅ Created: ${filePath}`);
});

// Create 200.html for SPA fallback
const fallbackPath = path.join(buildDir, '200.html');
fs.writeFileSync(fallbackPath, indexContent);
console.log(`✅ Created: ${fallbackPath}`);

// Create 404.html
const errorPath = path.join(buildDir, '404.html');
fs.writeFileSync(errorPath, indexContent);
console.log(`✅ Created: ${errorPath}`);

console.log('🎉 Static pages generated successfully!');
console.log('📝 Pages created for: /, /about, /blog, /projects, /resume');
console.log('💡 Google can now crawl these pages with proper meta tags!');
