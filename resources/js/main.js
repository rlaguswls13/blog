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

/**
 * 내비게이션 바 동적 업데이트
 * 현재 활성화된 메뉴명을 타이틀로 표시하고 메뉴 목록에서 제거
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
            link.style.display = 'none'; // 메뉴 목록에서 삭제
        }
    });
}
