/**
 * Main Application Entry Point
 * 데이터 로드 및 각 모듈 초기화 담당
 */
import { initTheme } from './theme.js';
import { loadProfile, loadProjects, loadResume, loadContact, loadDevlog } from './renderers.js';
import { loadProjectDetail } from './project-detail-manager.js';
import { loadDevlogDetail } from './devlog-detail-manager.js';

document.addEventListener("DOMContentLoaded", () => {
    // 테마 모듈 초기화
    initTheme();
    // 내비게이션 초기화
    initNavigation();

    // 현재 페이지 위치 파악 및 리소스 경로 계산
    const isInViewDir = window.location.pathname.includes('/view/');
    const isInProjectDir = window.location.pathname.includes('/view/project/');

    let resourcePrefix = '';
    if (isInProjectDir) {
        resourcePrefix = '../../';
    } else if (isInViewDir) {
        resourcePrefix = '../';
    }

    // 데이터 로드 공통 함수
    const loadData = (file) => fetch(resourcePrefix + 'resources/data/' + file).then(res => res.json());

    // 각 섹션별 필요한 데이터만 로드하여 렌더링
    if (document.getElementById('profile-section')) {
        // 프로필 섹션은 최근 프로젝트 목록 표시를 위해 두 데이터가 모두 필요함
        Promise.all([loadData('profile.json'), loadData('projects.json')])
            .then(([profileData, projectsData]) => {
                const combinedData = { ...profileData, projects: projectsData.projects };
                loadProfile(combinedData, resourcePrefix);
            });
    }

    if (document.getElementById('project-list')) {
        loadData('projects.json').then(data => loadProjects(data));
    }

    if (document.getElementById('resume-section')) {
        loadData('resume.json').then(data => loadResume(data));
    }

    if (document.getElementById('contact-section')) {
        loadData('contact.json').then(data => loadContact(data));
    }

    if (document.getElementById('devlog-list')) {
        loadData('devlog.json').then(data => loadDevlog(data));
    }

    // 프로젝트 상세 페이지인 경우 매니저 호출
    if (document.getElementById('project-detail')) {
        // 상세 페이지는 기본 프로젝트 정보가 필요함
        loadData('projects.json').then(data => loadProjectDetail(data));
    }

    // 데브로그 상세 페이지인 경우 매니저 호출
    if (document.getElementById('devlog-detail')) {
        loadData('devlog.json').then(data => loadDevlogDetail(data));
    }
});

/**
 * 내비게이션 바 동적 업데이트
 * 현재 활성화된 메뉴명을 타이틀로 표시
 */
function initNavigation() {
    const navBrand = document.querySelector('.nav-brand');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // HTML에 이미 정의된 active 클래스를 기준으로 처리
        if (link.classList.contains('active')) {
            if (navBrand) {
                navBrand.textContent = link.textContent;
            }
        }
    });
}
