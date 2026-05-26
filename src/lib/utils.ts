/**
 * Utility functions - migrated from legacy utils.js
 */

export function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const cleanStr = dateStr.trim();
  if (cleanStr === "현재") return new Date();

  const parts = cleanStr.split(".");
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
    const aDateStr = a.periods?.[0]?.split(" - ")[0] || a.date || "";
    const bDateStr = b.periods?.[0]?.split(" - ")[0] || b.date || "";
    const aDate = parseDate(aDateStr);
    const bDate = parseDate(bDateStr);
    if (!aDate || !bDate) return 0;
    return bDate.getTime() - aDate.getTime();
  });
}

export function truncateMiddle(str: string, maxLength: number = 25): string {
  if (!str || str.length <= maxLength) return str;
  const charsToShow = maxLength - 3;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return str.substring(0, frontChars) + "..." + str.substring(str.length - backChars);
}

