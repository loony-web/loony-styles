import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

/**
 * Find an installed package's root directory, walking up from `cwd` through
 * every `node_modules` the way Node's resolver does. Works with hoisted
 * installs, pnpm symlinks and monorepo workspaces, and does not depend on the
 * package exposing `./package.json` in its `exports` map.
 */
export function resolvePackageRoot(name: string, cwd: string): string | undefined {
  let dir = cwd;
  for (;;) {
    const candidate = join(dir, "node_modules", name);
    if (existsSync(join(candidate, "package.json"))) return candidate;

    const parent = dirname(dir);
    if (parent === dir) return undefined;
    dir = parent;
  }
}

/** Every dependency name declared in the project's package.json (any section). */
export function declaredDependencies(cwd: string): Set<string> {
  const manifestPath = join(cwd, "package.json");
  if (!existsSync(manifestPath)) return new Set();

  const manifest = JSON.parse(readFileSync(manifestPath, "utf-8")) as Record<
    string,
    Record<string, string> | undefined
  >;
  const sections = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];
  return new Set(sections.flatMap((section) => Object.keys(manifest[section] ?? {})));
}

export type PackageManager = "pnpm" | "yarn" | "bun" | "npm";

export function detectPackageManager(cwd: string): PackageManager {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  if (existsSync(join(cwd, "bun.lockb")) || existsSync(join(cwd, "bun.lock"))) return "bun";
  return "npm";
}

/** The argv for adding packages with the given package manager. */
export function installArgs(pm: PackageManager, packages: string[]): string[] {
  return [pm === "npm" ? "install" : "add", ...packages];
}
