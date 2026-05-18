/**
 * Theme Module
 * 테마 토글 및 상태 관리
 */

export function initTheme() {
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
}

function updateToggleIcon(theme) {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.textContent = theme === 'light' ? '☀️' : '🌙';
    }
}
