/**
 * Normalizes rich text objects from Notion API response.
 */
export function normalizeRichText(richTextArray) {
  if (!Array.isArray(richTextArray)) return [];
  return richTextArray.map((item) => {
    const annotations = item.annotations || {};
    return {
      plain_text: item.plain_text || "",
      annotations: {
        bold: !!annotations.bold,
        italic: !!annotations.italic,
        strikethrough: !!annotations.strikethrough,
        underline: !!annotations.underline,
        code: !!annotations.code,
        color: annotations.color || "default",
      },
      href: item.href || item.text?.link?.url || null,
      type: item.type || "text",
      mention: item.type === "mention" ? item.mention : null,
      equation: item.type === "equation" ? item.equation : null,
    };
  });
}

/**
 * Extracts plain text string from rich text array.
 */
export function extractPlainText(richTextArray) {
  if (!Array.isArray(richTextArray)) return "";
  return richTextArray.map((item) => item.plain_text || "").join("");
}

/**
 * Converts a raw Notion block object into a clean normalized structure.
 */
export function normalizeBlock(block) {
  if (!block || !block.type) {
    return null;
  }

  const type = block.type;
  const blockData = block[type] || {};

  const normalized = {
    id: block.id,
    type: type,
    has_children: !!block.has_children,
    last_edited_time: block.last_edited_time || null,
    children: [],
    data: {},
  };

  switch (type) {
    case "paragraph":
    case "heading_1":
    case "heading_2":
    case "heading_3":
    case "heading_4":
    case "bulleted_list_item":
    case "numbered_list_item":
    case "quote":
    case "toggle":
      normalized.data = {
        rich_text: normalizeRichText(blockData.rich_text),
        color: blockData.color || "default",
      };
      break;

    case "to_do":
      normalized.data = {
        rich_text: normalizeRichText(blockData.rich_text),
        checked: !!blockData.checked,
        color: blockData.color || "default",
      };
      break;

    case "callout":
      normalized.data = {
        rich_text: normalizeRichText(blockData.rich_text),
        icon: blockData.icon || null,
        color: blockData.color || "default",
      };
      break;

    case "code":
      normalized.data = {
        rich_text: normalizeRichText(blockData.rich_text),
        language: blockData.language || "plain text",
        caption: normalizeRichText(blockData.caption),
      };
      break;

    case "image":
    case "file":
    case "video":
    case "audio":
    case "pdf": {
      const fileObj = blockData.file || blockData.external || {};
      normalized.data = {
        type: blockData.type || (blockData.file ? "file" : "external"),
        url: fileObj.url || "",
        expiry_time: fileObj.expiry_time || null,
        caption: normalizeRichText(blockData.caption),
        alt: extractPlainText(blockData.caption) || `${type} block`,
      };
      break;
    }

    case "bookmark":
    case "embed":
      normalized.data = {
        url: blockData.url || "",
        caption: normalizeRichText(blockData.caption),
      };
      break;

    case "table":
      normalized.data = {
        table_width: blockData.table_width || 0,
        has_column_header: !!blockData.has_column_header,
        has_row_header: !!blockData.has_row_header,
      };
      break;

    case "table_row":
      normalized.data = {
        cells: (blockData.cells || []).map((cell) => normalizeRichText(cell)),
      };
      break;

    case "divider":
      normalized.data = {};
      break;

    case "equation":
      normalized.data = {
        expression: blockData.expression || "",
      };
      break;

    case "column_list":
    case "column":
    case "synced_block":
    case "child_page":
      normalized.data = {
        title: blockData.title || "",
      };
      break;

    default:
      // Keep raw representation for fallback rendering
      normalized.data = {
        raw: blockData,
      };
      break;
  }

  return normalized;
}

/**
 * Generates a clean URL slug from title string.
 */
export function slugify(text) {
  if (!text) return "untitled";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\uAC00-\uD7A3\-]+/g, "") // Keep alphanumeric, Korean characters, and hyphens
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "") || "untitled";
}
