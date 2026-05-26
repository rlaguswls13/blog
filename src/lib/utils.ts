/**
 * Utility functions - migrated from legacy utils.js
 */

export function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const cleanStr = dateStr.trim();
  if (cleanStr === "현재") return new Date();

  const parts = cleanStr.split(".");
  if (parts.length === 3) {
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);
    return new Date(year, month, day);
  }
  if (parts.length === 2) {
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    return new Date(year, month);
  }
  return null;
}

export function formatPeriods(periods: string[]): string {
  if (!periods || periods.length === 0) return "";
  if (periods.length <= 2) return periods.join(" / ");
  return `${periods[0]} / ... / ${periods[periods.length - 1]}`;
}

export function formatMiniPeriod(periods: string[]): string {
  if (!periods || periods.length === 0) return "";
  if (periods.length === 1) return periods[0];
  const firstPeriod = periods[0];
  const lastPeriod = periods[periods.length - 1];
  const firstStart = firstPeriod.split(" - ")[0] || firstPeriod;
  const lastEnd = lastPeriod.split(" - ")[1] || lastPeriod;
  return `${firstStart} ... ${lastEnd}`;
}

export function calculateTotalPeriod(periods: string[]): string {
  if (!periods || periods.length === 0) return "";

  let totalMonths = 0;
  periods.forEach((p) => {
    const parts = p.split(" - ");
    if (parts.length === 2) {
      const start = parseDate(parts[0]);
      const end = parseDate(parts[1]);
      if (start && end) {
        const months =
          (end.getFullYear() - start.getFullYear()) * 12 +
          (end.getMonth() - start.getMonth()) +
          1;
        totalMonths += months;
      }
    }
  });

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let result = "총 ";
  if (years > 0) result += `${years}년 `;
  if (months > 0) result += `${months}개월`;
  if (years === 0 && months === 0) return "";
  return `(${result.trim()})`;
}

export function sortByDateDesc<T extends { periods?: string[]; date?: string }>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => {
    // Find the latest start date for A
    let aLatest: Date | null = null;
    if (a.periods && a.periods.length > 0) {
      a.periods.forEach((p) => {
        const startStr = p.split(" - ")[0];
        const d = parseDate(startStr);
        if (d && (!aLatest || d > aLatest)) {
          aLatest = d;
        }
      });
    } else if (a.date) {
      aLatest = parseDate(a.date);
    }

    // Find the latest start date for B
    let bLatest: Date | null = null;
    if (b.periods && b.periods.length > 0) {
      b.periods.forEach((p) => {
        const startStr = p.split(" - ")[0];
        const d = parseDate(startStr);
        if (d && (!bLatest || d > bLatest)) {
          bLatest = d;
        }
      });
    } else if (b.date) {
      bLatest = parseDate(b.date);
    }

    if (!aLatest && !bLatest) return 0;
    if (!aLatest) return 1;
    if (!bLatest) return -1;
    return bLatest.getTime() - aLatest.getTime();
  });
}

export function truncateMiddle(str: string, maxLength: number = 25): string {
  if (!str || str.length <= maxLength) return str;
  const charsToShow = maxLength - 3;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return str.substring(0, frontChars) + "..." + str.substring(str.length - backChars);
}

