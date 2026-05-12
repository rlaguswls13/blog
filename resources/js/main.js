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

    document.getElementById('project-list').innerHTML = data.projects.map(proj => `
        <div class="project-card">
            <h3><a href="${linkPrefix}${proj.id}.html">${proj.title}</a></h3>
            <div style="margin-bottom:15px;">${proj.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
            <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:10px;">${proj.period}</p>
            <p style="color:var(--text-primary);">${proj.description}</p>
        </div>
    `).join('');
}

function loadProjectDetail(data) {
    let id;
    // Check if we are in 'view/project/' directory
    if (window.location.pathname.includes('/view/project/')) {
        // Extract filename without extension
        const parts = window.location.pathname.split('/');
        const filename = parts[parts.length - 1];
        id = filename.replace('.html', '');
    } else {
        // Fallback
        const params = new URLSearchParams(window.location.search);
        id = params.get('id');
    }

    if (!id) {
        document.getElementById('project-detail').innerHTML = '<p>No project ID specified.</p>';
        return;
    }

    // Determine path to project-detail.json based on current location
    const isInViewDir = window.location.pathname.includes('/view/');
    const isInProjectDir = window.location.pathname.includes('/view/project/');
    let resourcePrefix = '';
    if (isInProjectDir) {
        resourcePrefix = '../../';
    } else if (isInViewDir) {
        resourcePrefix = '../';
    }
    const detailResourcePath = resourcePrefix + 'resources/project-detail.json';

    fetch(detailResourcePath)
        .then(res => res.json())
        .then(detailsData => {
            // 1. Find basic info from data.json (passed as 'data')
            const basicProject = data.projects.find(p => p.id === id);

            // 2. Find detailed info from project-detail.json
            const detailProject = detailsData.find(p => p.project_id === id);

            if (!basicProject) {
                document.getElementById('project-detail').innerHTML = '<p>Project not found (basic data).</p>';
                return;
            }

            // Check if tabs exist
            const hasTabs = detailProject && detailProject.tabs && detailProject.tabs.length > 0;

            let detailsBodyHtml = '';

            if (hasTabs) {
                let tabsHeaderHtml = '<div class="tabs-container"><div class="tabs-header">';
                let tabsContentHtml = '<div class="tabs-body">';

                detailProject.tabs.forEach((tab, index) => {
                    const activeClass = index === 0 ? 'active' : '';
                    tabsHeaderHtml += `<button class="tab-btn ${activeClass}" data-tab="tab-${index}">${tab.title}</button>`;

                    let flowImageSrc = tab.flow_diagram ? tab.flow_diagram : '';
                    let tabFlowHtml = '';
                    if (flowImageSrc) {
                        tabFlowHtml = `<div class="logic-flow-section"><img src="${flowImageSrc}" alt="Flow Diagram" style="max-width: 100%; height: auto; border-radius: 8px;"></div>`;
                    } else {
                        tabFlowHtml = `<div class="logic-flow-section"><div class="img-placeholder" style="width: 100%; height: 300px; background-color: var(--bg-tertiary); border: 2px dashed var(--border-color); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); font-weight: 500;">설계 이미지 준비중입니다.</div></div>`;
                    }
                    let tabContentHtml = tab.content ? `<div class="detail-content">${tab.content}</div>` : '';
                    let tabRefHtml = tab.reference ? `<div class="reference-section">${tab.reference}</div>` : '';
                    let separatorHtml = (tab.flow_diagram && tab.content) ? '<hr class="section-divider">' : '';

                    tabsContentHtml += `
                        <div class="tab-content ${activeClass}" id="tab-${index}">
                            ${tabFlowHtml}
                            ${separatorHtml}
                            ${tabContentHtml}
                            ${tabRefHtml}
                        </div>
                     `;
                });
                tabsHeaderHtml += '</div>';
                tabsContentHtml += '</div></div>';

                detailsBodyHtml = tabsHeaderHtml + tabsContentHtml;

            } else {
                // Original logic for single content
                const content = detailProject ? detailProject.content : '';
                const flowDiagram = detailProject ? detailProject.flow_diagram : '';
                const references = detailProject ? detailProject.reference : '';

                let flowImageSrc = flowDiagram ? flowDiagram : '';
                let flowHtml = '';
                if (flowImageSrc) {
                    flowHtml = `
                        <div class="logic-flow-section">
                            <img src="${flowImageSrc}" alt="Flow Diagram" style="max-width: 100%; height: auto; border-radius: 8px;">
                        </div>
                    `;
                } else {
                    flowHtml = `
                        <div class="logic-flow-section">
                            <div class="img-placeholder" style="width: 100%; height: 300px; background-color: var(--bg-tertiary); border: 2px dashed var(--border-color); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); font-weight: 500;">
                                설계 이미지 준비중입니다.
                            </div>
                        </div>
                    `;
                }

                let contentHtml = '';
                if (content) {
                    contentHtml = `
                        <div class="detail-content">
                            ${content}
                        </div>
                    `;
                }

                let refHtml = '';
                if (references) {
                    refHtml = `
                        <hr class="section-divider">
                        <div class="reference-section">
                            ${references}
                        </div>
                    `;
                }

                let separatorHtml = (flowDiagram && content) ? '<hr class="section-divider">' : '';
                detailsBodyHtml = flowHtml + separatorHtml + contentHtml + refHtml;
            }

            // Render tags
            const tagsHtml = basicProject.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');

            document.getElementById('project-detail').innerHTML = `
                <div class="detail-header">
                    <h1>${basicProject.title}</h1>
                </div>
                
                <hr class="section-divider">
                
                <div class="detail-meta">
                    <span class="detail-period">${basicProject.period}</span>
                    <div class="detail-tags">${tagsHtml}</div>
                </div>

                <hr class="section-divider">

                ${detailsBodyHtml}
            `;

            // Trigger Mermaid
            if (window.mermaid) {
                // Wait a tick to ensure elements are in DOM
                setTimeout(() => {
                    try {
                        window.mermaid.run({
                            nodes: document.querySelectorAll('.mermaid')
                        });
                    } catch (e) {
                        console.error("Mermaid error:", e);
                    }
                }, 100);
            }

            // Add tab click events
            if (hasTabs) {
                const tabBtns = document.querySelectorAll('.tab-btn');
                const tabContents = document.querySelectorAll('.tab-content');

                tabBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        // Remove active class from all
                        tabBtns.forEach(b => b.classList.remove('active'));
                        tabContents.forEach(c => c.classList.remove('active'));

                        // Add active class to clicked
                        btn.classList.add('active');
                        const tabId = btn.getAttribute('data-tab');
                        document.getElementById(tabId).classList.add('active');
                    });
                });
            }
        })
        .catch(err => {
            console.error('Error loading project details:', err);
            document.getElementById('project-detail').innerHTML = '<p>Error loading project details.</p>';
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
