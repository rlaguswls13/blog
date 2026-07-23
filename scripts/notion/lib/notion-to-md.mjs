import fs from "fs";
import path from "path";

/** Downloads a Notion-hosted asset into the generated content tree. */
async function downloadFile(url, outPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, Buffer.from(arrayBuffer));
  } catch (err) {
    console.error(`[downloadFile] Error downloading image:`, err.message);
  }
}

export function extractRichText(richTextArr) {
  if (!richTextArr || !Array.isArray(richTextArr)) return "";
  return richTextArr.map((text) => {
    let content = text.plain_text || "";
    
    // Separate leading/trailing spaces so Markdown parses correctly
    const leadingSpace = content.match(/^\s*/)[0];
    const trailingSpace = content.match(/\s*$/)[0];
    let innerContent = content.trim();

    if (innerContent && text.annotations) {
      if (text.annotations.bold) innerContent = `**${innerContent}**`;
      if (text.annotations.italic) innerContent = `*${innerContent}*`;
      if (text.annotations.strikethrough) innerContent = `~~${innerContent}~~`;
      if (text.annotations.code) innerContent = `\`${innerContent}\``;
    }
    
    if (text.href && innerContent) {
      innerContent = `[${innerContent}](${text.href})`;
    }
    
    return leadingSpace + innerContent + trailingSpace;
  }).join("");
}

export function extractPlainText(richTextArr) {
  if (!richTextArr || !Array.isArray(richTextArr)) return "";
  return richTextArr.map((text) => text.plain_text || "").join("");
}

