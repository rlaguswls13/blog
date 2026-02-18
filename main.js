document.addEventListener("DOMContentLoaded", () => {
    // Initialize Theme
    const toggleBtn = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    
    // Set initial theme
    const currentTheme = storedTheme || systemPreference;
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleIcon(currentTheme);

    // Toggle Theme
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const target = current === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', target);
            localStorage.setItem('theme', target);
            updateToggleIcon(target);
        });
    }

    // Load Data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            if (document.getElementById('profile-section')) loadProfile(data);
            if (document.getElementById('project-list')) loadProjects(data);
            if (document.getElementById('resume-section')) loadResume(data);
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

function loadProfile(data) {
    const p = data.profile;
    document.getElementById('p-img').src = p.image;
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
    document.getElementById('project-list').innerHTML = data.projects.map(proj => `
        <div class="project-card">
            <h3>${proj.title}</h3>
            <div style="margin-bottom:15px;">${proj.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
            <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:10px;">${proj.period}</p>
            <p style="color:var(--text-primary);">${proj.description}</p>
        </div>
    `).join('');
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
        `<li style="margin-top:15px; display:flex; align-items:center; gap:10px;">
            <span style="font-size:1.5rem;">${l.icon}</span> 
            <b>${l.label}:</b> 
            <a href="${l.url}" target="_blank">${l.url}</a>
        </li>`
    ).join('');
}
