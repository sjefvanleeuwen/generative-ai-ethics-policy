/**
 * Verify Markdown Files
 * 
 * This script checks Markdown files for common formatting issues,
 * especially focusing on table formatting problems.
 */

const fs = require('fs');
const path = require('path');

// Files to check
const filesToCheck = [
  '04-Regulatory-Compliance.md',
  '05-Governance-and-Accountability.md',
  '06-Risk-Management.md',
  '08-Human-Oversight.md'
];

// Common issues to check for
const issues = {
  brokenTables: /\|\s*\n[^|]/g,  // Detects table rows not ending properly
  missingPipe: /\n[^|\s][^\n]*\|[^\n]*\n/g, // Detects lines with ending pipes but no starting pipe
  extraNewlines: /\n\n\n+/g, // Detects excessive newlines
  diagramRemnants: /<div class="bpmn-diagram/g // Detects any remaining diagram HTML
};

// Process each file
filesToCheck.forEach(filename => {
  const filepath = path.join(__dirname, filename);
  
  if (fs.existsSync(filepath)) {
    console.log(`\nVerifying ${filename}...`);
    
    try {
      // Read the file content
      const content = fs.readFileSync(filepath, 'utf8');
      let hasIssues = false;

      // Check for each type of issue
      Object.entries(issues).forEach(([issueType, pattern]) => {
        const matches = content.match(pattern);
        if (matches && matches.length > 0) {
          console.log(`  ⚠ Found ${matches.length} possible ${issueType}`);
          hasIssues = true;
          
          // Print context for the first few issues
          matches.slice(0, 3).forEach((match, i) => {
            const index = content.indexOf(match);
            const lineNum = content.substring(0, index).split('\n').length;
            console.log(`    Issue ${i+1} near line ${lineNum}:`);
            
            // Get some context around the issue
            const contextStart = Math.max(0, index - 50);
            const contextEnd = Math.min(content.length, index + match.length + 50);
            const context = content.substring(contextStart, contextEnd);
            console.log(`    "${context.replace(/\n/g, '\\n')}"`);
          });
        }
      });
      
      // Basic table structure check
      const tableLines = content.split('\n').filter(line => line.includes('|'));
      const possibleTableIssues = tableLines.filter(line => {
        const pipes = line.split('|').length;
        return pipes < 3 && !line.trim().startsWith('|--') && !line.includes('---');
      });
      
      if (possibleTableIssues.length > 0) {
        console.log(`  ⚠ Found ${possibleTableIssues.length} possible table structure issues`);
        hasIssues = true;
        possibleTableIssues.slice(0, 3).forEach((line, i) => {
          console.log(`    Issue ${i+1}: "${line}"`);
        });
      }
      
      if (!hasIssues) {
        console.log(`  ✓ No formatting issues detected`);
      }
    } catch (error) {
      console.error(`  ✗ Error checking ${filename}:`, error.message);
    }
  } else {
    console.log(`  ✗ File not found: ${filename}`);
  }
});

console.log('\nVerification complete.');
