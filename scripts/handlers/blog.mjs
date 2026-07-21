import fs from "fs";
import path from "path";
import { extractPlainText } from "../lib/notion-normalize.mjs";
import { convertPageToMarkdown } from "../lib/notion-to-md.mjs";

export async function syncBlog(client, sourceId) {
  console.log(`[syncBlog] Fetching database for ${sourceId}...`);
  
  try {
    const rawPages = await client.queryDatabase(sourceId, {
      sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
    });

    console.log(`[syncBlog] DB ${sourceId} has ${rawPages.length} items. Initiating markdown conversion...`);

    const outDir = path.join(process.cwd(), "src", "content", "devlog", "blog");
    fs.mkdirSync(outDir, { recursive: true });

    const newBlogEntries = [];

    for (const page of rawPages) {
      const props = page.properties || {};
      
      let title = "Untitled Page";
      for (const val of Object.values(props)) {
        if (val && val.type === "title") {
          title = extractPlainText(val.title);
          break;
        }
      }

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

      const slug = page.id.replace(/-/g, "");
      
      const description = props["느낀점"]?.rich_text?.[0]?.plain_text || 
                          props["요약"]?.rich_text?.[0]?.plain_text ||
                          "작성된 내용이 없습니다.";

      console.log(`  -> Downloading blocks for blog: ${title} (${slug})`);
      const markdownContent = await convertPageToMarkdown(client, page.id);

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

      newBlogEntries.push({
        id: slug,
        title: title,
        date: date,
        tags: tags,
        description: description,
        package: "blog"
      });
    }
    
    // Sync metadata to devlog.json
    const devlogJsonPath = path.join(process.cwd(), "src", "data", "devlog.json");
    let devlogData = {};
    if (fs.existsSync(devlogJsonPath)) {
      devlogData = JSON.parse(fs.readFileSync(devlogJsonPath, "utf-8"));
    }
    devlogData.blog = newBlogEntries;
    fs.writeFileSync(devlogJsonPath, JSON.stringify(devlogData, null, 2), "utf-8");
    console.log(`[syncBlog] Successfully synced metadata to devlog.json.`);
    
    console.log(`[syncBlog] Successfully generated ${rawPages.length} MDX files.`);

  } catch (err) {
    console.error(`[syncBlog] Error querying DB ${sourceId}:`, err.message);
  }
}
