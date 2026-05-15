/**
 * Project Detail Manager Module
 * 상세 페이지 전용 로직 (탭, 다이어그램, 섹션 렌더링)
 */
import { calculateTotalPeriod } from './utils.js';

export function loadProjectDetail(data) {
    const detailEl = document.getElementById('project-detail');
    if (!detailEl) return;

    let id;
    if (window.location.pathname.includes('/view/project/')) {
        const parts = window.location.pathname.split('/');
        id = parts[parts.length - 1].replace('.html', '');
    } else {
        id = new URLSearchParams(window.location.search).get('id');
    }

    if (!id) return;

    const isInProjectDir = window.location.pathname.includes('/view/project/');
    const resourcePrefix = isInProjectDir ? '../../' : (window.location.pathname.includes('/view/') ? '../' : '');

    fetch(resourcePrefix + 'resources/data/project-detail.json')
        .then(res => res.json())
        .then(detailsData => {
            const basicProject = data.projects.find(p => p.id === id);
            const detailProject = detailsData.find(p => p.project_id === id);
            if (!basicProject || !detailProject) return;

            const periodsText = basicProject.periods ? basicProject.periods.join(' / ') : '';
            const totalDuration = calculateTotalPeriod(basicProject.periods);
            const tagsHtml = basicProject.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');
            const hasTabs = detailProject.tabs && detailProject.tabs.length > 0;

            const getFlowHtml = (diagramPath) => {
                if (!diagramPath) return `<div class="diagram-container"><div class="img-placeholder">설계 이미지 준비중입니다.</div></div>`;
                
                if (diagramPath.trim().endsWith('.html')) {
                    const fullPath = resourcePrefix + diagramPath;
                    return `<div class="diagram-container"><iframe src="${fullPath}" class="diagram-iframe"></iframe></div>`;
                }
                
                if (diagramPath.trim().startsWith('<')) return `<div class="html-diagram-wrapper">${diagramPath}</div>`;
                
                return `<div class="diagram-container"><img src="${resourcePrefix + diagramPath}" alt="Flow Diagram" class="logic-flow-image"></div>`;
            };

            let detailsBodyHtml = '';
            if (hasTabs) {
                let tabsHeaderHtml = '<div class="tabs-container"><div class="tabs-header">';
                let tabsContentHtml = '<div class="tabs-body">';

                detailProject.tabs.forEach((tab, index) => {
                    const activeClass = index === 0 ? 'active' : '';
                    tabsHeaderHtml += `<button class="tab-btn ${activeClass}" data-tab="tab-${index}">${tab.title}</button>`;
                    
                    const contentBody = tab.sections ? renderSections(tab.sections) : (tab.content || '');
                    const flowHtml = getFlowHtml(tab.flow_diagram);
                    
                    tabsContentHtml += `
                        <div class="tab-content ${activeClass}" id="tab-${index}">
                            ${flowHtml}
                            <hr class="section-divider">
                            <div class="detail-content">${contentBody}</div>
                            ${tab.reference ? `<div class="reference-section">${tab.reference}</div>` : ''}
                        </div>`;
                });
                detailsBodyHtml = tabsHeaderHtml + '</div>' + tabsContentHtml + '</div></div>';
            } else {
                const contentBody = detailProject.sections ? renderSections(detailProject.sections) : (detailProject.content || '');
                const flowHtml = getFlowHtml(detailProject.flow_diagram);
                detailsBodyHtml = flowHtml + '<hr class="section-divider">' + `<div class="detail-content">${contentBody}</div>` + (detailProject.reference ? '<hr class="section-divider">' + `<div class="reference-section">${detailProject.reference}</div>` : '');
            }

            detailEl.innerHTML = `
                <div class="detail-header"><h1>${basicProject.title}</h1></div>
                <div class="detail-meta">
                    <span class="detail-period">${periodsText}<br><small>${totalDuration}</small></span>
                    <div class="detail-tags">${tagsHtml}</div>
                </div>
                <hr class="section-divider">
                ${detailsBodyHtml}
                ${detailProject.reference ? `<div class="detail-footer"><hr class="section-divider"><div class="reference-section"><h3>Reference</h3><p class="reference-p">${detailProject.reference}</p></div></div>` : ''}
            `;

            if (hasTabs) {
                const tabBtns = document.querySelectorAll('.tab-btn');
                const tabContents = document.querySelectorAll('.tab-content');
                const periodDisplay = document.querySelector('.detail-period');
                const originalPeriodText = `${periodsText}<br><small>${totalDuration}</small>`;

                tabBtns.forEach((btn, index) => {
                    btn.addEventListener('click', () => {
                        tabBtns.forEach(b => b.classList.remove('active'));
                        tabContents.forEach(c => c.classList.remove('active'));
                        btn.classList.add('active');
                        document.getElementById(btn.getAttribute('data-tab')).classList.add('active');

                        const tabData = detailProject.tabs[index];
                        const tabPeriod = (tabData && tabData.period) || (basicProject.periods && basicProject.periods[index]);
                        if (tabPeriod && basicProject.periods.length > 1) {
                            const duration = calculateTotalPeriod(tabPeriod);
                            periodDisplay.innerHTML = `${tabPeriod}<br><small>${duration}</small>`;
                        } else {
                            periodDisplay.innerHTML = originalPeriodText;
                        }
                    });
                });
            }

            if (window.mermaid) {
                setTimeout(() => { try { window.mermaid.run({ nodes: document.querySelectorAll('.mermaid') }); } catch (e) { } }, 100);
            }
        });
}

function renderSections(sections) {
    if (!sections || !Array.isArray(sections)) return '';
    return sections.map(sec => `
        <div class="tech-section-item">
            <h4 class="tech-section-title">${sec.title}</h4>
            ${sec.body ? `<p>${sec.body}</p>` : ''}
            ${sec.list ? `<ul class="ref-list tech-section-list">${sec.list.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
        </div>
    `).join('');
}


