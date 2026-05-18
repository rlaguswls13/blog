/**
 * Utils Module
 * 공통 유틸리티 함수 모음
 */

/**
 * 문자열 형태의 날짜를 Date 객체로 변환
 */
export function parseDate(dateStr) {
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

/**
 * 프로젝트 기간 배열을 포맷팅하여 반환
 */
export function formatPeriods(periods) {
    if (!periods || !Array.isArray(periods) || periods.length === 0) return '';
    if (periods.length <= 2) return periods.join(' / ');
    return `${periods[0]} / ... / ${periods[periods.length - 1]}`;
}

/**
 * 전체 프로젝트 기간(개월 수) 계산
 */
export function calculateTotalPeriod(periods) {
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

/**
 * 프로젝트 정렬 로직 (1순위: 시작일 최신순, 2순위: 종료일 최신순)
 */
export function sortProjects(projects) {
    return [...projects].sort((a, b) => {
        const aStart = parseDate(a.periods[0].split(' - ')[0]);
        const bStart = parseDate(b.periods[0].split(' - ')[0]);
        
        if (bStart.getTime() !== aStart.getTime()) {
            return bStart.getTime() - aStart.getTime();
        }
        
        const aEndStr = a.periods[a.periods.length - 1].split(' - ')[1] || a.periods[a.periods.length - 1].split(' - ')[0];
        const bEndStr = b.periods[b.periods.length - 1].split(' - ')[1] || b.periods[b.periods.length - 1].split(' - ')[0];
        
        return parseDate(bEndStr).getTime() - parseDate(aEndStr).getTime();
    });
}
