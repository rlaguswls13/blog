document.addEventListener("DOMContentLoaded", () => {
    const storedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

    const currentTheme = storedTheme || systemPreference;
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleIcon(currentTheme);

    let toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) {
        toggleBtn = document.createElement('button');
        toggleBtn.id = 'theme-toggle';
        toggleBtn.className = 'theme-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle Dark/Light Mode');
        document.body.appendChild(toggleBtn);
        updateToggleIcon(currentTheme);
    }

    toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const target = current === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', target);
        localStorage.setItem('theme', target);
        updateToggleIcon(target);
    });

    const isInViewDir = window.location.pathname.includes('/view/');
    const isInProjectDir = window.location.pathname.includes('/view/project/');

    let resourcePrefix = '';
    if (isInProjectDir) {
        resourcePrefix = '../../';
    } else if (isInViewDir) {
        resourcePrefix = '../';
    }

    fetch(resourcePrefix + 'resources/data.json')
        .then(response => response.json())
        .then(data => {
            if (document.getElementById('profile-section')) loadProfile(data, resourcePrefix);
            if (document.getElementById('project-list')) loadProjects(data);
            if (document.getElementById('resume-section')) loadResume(data);
            if (document.getElementById('project-detail')) loadProjectDetail(data);
            if (document.getElementById('contact-section')) loadContact(data);
        })
        .catch(err => console.error('Data Load Error:', err));
});

function updateToggleIcon(theme) {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.textContent = theme === 'light' ? '☀️' : '🌙';
    }
}

// Helper: Format periods array with ellipsis if too long
function formatPeriods(periods) {
    if (!periods || !Array.isArray(periods) || periods.length === 0) return '';
    if (periods.length <= 2) return periods.join(' / ');
    return `${periods[0]} / ... / ${periods[periods.length - 1]}`;
}

// Helper: Calculate total duration from periods (can be array or string)
function calculateTotalPeriod(periods) {
    const periodArray = Array.isArray(periods) ? periods : (periods ? [periods] : []);
    if (periodArray.length === 0) return '';

    let totalMonths = 0;
    periodArray.forEach(p => {
        const parts = p.split(' - ');
        if (parts.length === 2) {
            const start = parseDate(parts[0]);
            const end = parseDate(parts[1]);
            if (start && end) {
                const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
                totalMonths += months;
            }
        }
    });

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    let result = '총 ';
    if (years > 0) result += `${years}년 `;
    if (months > 0) result += `${months}개월`;
    if (years === 0 && months === 0) return '';
    return `(${result.trim()})`;
}

function parseDate(dateStr) {
    if (!dateStr) return null;
    const cleanStr = dateStr.trim();
    if (cleanStr === '현재') return new Date();

    const parts = cleanStr.split('.');
    if (parts.length === 2) {
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1;
        return new Date(year, month);
    }
    return null;
}

function loadProfile(data, prefix) {
    const p = data.profile;
    document.getElementById('p-img').src = (prefix || '') + p.image;
    document.getElementById('p-name').textContent = p.name;
    document.getElementById('p-role').textContent = p.role;
    document.getElementById('p-org').textContent = p.organization;
    document.getElementById('bio-title').textContent = p.bio_title;
    document.getElementById('bio-text').textContent = p.bio_text;

    document.getElementById('p-social').innerHTML = p.social.map(s =>
        `<a href="${s.link}" style="margin:0 5px; font-size:1.5rem;">${s.icon}</a>`
    ).join('');

    document.getElementById('interest-list').innerHTML = p.interests.map(i => `<li>📖 ${i}</li>`).join('');
    document.getElementById('edu-list').innerHTML = p.education.map(e => `<li>🎓 <b>${e.degree}</b>, ${e.year}<br><small style="color:var(--text-secondary)">${e.school}</small></li>`).join('');

    const renderSkill = (item, cls) => `
        <div class="skill-item">
            <div class="skill-header">
                <span>${item.icon} ${item.name}</span>
                <span>${item.percent}%</span>
            </div>
            <div class="progress-bg"><div class="progress-fill ${cls}" style="width:${item.percent}%"></div></div>
        </div>`;
    document.getElementById('tech-list').innerHTML = data.skills.technical.map(s => renderSkill(s, 'fill-tech')).join('');
    document.getElementById('hobby-list').innerHTML = data.skills.hobbies.map(s => renderSkill(s, 'fill-hobby')).join('');
}

