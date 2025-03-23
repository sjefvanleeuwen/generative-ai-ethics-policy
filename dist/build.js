/**
 * Cross-platform build script for the Generative AI Ethics Policy Wiki
 * Works on Windows, macOS, and Linux
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const sourceDir = __dirname;
const distDir = path.join(sourceDir, 'dist');
const filesToCopy = [
    '*.html',
    '*.js',
    '*.css',
    '*.md'
];
const directoriesToCopy = [
    'bpmn'
];

// Ensure dist directory exists
function ensureDistDir() {
    console.log('Ensuring dist directory exists...');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }
}

// Copy files matching patterns
function copyFiles(patterns) {
    patterns.forEach(pattern => {
        console.log(`Copying ${pattern} files...`);
        
        // Get files matching the pattern
        const files = fs.readdirSync(sourceDir)
            .filter(file => {
                // Simple glob matching for *.ext pattern
                if (pattern.startsWith('*')) {
                    const ext = pattern.slice(1); // Get the extension part
                    return file.endsWith(ext);
                }
                return file === pattern;
            });
        
        // Copy each file
        files.forEach(file => {
            const sourcePath = path.join(sourceDir, file);
            const destPath = path.join(distDir, file);
            
            // Skip directories
            if (fs.statSync(sourcePath).isDirectory()) return;
            
            // Copy the file
            fs.copyFileSync(sourcePath, destPath);
            console.log(`  Copied: ${file}`);
        });
    });
}

// Copy directories
function copyDirectories(directories) {
    directories.forEach(dir => {
        console.log(`Copying ${dir} directory...`);
        const sourcePath = path.join(sourceDir, dir);
        const destPath = path.join(distDir, dir);
        
        // Skip if source directory doesn't exist
        if (!fs.existsSync(sourcePath)) {
            console.log(`  Directory not found: ${dir}`);
            return;
        }
        
        // Create destination directory
        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
        }
        
        // Copy all files in the directory
        fs.readdirSync(sourcePath).forEach(file => {
            const srcFilePath = path.join(sourcePath, file);
            const destFilePath = path.join(destPath, file);
            
            // Handle subdirectories (for svg folder inside bpmn)
            if (fs.statSync(srcFilePath).isDirectory()) {
                console.log(`  Processing subdirectory: ${file}`);
                
                // Create the subdirectory in the destination
                if (!fs.existsSync(destFilePath)) {
                    fs.mkdirSync(destFilePath, { recursive: true });
                }
                
                // Copy all files in the subdirectory
                fs.readdirSync(srcFilePath).forEach(subFile => {
                    const srcSubFilePath = path.join(srcFilePath, subFile);
                    const destSubFilePath = path.join(destFilePath, subFile);
                    
                    // Only copy files, not nested directories
                    if (!fs.statSync(srcSubFilePath).isDirectory()) {
                        fs.copyFileSync(srcSubFilePath, destSubFilePath);
                        console.log(`    Copied: ${file}/${subFile}`);
                    }
                });
                
                return;
            }
            
            // Copy the file
            fs.copyFileSync(srcFilePath, destFilePath);
            console.log(`  Copied: ${file}`);
        });
    });
}

// Start server
function startServer() {
    console.log('Starting server...');
    try {
        // Attempt to find http-server in node_modules
        const httpServerPath = path.join(sourceDir, 'node_modules', '.bin', 'http-server');
        
        // Build command based on platform
        let command;
        if (process.platform === 'win32') {
            // Check if .cmd version exists for Windows
            const cmdPath = `${httpServerPath}.cmd`;
            if (fs.existsSync(cmdPath)) {
                command = `"${cmdPath}" "${distDir}" -o`;
            } else {
                command = `npx http-server "${distDir}" -o`;
            }
        } else {
            // For Unix-based systems
            if (fs.existsSync(httpServerPath)) {
                command = `"${httpServerPath}" "${distDir}" -o`;
            } else {
                command = `npx http-server "${distDir}" -o`;
            }
        }
        
        console.log(`Executing: ${command}`);
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        console.log('Try installing http-server: npm install -g http-server');
    }
}

// Main build process
function build() {
    console.log('Starting build process...');
    
    // Ensure dist directory exists
    ensureDistDir();
    
    // Copy files and directories
    copyFiles(filesToCopy);
    copyDirectories(directoriesToCopy);
    
    console.log('Build complete!');
}

// Command line arguments handling
const args = process.argv.slice(2);
if (args.includes('start')) {
    build();
    startServer();
} else {
    build();
}

console.log('Done!');
