import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { NotionClient } from "./lib/notion-client.mjs";
import { syncEducation } from "./handlers/education.mjs";
import { syncBlog } from "./handlers/blog.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env, .env.local, .env.local.yml manually if they exist
function loadEnv() {
  const envPaths = [".env.local.yml", ".env.local.yaml", ".env.local", ".env"];

  for (const envFile of envPaths) {
    const envPath = path.join(process.cwd(), envFile);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...valueParts] = trimmed.split("=");
          const value = valueParts.join("=").trim();
          const cleanValue = value.replace(/^['"]|['"]$/g, "");
          process.env[key.trim()] = cleanValue;
        }
      });
    }
  }
}

loadEnv();

function parseNotionSources() {
  const sources = [];

  const envKeys = Object.keys(process.env).filter(
    (k) => k.startsWith("NOTION_PAGE_ID") || k.startsWith("NOTION_DATA_SOURCE_ID")
  );

  for (const key of envKeys) {
    const rawVal = process.env[key];
    if (!rawVal) continue;

    let envCategory = "general";
    if (key.includes("_") && !key.endsWith("_ID")) {
      const parts = key.split("_");
      envCategory = parts[parts.length - 1].toLowerCase();
    }

    const trimmedVal = rawVal.trim();
    const items = trimmedVal.split(",");

    for (const item of items) {
      const cleanItem = item.trim();
      if (!cleanItem) continue;

      if (cleanItem.includes(":")) {
        const [catPart, idPart] = cleanItem.split(":");
        const cat = catPart.replace(/['"\[\]{}]/g, "").trim().toLowerCase();
        const id = idPart.replace(/['"\[\]{}]/g, "").trim();
        if (id) {
          sources.push({ category: cat || envCategory, id });
        }
      } else {
        const id = cleanItem.replace(/['"\[\]{}]/g, "").trim();
        if (id) {
          sources.push({ category: envCategory, id });
        }
      }
    }
  }

  const uniqueSources = [];
  const seenIds = new Set();
  for (const s of sources) {
    if (!seenIds.has(s.id)) {
      seenIds.add(s.id);
      uniqueSources.push(s);
    }
  }

  return uniqueSources;
}

function syncJournalCategoryConfig(sources) {
  const labelMap = {
    education: "교육일지",
    blog: "일지",
  };
  const categories = [...new Set(sources.map((source) => source.category))]
    .filter(Boolean)
    .map((key) => ({
      key,
      label: labelMap[key] || `${key} 일지`,
    }));

  if (categories.length === 0) return;

  const outputPath = path.join(process.cwd(), "src", "data", "journal-categories.json");
  fs.writeFileSync(outputPath, `${JSON.stringify(categories, null, 2)}\n`, "utf8");
}

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const FORCE_FULL_SYNC = process.env.NOTION_FORCE_FULL_SYNC === "true";

async function main() {
  console.log("=== Notion Content Synchronization ===");

  if (!NOTION_TOKEN) {
    console.warn("NOTION_TOKEN is not defined. Checking local content cache...");
    const cacheIndex = path.join(process.cwd(), "src", "content", "generated", "notion", "index.json");
    if (fs.existsSync(cacheIndex)) {
      console.log("Found cached content. Proceeding with stale cache.");
      return;
    }
    console.error("Error: NOTION_TOKEN is missing and no cached content exists.");
    process.exit(1);
  }

  const sources = parseNotionSources();
  syncJournalCategoryConfig(sources);
  console.log(`Parsed ${sources.length} Notion source(s):`, sources);

  const client = new NotionClient(NOTION_TOKEN);
  const sourceIdentifier = sources.map((s) => `${s.category}_${s.id}`).join("__") || "default";

  const fetchEntriesFn = async () => {
    for (const source of sources) {
      const { category, id } = source;
      console.log(`Processing Notion source (Category: ${category})...`);

      if (category === "education") {
        await syncEducation(client, id);
      } else if (category === "blog") {
        await syncBlog(client, id);
      } else {
        console.warn(`Unknown category: ${category}. Skipping.`);
      }
    }
  };



  try {
    await fetchEntriesFn();
    console.log("=== Notion Sync Finished Successfully ===");
  } catch (err) {
    console.error("Notion sync failed:", err);
    process.exit(1);
  }
}

main();
