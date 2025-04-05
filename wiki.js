document.addEventListener('DOMContentLoaded', function() {
    // Set up markdown renderer
    const renderer = new marked.Renderer();
    
    // Override link renderer to intercept .md links
    renderer.link = function(href, title, text) {
        // Check if this is a link to a markdown file
        if (href.endsWith('.md')) {
            // Get the doc ID by removing the .md extension
            const docId = href.replace('.md', '');
            return `<a href="javascript:void(0)" data-doc="${docId}" class="internal-link" ${title ? 'title="' + title + '"' : ''}>${text}</a>`;
        }
        // Check if this is a link to a bpmn file
        if (href.endsWith('.bpmn')) {
            // Extract the filename without path
            const bpmnFile = href.split('/').pop();
            return `<a href="javascript:void(0)" data-bpmn="${bpmnFile}" class="bpmn-link" ${title ? 'title="' + title + '"' : ''}>${text}</a>`;
        }
        // Use normal rendering for external links
        return `<a href="${href}" target="_blank" ${title ? 'title="' + title + '"' : ''}>${text}</a>`;
    };
    
    // Configure marked
    marked.setOptions({
        renderer: renderer,
        highlight: function(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-',
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartypants: false,
        xhtml: false
    });

    // No need to load BPMN viewer separately as it's now included in the local assets
    // The existing code should continue working since we're using the same API

    // Policy document structure
    const policyStructure = [
        { id: 'poster', title: 'Policy At a Glance (Poster)' },
        { id: '00-Table-of-Contents', title: 'Table of Contents' },
        { id: '01-Executive-Summary', title: 'Executive Summary' },
        { id: '02-Purpose-and-Scope', title: 'Purpose & Scope' },
        { id: '03-Definitions-and-Glossary', title: 'Definitions & Glossary' },
        { id: '04-Regulatory-Compliance', title: 'Regulatory Compliance' },
        { id: '05-Governance-and-Accountability', title: 'Governance & Accountability' },
        { id: '06-Risk-Management', title: 'Risk Management' },
        { id: '07-Transparency-and-Explainability', title: 'Transparency & Explainability' },
        { id: '08-Human-Oversight', title: 'Human Oversight' },
        { id: '09-Employee-Rights-and-Consent', title: 'Employee Rights & Consent' },
        { id: '10-Data-Governance', title: 'Data Governance' },
        { id: '11-Cybersecurity', title: 'Cybersecurity' },
        { id: '12-Accessibility-and-Inclusion', title: 'Accessibility & Inclusion' },
        { id: '13-Intellectual-Property-and-Licensing', title: 'Intellectual Property & Licensing' },
        { id: '14-Social-Impact-and-Stakeholder-Engagement', title: 'Social Impact & Stakeholder Engagement' },
        { id: '15-Training-and-Awareness', title: 'Training & Awareness' },
        { id: '16-Monitoring-and-Audit', title: 'Monitoring & Audit' },
        { id: '17-Enforcement-and-Sanctions', title: 'Enforcement & Sanctions' },
        { id: '18-Review-and-Change-Management', title: 'Review & Change Management' },
        { id: '19-Implementation-Roadmap', title: 'Implementation Roadmap' },
        { id: '20-Approval-and-Signatures', title: 'Approval & Signatures' },
        { id: 'rollout', title: 'Rollout Plan' },
        // Add annexes
        { id: 'annex-a', title: 'Annex A: DPIA Template' },
        { id: 'annex-b', title: 'Annex B: AI Incident Response' },
        { id: 'annex-c', title: 'Annex C: Vendor AI Due Diligence' },
        { id: 'annex-d', title: 'Annex D: Implementation Plan & RACI' },
        { id: 'annex-e', title: 'Annex E: Policy Exception Request' },
        { id: 'annex-f', title: 'Annex F: Risk Register Template' },
        { id: 'annex-g', title: 'Annex G: Risk Scoring Matrix' },
        { id: 'annex-h', title: 'Annex H: Explainability Report' },
        { id: 'annex-i', title: 'Annex I: User Disclosure Template' },
        { id: 'annex-j', title: 'Annex J: Human Oversight Checklist' },
        { id: 'annex-k', title: 'Annex K: AI Threat Modeling' },
        { id: 'annex-l', title: 'Annex L: Accessibility Assessment' },
        { id: 'annex-m', title: 'Annex M: IP & License Clearance' },
        { id: 'annex-n', title: 'Annex N: Stakeholder Registry' },
        { id: 'annex-o', title: 'Annex O: Policy Change Request' }
    ];

    // BPMN process diagrams
    const bpmnDiagrams = [
        { id: 'ai-risk-assessment-process.bpmn', title: 'AI Risk Assessment Process' },
        { id: 'dpia-process.bpmn', title: 'Data Protection Impact Assessment Process' },
        { id: 'ai-development-lifecycle.bpmn', title: 'AI Development Lifecycle' },
        { id: 'human-oversight-process.bpmn', title: 'Human Oversight Process' },
        { id: 'ai-incident-response-process.bpmn', title: 'AI Incident Response Process' },
        { id: 'ai-appeal-process.bpmn', title: 'Employee AI Decision Appeal Process' },
        { id: 'data-governance-process.bpmn', title: 'AI Data Governance Lifecycle' },
        { id: 'vendor-assessment-process.bpmn', title: 'AI Vendor Assessment Process' }
    ];

    // Global event delegation for internal links
    document.addEventListener('click', function(e) {
        // Check if the clicked element is an internal link or its child
        const link = e.target.closest('.internal-link, .bpmn-link');
        if (link) {
            e.preventDefault();
            
            if (link.classList.contains('internal-link')) {
                const docId = link.getAttribute('data-doc');
                if (docId) {
                    loadDocument(docId);
                    
                    // Update active state in TOC navigation
                    document.querySelectorAll('#toc .nav-link').forEach(el => {
                        el.classList.remove('active');
                    });
                    const tocLink = document.querySelector(`#toc .nav-link[data-doc="${docId}"]`);
                    if (tocLink) {
                        tocLink.classList.add('active');
                    }
                    
                    // Update URL
                    window.history.pushState({docId: docId}, '', `?doc=${docId}`);
                }
            } else if (link.classList.contains('bpmn-link')) {
                const bpmnFile = link.getAttribute('data-bpmn');
                if (bpmnFile) {
                    loadBpmnDiagram(bpmnFile);
                }
            }
        }
    });

    // Generate table of contents
    function loadTableOfContents() {
        const tocElement = document.getElementById('toc');
        let tocHtml = '<ul class="nav-list">';
        
        policyStructure.forEach(item => {
            tocHtml += `<li><a class="nav-link" href="#${item.id}" data-doc="${item.id}">${item.title}</a></li>`;
        });
        
        tocHtml += '</ul>';
        tocElement.innerHTML = tocHtml;
        
        // Add event listeners to navigation links
        document.querySelectorAll('#toc .nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const docId = this.getAttribute('data-doc');
                loadDocument(docId);
                
                // Update active state in navigation
                document.querySelectorAll('#toc .nav-link').forEach(el => {
                    el.classList.remove('active');
                });
                this.classList.add('active');
                
                // Update URL
                window.history.pushState({docId: docId}, '', `?doc=${docId}`);
            });
        });
    }

    // Load a specific markdown document
    function loadDocument(docId) {
        const contentElement = document.getElementById('content');
        contentElement.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
        
        // Handle regular documents
        fetch(`${docId}.md`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Document not found');
                }
                return response.text();
            })
            .then(markdown => {
                // Extract document title
                const docTitle = policyStructure.find(item => item.id === docId)?.title || 'Document';
                
                // Remove the existing navigation footer before parsing
                markdown = markdown.replace(/---\s*\n\s*\[\←.*\n$/s, '');
                
                // Process BPMN diagram references
                markdown = processBpmnReferences(markdown);
                
                // Remove HTML comments (for filepath comments)
                markdown = markdown.replace(/<!--.*?-->/gs, '');
                
                // Check for H1 title at start of document (after HTML comments removal)
                const h1Match = markdown.match(/^\s*#\s+(.+?)(?:\n|$)/);
                
                // Convert markdown to HTML without adding a duplicate title
                const html = marked.parse(markdown);
                
                // Add navigation links
                const currentIndex = policyStructure.findIndex(item => item.id === docId);
                let navigationHtml = '<div class="pagination-nav">';
                
                if (currentIndex > 0) {
                    const prevDoc = policyStructure[currentIndex - 1];
                    navigationHtml += `<div class="prev-page"><a href="javascript:void(0)" data-doc="${prevDoc.id}" class="internal-link">← ${prevDoc.title}</a></div>`;
                } else {
                    navigationHtml += '<div class="prev-page"></div>';
                }
                
                navigationHtml += '<div class="back-to-toc"><a href="javascript:void(0)" data-doc="00-Table-of-Contents" class="internal-link">Table of Contents</a></div>';
                
                if (currentIndex < policyStructure.length - 1) {
                    const nextDoc = policyStructure[currentIndex + 1];
                    navigationHtml += `<div class="next-page"><a href="javascript:void(0)" data-doc="${nextDoc.id}" class="internal-link">${nextDoc.title} →</a></div>`;
                } else {
                    navigationHtml += '<div class="next-page"></div>';
                }
                
                navigationHtml += '</div>';
                
                // Add navigation to content
                contentElement.innerHTML = html + navigationHtml;
                
                // Initialize BPMN viewers if present - with a slight delay to ensure DOM is ready
                setTimeout(initializeBpmnViewers, 100);
                
                // Add event listeners to all navigation links in content
                document.querySelectorAll('.pagination-nav a, .internal-link').forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const newDocId = this.getAttribute('data-doc');
                        loadDocument(newDocId);
                        
                        // Update active state in TOC navigation
                        document.querySelectorAll('#toc .nav-link').forEach(el => {
                            el.classList.remove('active');
                        });
                        const tocLink = document.querySelector(`#toc .nav-link[data-doc="${newDocId}"]`);
                        if (tocLink) {
                            tocLink.classList.add('active');
                        }
                        
                        // Update URL
                        window.history.pushState({docId: newDocId}, '', `?doc=${newDocId}`);
                    });
                });
            })
            .catch(error => {
                contentElement.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        <h4 class="alert-heading">Error loading document</h4>
                        <p>${error.message}</p>
                        <hr>
                        <p class="mb-0">Please try another document from the navigation menu.</p>
                    </div>
                `;
            });
    }

    // Process BPMN references in markdown content
    function processBpmnReferences(markdown) {
        // Look for BPMN diagram header sections and add viewer container
        const bpmnSectionRegex = /## ([^#\n]+) Diagram\s*\n\s*!\[([^\]]+)\]\(bpmn\/svg\/([^)]+)\)\s*\n\s*\[View larger diagram or download BPMN XML\]\(bpmn\/([^)]+)\)/g;
        
        return markdown.replace(bpmnSectionRegex, (match, title, alt, svgFile, bpmnFile) => {
            const viewerId = `bpmn-viewer-${bpmnFile.replace(/\./g, '-')}`;
            return `## ${title} Diagram

<div class="bpmn-viewer-container" id="${viewerId}-container">
  <div class="bpmn-toolbar">
    <span>${title}</span>
    <div class="bpmn-instructions">Click and drag to pan, use buttons to zoom</div>
    <div>
      <button class="zoom-in" data-viewer="${viewerId}">Zoom In</button>
      <button class="zoom-out" data-viewer="${viewerId}">Zoom Out</button>
      <button class="reset-view" data-viewer="${viewerId}">Reset View</button>
    </div>
  </div>
  <div class="bpmn-canvas" id="${viewerId}" data-bpmn-file="${bpmnFile}"></div>
  <div class="static-svg-fallback">
    <p><strong>Interactive Diagram</strong> (or <a href="bpmn/svg/${svgFile}" target="_blank">view static SVG</a>)</p>
    <img src="bpmn/svg/${svgFile}" alt="${title} Diagram" class="fallback-svg" />
  </div>
</div>

[Download BPMN XML](bpmn/${bpmnFile})`;
        });
    }

    // Initialize BPMN viewers with improved error handling for MIME type issues
    function initializeBpmnViewers() {
        console.log('Initializing BPMN viewers...');
        
        // Check if BPMN.js is loaded
        if (typeof BpmnJS === 'undefined') {
            console.warn('BPMN.js not loaded yet or MIME type issues, showing SVG fallbacks');
            // Show all SVG fallbacks since BPMN.js isn't available or working
            document.querySelectorAll('.static-svg-fallback').forEach(fallback => {
                fallback.style.display = 'block';
            });
            document.querySelectorAll('.bpmn-canvas').forEach(canvas => {
                canvas.style.display = 'none';
            });
            return;
        }

        // Find all BPMN viewer containers
        const viewerContainers = document.querySelectorAll('.bpmn-viewer-container');
        console.log(`Found ${viewerContainers.length} BPMN viewer containers`);
        
        if (viewerContainers.length === 0) {
            console.log('No BPMN viewers found on this page');
            return;
        }
        
        let loadedCount = 0;
        viewerContainers.forEach(container => {
            const canvasElement = container.querySelector('.bpmn-canvas');
            if (!canvasElement) {
                console.error('Canvas element not found in container');
                showFallbackSvg(container);
                return;
            }
            
            const viewerId = canvasElement.id;
            const bpmnFile = canvasElement.getAttribute('data-bpmn-file');
            
            if (!bpmnFile) {
                console.error('No BPMN file specified for viewer');
                showFallbackSvg(container);
                return;
            }
            
            console.log(`Initializing viewer for ${bpmnFile}`);
            
            try {
                // Create viewer instance
                const viewer = new BpmnJS({
                    container: `#${viewerId}`,
                    keyboard: { bindTo: document },
                    canvas: { deferUpdate: false }
                });
                
                // Store viewer instance for later use
                window[viewerId] = viewer;
                
                // Load the BPMN XML
                fetch(`bpmn/${bpmnFile}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load BPMN file: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(bpmnXml => {
                        if (!bpmnXml || bpmnXml.trim() === '') {
                            throw new Error('Empty BPMN XML received');
                        }
                        return viewer.importXML(bpmnXml);
                    })
                    .then(() => {
                        console.log(`BPMN diagram loaded for ${bpmnFile}`);
                        container.classList.add('bpmn-loaded');
                        const canvas = viewer.get('canvas');
                        canvas.zoom('fit-viewport', 'auto');
                        loadedCount++;
                    })
                    .catch(err => {
                        console.error(`Error loading BPMN diagram ${bpmnFile}:`, err);
                        showFallbackSvg(container);
                    });
            } catch (error) {
                console.error(`Error initializing BPMN viewer for ${bpmnFile}:`, error);
                showFallbackSvg(container);
            }
        });
        
        // If no diagrams loaded successfully after 3 seconds, show all fallbacks
        setTimeout(() => {
            if (loadedCount === 0) {
                console.warn('No BPMN diagrams loaded successfully, showing all fallbacks');
                document.querySelectorAll('.bpmn-viewer-container').forEach(container => {
                    if (!container.classList.contains('bpmn-loaded')) {
                        showFallbackSvg(container);
                    }
                });
            }
        }, 3000);
        
        // Add event listeners for zoom buttons
        document.querySelectorAll('.zoom-in').forEach(button => {
            button.addEventListener('click', function() {
                const viewerId = this.getAttribute('data-viewer');
                const viewer = window[viewerId];
                if (viewer) {
                    const canvas = viewer.get('canvas');
                    canvas.zoom(canvas.zoom() * 1.2);
                }
            });
        });
        
        document.querySelectorAll('.zoom-out').forEach(button => {
            button.addEventListener('click', function() {
                const viewerId = this.getAttribute('data-viewer');
                const viewer = window[viewerId];
                if (viewer) {
                    const canvas = viewer.get('canvas');
                    canvas.zoom(canvas.zoom() / 1.2);
                }
            });
        });
        
        document.querySelectorAll('.reset-view').forEach(button => {
            button.addEventListener('click', function() {
                const viewerId = this.getAttribute('data-viewer');
                const viewer = window[viewerId];
                if (viewer) {
                    viewer.get('canvas').zoom('fit-viewport');
                }
            });
        });
    }

    // Helper function to show fallback SVG
    function showFallbackSvg(container) {
        const fallback = container.querySelector('.static-svg-fallback');
        if (fallback) {
            fallback.style.display = 'block';
            container.classList.add('using-fallback');
        }
        const canvas = container.querySelector('.bpmn-canvas');
        if (canvas) {
            canvas.style.display = 'none';
        }
    }

    // Load a BPMN diagram
    function loadBpmnDiagram(bpmnFile) {
        const contentElement = document.getElementById('content');
        contentElement.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
        
        // Use simplified SVG for the diagrams instead of trying to parse BPMN XML
        const diagramSvgs = {
            'ai-incident-response-process.bpmn': '<svg width="800" height="400"><!-- SVG content for incident response process --></svg>',
            'ai-appeal-process.bpmn': '<svg width="800" height="400"><!-- SVG content for appeal process --></svg>',
            'data-governance-process.bpmn': '<svg width="800" height="400"><!-- SVG content for data governance --></svg>',
            'vendor-assessment-process.bpmn': '<svg width="800" height="400"><!-- SVG content for vendor assessment --></svg>'
        };
        
        if (diagramSvgs[bpmnFile]) {
            displaySimplifiedDiagram(bpmnFile, diagramSvgs[bpmnFile]);
        } else {
            // Fall back to original loading method for existing BPMN files
            fetch(`./bpmn/${bpmnFile}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load BPMN file: ${response.status} ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(bpmnXml => {
                    console.log(`Successfully loaded BPMN XML (${bpmnXml.length} bytes)`);
                    // Validate the XML has the expected format
                    if (!bpmnXml.includes('<bpmn:definitions') && !bpmnXml.includes('<definitions')) {
                        console.error('Invalid BPMN XML format:', bpmnXml.substring(0, 200) + '...');
                        throw new Error('Invalid BPMN XML format');
                    }
                    displayBpmnWithXml(bpmnFile, bpmnXml);
                })
                .catch(error => {
                    console.error('Error loading BPMN file:', error);
                    contentElement.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            <h4 class="alert-heading">Error loading diagram</h4>
                            <p>${error.message}</p>
                            <hr>
                            <p class="mb-0">Please try another diagram or check the browser console for details.</p>
                            <p>Attempted URL: ${bpmnFilePath}</p>
                            <a href="javascript:void(0)" data-doc="process-diagrams" class="internal-link">← Back to Process Diagrams</a>
                        </div>`;
                });
        }
    }

    function displaySimplifiedDiagram(bpmnFile, svgContent) {
        const contentElement = document.getElementById('content');
        const diagram = bpmnDiagrams.find(d => d.id === bpmnFile);
        const title = diagram ? diagram.title : 'Process Diagram';
        
        const viewerHtml = `
        <h1 class="document-title">${title}</h1>
        <div class="bpmn-container">
            <div class="bpmn-viewer">
                ${svgContent}
            </div>
        </div>
        <div class="bpmn-info">
            <p>This diagram illustrates the ${title.toLowerCase()} as defined in the policy.</p>
            <a href="javascript:void(0)" data-doc="process-diagrams" class="internal-link">← Back to Process Diagrams</a>
        </div>`;
        
        contentElement.innerHTML = viewerHtml;
    }

    // Display BPMN with SVG rendering
    function displayBpmnWithSvg(bpmnFile, svgContent) {
        const contentElement = document.getElementById('content');
        
        // Find the diagram title
        const diagram = bpmnDiagrams.find(d => d.id === bpmnFile);
        const title = diagram ? diagram.title : 'Process Diagram';
        
        // Create viewer container with SVG content
        const viewerHtml = `
        <h1 class="document-title">${title}</h1>
        <div class="bpmn-container">
            <div id="bpmn-viewer" class="bpmn-viewer">
                ${svgContent}
            </div>
        </div>
        <div class="bpmn-info">
            <p>This BPMN 2.0 diagram illustrates the ${title.toLowerCase()} as defined in the policy.</p>
            <a href="javascript:void(0)" data-doc="process-diagrams" class="internal-link">← Back to Process Diagrams</a>
        </div>`;
        
        contentElement.innerHTML = viewerHtml;
        
        // Add links to download SVG and XML versions
        const bpmnXmlLink = document.createElement('div');
        bpmnXmlLink.className = 'bpmn-download-links';
        bpmnXmlLink.innerHTML = `
            <a href="bpmn/svg/${bpmnFile.replace('.bpmn', '.svg')}" download class="btn btn-sm btn-outline-primary" target="_blank">Download SVG</a>
            <a href="bpmn/${bpmnFile}" download class="btn btn-sm btn-outline-secondary" target="_blank">Download BPMN XML</a>
        `;
        contentElement.appendChild(bpmnXmlLink);
    }

    // Display BPMN with XML only (fallback)
    function displayBpmnWithXml(bpmnFile, bpmnXml) {
        const contentElement = document.getElementById('content');
        
        // Find the diagram title
        const diagram = bpmnDiagrams.find(d => d.id === bpmnFile);
        const title = diagram ? diagram.title : 'Process Diagram';
        
        // Create viewer container
        const viewerHtml = `
        <h1 class="document-title">${title}</h1>
        <div class="bpmn-container">
            <div id="bpmn-viewer" class="bpmn-viewer">
                <div class="bpmn-placeholder">
                    <p>BPMN Diagram: ${title}</p>
                    <p>Currently loading BPMN file from: ${bpmnFile}</p>
                    <p>If the diagram doesn't appear after a few seconds, check browser console for errors.</p>
                </div>
            </div>
        </div>
        <div class="bpmn-info">
            <p>This BPMN 2.0 diagram illustrates the ${title.toLowerCase()} as defined in the policy.</p>
            <a href="javascript:void(0)" data-doc="process-diagrams" class="internal-link">← Back to Process Diagrams</a>
        </div>`;
        
        contentElement.innerHTML = viewerHtml;
        
        // Add the XML content as a hidden pre element for debugging
        const debugContainer = document.createElement('div');
        debugContainer.className = 'bpmn-xml-debug';
        debugContainer.innerHTML = `<details>
            <summary>BPMN XML Source</summary>
            <pre>${bpmnXml.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
        </details>`;
        contentElement.appendChild(debugContainer);
        
        // Add download link for XML
        const bpmnXmlLink = document.createElement('div');
        bpmnXmlLink.className = 'bpmn-download-links';
        bpmnXmlLink.innerHTML = `
            <a href="${bpmnFile}" download class="btn btn-sm btn-outline-secondary" target="_blank">Download BPMN XML</a>
        `;
        contentElement.appendChild(bpmnXmlLink);
    }

    // Initialize the application
    function init() {
        loadTableOfContents();
        
        // Check URL parameters for specific document to load
        const urlParams = new URLSearchParams(window.location.search);
        const docId = urlParams.get('doc') || window.defaultDocument || 'poster'; // Use defaultDocument from index.html
        
        // Load the document and update active state
        loadDocument(docId);
        const navLink = document.querySelector(`#toc .nav-link[data-doc="${docId}"]`);
        if (navLink) {
            document.querySelectorAll('#toc .nav-link').forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
        
        // Set up browser history handling
        window.addEventListener('popstate', function(e) {
            const state = e.state;
            if (state && state.docId) {
                loadDocument(state.docId);
                
                // Update active state in navigation
                document.querySelectorAll('#toc .nav-link').forEach(link => link.classList.remove('active'));
                const navLink = document.querySelector(`#toc .nav-link[data-doc="${state.docId}"]`);
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    // Add CSS styles for BPMN errors, loading states, instructions, and fallback
    const style = document.createElement('style');
    style.textContent = `
        .bpmn-error {
            padding: 20px;
            color: #721c24;
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            border-radius: 4px;
            margin: 20px;
            text-align: center;
        }
        .bpmn-loaded .bpmn-canvas {
            border: 1px solid #d4edda;
        }
        .bpmn-instructions {
            font-size: 0.85em;
            color: #666;
            margin: 0 10px;
            font-style: italic;
        }
        .bpmn-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            background-color: #f6f8fa;
            border-bottom: 1px solid #ddd;
        }
        .static-svg-fallback {
            display: none;
            margin-top: 10px;
            padding: 10px;
            border: 1px solid #ddd;
            background: #f9f9f9;
            text-align: center;
        }
        .using-fallback .static-svg-fallback {
            display: block;
        }
        .fallback-svg {
            max-width: 100%;
            height: auto;
            border: 1px solid #eee;
        }
        .bpmn-loaded .static-svg-fallback {
            display: none;
        }
    `;
    document.head.appendChild(style);

    // Start the application
    init();
});
