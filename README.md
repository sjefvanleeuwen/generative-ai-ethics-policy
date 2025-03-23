# Generative AI Ethics Policy Wiki

This is a simple wiki-style viewer for the Generative AI Ethics Policy documents.

## Getting Started

To run the wiki locally:

1. Make sure you have [Node.js](https://nodejs.org/) installed
2. Install dependencies:
   ```
   npm install
   ```
3. Generate SVG files from BPMN diagrams and embed them in Markdown:
   ```
   npm run embed-diagrams
   ```
4. Start the local server:
   ```
   npm start
   ```
5. Your browser will open automatically to the wiki homepage

## Build Process

The build process is cross-platform compatible (Windows, macOS, Linux) and performs the following:

1. Creates a `dist` directory if it doesn't exist
2. Copies all HTML, JavaScript, CSS, and Markdown files to the `dist` directory
3. Copies the BPMN diagram files and any SVG renderings
4. Starts an HTTP server (when using `npm start`)

To build without starting the server:
````

## Structure

- `index.html` - The main HTML file for the wiki viewer
- `styles.css` - CSS styling for the wiki
- `wiki.js` - JavaScript code that powers the wiki functionality
- `*.md` - Markdown files containing the policy content
- `package.json` - Node.js package configuration

## Navigation

The sidebar on the left contains links to all policy sections. The Table of Contents provides an overview of the entire policy. Each page has navigation controls at the bottom to move between sections.

## Development

To modify the wiki functionality, edit the `wiki.js` file. For styling changes, modify `styles.css`.
