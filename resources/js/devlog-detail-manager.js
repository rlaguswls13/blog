/**
 * Devlog Detail Manager Module
 */

export function loadDevlogDetail(data) {
    const detailEl = document.getElementById('devlog-detail');
    if (!detailEl) return;

    let id, category;
    if (window.location.search) {
        const params = new URLSearchParams(window.location.search);
        id = params.get('id');
        category = params.get('category');
    }

    if (!id || !category) {
        detailEl.innerHTML = '<p>잘못된 접근입니다.</p>';
        return;
    }

    // Find the base info from devlog.json
    let baseEntry = null;

    const entries = data[category];
    if (entries) {
        const found = entries.find(e => e.id === id);
        if (found) {
            baseEntry = found;
        }
    }

    if (!baseEntry) {
        detailEl.innerHTML = '<p>게시글을 찾을 수 없습니다.</p>';
        return;
    }

    const getFlowHtml = (diagramPath) => {
        if (!diagramPath) return '';
        
        // resourcePrefix is not defined here, but since it's devlog-detail.html in /view/
        // the resources are in ../
        const prefix = '../';
        
        if (diagramPath.trim().endsWith('.html')) {
            return `<div class="diagram-container"><iframe src="${prefix + diagramPath}" class="diagram-iframe"></iframe></div>`;
        }
        
        if (diagramPath.trim().startsWith('<')) return `<div class="html-diagram-wrapper">${diagramPath}</div>`;
        
        return `<div class="diagram-container"><img src="${prefix + diagramPath}" alt="Flow Diagram" class="logic-flow-image"></div>`;
    };

    fetch(`../resources/data/devlog-detail-${category}.json`)
        .then(res => res.json())
        .then(detailsData => {
            const detailEntry = detailsData.find(d => d.id === id);
            
            if (!detailEntry) {
                detailEl.innerHTML = '<p>상세 내용이 준비 중입니다.</p>';
                return;
            }

            // Render Overview
            const overviewHtml = detailEntry.overview ? `
                <div class="devlog-section">
                    <h3>개요</h3>
                    <p>${detailEntry.overview}</p>
                </div>
            ` : '';

            // Render Sections
            const sectionsHtml = (detailEntry.sections || []).map(section => `
                <div class="devlog-content-block">
                    <h4>${section.subtitle}</h4>
                    <div class="block-text">
                        ${section.content.split('\n').map(line => {
                            const trimmedLine = line.trim();
                            // Check for sub-item patterns like 2-1. or 1-2.
                            const isSubItem = /^\d+-\d+\./.test(trimmedLine);
                            const style = isSubItem ? 'style="padding-left: 20px; margin-bottom: 0.5rem;"' : 'style="margin-bottom: 0.8rem;"';
                            const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                            return `<div ${style}>${formattedLine}</div>`;
                        }).join('')}
                    </div>
                    ${section.image ? `<div class="diagram-container"><img src="../${section.image}" class="logic-flow-image"></div>` : ''}
                    ${getFlowHtml(section.flow_diagram)}
                </div>
                <br>
            `).join('');

            // Render Conclusion
            const conclusionHtml = detailEntry.conclusion ? `
                <hr class="section-divider">
                <div class="devlog-section">
                    <h3>느낀점 - 더 나아갈 방향성</h3>
                    <p>${detailEntry.conclusion}</p>
                </div>
            ` : '';

            const tagsHtml = baseEntry.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');

            detailEl.innerHTML = `
                <div class="devlog-detail-header">
                    <h1>${baseEntry.title}</h1>
                    <div class="devlog-detail-meta">
                        <span>📅 ${baseEntry.date}</span>
                        <div class="devlog-tags" style="margin-top: 0;">${tagsHtml}</div>
                    </div>
                </div>
                <hr class="section-divider">
                
                <div class="devlog-detail-content">
                    ${overviewHtml}
                    <div class="devlog-body">
                        ${sectionsHtml}
                    </div>
                    ${conclusionHtml}
                </div>
            `;
        })
        .catch(err => {
            console.error('Failed to load devlog detail', err);
            detailEl.innerHTML = '<p>상세 내용을 불러오는데 실패했습니다.</p>';
        });
}
