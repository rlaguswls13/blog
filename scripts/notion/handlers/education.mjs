import fs from "fs";
import path from "path";
import { extractPlainText } from "../lib/notion-normalize.mjs";
import { convertPageToMarkdown } from "../lib/notion-to-md.mjs";
import {
  normalizeSourceId,
  resolveDevlogSlug,
} from "../../slug/devlog-slugs.mjs";

export async function syncEducation(client, sourceId) {
  console.log(`[syncEducation] Fetching database for ${sourceId}...`);
  const allEntries = [];
  
  const outPath = path.join(
    process.cwd(),
    "src",
    "data",
    "pages",
    "main",
    "notion",
    "education.json",
  );
  let existingEntries = [];
  if (fs.existsSync(outPath)) {
    try {
      existingEntries = JSON.parse(fs.readFileSync(outPath, "utf-8"));
    } catch (e) {
      console.error("[syncEducation] Error reading existing JSON:", e);
    }
  }

  const entryMap = new Map();
  existingEntries.forEach((entry) => entryMap.set(normalizeSourceId(entry.id), entry));

  try {
    const rawPages = await client.queryDatabase(sourceId, {
      sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
    });

    console.log(`[syncEducation] DB ${sourceId} has ${rawPages.length} items. Checking incremental state...`);
    const outDir = path.join(process.cwd(), "src", "content", "devlog", "education");
    fs.mkdirSync(outDir, { recursive: true });

    const counts = { init: 0, update: 0, skip: 0 };
    const slugOwners = new Map();

    for (const page of rawPages) {
      const pageKey = normalizeSourceId(page.id);
      const existingEntry = entryMap.get(pageKey);
      const props = page.properties || {};
      let title = "";
      for (const val of Object.values(props)) {
        if (val && val.type === "title") {
          title = extractPlainText(val.title);
          break;
        }
      }

      let slug;
      try {
        slug = resolveDevlogSlug({
          properties: props,
          fallbackSlug: existingEntry?.slug,
          category: "education",
          sourceId: page.id,
          title,
        });
      } catch (error) {
        error.message += ` Notion title: "${title || "Untitled Page"}".`;
        throw error;
      }

      const slugOwner = slugOwners.get(slug);
      if (slugOwner && slugOwner !== pageKey) {
        throw new Error(`Duplicate education slug "${slug}" for Notion pages ${slugOwner} and ${pageKey}.`);
      }
      slugOwners.set(slug, pageKey);

      const targetPath = path.join(outDir, `${pageKey}.mdx`);
      const fileExists = fs.existsSync(targetPath);
      const isUnchanged = Boolean(
        existingEntry
        && fileExists
        && existingEntry.lastEditedTime === page.last_edited_time
        && existingEntry.slug === slug,
      );

      if (isUnchanged) {
        counts.skip += 1;
        allEntries.push(existingEntry);
        continue;
      }

      const operation = existingEntry && fileExists ? "update" : "init";
      counts[operation] += 1;

      const newEntry = {
        id: page.id,
        title: title || "Untitled Page",
        slug: slug,
        category: "education",
        lastEditedTime: page.last_edited_time,
        properties: props,
        url: page.url,
      };

      console.log(`  -> ${operation.toUpperCase()} education: ${title} (${slug})`);
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
      mdxContent += `sourceId: "${page.id}"\n`;
      mdxContent += `title: "${title.replace(/"/g, '\\"')}"\n`;
      mdxContent += `slug: "${slug}"\n`;
      mdxContent += `date: "${date}"\n`;
      if (tags.length > 0) {
        mdxContent += `tags: [${tags.map(t => `"${t}"`).join(", ")}]\n`;
      }
      mdxContent += "---\n\n";
      mdxContent += markdownContent;

      fs.writeFileSync(targetPath, mdxContent, "utf-8");

      allEntries.push(newEntry);
    }
    console.log(
      `[syncEducation] Incremental sync complete: `
      + `${counts.init} init, ${counts.update} update, ${counts.skip} skip.`,
    );
  } catch (err) {
    if (err.message?.includes("fetch failed")) {
      console.warn(`[syncEducation] Notion is unavailable. Keeping cached education content for ${sourceId}.`);
      return;
    }
    throw new Error(`[syncEducation] Failed to sync DB ${sourceId}: ${err.message}`, { cause: err });
  }

  allEntries.sort((a, b) => new Date(b.lastEditedTime || b.date) - new Date(a.lastEditedTime || a.date));

  if (allEntries.length > 0) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(allEntries, null, 2), "utf-8");
    console.log(`[syncEducation] Saved ${allEntries.length} items to ${outPath}`);
  }
}
