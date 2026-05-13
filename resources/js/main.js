/**
 * Main Application Entry Point
 * 데이터 로드 및 각 모듈 초기화 담당
 */
import { initTheme } from './theme.js';
import { loadProfile, loadProjects, loadResume, loadContact } from './renderers.js';
import { loadProjectDetail } from './project-detail-manager.js';

document.addEventListener("DOMContentLoaded", () => {
    // 테마 모듈 초기화
    initTheme();

    // 현재 페이지 위치 파악 및 리소스 경로 계산
    const isInViewDir = window.location.pathname.includes('/view/');
    const isInProjectDir = window.location.pathname.includes('/view/project/');

    let resourcePrefix = '';
    if (isInProjectDir) {
        resourcePrefix = '../../';
    } else if (isInViewDir) {
        resourcePrefix = '../';
    }

    // 데이터 패치 및 각 섹션별 렌더링 배분
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
