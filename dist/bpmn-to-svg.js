/**
 * BPMN to SVG Converter
 * 
 * This script converts BPMN XML files to SVG graphics using bpmn-js and Puppeteer.
 * It takes BPMN files from the bpmn/ directory and outputs SVG files to bpmn/svg/.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Configuration
const sourceDir = path.join(__dirname, 'bpmn');
const outputDir = path.join(sourceDir, 'svg');
const htmlTemplate = path.join(__dirname, 'bpmn-viewer-template.html');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create a temporary HTML file to render the BPMN diagram
if (!fs.existsSync(htmlTemplate)) {
  fs.writeFileSync(htmlTemplate, `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>BPMN to SVG Converter</title>
  <style>
    html, body, #canvas { height: 100%; margin: 0; padding: 0; }
    #canvas { display: flex; align-items: center; justify-content: center; }
  </style>
  <script src="./node_modules/bpmn-js/dist/bpmn-viewer.development.js"></script>
</head>
<body>
  <div id="canvas"></div>
  <script>
    // Get the diagram XML from the URL
    const xmlParam = new URL(window.location.href).searchParams.get('xml');
    const xml = xmlParam ? decodeURIComponent(xmlParam) : null;
    
    if (xml) {
      const viewer = new BpmnJS({ container: '#canvas' });
      
      viewer.importXML(xml).then(({ warnings }) => {
        if (warnings.length) {
          console.warn('BPMN import warnings:', warnings);
        }
        
        // Adjust the view to fit the diagram
        viewer.get('canvas').zoom('fit-viewport');
        
        // Signal that the rendering is complete
        window.renderedSvg = viewer.get('canvas')._svg.outerHTML;
        window.renderingComplete = true;
      }).catch(err => {
        console.error('BPMN import error:', err);
      });
    }
  </script>
</body>
</html>
  `);
}

// Get all BPMN files
const bpmnFiles = fs.readdirSync(sourceDir)
  .filter(file => file.endsWith('.bpmn'))
  .map(file => path.join(sourceDir, file));

// Process each BPMN file
async function convertBpmnToSvg() {
  const browser = await puppeteer.launch({ headless: 'new' });
  
  try {
    console.log(`Found ${bpmnFiles.length} BPMN files to convert`);
    
    for (const bpmnFile of bpmnFiles) {
      const fileName = path.basename(bpmnFile);
      const outputFile = path.join(outputDir, fileName.replace('.bpmn', '.svg'));
      
      console.log(`Converting ${fileName}...`);
      
      // Read the BPMN XML
      const bpmnXml = fs.readFileSync(bpmnFile, 'utf8');
      
      // Create a new page
      const page = await browser.newPage();
      
      try {
        // Load the HTML template with the BPMN XML as a URL parameter
        const url = `file://${htmlTemplate}?xml=${encodeURIComponent(bpmnXml)}`;
        await page.goto(url);
        
        // Wait for rendering to complete
        await page.waitForFunction('window.renderingComplete === true', { timeout: 10000 });
        
        // Get the SVG content
        const svgContent = await page.evaluate(() => window.renderedSvg);
        
        // Save the SVG file
        fs.writeFileSync(outputFile, svgContent);
        
        console.log(`  ✓ Saved to ${path.relative(__dirname, outputFile)}`);
      } catch (error) {
        console.error(`  ✗ Error converting ${fileName}:`, error.message);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
  
  console.log('Conversion complete!');
}

// Execute the conversion
convertBpmnToSvg().catch(err => {
  console.error('Conversion failed:', err);
  process.exit(1);
});
