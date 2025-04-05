const fs = require('fs');
const path = require('path');
const marked = require('marked');
const { execSync } = require('child_process');
const https = require('https');

// Configuration
const sourceDir = path.join(__dirname);
const distDir = path.join(__dirname, 'dist');
const assetsDir = path.join(distDir, 'assets');
const bpmnDir = path.join(distDir, 'bpmn');
const bpmnSvgDir = path.join(bpmnDir, 'svg');
const libsDir = path.join(assetsDir, 'libs');

// Ensure directories exist
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir);
if (!fs.existsSync(bpmnDir)) fs.mkdirSync(bpmnDir);
if (!fs.existsSync(bpmnSvgDir)) fs.mkdirSync(bpmnSvgDir);
if (!fs.existsSync(libsDir)) fs.mkdirSync(libsDir);

// Define bpmnFiles variable early in the script
let bpmnFiles = [];
if (fs.existsSync(path.join(sourceDir, 'bpmn'))) {
  bpmnFiles = fs.readdirSync(path.join(sourceDir, 'bpmn'))
    .filter(file => file.endsWith('.bpmn'));
  console.log(`Found ${bpmnFiles.length} BPMN files`);
} else {
  console.warn('BPMN directory not found in source!');
  // Create an empty bpmn directory to avoid issues
  if (!fs.existsSync(path.join(sourceDir, 'bpmn'))) {
    fs.mkdirSync(path.join(sourceDir, 'bpmn'));
  }
}

// External dependencies to download
const externalDependencies = [
  { 
    url: 'https://unpkg.com/bpmn-js@11.5.0/dist/bpmn-viewer.development.js',
    dest: path.join(libsDir, 'bpmn-viewer.js')
  },
  {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/marked/4.2.5/marked.min.js',
    dest: path.join(libsDir, 'marked.min.js')
  },
  {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js',
    dest: path.join(libsDir, 'highlight.min.js')
  },
  {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css',
    dest: path.join(libsDir, 'highlight-github.min.css')
  }
];

// Function to download a file
function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${url} to ${destination}...`);
    const file = fs.createWriteStream(destination);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${url} successfully`);
        resolve();
      });
    }).on('error', err => {
      fs.unlink(destination);
      console.error(`Error downloading ${url}: ${err.message}`);
      reject(err);
    });
  });
}

// Download all external dependencies
async function downloadDependencies() {
  console.log('Downloading external dependencies...');
  for (const dep of externalDependencies) {
    await downloadFile(dep.url, dep.dest);
  }
  console.log('All dependencies downloaded successfully');
}

// Copy assets
fs.copyFileSync(path.join(sourceDir, 'wiki.js'), path.join(assetsDir, 'wiki.js'));

