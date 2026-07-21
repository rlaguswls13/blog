/**
 * Utility functions - migrated from legacy utils.js
 */

export function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const cleanStr = dateStr.trim();
  if (cleanStr === "현재") return new Date();

  const match = cleanStr.match(/^(\d{4})(?:[.\-/](\d{1,2}))?(?:[.\-/](\d{1,2}))?/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2] || 1);
  const day = Number(match[3] || 1);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  const parsed = new Date(year, month - 1, day);
  if (parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day) {
    return null;
  }
  return parsed;
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

export function extractNotionText(richTextArray?: any[]): string {
  if (!richTextArray || !Array.isArray(richTextArray)) return "";
  return richTextArray
    .map((item) => item?.plain_text || item?.text?.content || "")
    .join("")
    .trim();
}

export function normalizeEducationEntry(entry: any) {
  if (!entry) return null;
  const props = entry.properties || {};

  const roundProp = props["회차"]?.rich_text;
  const round = extractNotionText(roundProp) || entry.round || entry.title || "교육일지";

  const dateProp = props["교육일"]?.date?.start;
  const date = dateProp || entry.date || "";

  const keywordsProp = props["키워드"]?.multi_select;
  const keywords = Array.isArray(keywordsProp)
    ? keywordsProp.map((ms: any) => ms.name)
    : entry.keywords || entry.tags || [];

  const impressionProp = props["느낀점"]?.rich_text;
  const impression = extractNotionText(impressionProp) || entry.impression || entry.description || "";

  const blogTitleProp = props["연습 코드"]?.title;
  const blogTitle = extractNotionText(blogTitleProp) || entry.blogTitle || entry.title || "제목 없음";

  const slug = entry.slug || entry.id?.replace(/-/g, "") || "";
  const notionUrl = entry.notionUrl || (slug ? `https://notion.so/${slug}` : "");

  return {
    id: entry.id,
    title: entry.title || blogTitle,
    slug,
    round,
    date,
    keywords,
    impression,
    blogTitle,
    notionUrl,
  };
}


