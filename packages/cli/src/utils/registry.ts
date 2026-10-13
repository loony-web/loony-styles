import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { resolvePackageRoot } from "./packages.js";

/**
 * Component registry schema.
 *
 * The registry data lives in `@loony/ui/registry.json`, next to the sources it
 * describes, so the metadata always matches the component files being copied.
 * This module owns the schema and the lookup logic.
 */

export const registryItemSchema = z.object({
  name: z.string(),
  displayName: z.string(),
  description: z.string(),
  category: z.enum([
    "foundation",
    "form",
    "layout",
    "feedback",
    "overlay",
    "navigation",
    "display",
    "advanced",
  ]),
  /** Other Loony components this component depends on */
  dependencies: z.array(z.string()).default([]),
  /** npm packages required */
  npmDependencies: z.array(z.string()).default([]),
  /** Files that make up this component, relative to @loony/ui/src */
  files: z.array(z.string()),
  /** ARIA roles used */
  ariaRoles: z.array(z.string()).optional(),
  /** Status in the design system */
  status: z.enum(["stable", "beta", "experimental", "deprecated"]).default("stable"),
  /** Tailwind CSS version requirement */
  tailwindVersion: z.enum(["3", "4"]).default("4"),
});

export type RegistryItem = z.infer<typeof registryItemSchema>;

export const registryFileSchema = z.object({
  version: z.literal(1),
  components: z.array(registryItemSchema),
});

export class Registry {
  constructor(readonly items: readonly RegistryItem[]) {}

  get(name: string): RegistryItem | undefined {
    return this.items.find((item) => item.name === name);
  }

  byCategory(category: RegistryItem["category"]): RegistryItem[] {
    return this.items.filter((item) => item.category === category);
  }

  /** The component and its transitive dependencies, dependencies first. */
  resolveTree(name: string): RegistryItem[] {
    const visited = new Set<string>();
    const result: RegistryItem[] = [];

    const resolve = (componentName: string) => {
      if (visited.has(componentName)) return;
      visited.add(componentName);

      const item = this.get(componentName);
      if (!item) return;

      for (const dep of item.dependencies) {
        resolve(dep);
      }

      result.push(item);
    };

    resolve(name);
    return result;
  }
}

/** Validate registry JSON, with a readable error listing each bad field. */
export function parseRegistry(json: unknown, source: string): Registry {
  const result = registryFileSchema.safeParse(json);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  · ${i.path.join(".")}: ${i.message}`);
    throw new Error(`Invalid component registry (${source}):\n${issues.join("\n")}`);
  }
  return new Registry(result.data.components);
}

export function readRegistryFile(path: string): Registry {
  return parseRegistry(JSON.parse(readFileSync(path, "utf-8")) as unknown, path);
}

/** Copy of @loony/ui/registry.json bundled into dist/ at build time. */
const BUNDLED_REGISTRY = fileURLToPath(new URL("../registry.json", import.meta.url));

export interface LoadedRegistry {
  registry: Registry;
  /** "project": from the project's installed @loony/ui. "bundled": the CLI's own copy. */
  source: "project" | "bundled";
}

/**
 * Load the registry that matches the project's installed @loony/ui, falling
 * back to the copy bundled with the CLI (e.g. `loony list` before installing).
 */
export function loadRegistry(cwd: string): LoadedRegistry {
  const uiRoot = resolvePackageRoot("@loony/ui", cwd);
  const projectFile = uiRoot ? join(uiRoot, "registry.json") : undefined;

  if (projectFile && existsSync(projectFile)) {
    return { registry: readRegistryFile(projectFile), source: "project" };
  }
  if (existsSync(BUNDLED_REGISTRY)) {
    return { registry: readRegistryFile(BUNDLED_REGISTRY), source: "bundled" };
  }
  throw new Error(
    "No component registry found. Install @loony/ui, or rebuild the CLI so it bundles one.",
  );
}
