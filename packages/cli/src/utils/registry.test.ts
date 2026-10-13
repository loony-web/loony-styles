import { existsSync, readFileSync } from "node:fs";
import { dirname, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  Registry,
  loadRegistry,
  parseRegistry,
  readRegistryFile,
  registryItemSchema,
} from "./registry.js";

const UI_ROOT = join(dirname(fileURLToPath(import.meta.url)), "../../../ui");
const UI_SRC = join(UI_ROOT, "src");
const registry = readRegistryFile(join(UI_ROOT, "registry.json"));
const getComponent = (name: string) => registry.get(name);
const resolveComponentTree = (name: string) => registry.resolveTree(name);

/** Imports `loony add` cannot satisfy by copying files or installing npm packages. */
const PEER_PACKAGES = new Set(["react", "react-dom"]);

const IMPORT_RE = /(?:import|export)\s[^"']*?from\s+["']([^"']+)["']/g;

function importsOf(file: string): string[] {
  const source = readFileSync(join(UI_SRC, file), "utf-8");
  return [...source.matchAll(IMPORT_RE)].map((m) => m[1] ?? "");
}

/** Resolve a relative `.js` import to the `.ts`/`.tsx` source file, relative to UI_SRC. */
function resolveRelative(fromFile: string, specifier: string): string | undefined {
  const base = normalize(join(dirname(fromFile), specifier)).replace(/\.js$/, "");
  for (const ext of [".tsx", ".ts", "/index.ts"]) {
    if (existsSync(join(UI_SRC, base + ext))) return relative(".", base + ext);
  }
  return undefined;
}

/** "@scope/pkg/sub" → "@scope/pkg", "pkg/sub" → "pkg" */
function packageName(specifier: string): string {
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? `${parts[0]}/${parts[1]}` : (parts[0] ?? specifier);
}

describe("registry", () => {
  it("every item satisfies the schema", () => {
    for (const item of registry.items) {
      expect(() => registryItemSchema.parse(item), item.name).not.toThrow();
    }
  });

  it("has unique names", () => {
    const names = registry.items.map((item) => item.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("only depends on registered components", () => {
    for (const item of registry.items) {
      for (const dep of item.dependencies) {
        expect(getComponent(dep), `${item.name} → ${dep}`).toBeDefined();
      }
    }
  });

  it("lists files that exist in @loony/ui", () => {
    for (const item of registry.items) {
      for (const file of item.files) {
        expect(existsSync(join(UI_SRC, file)), `${item.name}: ${file}`).toBe(true);
      }
    }
  });

  describe.each(registry.items.map((item) => [item.name] as const))("%s", (name) => {
    const tree = resolveComponentTree(name);
    const treeFiles = new Set(tree.flatMap((item) => item.files.map((f) => normalize(f))));
    const treeNpmDeps = new Set(tree.flatMap((item) => item.npmDependencies));
    const ownFiles = getComponent(name)?.files ?? [];

    it("copies every file it imports relatively", () => {
      for (const file of ownFiles) {
        for (const specifier of importsOf(file).filter((s) => s.startsWith("."))) {
          const target = resolveRelative(file, specifier);
          expect(target, `${file} imports missing ${specifier}`).toBeDefined();
          expect(treeFiles.has(normalize(target ?? "")), `${file} → ${target}`).toBe(true);
        }
      }
    });

    it("declares every package it imports", () => {
      for (const file of ownFiles) {
        for (const specifier of importsOf(file).filter((s) => !s.startsWith("."))) {
          const pkg = packageName(specifier);
          if (PEER_PACKAGES.has(pkg)) continue;
          expect(treeNpmDeps.has(pkg), `${file} imports undeclared ${pkg}`).toBe(true);
        }
      }
    });
  });
});

describe("resolveComponentTree", () => {
  it("returns dependencies before dependents", () => {
    const tree = resolveComponentTree("button").map((item) => item.name);
    expect(tree.at(-1)).toBe("button");
    for (const dep of getComponent("button")?.dependencies ?? []) {
      expect(tree.indexOf(dep)).toBeLessThan(tree.indexOf("button"));
    }
  });

  it("returns an empty list for unknown components", () => {
    expect(resolveComponentTree("does-not-exist")).toEqual([]);
  });

  it("includes each component once", () => {
    for (const item of registry.items) {
      const names = resolveComponentTree(item.name).map((i) => i.name);
      expect(new Set(names).size, item.name).toBe(names.length);
    }
  });
});

describe("getComponentsByCategory", () => {
  it("partitions the registry", () => {
    const categories = registryItemSchema.shape.category.options;
    const total = categories.reduce((n, c) => n + registry.byCategory(c).length, 0);
    expect(total).toBe(registry.items.length);
  });
});

describe("parseRegistry", () => {
  it("accepts the shipped @loony/ui registry", () => {
    expect(registry).toBeInstanceOf(Registry);
    expect(registry.items.length).toBeGreaterThan(0);
  });

  it("rejects malformed data with the offending path", () => {
    expect(() =>
      parseRegistry({ version: 1, components: [{ name: "x", files: "nope" }] }, "test"),
    ).toThrow(/components\.0\.files/);
  });

  it("rejects unknown registry versions", () => {
    expect(() => parseRegistry({ version: 2, components: [] }, "test")).toThrow(/version/);
  });
});

describe("loadRegistry", () => {
  it("prefers the registry of the project's installed @loony/ui", () => {
    // packages/cli resolves @loony/ui through the workspace's node_modules
    const loaded = loadRegistry(join(UI_ROOT, "..", "..", "apps", "docs"));
    expect(loaded.source).toBe("project");
    expect(loaded.registry.items).toEqual(registry.items);
  });
});
