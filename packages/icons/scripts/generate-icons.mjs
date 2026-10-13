/**
 * Icon Generation Script
 *
 * Converts raw SVG files from the /raw-svgs directory into
 * tree-shakeable React components using the createIcon factory.
 *
 * Usage: pnpm --filter @loony/icons generate
 *
 * Expects raw SVGs at: packages/icons/raw-svgs/*.svg
 * Outputs components to: packages/icons/src/icons/*.tsx
 * Updates barrel:         packages/icons/src/index.ts
 */

import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

const RAW_DIR = new URL("../raw-svgs", import.meta.url).pathname;
const OUT_DIR = new URL("../src/icons", import.meta.url).pathname;
const INDEX_FILE = new URL("../src/index.ts", import.meta.url).pathname;

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

function toPascalCase(str) {
  return str
    .split(/[-_\s]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function extractSvgPaths(svgContent) {
  // Strip outer <svg> wrapper, keep inner content
  const innerMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  if (!innerMatch) throw new Error("No SVG content found");

  return innerMatch[1].trim().replace(/\s+/g, " ").replace(/ \/>/g, " />");
}

async function generateIcon(svgFile) {
  const name = basename(svgFile, extname(svgFile));
  const componentName = `${toPascalCase(name)}Icon`;
  const kebabName = toKebabCase(name);

  const svgContent = await readFile(join(RAW_DIR, svgFile), "utf-8");
  const paths = extractSvgPaths(svgContent);

  const component = `import { createIcon } from "../create-icon.js";

export const ${componentName} = createIcon(
  "${componentName}",
  <>${paths}</>
);
`;

  const outFile = join(OUT_DIR, `${kebabName}.tsx`);
  await writeFile(outFile, component, "utf-8");
  console.log(`  ✓ Generated ${componentName}`);

  return { name: kebabName, componentName };
}

async function main() {
  if (!existsSync(RAW_DIR)) {
    console.warn(`No raw-svgs directory found at ${RAW_DIR}. Skipping icon generation.`);
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });

  const files = (await readdir(RAW_DIR)).filter((f) => f.endsWith(".svg"));

  if (files.length === 0) {
    console.warn("No SVG files found in raw-svgs/");
    return;
  }

  console.log(`Generating ${files.length} icons...`);
  const generated = await Promise.all(files.map(generateIcon));

  // Read existing index to preserve manually-added exports
  const existingIndex = existsSync(INDEX_FILE) ? await readFile(INDEX_FILE, "utf-8") : "";

  const newExports = generated
    .map(({ name, componentName }) => `export { ${componentName} } from "./icons/${name}.js";`)
    .filter((line) => !existingIndex.includes(line))
    .join("\n");

  if (newExports) {
    await writeFile(INDEX_FILE, `${existingIndex.trimEnd()}\n${newExports}\n`);
    console.log("Updated index.ts with new exports.");
  }

  console.log(`Done. Generated ${generated.length} icon(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
