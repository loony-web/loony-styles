import { existsSync } from "node:fs";
import { join } from "node:path";
import * as p from "@clack/prompts";
import kleur from "kleur";
import { type LoonyCLIConfig, configExists, writeConfig } from "../utils/config.js";

interface InitOptions {
  cwd: string;
  yes?: boolean;
  ts?: boolean;
  tailwind?: boolean;
}

/**
 * loony init — Initialize Loony in an existing project.
 *
 * Steps:
 *   1. Detect existing config (error if already initialized)
 *   2. Prompt for project configuration (or use defaults with --yes)
 *   3. Write loony.config.json
 *   4. Write base CSS imports to the styles file
 *   5. Print next steps
 */
export async function init(opts: InitOptions) {
  const cwd = opts.cwd ?? process.cwd();

  p.intro(kleur.bold().cyan("  Loony  "));

  if (configExists(cwd)) {
    p.log.warn("Loony is already initialized in this project (loony.config.json found).");
    p.log.info("Run `loony add <component>` to add components.");
    p.outro("Done.");
    return;
  }

  const isPackageJson = existsSync(join(cwd, "package.json"));
  if (!isPackageJson) {
    p.log.error("No package.json found. Make sure you're in a project root.");
    process.exit(1);
  }

  let config: Partial<LoonyCLIConfig>;

  if (opts.yes) {
    config = {
      componentsDir: "src/components/ui",
      stylesPath: "src/styles/globals.css",
      importAlias: "@",
      tailwindVersion: "4",
      typescript: true,
    };
    p.log.info("Using default configuration (--yes)");
  } else {
    const answers = await p.group(
      {
        componentsDir: () =>
          p.text({
            message: "Where should components be installed?",
            placeholder: "src/components/ui",
            defaultValue: "src/components/ui",
          }),
        stylesPath: () =>
          p.text({
            message: "Where is your global CSS file?",
            placeholder: "src/styles/globals.css",
            defaultValue: "src/styles/globals.css",
          }),
        importAlias: () =>
          p.text({
            message: "What import alias do you use?",
            placeholder: "@",
            defaultValue: "@",
          }),
        typescript: () =>
          p.confirm({
            message: "Are you using TypeScript?",
            initialValue: true,
          }),
        tailwindVersion: () =>
          p.select({
            message: "Which version of Tailwind CSS?",
            options: [
              { value: "4", label: "Tailwind CSS v4 (recommended)" },
              { value: "3", label: "Tailwind CSS v3" },
            ],
            initialValue: "4",
          }),
      },
      {
        onCancel: () => {
          p.cancel("Operation cancelled.");
          process.exit(0);
        },
      },
    );

    config = answers as Partial<LoonyCLIConfig>;
  }

  const spinner = p.spinner();
  spinner.start("Writing configuration...");

  writeConfig(cwd, {
    version: "1",
    componentsDir: config.componentsDir ?? "src/components/ui",
    stylesPath: config.stylesPath ?? "src/styles/globals.css",
    importAlias: config.importAlias ?? "@",
    tailwindVersion: config.tailwindVersion ?? "4",
    typescript: config.typescript ?? true,
  });

  spinner.stop("Configuration written to loony.config.json");

  p.note(
    [
      `Add the following to your ${config.stylesPath ?? "globals.css"}:`,
      "",
      kleur.cyan(`  @import "@loony/tokens/css";`),
      kleur.cyan(`  @import "@loony/ui/styles";`),
    ].join("\n"),
    "Next steps",
  );

  p.log.info(`Run ${kleur.cyan("`loony add button`")} to add your first component.`);
  p.outro(kleur.green("Loony initialized successfully."));
}
