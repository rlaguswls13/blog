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
    let categoryFound = null;

    const entries = data[category];
    if (entries) {
        const found = entries.find(e => e.id === id);
        if (found) {
            baseEntry = found;
            categoryFound = category;
        }
    }

    if (!baseEntry) {
        detailEl.innerHTML = '<p>게시글을 찾을 수 없습니다.</p>';
        return;
    }

    fetch(`../resources/data/devlog-detail-${category}.json`)
        .then(res => res.json())
        .then(detailsData => {
            const detailEntry = detailsData.find(d => d.id === id);
            
            let contentHtml = '';
            
            if (detailEntry && detailEntry.content) {
                contentHtml = detailEntry.content.map(block => {
                    if (block.type === 'heading') {
                        return `<h${block.level}>${block.text}</h${block.level}>`;
                    } else if (block.type === 'paragraph') {
                        return `<p>${block.text}</p>`;
                    } else if (block.type === 'code') {
                        return `<pre><code class="language-${block.language}">${block.code}</code></pre>`;
                    } else if (block.type === 'list') {
                        const items = block.items.map(item => `<li>${item}</li>`).join('');
                        return `<ul>${items}</ul>`;
                    }
                    return '';
                }).join('');
            } else {
                contentHtml = '<p>상세 내용이 준비 중입니다.</p>';
            }

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
                    ${contentHtml}
                </div>
            `;
        })
        .catch(err => {
            console.error('Failed to load devlog detail', err);
            detailEl.innerHTML = '<p>상세 내용을 불러오는데 실패했습니다.</p>';
        });
}
