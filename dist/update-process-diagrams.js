/**
 * Update Process Diagrams Page
 * 
 * This script only updates the process-diagrams.md file with SVG previews
 * without modifying the other Markdown files to preserve their formatting.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const sourceDir = path.join(__dirname, 'bpmn');
const svgDir = path.join(sourceDir, 'svg');
const processMarkdownFile = path.join(__dirname, 'process-diagrams.md');

// Map of BPMN files to their descriptions
const bpmnDescriptions = {
  'ai-risk-assessment-process.bpmn': {
    title: 'AI Risk Assessment Process',
    description: 'Illustrates the process for assessing and mitigating risks associated with AI systems.'
  },
  'dpia-process.bpmn': {
    title: 'Data Protection Impact Assessment Process',
    description: 'Shows the workflow for conducting DPIAs for AI systems that process personal data.'
  },
  'ai-development-lifecycle.bpmn': {
    title: 'AI Development Lifecycle',
    description: 'Depicts the complete development lifecycle for AI systems from conception to deployment.'
  },
  'human-oversight-process.bpmn': {
    title: 'Human Oversight Process',
    description: 'Documents the procedures for human review and intervention in AI-driven decisions.'
  }
};

// Get all BPMN files
const bpmnFiles = fs.readdirSync(sourceDir)
  .filter(file => file.endsWith('.bpmn'))
  .map(file => path.basename(file));

// Update the process-diagrams.md file with SVG previews
function updateProcessDiagramsFile() {
  console.log("Updating process-diagrams.md file...");
  
  if (fs.existsSync(processMarkdownFile)) {
    let newContent = `# Process Diagrams

This section contains BPMN 2.0 process diagrams that illustrate the key processes defined in this policy. These diagrams are designed according to ISO 9001 process modeling guidelines.

## Available Process Diagrams

`;
    
    // Add each diagram with SVG preview
    for (const bpmnFileName of bpmnFiles) {
      if (bpmnDescriptions[bpmnFileName]) {
        const { title, description } = bpmnDescriptions[bpmnFileName];
        const svgFileName = bpmnFileName.replace('.bpmn', '.svg');
        const svgPath = path.join(svgDir, svgFileName);
        
        newContent += `### ${title}\n\n${description}\n\n`;
        
        // Add SVG preview if it exists
        if (fs.existsSync(svgPath)) {
          const svgContent = fs.readFileSync(svgPath, 'utf8');
          newContent += `<div class="bpmn-diagram-preview">\n${svgContent}\n</div>\n\n`;
        }
        
        newContent += `[View larger diagram or download BPMN XML](bpmn/${bpmnFileName})\n\n`;
      }
    }
    
    // Add a section about how to use the diagrams
    newContent += `## How to Use These Diagrams

Each diagram uses swimming lanes to represent different organizational roles and responsibilities. Decision points are marked with diamond shapes, and document inputs are shown with paper icons.

For technical integration of these processes into your systems, the XML source of each diagram can be viewed and downloaded for use in BPMN modeling tools.

---

[← Approval & Signatures](20-Approval-and-Signatures.md) | [Table of Contents](00-Table-of-Contents.md)`;
    
    // Write the updated file
    fs.writeFileSync(processMarkdownFile, newContent);
    console.log(`✓ Updated process diagrams page with SVG previews`);
  } else {
    console.log(`✗ Process diagrams file not found: ${path.relative(__dirname, processMarkdownFile)}`);
  }
}

// Execute the update
updateProcessDiagramsFile();
console.log('Process diagram page update complete!');
