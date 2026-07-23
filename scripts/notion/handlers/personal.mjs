import fs from "fs";
import path from "path";
import { extractPlainText } from "../lib/notion-normalize.mjs";
import { convertPageToMarkdown } from "../lib/notion-to-md.mjs";
import {
  normalizeSourceId,
  resolveDevlogSlug,
} from "../../slug/devlog-slugs.mjs";

export async function syncPersonal(client, sourceId) {
  console.log(`[syncPersonal] Fetching database for ${sourceId}...`);
  
  const outPath = path.join(
    process.cwd(),
    "src",
    "data",
    "pages",
    "main",
    "notion",
    "personal.json",
  );
  let existingPersonalEntries = [];
  if (fs.existsSync(outPath)) {
    existingPersonalEntries = JSON.parse(fs.readFileSync(outPath, "utf-8"));
  }

  const sourceEntryMap = new Map();
  existingPersonalEntries.forEach((entry) => {
    const entryId = normalizeSourceId(entry.sourceId || entry.id);
    if (entryId) sourceEntryMap.set(entryId, entry);
  });

  const allEntries = [];

  try {
    const rawPages = await client.queryDatabase(sourceId, {
      sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
    });

    console.log(`[syncPersonal] DB ${sourceId} has ${rawPages.length} items. Checking incremental state...`);

    const outDir = path.join(process.cwd(), "src", "content", "devlog", "blog");
    fs.mkdirSync(outDir, { recursive: true });

    const counts = { init: 0, update: 0, skip: 0 };
    const slugOwners = new Map();

    for (const page of rawPages) {
      const props = page.properties || {};
      const pageKey = normalizeSourceId(page.id);
      const sourceEntry = sourceEntryMap.get(pageKey);
      let title = "Untitled Page";
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
          fallbackSlug: sourceEntry?.slug,
          category: "blog",
          sourceId: page.id,
          title,
        });
      } catch (error) {
        error.message += ` Notion title: "${title}".`;
        throw error;
      }

      const existingEntry = sourceEntry;
      const slugOwner = slugOwners.get(slug);
      if (slugOwner && slugOwner !== pageKey) {
        throw new Error(`Duplicate blog slug "${slug}" for Notion pages ${slugOwner} and ${pageKey}.`);
      }
      slugOwners.set(slug, pageKey);

      const targetPath = path.join(outDir, `${pageKey}.mdx`);
      const fileExists = fs.existsSync(targetPath);
      const isUnchanged = Boolean(
        existingEntry
        && fileExists
        && existingEntry.lastEditedTime === page.last_edited_time
        && existingEntry.id === pageKey
        && existingEntry.slug === slug,
      );

      if (isUnchanged) {
        counts.skip += 1;
        allEntries.push({ ...existingEntry, id: pageKey, sourceId: page.id, slug });
        continue;
      }

      const operation = existingEntry && fileExists ? "update" : "init";
      counts[operation] += 1;

      // Extract metadata for frontmatter
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
      
      const description = props["느낀점"]?.rich_text?.[0]?.plain_text || 
                          props["요약"]?.rich_text?.[0]?.plain_text ||
                          "작성된 내용이 없습니다.";

      console.log(`  -> ${operation.toUpperCase()} personal: ${title} (${slug})`);
      const markdownContent = await convertPageToMarkdown(client, page.id);

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

      allEntries.push({
        id: pageKey,
        sourceId: page.id,
        slug,
        title: title,
        date: date,
        tags: tags,
        description: description,
        package: "blog",
        lastEditedTime: page.last_edited_time
      });
    }
    
    allEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
    const nextContent = `${JSON.stringify(allEntries, null, 2)}\n`;
    const previousContent = fs.existsSync(outPath)
      ? fs.readFileSync(outPath, "utf-8")
      : "";
    if (previousContent !== nextContent) {
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, nextContent, "utf-8");
    }
    console.log(
      `[syncPersonal] Incremental sync complete: `
      + `${counts.init} init, ${counts.update} update, ${counts.skip} skip.`,
    );

  } catch (err) {
    if (err.message?.includes("fetch failed")) {
      console.warn(`[syncPersonal] Notion is unavailable. Keeping cached personal content for ${sourceId}.`);
      return;
    }
    throw new Error(`[syncPersonal] Failed to sync DB ${sourceId}: ${err.message}`, { cause: err });
  }
}
