/**
 * prepare.mjs
 *
 * Runs after `pnpm install` to ensure the workspace is properly initialized.
 * Sets up git hooks via simple-git-hooks (lightweight alternative to husky).
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

const isCI = process.env.CI === "true";

if (!isCI && existsSync(".git")) {
  try {
    execSync("pnpm simple-git-hooks", { stdio: "inherit" });
  } catch {
    // simple-git-hooks not yet installed — safe to ignore on first install
  }
}
