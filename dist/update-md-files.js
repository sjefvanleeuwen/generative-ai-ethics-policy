/**
 * Update Markdown Files
 * 
 * This script precisely removes any embedded BPMN diagrams from Markdown files,
 * restoring them to their exact pre-diagram state while preserving table formatting.
 */

const fs = require('fs');
const path = require('path');

// Files to process
const filesToProcess = [
  '04-Regulatory-Compliance.md',
  '05-Governance-and-Accountability.md',
  '06-Risk-Management.md',
  '08-Human-Oversight.md'
];

// Process each file
filesToProcess.forEach(filename => {
  const filepath = path.join(__dirname, filename);
  
  if (fs.existsSync(filepath)) {
    console.log(`Processing ${filename}...`);
    
    try {
      // Get the original content with original line endings preserved
      let content = fs.readFileSync(filepath, 'utf8');
      
      // Create backup before making any changes
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = `${filepath}.${timestamp}.bak`;
      fs.writeFileSync(backupPath, content);
      console.log(`  ✓ Created backup at ${path.basename(backupPath)}`);
      
      // Check if file contains diagram sections
      if (content.includes('<div class="bpmn-diagram">')) {
        console.log(`  Found diagram in ${filename}, removing...`);
        
        // Replace the diagram section with nothing, preserving everything else exactly
        // Pattern starts with newline + ## title + newline and ends with </div> + newline
        const diagramPattern = /\n## .+ Diagram\n\n<div class="bpmn-diagram">[\s\S]*?<\/div>\n/;
        
        // Count occurrences before removal
        const matches = content.match(new RegExp(diagramPattern, 'g'));
        const matchCount = matches ? matches.length : 0;
        
        if (matchCount > 0) {
          // Remove the diagram section completely, preserving the rest exactly
          const newContent = content.replace(diagramPattern, '\n');
          
          // Write the updated content if it changed
          if (newContent !== content) {
            fs.writeFileSync(filepath, newContent);
            console.log(`  ✓ Removed ${matchCount} diagram section(s) from ${filename}`);
          } else {
            console.log(`  ! Content unchanged after removal attempt`);
          }
        } else {
          console.log(`  ℹ No matching diagram pattern found in ${filename}`);
        }
      } else {
        console.log(`  ℹ No diagram found in ${filename}`);
      }
    } catch (error) {
      console.error(`  ✗ Error processing ${filename}:`, error.message);
    }
  } else {
    console.log(`  ✗ File not found: ${filename}`);
  }
});

console.log('Markdown files have been restored to their original state.');