// Add CSS file for styling
const cssContent = `
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.sidebar {
  width: 250px;
  padding-right: 20px;
  border-right: 1px solid #eaecef;
  position: sticky;
  top: 20px;
  height: calc(100vh - 40px);
  overflow-y: auto;
}
.content {
  flex: 1;
  padding-left: 20px;
  overflow-wrap: break-word;
  min-width: 0;
}
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.nav-link {
  display: block;
  padding: 8px 0;
  text-decoration: none;
  color: #0366d6;
  border-bottom: 1px solid #f0f0f0;
}
.nav-link:hover {
  text-decoration: underline;
  background-color: #f6f8fa;
}
.nav-link.active {
  font-weight: bold;
  color: #24292e;
  background-color: #f1f8ff;
}
header {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eaecef;
}
header h1 {
  margin: 0;
  font-size: 24px;
}
.document-title {
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eaecef;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
  display: block;
  overflow-x: auto;
}
th, td {
  padding: 12px 15px;
  text-align: left;
  border: 1px solid #ddd;
  min-width: 120px;
}
th {
  background-color: #f6f8fa;
  font-weight: 600;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
.bpmn-viewer-container {
  border: 1px solid #ddd;
  margin: 20px 0;
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
}
.bpmn-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #f6f8fa;
  border-bottom: 1px solid #ddd;
}
.bpmn-canvas {
  height: 500px;
  overflow: hidden;
  background-color: #fff;
  position: relative;
}
.bpmn-canvas svg {
  width: 100%;
  height: 100%;
}
.bpmn-error {
  padding: 20px;
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin: 20px;
  text-align: center;
}
.djs-container {
  width: 100% !important;
  height: 100% !important;
}
.djs-container svg {
  width: 100% !important;
  height: 100% !important;
}
button {
  padding: 6px 12px;
  background-color: #0366d6;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 5px;
  font-size: 14px;
}
button:hover {
  background-color: #0255b3;
}
.pagination-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid #eaecef;
}
.back-to-toc {
  text-align: center;
}
code {
  background-color: #f6f8fa;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 85%;
}
pre {
  background-color: #f6f8fa;
  border-radius: 3px;
  padding: 16px;
  overflow: auto;
}
pre code {
  background-color: transparent;
  padding: 0;
}
blockquote {
  border-left: 3px solid #ddd;
  padding-left: 15px;
  color: #6a737d;
  margin: 0 0 16px;
}
.bpmn-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}
.bpmn-card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  background-color: #f9f9f9;
}
.bpmn-card h3 {
  margin-top: 0;
  color: #0366d6;
}
.bpmn-link.btn {
  display: inline-block;
  margin-top: 10px;
  text-decoration: none;
  padding: 6px 12px;
  background-color: #0366d6;
  color: white;
  border-radius: 3px;
}
.spinner-border {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: 0.25rem solid #0366d6;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner 0.75s linear infinite;
}
@keyframes spinner {
  to { transform: rotate(360deg); }
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.alert {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
}
.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
.alert-heading {
  color: inherit;
  margin-top: 0;
}
.mb-0 {
  margin-bottom: 0;
}
hr {
  margin: 20px 0;
  border: 0;
  border-top: 1px solid #eaecef;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #eaecef;
    position: relative;
    height: auto;
    padding-right: 0;
    margin-bottom: 20px;
  }
  .content {
    padding-left: 0;
  }
}
`;
fs.writeFileSync(path.join(assetsDir, 'style.css'), cssContent);