function loadProjects(data) {
    const isInViewDir = window.location.pathname.includes('/view/');
    const linkPrefix = isInViewDir ? 'project/' : 'view/project/';

    document.getElementById('project-list').innerHTML = data.projects.map(proj => {
        const periodsText = formatPeriods(proj.periods);
        const totalDuration = calculateTotalPeriod(proj.periods);
        return `
            <div class="project-card">
                <h3><a href="${linkPrefix}${proj.id}.html">${proj.title}</a></h3>
                <div style="margin-bottom:15px;">${proj.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
                <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:10px;">${periodsText}<br><small>${totalDuration}</small></p>
                <p style="color:var(--text-primary);">${proj.description}</p>
            </div>
        `;
    }).join('');
}

function loadProjectDetail(data) {
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

    fetch(resourcePrefix + 'resources/project-detail.json')
        .then(res => res.json())
        .then(detailsData => {
            const basicProject = data.projects.find(p => p.id === id);
            const detailProject = detailsData.find(p => p.project_id === id);
            if (!basicProject || !detailProject) return;

            const periodsText = basicProject.periods ? basicProject.periods.join(' / ') : '';
            const totalDuration = calculateTotalPeriod(basicProject.periods);
            const tagsHtml = basicProject.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');
            const hasTabs = detailProject.tabs && detailProject.tabs.length > 0;

            // Helper for Flow Diagram HTML with placeholder
            const getFlowHtml = (diagramPath) => {
                if (!diagramPath) {
                    return `
                        <div class="diagram-container">
                            <div class="img-placeholder">
                                설계 이미지 준비중입니다.
                            </div>
                        </div>`;
                }

                if (diagramPath.trim().endsWith('.html')) {
                    const fullPath = resourcePrefix + diagramPath;
                    return `
                        <div class="diagram-container">
                            <iframe src="${fullPath}" class="diagram-iframe"></iframe>
                        </div>`;
                }

                if (diagramPath.trim().startsWith('<')) {
                    return `<div class="html-diagram-wrapper">${diagramPath}</div>`;
                }

                return `<div class="diagram-container"><img src="${diagramPath}" alt="Flow Diagram" class="logic-flow-image"></div>`;
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

            document.getElementById('project-detail').innerHTML = `
                <div class="detail-header"><h1>${basicProject.title}</h1></div>
                <div class="detail-meta">
                    <span class="detail-period">${periodsText}<br><small>${totalDuration}</small></span>
                    <div class="detail-tags">${tagsHtml}</div>
                </div>
                <hr class="section-divider">
                ${detailsBodyHtml}

                ${detailProject.reference ? `
                    <div class="detail-footer">
                        <hr class="section-divider">
                        <div class="reference-section">
                            <h3>Reference</h3>
                            <p class="reference-p">${detailProject.reference}</p>
                        </div>
                    </div>
                ` : ''}
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

function loadResume(data) {
    const render = item => `
        <div class="timeline-item">
            <h3>${item.title}</h3>
            <span class="date">${item.date}</span>
            <p>${item.description}</p>
        </div>`;
    document.getElementById('work-list').innerHTML = data.resume.work.map(render).join('');
    document.getElementById('edu-timeline').innerHTML = data.resume.education.map(render).join('');
    if (document.getElementById('cert-list')) {
        document.getElementById('cert-list').innerHTML = data.resume.certification.map(render).join('');
    }
}

function loadContact(data) {
    document.getElementById('contact-intro').textContent = data.contact.intro;
    document.getElementById('contact-email').innerHTML = `<a href="mailto:${data.contact.email}">${data.contact.email}</a>`;
    document.getElementById('contact-links').innerHTML = data.contact.links.map(l =>
        `<li class="contact-item">
            <span class="contact-icon">${l.icon}</span> 
            <b>${l.label}:</b> 
            <a href="${l.url}" target="_blank">${l.url}</a>
        </li>`
    ).join('');
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

// Global listener for iframe resizing via postMessage
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'resize-iframe') {
        const iframes = document.querySelectorAll('.diagram-iframe');
        iframes.forEach(iframe => {
            // Match by src to be safe (handling multiple diagrams if any)
            if (iframe.src.includes(event.data.path) || true) { 
                iframe.style.height = (event.data.height + 20) + 'px';
            }
        });
    }
});
