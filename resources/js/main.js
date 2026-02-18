document.addEventListener("DOMContentLoaded", () => {
    // Initialize Theme
    const storedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

    // Set initial theme
    const currentTheme = storedTheme || systemPreference;
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleIcon(currentTheme);

    // Create Toggle Button (if not exists) and Append to Body (outside nav)
    let toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) {
        toggleBtn = document.createElement('button');
        toggleBtn.id = 'theme-toggle';
        toggleBtn.className = 'theme-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle Dark/Light Mode');
        document.body.appendChild(toggleBtn);
        updateToggleIcon(currentTheme);
    }

    // Toggle Theme
    toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const target = current === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', target);
        localStorage.setItem('theme', target);
        updateToggleIcon(target);
    });

    // Load Data
    // Determine path prefix based on current location
    const isInViewDir = window.location.pathname.includes('/view/');
    const isInProjectDir = window.location.pathname.includes('/view/project/');

    // If in project dir (depth 2), resources are at '../../'
    // If in view dir (depth 1), resources are at '../'
    // Else (root), resources are at ''
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
    // If in view dir, link is project/${id}.html
    // If in root, link is view/project/${id}.html
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

    const project = data.projects.find(p => p.id === id);

    if (!project) {
        document.getElementById('project-detail').innerHTML = '<p>Project not found.</p>';
        return;
    }

    document.getElementById('project-detail').innerHTML = `
        <div class="detail-header">
            <h1>${project.title}</h1>
            <div class="detail-tags">${project.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
            <p class="detail-period">${project.period}</p>
        </div>
        <div class="detail-content">
            <p>${project.description}</p>
            <p>更多 details content can be added here from JSON if available.</p>
        </div>
    `;
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
