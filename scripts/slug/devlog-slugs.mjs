/** Returns whether a value is safe to use as a canonical Devlog slug. */
export function isEnglishSlug(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(value || ""));
}

export function normalizeSourceId(value) {
  return String(value || "").replaceAll("-", "").trim();
}

export function createTemporarySlug({ category, sourceId, title = "" }) {
  const titleSlug = String(title)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)
    .replace(/-+$/g, "");
  const categorySlug = String(category || "notion").replaceAll("_", "-");
  const idSuffix = normalizeSourceId(sourceId).slice(-12);
  const base = titleSlug || categorySlug;
  const slug = `draft-${base}-${idSuffix}`;

  if (!idSuffix || !isEnglishSlug(slug)) {
    throw new Error(`Unable to create a temporary slug for Notion page ${sourceId || "(missing id)"}.`);
  }
  return slug;
}

function readPropertyText(property) {
  if (!property) return "";
  if (typeof property.url === "string") return property.url.trim();
  if (typeof property.select?.name === "string") return property.select.name.trim();
  if (typeof property.formula?.string === "string") return property.formula.string.trim();
  const richText = property.rich_text || property.title || [];
  return richText.map((item) => item.plain_text || item.text?.content || "").join("").trim();
}

export function resolveDevlogSlug({
  properties = {},
  fallbackSlug = "",
  category = "notion",
  sourceId = "",
  title = "",
}) {
  const externalSlug = ["Slug", "slug", "URL Slug", "url_slug"]
    .map((name) => readPropertyText(properties[name]))
    .find(Boolean);

  if (externalSlug && !isEnglishSlug(externalSlug)) {
    throw new Error(
      `Invalid Notion Slug "${externalSlug}". Use lowercase English kebab-case.`,
    );
  }
  if (externalSlug) return externalSlug;
  if (isEnglishSlug(fallbackSlug)) return fallbackSlug;
  return createTemporarySlug({ category, sourceId, title });
}
