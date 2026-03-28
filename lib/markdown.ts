import fs from "fs";
import path from "path";

export function readMarkdownFile(filePath: string): string {
  const fullPath = path.join(/*turbopackIgnore: true*/ process.cwd(), "content", filePath);
  return fs.readFileSync(fullPath, "utf-8");
}

interface MarkdownToken {
  type:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "ul"
    | "hr"
    | "codeblock"
    | "blank";
  content: string;
  items?: string[];
  lang?: string;
}

export function parseMarkdown(raw: string): MarkdownToken[] {
  const lines = raw.split("\n");
  const tokens: MarkdownToken[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      tokens.push({ type: "codeblock", content: codeLines.join("\n"), lang });
      continue;
    }

    // Horizontal rule
    if (/^---+\s*$/.test(line)) {
      tokens.push({ type: "hr", content: "" });
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("#### ")) {
      tokens.push({ type: "h4", content: line.slice(5) });
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      tokens.push({ type: "h3", content: line.slice(4) });
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      tokens.push({ type: "h2", content: line.slice(3) });
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      tokens.push({ type: "h1", content: line.slice(2) });
      i++;
      continue;
    }

    // List items (collect consecutive)
    if (/^[-*]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      tokens.push({ type: "ul", content: "", items });
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph — collect consecutive non-blank, non-special lines
    const pLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("```") &&
      !/^---+\s*$/.test(lines[i]) &&
      !/^[-*]\s/.test(lines[i])
    ) {
      pLines.push(lines[i]);
      i++;
    }
    if (pLines.length > 0) {
      tokens.push({ type: "p", content: pLines.join(" ") });
    }
  }

  return tokens;
}

/** Apply inline formatting: **bold**, `code`, *italic* */
export function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Convert parsed tokens to an HTML string.
 *  These elements render inside a .prose container whose CSS handles
 *  all typography, colors, and spacing. Only add classes here for
 *  structure (list-style, overflow) — never colors or font sizes. */
export function tokensToHtml(tokens: MarkdownToken[]): string {
  return tokens
    .map((t) => {
      switch (t.type) {
        case "h1":
          return `<h1>${formatInline(t.content)}</h1>`;
        case "h2":
          return `<h2>${formatInline(t.content)}</h2>`;
        case "h3":
          return `<h3>${formatInline(t.content)}</h3>`;
        case "h4":
          return `<h4>${formatInline(t.content)}</h4>`;
        case "p":
          return `<p>${formatInline(t.content)}</p>`;
        case "ul":
          return `<ul>${(t.items || []).map((item) => `<li>${formatInline(item)}</li>`).join("")}</ul>`;
        case "hr":
          return `<hr />`;
        case "codeblock":
          return `<pre><code>${escapeHtml(t.content)}</code></pre>`;
        case "blank":
          return "";
        default:
          return "";
      }
    })
    .join("\n");
}

/** Read a markdown file and return an HTML string */
export function renderMarkdown(filePath: string): string {
  const raw = readMarkdownFile(filePath);
  const tokens = parseMarkdown(raw);
  return tokensToHtml(tokens);
}
