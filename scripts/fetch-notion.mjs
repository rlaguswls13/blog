import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { NotionClient } from "./lib/notion-client.mjs";
import { extractPlainText } from "./lib/notion-normalize.mjs";

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
  console.log(`Parsed ${sources.length} Notion source(s):`, sources);

  const client = new NotionClient(NOTION_TOKEN);
  const sourceIdentifier = sources.map((s) => `${s.category}_${s.id}`).join("__") || "default";

  const fetchEntriesFn = async () => {
    const allEntries = [];

    for (const source of sources) {
      const { category, id } = source;
      console.log(`Processing Notion ID ${id} (Category: ${category})...`);
      let processedAsDb = false;

      // 1. Try querying as Database ID directly
      try {
        const rawPages = await client.queryDatabase(id, {
          sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
        });

        console.log(`ID ${id} is a database with ${rawPages.length} pages.`);
        processedAsDb = true;

        for (const page of rawPages) {
          const props = page.properties || {};
          let title = "";
          for (const val of Object.values(props)) {
            if (val && val.type === "title") {
              title = extractPlainText(val.title);
              break;
            }
          }

          allEntries.push({
            id: page.id,
            title: title || "Untitled Page",
            slug: page.id.replace(/-/g, ""),
            category,
            last_edited_time: page.last_edited_time,
            archived: page.archived,
            properties: props,
          });
        }
      } catch (dbErr) {
        // Not a database or missing permissions
      }

      if (processedAsDb) continue;

      // 2. Try fetching as page block / inline database
      try {
        const children = await client.getBlockChildren(id);
        const dbBlock = children.find((b) => b.type === "child_database");

        if (dbBlock) {
          console.log(`Found inline database ${dbBlock.id} in page ${id}`);
          const rawPages = await client.queryDatabase(dbBlock.id, {
            sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
          });

          for (const page of rawPages) {
            const props = page.properties || {};
            let title = "";
            for (const val of Object.values(props)) {
              if (val && val.type === "title") {
                title = extractPlainText(val.title);
                break;
              }
            }

            allEntries.push({
              id: page.id,
              title: title || "Untitled Page",
              slug: page.id.replace(/-/g, ""),
              category,
              last_edited_time: page.last_edited_time,
              archived: page.archived,
              properties: props,
            });
          }
        } else {
          // Fetch as single page
          const pageObj = await client.getPage(id);
          const title = extractPlainText(pageObj.properties?.title?.title || []);
          allEntries.push({
            id: pageObj.id,
            title: title || "Root Notion Page",
            slug: pageObj.id.replace(/-/g, ""),
            category,
            last_edited_time: pageObj.last_edited_time,
            archived: pageObj.archived,
            properties: pageObj.properties || {},
          });
        }
      } catch (err) {
        console.warn(`Failed to process Notion ID ${id}: ${err.message}`);
      }
    }

    // Auto-discovery fallback if no entries found from explicit IDs
    if (allEntries.length === 0) {
      console.log("No entries found from specified IDs. Auto-discovering shared databases & pages via Search API...");
      try {
        const searchResults = await client.search();
        console.log(`Discovered ${searchResults.results?.length || 0} shared items in workspace.`);

        for (const item of searchResults.results || []) {
          if (item.object === "database") {
            console.log(`Auto-querying discovered database [${item.id}]...`);
            const rawPages = await client.queryDatabase(item.id, {
              sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
            });

            for (const page of rawPages) {
              const props = page.properties || {};
              let title = "";
              for (const val of Object.values(props)) {
                if (val && val.type === "title") {
                  title = extractPlainText(val.title);
                  break;
                }
              }

              const cat = props["회차"] || props["교육일"] || props["느낀점"] ? "education" : "blog";

              allEntries.push({
                id: page.id,
                title: title || "Untitled Page",
                slug: page.id.replace(/-/g, ""),
                category: cat,
                last_edited_time: page.last_edited_time,
                archived: page.archived,
                properties: props,
              });
            }
          }
        }
      } catch (searchErr) {
        console.warn("Search auto-discovery error:", searchErr.message);
      }
    }

    // Group items by category and save to src/data/<category>.json
    const categoryGroups = {};


    for (const item of allEntries) {
      const cat = item.category || "general";
      if (!categoryGroups[cat]) categoryGroups[cat] = [];
      categoryGroups[cat].push({
        id: item.id,
        title: item.title,
        slug: item.slug,
        category: cat,
        lastEditedTime: item.last_edited_time,
        properties: item.properties,
      });
    }

    // Write src/data/notion/<category>.json for all categories
    for (const [catName, catItems] of Object.entries(categoryGroups)) {
      if (catName === "index" || catName === "personal") continue; // Skip mapping index and personal

      const catNotionPath = path.join(process.cwd(), "src", "data", "notion", `${catName}.json`);
      fs.mkdirSync(path.dirname(catNotionPath), { recursive: true });
      fs.writeFileSync(catNotionPath, JSON.stringify(catItems, null, 2), "utf-8");
      console.log(`Updated category data saved to: ${catNotionPath}`);
    }

    return allEntries;
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
