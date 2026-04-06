import fs from "fs";
import path from "path";

// Import the manifest data directly (same approach as generate-llms-txt.ts)
const manifestPath = path.join(process.cwd(), "lib", "deep-dive-docs.ts");
const manifestSource = fs.readFileSync(manifestPath, "utf-8");

// Extract the groups array — parse the deepDiveGroups export
const groupsMatch = manifestSource.match(
  /export const deepDiveGroups[^=]*=\s*(\[[\s\S]*?\n\];)/
);
if (!groupsMatch) {
  console.error("Could not parse deepDiveGroups from lib/deep-dive-docs.ts");
  process.exit(1);
}

const groups = new Function(`return ${groupsMatch[1]}`)() as Array<{
  artifact: string;
  docs: Array<{ id: string; title: string; filePath: string }>;
}>;

const contentDir = path.join(process.cwd(), "content");
const outputDir = path.join(process.cwd(), "public", "deep-dive");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let count = 0;
for (const group of groups) {
  for (const doc of group.docs) {
    const srcPath = path.join(contentDir, doc.filePath);
    if (fs.existsSync(srcPath)) {
      const content = fs.readFileSync(srcPath, "utf-8");
      fs.writeFileSync(path.join(outputDir, `${doc.id}.txt`), content);
      count++;
    } else {
      console.warn(`Warning: ${doc.filePath} not found, skipping ${doc.id}`);
    }
  }
}

console.log(`Generated ${count} deep-dive files in public/deep-dive/`);