export async function convertBlocksToMarkdown(client, blockId, indentLevel = 0, parentBlock = null) {
  const blocks = await client.getBlockChildren(blockId);
  let markdown = "";
  const indent = "  ".repeat(indentLevel);

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    let blockMd = "";
    let skipChildren = false;

    switch (block.type) {
      case "paragraph": {
        const text = extractRichText(block.paragraph.rich_text);
        if (text) blockMd = `${indent}${text}\n\n`;
        break;
      }
      case "heading_1":
      case "heading_2":
      case "heading_3": {
        const headingType = block.type;
        const headingData = block[headingType];
        const text = extractRichText(headingData.rich_text);
        const prefix = headingType === "heading_1" ? "#" : headingType === "heading_2" ? "##" : "###";
        const level = headingType === "heading_1" ? 1 : headingType === "heading_2" ? 2 : 3;
        
        if (headingData.is_toggleable && block.has_children) {
          const plainTitle = extractPlainText(headingData.rich_text).replace(/"/g, '&quot;');
          const childMd = await convertBlocksToMarkdown(client, block.id, 0);
          blockMd = `\n<NotionToggle title="${plainTitle}" level="${level}">\n\n${childMd}\n</NotionToggle>\n\n`;
          skipChildren = true;
        } else {
          blockMd = `${indent}${prefix} ${text}\n\n`;
        }
        break;
      }
      case "toggle": {
        const plainTitle = extractPlainText(block.toggle.rich_text).replace(/"/g, '&quot;');
        const childMd = await convertBlocksToMarkdown(client, block.id, 0);
        blockMd = `\n<NotionToggle title="${plainTitle}">\n\n${childMd}\n</NotionToggle>\n\n`;
        skipChildren = true;
        break;
      }
      case "table": {
        const rows = await client.getBlockChildren(block.id);
        let tableMd = "\n<NotionTable>\n  <tbody>\n";
        for (let r = 0; r < rows.length; r++) {
          const row = rows[r];
          if (row.type === "table_row") {
            const cells = row.table_row.cells;
            const rowHtml = cells.map(cell => `<td>${extractRichText(cell).replace(/\n/g, "<br/>")}</td>`).join("");
            tableMd += `    <tr>${rowHtml}</tr>\n`;
          }
        }
        tableMd += "  </tbody>\n</NotionTable>\n";
        blockMd = `${tableMd}\n`;
        skipChildren = true;
        break;
      }
      case "bulleted_list_item": {
        let text = extractRichText(block.bulleted_list_item.rich_text);
        if (block.has_children) {
          const textPlain = extractPlainText(block.bulleted_list_item.rich_text).trim();
          const match = textPlain.match(/(SQL|JAVA|JS|PYTHON|TS|HTML|CSS|BASH|SH)$/i);
          if (match) {
            const escapedMatch = match[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`${escapedMatch}\\s*$`, 'i');
            text = text.replace(regex, '');
          }
        }
        blockMd = `${indent}- ${text}\n`;
        break;
      }
      case "numbered_list_item":
        blockMd = `${indent}1. ${extractRichText(block.numbered_list_item.rich_text)}\n`;
        break;
      case "to_do":
        const checked = block.to_do.checked ? "[x]" : "[ ]";
        blockMd = `${indent}- ${checked} ${extractRichText(block.to_do.rich_text)}\n`;
        break;
      case "code": {
        let codeLang = block.code.language || "";
        if (codeLang === "plain text") codeLang = "";
        
        let codeText = extractRichText(block.code.rich_text);

        // Auto-detect language from the end of the previous bullet point or parent bullet point (e.g. "...**SQL")
        let textSource = "";
        let isParent = false;
        
        if (i > 0 && blocks[i - 1].type === "bulleted_list_item") {
          textSource = extractPlainText(blocks[i - 1].bulleted_list_item.rich_text).trim();
        } else if (i === 0 && parentBlock && parentBlock.type === "bulleted_list_item") {
          textSource = extractPlainText(parentBlock.bulleted_list_item.rich_text).trim();
          isParent = true;
        }

        if (textSource) {
          const match = textSource.match(/(SQL|JAVA|JS|PYTHON|TS|HTML|CSS|BASH|SH)$/i);
          if (match) {
            if (!codeLang) {
              codeLang = match[1].toLowerCase();
            }
            if (!isParent) {
              // If it was the previous block, we can just strip it from the current markdown string
              const escapedMatch = match[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              const regex = new RegExp(`${escapedMatch}\\s*\\n$`, 'i');
              markdown = markdown.replace(regex, '\n');
            }
          }
        }
        
        if (!codeLang) codeLang = "text";
        
        // Indent the code text so MDX parses it properly if it's inside a list
        const indentedCodeText = codeText.split('\n').map(line => `${indent}${line}`).join('\n');
        
        blockMd = `\n${indent}\`\`\`${codeLang}\n${indentedCodeText}\n${indent}\`\`\`\n\n`;
        break;
      }
      case "quote":
        blockMd = `${indent}> ${extractRichText(block.quote.rich_text)}\n\n`;
        break;
      case "callout": {
        const emoji = block.callout.icon?.emoji || "💡";
        blockMd = `${indent}<NotionCallout icon="${emoji}">\n\n${extractRichText(block.callout.rich_text)}\n\n</NotionCallout>\n\n`;
        break;
      }
      case "divider":
        blockMd = `${indent}<NotionDivider />\n\n`;
        break;
      case "image":
      case "video":
      case "pdf":
      case "file": {
        const fileData = block[block.type];
        let url = fileData.file?.url || fileData.external?.url || "";
        const caption = extractRichText(fileData.caption) || block.type;
        
        if (block.type === "image" && url.startsWith("http")) {
          // Download image to public/images/notion
          try {
            const urlObj = new URL(url);
            let ext = path.extname(urlObj.pathname);
            if (!ext) ext = ".png";
            const filename = `${block.id}${ext}`;
            const localRelPath = `/images/notion/${filename}`;
            const localAbsPath = path.join(process.cwd(), "public", "images", "notion", filename);
            
            await downloadFile(url, localAbsPath);
            url = localRelPath;
          } catch (e) {
            console.error(`Failed to process image block ${block.id}:`, e.message);
          }
        }
        
        blockMd = `${indent}<NotionImage src="${url}" caption="${caption.replace(/"/g, '&quot;')}" />\n\n`;
        break;
      }
      case "bookmark":
      case "embed": {
        const linkData = block[block.type];
        blockMd = `${indent}[🔗 ${linkData.url}](${linkData.url})\n\n`;
        break;
      }
      default:
        break;
    }

    markdown += blockMd;

    if (
      (block.type === "bulleted_list_item" || block.type === "numbered_list_item" || block.type === "to_do") &&
      (i === blocks.length - 1 || !["bulleted_list_item", "numbered_list_item", "to_do"].includes(blocks[i + 1].type))
    ) {
      markdown += "\n";
    }

    if (block.has_children && !skipChildren) {
      if (["bulleted_list_item", "numbered_list_item", "to_do"].includes(block.type)) {
        markdown += await convertBlocksToMarkdown(client, block.id, indentLevel + 1, block);
      } else {
        const childMd = await convertBlocksToMarkdown(client, block.id, 0, block);
        markdown += `\n<NotionIndent>\n\n${childMd}\n</NotionIndent>\n\n`;
      }
    }
  }

  return markdown;
}

export async function convertPageToMarkdown(client, pageId) {
  return await convertBlocksToMarkdown(client, pageId);
}
