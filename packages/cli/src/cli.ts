#!/usr/bin/env node
/**
 * Loony CLI — Entry point
 *
 * Architecture:
 *   Each command is a separate module with its own validation (Zod),
 *   so that failed commands do not import code from unrelated commands.
 *   Commander handles argument parsing; @clack/prompts handles interactive UX.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { program } from "commander";

const __dirname = dirname(fileURLToPath(import.meta.url));

const pkg = JSON.parse(readFileSync(join(__dirname, "../package.json"), "utf-8")) as {
  version: string;
};

program
  .name("loony")
  .description("The Loony design system CLI — install components, generate themes, and more.")
  .version(pkg.version, "-v, --version");

// Commands are registered lazily to keep startup fast
program
  .command("init")
  .description("Initialize Loony in an existing project")
  .option("--ts", "Use TypeScript (default: true)", true)
  .option("--tailwind", "Configure Tailwind CSS (default: true)", true)
  .option("--cwd <path>", "The working directory", process.cwd())
  .option("--yes", "Skip confirmation prompts and use defaults", false)
  .action(async (opts: Record<string, unknown>) => {
    const { init } = await import("./commands/init.js");
    await init(opts as unknown as Parameters<typeof init>[0]);
  });

program
  .command("add [components...]")
  .description("Add one or more Loony components to your project")
  .option("--cwd <path>", "The working directory", process.cwd())
  .option("--path <path>", "Override the install path for components")
  .option("--yes", "Skip confirmation prompts", false)
  .option("--overwrite", "Overwrite existing files", false)
  .action(async (components: string[], opts: Record<string, unknown>) => {
    const { add } = await import("./commands/add.js");
    await add(components, opts as unknown as Parameters<typeof add>[1]);
  });

program
  .command("list")
  .description("List all available components")
  .option("--json", "Output in JSON format", false)
  .action(async (opts: Record<string, unknown>) => {
    const { list } = await import("./commands/list.js");
    list(opts);
  });

program
  .command("diff [component]")
  .description("Show differences between your local component and the latest upstream version")
  .option("--cwd <path>", "The working directory", process.cwd())
  .action(async (component: string | undefined, opts: Record<string, unknown>) => {
    const { diff } = await import("./commands/diff.js");
    await diff(component, opts as unknown as Parameters<typeof diff>[1]);
  });

program
  .command("theme")
  .description("Generate a custom theme from design tokens")
  .option("--preset <name>", "Start from a built-in preset (default, minimal, rounded)")
  .option("--out <path>", "Output CSS file path", "./src/styles/theme.css")
  .action(async (opts: Record<string, unknown>) => {
    const { theme } = await import("./commands/theme.js");
    await theme(opts);
  });

program
  .command("scaffold <name>")
  .description("Scaffold a new custom component with the Loony component structure")
  .option("--cwd <path>", "The working directory", process.cwd())
  .option("--path <path>", "Output directory for the component")
  .action(async (name: string, opts: Record<string, unknown>) => {
    const { scaffold } = await import("./commands/scaffold.js");
    await scaffold(name, opts as unknown as Parameters<typeof scaffold>[1]);
  });

program.parseAsync(process.argv).catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
