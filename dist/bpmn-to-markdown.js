/**
 * BPMN to Markdown Converter
 * 
 * This script adds references to BPMN diagrams in markdown files
 * to be displayed using BPMN.io viewer in the wiki interface.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const sourceDir = path.join(__dirname, 'bpmn');
const processMarkdownFile = path.join(__dirname, 'process-diagrams.md');

// Map of BPMN files to their corresponding information and target markdown files
const bpmnToMarkdownMap = {
  'ai-risk-assessment-process.bpmn': {
    title: 'AI Risk Assessment Process',
    description: 'Illustrates the process for assessing and mitigating risks associated with AI systems.',
    targetFile: '06-Risk-Management.md'
  },
  'dpia-process.bpmn': {
    title: 'Data Protection Impact Assessment Process',
    description: 'Shows the workflow for conducting DPIAs for AI systems that process personal data.',
    targetFile: '04-Regulatory-Compliance.md'
  },
  'ai-development-lifecycle.bpmn': {
    title: 'AI Development Lifecycle',
    description: 'Depicts the complete development lifecycle for AI systems from conception to deployment.',
    targetFile: '05-Governance-and-Accountability.md'
  },
  'human-oversight-process.bpmn': {
    title: 'Human Oversight Process',
    description: 'Documents the procedures for human review and intervention in AI-driven decisions.',
    targetFile: '08-Human-Oversight.md'
  }
};

// Get all BPMN files
const bpmnFiles = fs.readdirSync(sourceDir)
  .filter(file => file.endsWith('.bpmn'))
  .map(file => path.basename(file));

// Embed BPMN reference in the target markdown file
function embedBpmnInMarkdown(bpmnFileName) {
  const { title, targetFile } = bpmnToMarkdownMap[bpmnFileName];
  const markdownPath = path.join(__dirname, targetFile);
  const svgFileName = bpmnFileName.replace('.bpmn', '.svg');
  
  if (!fs.existsSync(markdownPath)) {
    console.log(`  ✗ Target markdown file not found: ${targetFile}`);
    return;
  }
  
  console.log(`  Adding diagram reference in ${targetFile}...`);
  
  try {
    // Read the markdown file
    let markdown = fs.readFileSync(markdownPath, 'utf8');
    
    // Create the diagram section to append - use bpmn file reference and svg for static preview
    const diagramSection = `\n## ${title} Diagram\n\n![${title}](bpmn/svg/${svgFileName})\n\n[View larger diagram or download BPMN XML](bpmn/${bpmnFileName})\n\n`;
    
    // Check if the diagram section already exists
    if (markdown.includes(`## ${title} Diagram`)) {
      // Replace the existing diagram section
      const pattern = new RegExp(`\n## ${title} Diagram\n\n.*?\n\n\\[View larger diagram.*?\n\n`, 'g');
      markdown = markdown.replace(pattern, diagramSection);
      console.log(`  ✓ Replaced existing diagram reference in ${targetFile}`);
    } else {
      // Find the position to insert the diagram (before the navigation section at the end)
      const navigationPattern = /\n---\n\n\[\←.*?\]\(.*?\) \| \[.*?\]\(.*?\)/;
      const match = markdown.match(navigationPattern);
      
      if (match) {
        // Insert before navigation
        const insertPos = match.index;
        markdown = markdown.substring(0, insertPos) + diagramSection + markdown.substring(insertPos);
      } else {
        // If no navigation section, append to the end
        markdown += diagramSection;
      }
      console.log(`  ✓ Added diagram reference to ${targetFile}`);
    }
    
    // Write the updated markdown
    fs.writeFileSync(markdownPath, markdown);
  } catch (error) {
    console.error(`  ✗ Error embedding diagram in ${targetFile}:`, error.message);
  }
}

// Update the process-diagrams.md file with BPMN viewer references
function updateProcessDiagramsFile() {
  console.log("Updating process-diagrams.md file...");
  
  if (fs.existsSync(processMarkdownFile)) {
    let newContent = `# Process Diagrams

This section contains BPMN 2.0 process diagrams that illustrate the key processes defined in this policy. These diagrams are designed according to ISO 9001 process modeling guidelines.

## Available Process Diagrams

`;
    
    // Add each diagram with BPMN viewer reference
    for (const bpmnFileName of bpmnFiles) {
      if (bpmnToMarkdownMap[bpmnFileName]) {
        const { title, description } = bpmnToMarkdownMap[bpmnFileName];
        const svgFileName = bpmnFileName.replace('.bpmn', '.svg');
        const viewerId = `bpmn-viewer-${bpmnFileName.replace(/\./g, '-')}`;
        
        newContent += `### ${title}\n\n${description}\n\n`;
        
        newContent += `<div class="bpmn-viewer-container" id="${viewerId}-container">
  <div class="bpmn-toolbar">
    <span>${title}</span>
    <div>
      <button class="zoom-in" data-viewer="${viewerId}">Zoom In</button>
      <button class="zoom-out" data-viewer="${viewerId}">Zoom Out</button>
      <button class="reset-view" data-viewer="${viewerId}">Reset View</button>
    </div>
  </div>
  <div class="bpmn-canvas" id="${viewerId}" data-bpmn-file="${bpmnFileName}"></div>
</div>

[View/download BPMN XML](bpmn/${bpmnFileName})\n\n`;
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
    console.log(`✓ Updated process diagrams page with interactive BPMN viewers`);
  } else {
    console.log(`✗ Process diagrams file not found: ${path.relative(__dirname, processMarkdownFile)}`);
  }
}

// Main function
function main() {
  console.log("Adding BPMN diagram references to markdown files...");
  
  // Update each markdown file with a reference to the corresponding BPMN diagram
  for (const bpmnFileName of bpmnFiles) {
    if (bpmnToMarkdownMap[bpmnFileName]) {
      embedBpmnInMarkdown(bpmnFileName);
    }
  }
  
  // Update the process-diagrams.md file
  updateProcessDiagramsFile();
  
  console.log("BPMN diagram references added successfully!");
}

// Execute the main function
main();
