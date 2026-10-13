import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { type MockInstance, afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ────────────────────────────────────────────────────────────────────
// Prompts answer from a queue; execa never runs a real process (no installs,
// no shell `diff`), so these tests are hermetic.

const answers: unknown[] = [];
const silent = () => undefined;

vi.mock("@clack/prompts", () => ({
  intro: silent,
  outro: silent,
  note: silent,
  cancel: silent,
  log: { info: silent, warn: silent, error: silent, success: silent, step: silent },
  spinner: () => ({ start: silent, stop: silent, message: silent }),
  isCancel: () => false,
  confirm: () => Promise.resolve(answers.shift() ?? true),
  text: () => Promise.resolve(answers.shift()),
  select: () => Promise.resolve(answers.shift()),
  multiselect: () => Promise.resolve(answers.shift()),
  group: () => Promise.resolve(answers.shift()),
}));

const execa = vi.fn((..._args: unknown[]) => Promise.resolve({ stdout: "" }));
vi.mock("execa", () => ({ execa: (...args: unknown[]) => execa(...args) }));

const { add } = await import("./add.js");
const { diff } = await import("./diff.js");
const { init } = await import("./init.js");
const { list } = await import("./list.js");
const { scaffold } = await import("./scaffold.js");
const { theme } = await import("./theme.js");

// ── Fixtures ─────────────────────────────────────────────────────────────────

const UI_ROOT = join(dirname(fileURLToPath(import.meta.url)), "../../../ui");

let project: string;
let logSpy: MockInstance<typeof console.log>;

class ExitError extends Error {
  constructor(readonly code: number | undefined) {
    super(`process.exit(${code})`);
  }
}

/** A consumer project with @loony/ui installed (symlinked, read-only use). */
function setupProject({ withUi = true, config = true } = {}) {
  writeFileSync(
    join(project, "package.json"),
    JSON.stringify({ name: "app", dependencies: { react: "19", "react-dom": "19" } }),
  );
  if (config) {
    writeFileSync(
      join(project, "loony.config.json"),
      JSON.stringify({ componentsDir: "src/components/ui", importAlias: "@" }),
    );
  }
  if (withUi) {
    mkdirSync(join(project, "node_modules", "@loony"), { recursive: true });
    symlinkSync(UI_ROOT, join(project, "node_modules", "@loony", "ui"), "dir");
  }
}

const componentsDir = () => join(project, "src", "components", "ui");

beforeEach(() => {
  project = mkdtempSync(join(tmpdir(), "loony-cmd-"));
  answers.length = 0;
  execa.mockClear();
  vi.spyOn(process, "exit").mockImplementation((code) => {
    throw new ExitError(typeof code === "number" ? code : undefined);
  });
  logSpy = vi.spyOn(console, "log").mockImplementation(silent);
  vi.spyOn(console, "warn").mockImplementation(silent);
  vi.spyOn(console, "error").mockImplementation(silent);
});

afterEach(() => {
  vi.restoreAllMocks();
  rmSync(project, { recursive: true, force: true });
});

// ── init ─────────────────────────────────────────────────────────────────────

describe("loony init", () => {
  it("writes a default loony.config.json with --yes", async () => {
    setupProject({ withUi: false, config: false });
    await init({ cwd: project, yes: true });

    const config = JSON.parse(readFileSync(join(project, "loony.config.json"), "utf-8")) as unknown;
    expect(config).toMatchObject({ componentsDir: "src/components/ui", tailwindVersion: "4" });
  });

  it("does not overwrite an existing config", async () => {
    setupProject({ withUi: false });
    const before = readFileSync(join(project, "loony.config.json"), "utf-8");
    await init({ cwd: project, yes: true });
    expect(readFileSync(join(project, "loony.config.json"), "utf-8")).toBe(before);
  });

  it("refuses to run outside a project", async () => {
    await expect(init({ cwd: project, yes: true })).rejects.toEqual(new ExitError(1));
  });
});

// ── list ─────────────────────────────────────────────────────────────────────

describe("loony list", () => {
  it("prints the installed @loony/ui registry as JSON", () => {
    setupProject();
    list({ json: true, cwd: project });

    const printed = JSON.parse(String(logSpy.mock.calls[0]?.[0])) as { name: string }[];
    const shipped = JSON.parse(readFileSync(join(UI_ROOT, "registry.json"), "utf-8")) as {
      components: { name: string }[];
    };
    expect(printed.map((c) => c.name)).toEqual(shipped.components.map((c) => c.name));
  });
});

// ── add ──────────────────────────────────────────────────────────────────────

describe("loony add", () => {
  it("copies a component with its component dependencies", async () => {
    setupProject();
    await add(["button"], { cwd: project, yes: true });

    expect(existsSync(join(componentsDir(), "button", "button.tsx"))).toBe(true);
    expect(existsSync(join(componentsDir(), "button", "index.ts"))).toBe(true);
    // Button depends on Spinner
    expect(existsSync(join(componentsDir(), "spinner", "spinner.tsx"))).toBe(true);
    expect(readFileSync(join(componentsDir(), "button", "button.tsx"), "utf-8")).toBe(
      readFileSync(join(UI_ROOT, "src", "button", "button.tsx"), "utf-8"),
    );
  });

  it("installs only undeclared npm dependencies, including @loony/*", async () => {
    setupProject();
    await add(["button"], { cwd: project, yes: true });

    expect(execa).toHaveBeenCalledTimes(1);
    const [pm, args] = execa.mock.calls[0] as [string, string[]];
    expect(pm).toBe("npm");
    expect(args[0]).toBe("install");
    expect(args).toContain("class-variance-authority");
    expect(args).toContain("@loony/utils");
    expect(args).not.toContain("react");
  });

  it("skips existing files unless --overwrite", async () => {
    setupProject();
    await add(["badge"], { cwd: project, yes: true });
    const file = join(componentsDir(), "badge", "badge.tsx");
    writeFileSync(file, "// customised");

    await add(["badge"], { cwd: project, yes: true });
    expect(readFileSync(file, "utf-8")).toBe("// customised");

    await add(["badge"], { cwd: project, yes: true, overwrite: true });
    expect(readFileSync(file, "utf-8")).not.toBe("// customised");
  });

  it("rejects unknown components", async () => {
    setupProject();
    await expect(add(["nope"], { cwd: project, yes: true })).rejects.toEqual(new ExitError(1));
    expect(existsSync(componentsDir())).toBe(false);
  });

  it("explains when @loony/ui is not installed", async () => {
    setupProject({ withUi: false });
    await expect(add(["button"], { cwd: project, yes: true })).rejects.toEqual(new ExitError(1));
  });

  it("requires loony init first", async () => {
    setupProject({ config: false });
    await expect(add(["button"], { cwd: project, yes: true })).rejects.toThrow(/loony init/);
  });
});

// ── diff ─────────────────────────────────────────────────────────────────────

describe("loony diff", () => {
  it("diffs every installed file against @loony/ui when no name is given", async () => {
    setupProject();
    await add(["badge"], { cwd: project, yes: true });
    execa.mockClear();

    await diff(undefined, { cwd: project });

    const compared = execa.mock.calls.map((call) => (call[1] as string[]).at(-2));
    expect(compared).toEqual([
      join(componentsDir(), "badge", "badge.tsx"),
      join(componentsDir(), "badge", "index.ts"),
    ]);
    for (const call of execa.mock.calls) expect(call[0]).toBe("diff");
  });

  it("rejects unknown components", async () => {
    setupProject();
    await expect(diff("nope", { cwd: project })).rejects.toEqual(new ExitError(1));
  });
});

// ── theme ────────────────────────────────────────────────────────────────────

describe("loony theme", () => {
  it("writes a theme from a preset and the prompted answers", async () => {
    const out = join(project, "styles", "theme.css");
    answers.push("oklch(0.6 0.2 30)", "full"); // accent, radius
    await theme({ preset: "minimal", out });

    const css = readFileSync(out, "utf-8");
    expect(css).toContain("--loony-color-accent: oklch(0.6 0.2 30);");
    expect(css).toContain("--loony-radius-btn: var(--loony-radius-full);");
  });
});

// ── scaffold ─────────────────────────────────────────────────────────────────

describe("loony scaffold", () => {
  it("generates a component folder that follows the conventions", async () => {
    setupProject({ withUi: false });
    await scaffold("my-widget", { cwd: project, path: "src/components" });

    const dir = join(project, "src", "components", "my-widget");
    const files = readdirSync(dir).sort();
    expect(files).toContain("my-widget.tsx");
    expect(files).toContain("index.ts");

    for (const file of files) {
      const source = readFileSync(join(dir, file), "utf-8");
      // Tailwind v3 var shorthand compiles to invalid CSS under v4.
      expect(source, file).not.toMatch(/-\[--[\w-]+\]/);
      // ADR-003: no `as` prop polymorphism.
      expect(source, file).not.toMatch(/\bas\?:\s*ElementType/);
    }
    expect(readFileSync(join(dir, "index.ts"), "utf-8")).toContain("export { MyWidget }");
  });
});
