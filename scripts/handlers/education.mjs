import fs from "fs";
import path from "path";
import { extractPlainText } from "../lib/notion-normalize.mjs";
import { convertPageToMarkdown } from "../lib/notion-to-md.mjs";

export async function syncEducation(client, sourceId) {
  console.log(`[syncEducation] Fetching database for ${sourceId}...`);
  const allEntries = [];
  
  const outPath = path.join(process.cwd(), "src", "data", "notion", "education.json");
  let existingEntries = [];
  if (fs.existsSync(outPath)) {
    try {
      existingEntries = JSON.parse(fs.readFileSync(outPath, "utf-8"));
    } catch (e) {
      console.error("[syncEducation] Error reading existing JSON:", e);
    }
  }

  const entryMap = new Map();
  existingEntries.forEach(entry => entryMap.set(entry.id, entry));

  let processedAsDb = false;
  try {
    const rawPages = await client.queryDatabase(sourceId, {
      sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
    });

    console.log(`[syncEducation] DB ${sourceId} has ${rawPages.length} items. Initiating markdown conversion...`);
    processedAsDb = true;

    const outDir = path.join(process.cwd(), "src", "content", "devlog", "education");
    fs.mkdirSync(outDir, { recursive: true });

    let updatedCount = 0;

    for (const page of rawPages) {
      const slug = page.id.replace(/-/g, "");
      const existingEntry = entryMap.get(page.id);

      if (existingEntry && existingEntry.lastEditedTime === page.last_edited_time) {
        allEntries.push(existingEntry);
        continue;
      }

      updatedCount++;

      const props = page.properties || {};
      let title = "";
      for (const val of Object.values(props)) {
        if (val && val.type === "title") {
          title = extractPlainText(val.title);
          break;
        }
      }

      const newEntry = {
        id: page.id,
        title: title || "Untitled Page",
        slug: slug,
        category: "education",
        lastEditedTime: page.last_edited_time,
        properties: props,
        url: page.url,
      };

      console.log(`  -> Downloading blocks for education: ${title} (${slug})`);
      const markdownContent = await convertPageToMarkdown(client, page.id);
      
      const dateProp = props["날짜"] || props["Date"] || props["date"];
      let date = page.last_edited_time.split("T")[0];
      if (dateProp && dateProp.date && dateProp.date.start) {
        date = dateProp.date.start;
      }
      
      const tagsProp = props["태그"] || props["Tags"] || props["키워드"];
      let tags = [];
      if (tagsProp && tagsProp.multi_select) {
        tags = tagsProp.multi_select.map(t => t.name);
      }
      
      // Construct frontmatter
      let mdxContent = "---\n";
      mdxContent += `title: "${title.replace(/"/g, '\\"')}"\n`;
      mdxContent += `date: "${date}"\n`;
      if (tags.length > 0) {
        mdxContent += `tags: [${tags.map(t => `"${t}"`).join(", ")}]\n`;
      }
      mdxContent += "---\n\n";
      mdxContent += markdownContent;

      const filePath = path.join(outDir, `${slug}.mdx`);
      fs.writeFileSync(filePath, mdxContent, "utf-8");

      allEntries.push(newEntry);
    }
    console.log(`[syncEducation] Successfully generated ${updatedCount} updated MDX files (total ${rawPages.length}).`);
  } catch (err) {
    console.error(`[syncEducation] Error querying DB ${sourceId}:`, err.message);
  }

  allEntries.sort((a, b) => new Date(b.lastEditedTime || b.date) - new Date(a.lastEditedTime || a.date));

  if (allEntries.length > 0) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(allEntries, null, 2), "utf-8");
    console.log(`[syncEducation] Saved ${allEntries.length} items to ${outPath}`);
  }
}
