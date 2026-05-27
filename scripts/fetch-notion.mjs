/**
 * Notion DB에서 교육일지 데이터를 가져와 src/data/education.json으로 저장하는 스크립트
 * 사용법: node scripts/fetch-notion.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env and .env.local manually if they exist
function loadEnv() {
  const envPaths = [".env.local", ".env"];
  for (const envFile of envPaths) {
    const envPath = path.join(process.cwd(), envFile);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...valueParts] = trimmed.split("=");
          const value = valueParts.join("=").trim();
          // Remove optional quotes
          const cleanValue = value.replace(/^['"]|['"]$/g, "");
          process.env[key.trim()] = cleanValue;
        }
      });
    }
  }
}

// Load env variables
loadEnv();

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PAGE_ID = process.env.NOTION_PAGE_ID;

if (!NOTION_TOKEN || !PAGE_ID) {
  console.error("Error: NOTION_TOKEN or NOTION_PAGE_ID is not defined in environment variables or .env files.");
  process.exit(1);
}

const NOTION_HEADERS = {
  Authorization: `Bearer ${NOTION_TOKEN}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
};

function extractPlainText(richTextArray) {
  if (!richTextArray || richTextArray.length === 0) return "";
  return richTextArray.map((t) => t.plain_text).join("");
}

async function fetchNotionDatabase() {
  console.log("Step 1: Finding database inside Notion page...");

  const childrenRes = await fetch(
    `https://api.notion.com/v1/blocks/${PAGE_ID}/children?page_size=100`,
    {
      method: "GET",
      headers: NOTION_HEADERS,
    }
  );

  if (!childrenRes.ok) {
    const errBody = await childrenRes.text();
    console.error("Page children error:", childrenRes.status, errBody);
    process.exit(1);
  }

  const childrenData = await childrenRes.json();
  const dbBlock = childrenData.results.find(
    (b) => b.type === "child_database"
  );

  if (!dbBlock) {
    console.error("No inline database found in this page.");
    process.exit(1);
  }

  const dbId = dbBlock.id;
  console.log(`Found database: ${dbId}`);

  // 데이터베이스 쿼리
  console.log("Step 2: Querying database...");
  const response = await fetch(
    `https://api.notion.com/v1/databases/${dbId}/query`,
    {
      method: "POST",
      headers: NOTION_HEADERS,
      body: JSON.stringify({
        sorts: [
          {
            property: "교육일",
            direction: "descending",
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Notion DB query error:", response.status, errorBody);
    process.exit(1);
  }

  const data = await response.json();
  console.log(`Total results: ${data.results.length}`);

  // 파싱
  const parsed = data.results.map((page) => {
    const props = page.properties;
    return {
      id: page.id,
      round: extractPlainText(props["회차"]?.rich_text).trim(),
      date: props["교육일"]?.date?.start || "",
      keywords: (props["키워드"]?.multi_select || []).map((ms) => ms.name),
      impression: extractPlainText(props["느낀점"]?.rich_text).trim(),
      blogTitle: extractPlainText(props["블로깅 페이지"]?.title).trim(),
      notionUrl: page.url || "",
    };
  });

  const outputPath = path.join(__dirname, "..", "src", "data", "education.json");
  fs.writeFileSync(outputPath, JSON.stringify(parsed, null, 2), "utf-8");
  console.log(`Parsed data saved to: ${outputPath}`);

  // 미리보기
  parsed.forEach((item) => {
    console.log(`  ${item.round} | ${item.date} | ${item.blogTitle}`);
    console.log(`    키워드: ${item.keywords.join(", ")}`);
    console.log(`    느낀점: ${item.impression.substring(0, 60)}...`);
    console.log();
  });
}

fetchNotionDatabase().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
