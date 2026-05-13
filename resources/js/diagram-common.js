/**
 * Diagram Iframe Auto-Resize Common Script
 * 다이어그램 iframe의 높이를 부모 창에 전달하여 자동 조절하는 공통 로직
 */
function sendHeight() {
    const area = document.getElementById('capture-area');
    if (area) {
        // 상하 패딩 40px * 2 = 80px을 더해 콘텐츠가 잘리지 않도록 정밀 측정
        const height = area.offsetHeight + 80;
        window.parent.postMessage({ 
            type: 'resize-iframe', 
            height: height 
        }, '*');
    }
}

// 이벤트 리스너 등록
window.addEventListener('load', sendHeight);

// 부모 창의 리사이즈에 의한 루프 방지를 위해 디바운싱(Debouncing) 적용
window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(sendHeight, 200);
});

// 초기 렌더링 지연 대응을 위해 100ms 후 즉시 실행
setTimeout(sendHeight, 100);