// Copy BPMN files - ensure this part is properly executed
console.log('Copying BPMN files to distribution directory...');
if (bpmnFiles.length > 0) {
  bpmnFiles.forEach(file => {
    const source = path.join(sourceDir, 'bpmn', file);
    const dest = path.join(bpmnDir, file);
    
    // Copy BPMN file
    fs.copyFileSync(source, dest);
    console.log(`Copied ${file} to ${dest}`);
    
    // Generate SVG for the BPMN diagram
    try {
      const svgOutput = path.join(bpmnSvgDir, file.replace('.bpmn', '.svg'));
      console.log(`Creating SVG for ${file} at ${svgOutput}`);
      
      // Create a placeholder SVG with more diagram-like appearance
      const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
        <rect width="100%" height="100%" fill="#f8f9fa" />
        <rect x="50" y="50" width="700" height="300" fill="#ffffff" stroke="#cccccc" stroke-width="1" />
        
        <!-- Process title -->
        <text x="400" y="30" font-family="Arial" font-size="20" text-anchor="middle" font-weight="bold">
          ${file.replace('.bpmn', ' Process')}
        </text>
        
        <!-- Simple process flow elements -->
        <circle cx="150" cy="200" r="30" fill="#e1f5fe" stroke="#0277bd" stroke-width="2"/>
        <rect x="250" y="170" width="120" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5" ry="5"/>
        <rect x="450" y="170" width="120" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5" ry="5"/>
        <polygon points="650,200 620,170 620,230" fill="#fce4ec" stroke="#c2185b" stroke-width="2"/>
        
        <!-- Connection arrows -->
        <line x1="180" y1="200" x2="250" y2="200" stroke="#666666" stroke-width="2" marker-end="url(#arrow)"/>
        <line x1="370" y1="200" x2="450" y2="200" stroke="#666666" stroke-width="2" marker-end="url(#arrow)"/>
        <line x1="570" y1="200" x2="620" y2="200" stroke="#666666" stroke-width="2" marker-end="url(#arrow)"/>
        
        <!-- Arrow marker definition -->
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
            <path d="M0,0 L0,10 L10,5 Z" fill="#666666" />
          </marker>
        </defs>
      </svg>`;
      
      fs.writeFileSync(svgOutput, placeholderSvg);
      console.log(`Created SVG placeholder for ${file}`);
    } catch (err) {
      console.error(`Error generating SVG for ${file}:`, err);
    }
  });
} else {
  console.log('No BPMN files to copy');
}

// Generate HTML files from all markdown files
const mdFiles = fs.readdirSync(sourceDir)
  .filter(file => file.endsWith('.md') && !file.startsWith('README'));

// Generate index.html file with local library references instead of CDN links
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generative AI Ethics Policy</title>
  <link rel="stylesheet" href="assets/style.css">
  <link rel="stylesheet" href="assets/libs/highlight-github.min.css">
  <script src="assets/libs/marked.min.js"></script>
  <script src="assets/libs/highlight.min.js"></script>
  <!-- Default to poster when no document is specified -->
  <script>
    window.defaultDocument = 'poster';
  </script>
</head>
<body>
  <header>
    <h1>Generative AI Ethics Policy</h1>
  </header>
  <div class="container">
    <aside class="sidebar">
      <div id="toc"></div>
    </aside>
    <main class="content" id="content">
      <!-- Content will be dynamically loaded here -->
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading policy poster...</span>
      </div>
    </main>
  </div>
  <script src="assets/libs/bpmn-viewer.js"></script>
  <script src="assets/wiki.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);

// Create list of policy files for documentation
const policyStructure = mdFiles.map(file => {
  const id = file.replace('.md', '');
  const content = fs.readFileSync(path.join(sourceDir, file), 'utf8');
  // Extract title from markdown content (assumes first line is # Title)
  const titleMatch = content.match(/^#\s+(.*)/m);
  const title = titleMatch ? titleMatch[1].trim() : id;
  return { id, title };
});

// Save policy structure as JSON for the front-end
fs.writeFileSync(path.join(distDir, 'policy-structure.json'), 
  JSON.stringify(policyStructure, null, 2));

// Copy all markdown files to dist
mdFiles.forEach(file => {
  const source = path.join(sourceDir, file);
  const dest = path.join(distDir, file);
  fs.copyFileSync(source, dest);
});

// Copy special files needed for GitHub Pages
console.log('Copying special files for GitHub Pages deployment...');

// Create .nojekyll file (to disable Jekyll processing)
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
console.log('Created .nojekyll file in dist directory');

// Create _headers file for proper MIME types
const headersContent = `
# Custom MIME types for GitHub Pages
/*.bpmn
  Content-Type: application/xml

/*.svg
  Content-Type: image/svg+xml

/*.js
  Content-Type: application/javascript
`;

fs.writeFileSync(path.join(distDir, '_headers'), headersContent);
console.log('Created _headers file in dist directory');

// When copying BPMN files, ensure they have the correct extension and handling
console.log('Copying BPMN files with proper MIME type handling...');
if (fs.existsSync(path.join(sourceDir, 'bpmn'))) {
  // Create directories if they don't exist
  if (!fs.existsSync(bpmnDir)) fs.mkdirSync(bpmnDir, { recursive: true });
  if (!fs.existsSync(bpmnSvgDir)) fs.mkdirSync(bpmnSvgDir, { recursive: true });
  
  // Get all BPMN files and copy them
  const bpmnFiles = fs.readdirSync(path.join(sourceDir, 'bpmn'))
    .filter(file => file.endsWith('.bpmn'));
  
  // ...existing code for bpmn file copying...
}

// Generate SVG placeholders for BPMN diagrams
console.log('Generating SVG placeholders for BPMN diagrams...');
if (fs.existsSync(bpmnDir)) {
  // Create SVG directory if it doesn't exist
  if (!fs.existsSync(bpmnSvgDir)) {
    fs.mkdirSync(bpmnSvgDir, { recursive: true });
  }
  
  // Get all BPMN files
  const bpmnFiles = fs.readdirSync(bpmnDir)
    .filter(file => file.endsWith('.bpmn'));
  
  console.log(`Found ${bpmnFiles.length} BPMN files to create SVG placeholders for`);
  
  bpmnFiles.forEach(file => {
    const svgOutput = path.join(bpmnSvgDir, file.replace('.bpmn', '.svg'));
    console.log(`Creating SVG placeholder for ${file} at ${svgOutput}`);
    
    // Extract diagram title from filename
    const diagramTitle = file.replace('.bpmn', '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Create a placeholder SVG with more diagram-like appearance
    const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
      <rect width="100%" height="100%" fill="#f8f9fa" />
      <text x="400" y="30" font-family="Arial" font-size="20" text-anchor="middle" font-weight="bold">
        ${diagramTitle}
      </text>
      <rect x="50" y="50" width="700" height="300" fill="#ffffff" stroke="#cccccc" stroke-width="1" />
      
      <!-- Simple process flow elements -->
      <circle cx="150" cy="200" r="30" fill="#e1f5fe" stroke="#0277bd" stroke-width="2"/>
      <text x="150" y="205" font-family="Arial" font-size="12" text-anchor="middle">Start</text>
      
      <rect x="250" y="170" width="120" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5" ry="5"/>
      <text x="310" y="205" font-family="Arial" font-size="12" text-anchor="middle">Process</text>
      
      <rect x="450" y="170" width="120" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="5" ry="5"/>
      <text x="510" y="205" font-family="Arial" font-size="12" text-anchor="middle">Process</text>
      
      <circle cx="650" cy="200" r="30" fill="#fce4ec" stroke="#c2185b" stroke-width="2"/>
      <text x="650" y="205" font-family="Arial" font-size="12" text-anchor="middle">End</text>
      
      <!-- Connection arrows -->
      <line x1="180" y1="200" x2="250" y2="200" stroke="#666666" stroke-width="2" marker-end="url(#arrow)"/>
      <line x1="370" y1="200" x2="450" y2="200" stroke="#666666" stroke-width="2" marker-end="url(#arrow)"/>
      <line x1="570" y1="200" x2="620" y2="200" stroke="#666666" stroke-width="2" marker-end="url(#arrow)"/>
      
      <!-- Arrow marker definition -->
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0,0 L0,10 L10,5 Z" fill="#666666" />
        </marker>
      </defs>
      
      <!-- Note at bottom -->
      <text x="400" y="380" font-family="Arial" font-size="14" text-anchor="middle" fill="#666">
        Static fallback for ${diagramTitle}
      </text>
    </svg>`;
    
    fs.writeFileSync(svgOutput, placeholderSvg);
    console.log(`Created SVG placeholder for ${file}`);
  });
} else {
  console.warn('BPMN directory not found!');
}

// Main build process
async function build() {
  try {
    // First download all external dependencies
    await downloadDependencies();
    console.log('Output directory:', distDir);
    console.log(`Processed ${bpmnFiles.length} BPMN diagrams`);
    console.log(`Generated ${mdFiles.length} policy documents`);
    console.log('Build completed successfully!');
    console.log(`Output directory: ${distDir}`);
    // Log BPMN files for verification
    console.log(`BPMN files in dist: ${fs.readdirSync(bpmnDir).join(', ')}`);
    if (fs.existsSync(bpmnSvgDir)) {
      console.log(`SVG files in dist: ${fs.readdirSync(bpmnSvgDir).join(', ')}`);
    }
    // Log special files for verification
    const specialFiles = ['.nojekyll', '_headers'].filter(
      file => fs.existsSync(path.join(distDir, file))
    );
    console.log(`Special files in dist: ${specialFiles.join(', ')}`);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Start the build process
build();
