import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { usageImportPath } from "../commands/add.js";
import { installedComponents } from "../commands/diff.js";
import {
  declaredDependencies,
  detectPackageManager,
  installArgs,
  resolvePackageRoot,
} from "./packages.js";

let root: string;

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "loony-cli-"));
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

function fakePackage(dir: string, name: string) {
  const pkgDir = join(dir, "node_modules", name);
  mkdirSync(pkgDir, { recursive: true });
  writeFileSync(join(pkgDir, "package.json"), JSON.stringify({ name }));
  return pkgDir;
}

describe("resolvePackageRoot", () => {
  it("finds a package in the project's node_modules", () => {
    const pkg = fakePackage(root, "@loony/ui");
    expect(resolvePackageRoot("@loony/ui", root)).toBe(pkg);
  });

  it("walks up to a hoisted node_modules (monorepo apps)", () => {
    const pkg = fakePackage(root, "@loony/ui");
    const app = join(root, "apps", "web");
    mkdirSync(app, { recursive: true });
    expect(resolvePackageRoot("@loony/ui", app)).toBe(pkg);
  });

  it("returns undefined when the package is not installed", () => {
    expect(resolvePackageRoot("@loony/does-not-exist", root)).toBeUndefined();
  });
});

describe("declaredDependencies", () => {
  it("collects names from every dependency section", () => {
    writeFileSync(
      join(root, "package.json"),
      JSON.stringify({
        dependencies: { react: "19" },
        devDependencies: { "@loony/ui": "0.1.0" },
        peerDependencies: { "react-dom": "19" },
      }),
    );
    expect([...declaredDependencies(root)].sort()).toEqual(["@loony/ui", "react", "react-dom"]);
  });

  it("is empty without a package.json", () => {
    expect(declaredDependencies(root).size).toBe(0);
  });
});

describe("package manager", () => {
  it.each([
    ["pnpm-lock.yaml", "pnpm"],
    ["yarn.lock", "yarn"],
    ["bun.lock", "bun"],
  ] as const)("detects %s as %s", (lockfile, pm) => {
    writeFileSync(join(root, lockfile), "");
    expect(detectPackageManager(root)).toBe(pm);
  });

  it("falls back to npm", () => {
    expect(detectPackageManager(root)).toBe("npm");
  });

  it("uses `install` for npm and `add` elsewhere", () => {
    expect(installArgs("npm", ["a"])).toEqual(["install", "a"]);
    expect(installArgs("pnpm", ["a", "b"])).toEqual(["add", "a", "b"]);
  });
});

describe("usageImportPath", () => {
  it("points at the component folder when its index.ts is installed", () => {
    expect(
      usageImportPath("@", "src/components/ui", ["button/button.tsx", "button/index.ts"]),
    ).toBe("@/components/ui/button");
  });

  it("points at the file when there is no folder index", () => {
    expect(usageImportPath("@", "src/components/ui", ["layout/flex.tsx"])).toBe(
      "@/components/ui/layout/flex",
    );
  });

  it("keeps component directories that are outside src/", () => {
    expect(usageImportPath("~", "components/ui", ["tag/tag.tsx", "tag/index.ts"])).toBe(
      "~/components/ui/tag",
    );
  });
});

describe("installedComponents", () => {
  it("lists only components with files present", () => {
    mkdirSync(join(root, "button"), { recursive: true });
    writeFileSync(join(root, "button", "button.tsx"), "");
    expect(installedComponents(root).map((item) => item.name)).toEqual(["button"]);
  });
});
