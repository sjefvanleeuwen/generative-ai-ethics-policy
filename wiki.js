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

    // Add BPMN viewer scripts to document head
    function loadBpmnViewerLibrary() {
        // Skip if already loaded
        if (document.getElementById('bpmn-viewer-script')) {
            return Promise.resolve();
        }
        
        return new Promise((resolve, reject) => {
            // Load BPMN.io viewer from CDN
            const script = document.createElement('script');
            script.id = 'bpmn-viewer-script';
            script.src = 'https://unpkg.com/bpmn-js@11.5.0/dist/bpmn-viewer.development.js';
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
            
            console.log('BPMN.js library loaded');
        });
    }

    // Policy document structure
    const policyStructure = [
        { id: 'at-a-glance', title: 'At a Glance Overview' },
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
        { id: 'process-diagrams', title: 'Process Diagrams' }
    ];

    // BPMN process diagrams
    const bpmnDiagrams = [
        { id: 'ai-risk-assessment-process.bpmn', title: 'AI Risk Assessment Process' },
        { id: 'dpia-process.bpmn', title: 'Data Protection Impact Assessment Process' },
        { id: 'ai-development-lifecycle.bpmn', title: 'AI Development Lifecycle' },
        { id: 'human-oversight-process.bpmn', title: 'Human Oversight Process' }
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
        
        // Special handling for process diagrams page
        if (docId === 'process-diagrams') {
            // First load the BPMN viewer library
            loadBpmnViewerLibrary()
                .then(() => {
                    // Then load the process diagrams page
                    return fetch(`${docId}.md`);
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Document not found');
                    }
                    return response.text();
                })
                .then(markdown => {
                    // Convert markdown to HTML
                    let html = marked.parse(markdown);
                    
                    // Add document title
                    html = `<h1 class="document-title">Process Diagrams</h1>` + html;
                    
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
                    
                    // Initialize BPMN viewers
                    setTimeout(() => {
                        initializeBpmnViewers();
                    }, 100);
                })
                .catch(error => {
                    contentElement.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            <h4 class="alert-heading">Error loading process diagrams</h4>
                            <p>${error.message}</p>
                            <hr>
                            <p class="mb-0">Please try another document from the navigation menu.</p>
                        </div>
                    `;
                });
            return;
        }
        
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
                // This regex captures any # Title at the beginning, allowing for whitespace
                const h1Match = markdown.match(/^\s*#\s+(.+?)(?:\n|$)/);
                
                let html;
                if (h1Match) {
                    // If there's an H1 title in the markdown, use it and remove from content
                    console.log(`Using existing H1 title: "${h1Match[1]}" for ${docId}`);
                    markdown = markdown.replace(/^\s*#\s+(.+?)(?:\n|$)/, ''); // Remove the H1
                    
                    // Convert markdown to HTML
                    html = marked.parse(markdown);
                    
                    // Add the title as an H1 tag with document-title class
                    html = `<h1 class="document-title">${h1Match[1]}</h1>` + html;
                } else {
                    // No H1 found, use the docTitle from policyStructure
                    console.log(`No H1 found, using title from structure: "${docTitle}" for ${docId}`);
                    
                    // Convert markdown to HTML
                    html = marked.parse(markdown);
                    
                    // Add document title from structure
                    html = `<h1 class="document-title">${docTitle}</h1>` + html;
                }
                
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
                
                // Initialize BPMN viewers if present
                initializeBpmnViewers();
                
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
    <div>
      <button class="zoom-in" data-viewer="${viewerId}">Zoom In</button>
      <button class="zoom-out" data-viewer="${viewerId}">Zoom Out</button>
      <button class="reset-view" data-viewer="${viewerId}">Reset View</button>
    </div>
  </div>
  <div class="bpmn-canvas" id="${viewerId}" data-bpmn-file="${bpmnFile}"></div>
</div>

[View/download BPMN XML](bpmn/${bpmnFile})`;
        });
    }

    // Initialize BPMN viewers on the page
    function initializeBpmnViewers() {
        console.log('Initializing BPMN viewers...');
        
        // Check if BPMN.js is loaded
        if (typeof BpmnJS === 'undefined') {
            console.warn('BPMN.js not loaded yet, trying again in 100ms');
            // If not loaded, wait and try again
            setTimeout(initializeBpmnViewers, 100);
            return;
        }

        // Find all BPMN viewer containers
        const viewerContainers = document.querySelectorAll('.bpmn-viewer-container');
        console.log(`Found ${viewerContainers.length} BPMN viewer containers`);
        
        viewerContainers.forEach(container => {
            const canvasElement = container.querySelector('.bpmn-canvas');
            const viewerId = canvasElement.id;
            const bpmnFile = canvasElement.getAttribute('data-bpmn-file');
            
            console.log(`Initializing viewer for ${bpmnFile}`);
            
            // Create viewer instance with navigation options enabled
            const viewer = new BpmnJS({
                container: `#${viewerId}`,
                keyboard: {
                    bindTo: document
                },
                // Enable panning and zooming features
                canvas: {
                    deferUpdate: false
                }
            });

            // Add mouse navigation for panning
            const canvas = viewer.get('canvas');
            const eventBus = viewer.get('eventBus');

            // Mouse behavior state
            let mouseDown = false;
            let lastX, lastY;

            // Add event listeners for mouse panning
            canvasElement.addEventListener('mousedown', function(event) {
                // Only enable panning with middle mouse button or when holding Ctrl
                if (event.button === 1 || event.ctrlKey) {
                    mouseDown = true;
                    lastX = event.clientX;
                    lastY = event.clientY;
                    
                    // Add a custom CSS class to change cursor
                    canvasElement.classList.add('panning');
                    
                    // Prevent text selection during panning
                    event.preventDefault();
                }
            });
            
            canvasElement.addEventListener('mousemove', function(event) {
                if (mouseDown) {
                    const dx = event.clientX - lastX;
                    const dy = event.clientY - lastY;
                    
                    // Get current viewport
                    const viewbox = canvas.viewbox();
                    
                    // Pan the viewport
                    viewbox.x -= dx / viewbox.scale;
                    viewbox.y -= dy / viewbox.scale;
                    
                    // Apply updated viewport
                    canvas.viewbox(viewbox);
                    
                    lastX = event.clientX;
                    lastY = event.clientY;
                    
                    // Prevent default browser behavior
                    event.preventDefault();
                }
            });

            // Handle mouse up and mouse leave events
            function endPan() {
                mouseDown = false;
                canvasElement.classList.remove('panning');
            }
            
            canvasElement.addEventListener('mouseup', endPan);
            canvasElement.addEventListener('mouseleave', endPan);
            
            // Store viewer instance for later use
            window[viewerId] = viewer;
            
            // Construct correct path to BPMN file
            // Ensure we're using the correct path from ./bpmn folder
            const bpmnFilePath = `./bpmn/${bpmnFile}`;
            
            // Load the BPMN XML - log the exact URL for debugging
            console.log(`Loading BPMN from: ${bpmnFilePath}`);
            
            fetch(bpmnFilePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load BPMN file: ${response.status} ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(bpmnXml => {
                    console.log(`Loaded BPMN XML for ${bpmnFile} (${bpmnXml.length} bytes)`);
                    viewer.importXML(bpmnXml)
                        .then(() => {
                            console.log(`Rendered diagram for ${bpmnFile}`);
                            // Fit the diagram to the viewport
                            viewer.get('canvas').zoom('fit-viewport');
                            // Mark as loaded to hide loading message
                            canvasElement.classList.add('loaded');
                        })
                        .catch(err => {
                            console.error('Error rendering BPMN diagram:', err);
                            canvasElement.innerHTML = `<div class="alert alert-danger">Error loading diagram: ${err.message}</div>`;
                        });
                })
                .catch(err => {
                    console.error('Error loading BPMN file:', err);
                    // Add detailed error info including the attempted URL
                    canvasElement.innerHTML = `
                        <div class="alert alert-danger">
                            <p>Error loading diagram file: ${err.message}</p>
                            <p>Attempted URL: ${bpmnFilePath}</p>
                            <p>Make sure the BPMN file exists in the correct location.</p>
                        </div>
                    `;
                });
        });
        
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

    // Load the process diagrams page
    function loadProcessDiagramsPage() {
        const contentElement = document.getElementById('content');
        
        let html = `<h1 class="document-title">Process Diagrams</h1>
        <p>These BPMN 2.0 diagrams illustrate the key processes described in the policy. Click on any diagram to view it in detail.</p>
        <div class="bpmn-grid">`;
        
        bpmnDiagrams.forEach(diagram => {
            html += `
            <div class="bpmn-card">
                <h3>${diagram.title}</h3>
                <p>This diagram illustrates the ${diagram.title.toLowerCase()}.</p>
                <a href="javascript:void(0)" data-bpmn="${diagram.id}" class="bpmn-link btn btn-primary">View Diagram</a>
            </div>`;
        });
        
        html += '</div>';
        
        // Add standard navigation
        const currentIndex = policyStructure.findIndex(item => item.id === 'process-diagrams');
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
        
        contentElement.innerHTML = html + navigationHtml;
    }

    // Load a BPMN diagram
    function loadBpmnDiagram(bpmnFile) {
        const contentElement = document.getElementById('content');
        contentElement.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
        
        // Check if the SVG version exists
        const svgFile = `bpmn/svg/${bpmnFile.replace('.bpmn', '.svg')}`;
        
        fetch(svgFile)
            .then(response => {
                if (response.ok) {
                    return response.text()
                        .then(svgContent => {
                            displayBpmnWithSvg(bpmnFile, svgContent);
                        });
                } else {
                    // Fall back to XML display if SVG is not available
                    return fetch(`bpmn/${bpmnFile}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Diagram not found');
                            }
                            return response.text()
                                .then(bpmnXml => {
                                    displayBpmnWithXml(bpmnFile, bpmnXml);
                                });
                        });
                }
            })
            .catch(error => {
                contentElement.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        <h4 class="alert-heading">Error loading diagram</h4>
                        <p>${error.message}</p>
                        <hr>
                        <p class="mb-0">Please try another diagram from the process diagrams page.</p>
                        <a href="javascript:void(0)" data-doc="process-diagrams" class="internal-link">← Back to Process Diagrams</a>
                    </div>`;
            });
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
        const docId = urlParams.get('doc') || '00-Table-of-Contents';
        
        // Load the document and update active state
        loadDocument(docId);
        const navLink = document.querySelector(`#toc .nav-link[data-doc="${docId}"]`);
        if (navLink) {
            navLink.classList.add('active');
        }
        
        // Set up browser history handling
        window.addEventListener('popstate', function(e) {
            if (e.state && e.state.docId) {
                loadDocument(e.state.docId);
                // Update active state
                document.querySelectorAll('#toc .nav-link').forEach(el => {
                    el.classList.remove('active');
                });
                document.querySelector(`#toc .nav-link[data-doc="${e.state.docId}"]`).classList.add('active');
            }
        });
    }

    // Start the application
    init();
});
