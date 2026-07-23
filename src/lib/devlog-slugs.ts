import devlogSlugs from "@/data/config/devlog-slugs.json";

type SlugMap = Record<string, Record<string, string>>;

const slugMap = devlogSlugs as SlugMap;
const notionCategories = new Set(["blog", "education"]);

export function getDevlogStorageId(category: string, id: string) {
  const value = String(id || "").trim();
  return notionCategories.has(category) ? value.replaceAll("-", "") : value;
}

export function getDevlogSlug(category: string, id: string) {
  const storageId = getDevlogStorageId(category, id);
  return slugMap[category]?.[storageId] || storageId;
}

export function getDevlogHref(category: string, id: string) {
  return `/devlog/${category}/${getDevlogSlug(category, id)}`;
}

export function getDevlogIdBySlug(category: string, slug: string) {
  return Object.entries(slugMap[category] || {})
    .find(([, mappedSlug]) => mappedSlug === slug)?.[0];
}
