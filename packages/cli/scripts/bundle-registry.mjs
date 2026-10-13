/**
 * Copies @loony/ui/registry.json into dist/ so `loony list` works before the
 * project has @loony/ui installed. Commands that copy sources always prefer
 * the registry of the installed @loony/ui (see src/utils/registry.ts).
 */
import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const source = require.resolve("@loony/ui/registry.json");

mkdirSync(new URL("../dist/", import.meta.url), { recursive: true });
copyFileSync(source, new URL("../dist/registry.json", import.meta.url));
console.log(`Bundled registry from ${source}`);
