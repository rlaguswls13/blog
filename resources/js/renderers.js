/**
 * Renderers Module
 * 각 섹션별 데이터 렌더링 로직
 */
import { formatPeriods, calculateTotalPeriod, sortProjects } from './utils.js';

export function loadProfile(data, prefix) {
    const p = data.profile;
    const profileImg = document.getElementById('p-img');
    const profileName = document.getElementById('p-name');
    
    if (profileImg) profileImg.src = (prefix || '') + p.image;
    if (profileName) profileName.textContent = p.name;
    
    const elements = {
        'p-role': p.role,
        'p-org': p.organization,
        'bio-title': p.bio_title,
        'bio-text': p.bio_text
    };

    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    const socialEl = document.getElementById('p-social');
    if (socialEl) {
        socialEl.innerHTML = p.social.map(s =>
            `<a href="${s.link}" style="margin:0 5px; font-size:1.5rem;">${s.icon}</a>`
        ).join('');
    }

    const interestEl = document.getElementById('interest-list');
    if (interestEl) {
        interestEl.innerHTML = p.interests.map(i => `<li>📖 ${i}</li>`).join('');
    }

    const eduEl = document.getElementById('edu-list');
    if (eduEl) {
        eduEl.innerHTML = p.education.map(e => `<li>🎓 <b>${e.degree}</b>, ${e.year}<br><small style="color:var(--text-secondary)">${e.school}</small></li>`).join('');
    }

    const renderSkill = (item, cls) => `
        <div class="skill-item">
            <div class="skill-header">
                <span>${item.icon} ${item.name}</span>
                <span>${item.percent}%</span>
            </div>
            <div class="progress-bg"><div class="progress-fill ${cls}" style="width:${item.percent}%"></div></div>
        </div>`;
        
    const techEl = document.getElementById('tech-list');
    const hobbyEl = document.getElementById('hobby-list');
    
    if (techEl) techEl.innerHTML = data.skills.technical.map(s => renderSkill(s, 'fill-tech')).join('');
    if (hobbyEl) hobbyEl.innerHTML = data.skills.hobbies.map(s => renderSkill(s, 'fill-hobby')).join('');

    // Recent Projects Summary (Top 3) in Profile
    const profileSection = document.getElementById('profile-section');
    if (profileSection) {
    const sorted = sortProjects(data.projects);
    const recentProjectsHtml = sorted.slice(0, 5).map(proj => {
        // 제목 25자 이상이면 줄임표 처리
        const truncatedTitle = proj.title.length > 25 ? proj.title.substring(0, 25) + '...' : proj.title;
        // 날짜는 최초 시작 날짜만 표기 (예: 2025.08 - 2026.02 -> 2025.08)
        const startDate = proj.periods[0].split(' - ')[0];
        
        return `
            <div class="recent-project-mini">
                <span class="mini-title"><a href="${(prefix || '') + (prefix ? 'project/' : 'view/project/')}${proj.id}.html" title="${proj.title}">${truncatedTitle}</a></span>
                <span class="mini-period">${startDate}</span>
            </div>
        `;
    }).join('');
        
        const recentBox = document.createElement('div');
        recentBox.className = 'recent-projects-box';
        recentBox.innerHTML = `<h3>최근 프로젝트 / Recent Projects</h3>` + recentProjectsHtml;
        profileSection.appendChild(recentBox);
    }
}

export function loadProjects(data) {
    const projectListEl = document.getElementById('project-list');
    if (!projectListEl) return;

    const isInViewDir = window.location.pathname.includes('/view/');
    const linkPrefix = isInViewDir ? 'project/' : 'view/project/';

    const sortedProjects = sortProjects(data.projects);

    projectListEl.innerHTML = sortedProjects.map(proj => {
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

export function loadResume(data) {
    const workListEl = document.getElementById('work-list');
    const eduTimelineEl = document.getElementById('edu-timeline');
    const certListEl = document.getElementById('cert-list');

    const render = item => `
        <div class="timeline-item">
            <h3>${item.title}</h3>
            <span class="date">${item.date}</span>
            <p>${item.description}</p>
        </div>`;
        
    if (workListEl) workListEl.innerHTML = data.resume.work.map(render).join('');
    if (eduTimelineEl) eduTimelineEl.innerHTML = data.resume.education.map(render).join('');
    if (certListEl) certListEl.innerHTML = data.resume.certification.map(render).join('');
}

export function loadContact(data) {
    const introEl = document.getElementById('contact-intro');
    const emailEl = document.getElementById('contact-email');
    const linksEl = document.getElementById('contact-links');

    if (introEl) introEl.textContent = data.contact.intro;
    if (emailEl) emailEl.innerHTML = `<a href="mailto:${data.contact.email}">${data.contact.email}</a>`;
    if (linksEl) {
        linksEl.innerHTML = data.contact.links.map(l =>
            `<li class="contact-item">
                <span class="contact-icon">${l.icon}</span> 
                <b>${l.label}:</b> 
                <a href="${l.url}" target="_blank">${l.url}</a>
            </li>`
        ).join('');
    }
}
