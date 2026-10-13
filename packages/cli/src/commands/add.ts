import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import * as p from "@clack/prompts";
import { execa } from "execa";
import kleur from "kleur";
import { readConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";
import {
  declaredDependencies,
  detectPackageManager,
  installArgs,
  resolvePackageRoot,
} from "../utils/packages.js";
import { readRegistryFile } from "../utils/registry.js";

interface AddOptions {
  cwd: string;
  path?: string;
  yes?: boolean;
  overwrite?: boolean;
}

/**
 * loony add — Add one or more components with their dependencies.
 *
 * Steps:
 *   1. Read project config (errors if not initialized)
 *   2. Resolve component dependency tree
 *   3. Confirm list of files to write (unless --yes)
 *   4. Copy component files from @loony/ui into the project's componentsDir
 *   5. Install npm dependencies if not already installed
 *   6. Print usage snippet
 */
export async function add(components: string[], opts: AddOptions) {
  const cwd = opts.cwd ?? process.cwd();

  p.intro(kleur.bold().cyan("  loony add  "));

  const config = readConfig(cwd);
  const targetDir = opts.path ?? join(cwd, config.componentsDir);

  // Component sources ship inside the @loony/ui package.
  const uiPackagePath = resolvePackageRoot("@loony/ui", cwd);
  if (!uiPackagePath) {
    const pm = detectPackageManager(cwd);
    p.cancel(
      `@loony/ui is not installed. Run \`${pm} ${installArgs(pm, ["-D", "@loony/ui"]).join(" ")}\` first.`,
    );
    process.exit(1);
  }

  // Use the registry that ships with the installed sources, so the file list
  // always matches what is on disk.
  const registry = readRegistryFile(join(uiPackagePath, "registry.json"));

  // Interactive selection if no components provided
  let selectedComponents = components;

  if (selectedComponents.length === 0) {
    const options = registry.items.map((item) => ({
      value: item.name,
      label: `${item.displayName} — ${item.description}`,
      hint: item.category,
    }));

    const selected = await p.multiselect({
      message: "Which components would you like to add?",
      options,
    });

    if (p.isCancel(selected)) {
      p.cancel("Cancelled.");
      process.exit(0);
    }

    selectedComponents = selected;
  }

  // Validate component names
  const invalid = selectedComponents.filter((name) => !registry.get(name));
  if (invalid.length > 0) {
    for (const name of invalid) {
      logger.error(`Unknown component: "${name}". Run \`loony list\` to see available components.`);
    }
    process.exit(1);
  }

  // Resolve full dependency tree
  const allComponents = new Set<string>();
  for (const name of selectedComponents) {
    for (const item of registry.resolveTree(name)) {
      allComponents.add(item.name);
    }
  }

  const toInstall = Array.from(allComponents);

  if (!opts.yes && toInstall.length > selectedComponents.length) {
    const extraDeps = toInstall.filter((name) => !selectedComponents.includes(name));
    p.log.info(
      `The following dependencies will also be installed: ${extraDeps.map((n) => kleur.cyan(n)).join(", ")}`,
    );

    const confirmed = await p.confirm({
      message: "Continue?",
      initialValue: true,
    });

    if (p.isCancel(confirmed) || !confirmed) {
      p.cancel("Cancelled.");
      process.exit(0);
    }
  }

  const spinner = p.spinner();
  spinner.start(`Installing ${toInstall.length} component(s)...`);

  const npmDeps = new Set<string>();

  for (const componentName of toInstall) {
    const item = registry.get(componentName);
    if (!item) continue;

    for (const file of item.files) {
      const sourcePath = join(uiPackagePath, "src", file);
      const destPath = join(targetDir, file);

      if (!existsSync(sourcePath)) {
        spinner.stop(`Source not found: ${sourcePath}`);
        logger.warn(`Could not find source file for ${componentName}: ${file}`);
        continue;
      }

      if (existsSync(destPath) && !opts.overwrite) {
        logger.warn(`Skipping ${file} (already exists). Use --overwrite to replace.`);
        continue;
      }

      mkdirSync(dirname(destPath), { recursive: true });
      writeFileSync(destPath, readFileSync(sourcePath, "utf-8"), "utf-8");
    }

    for (const dep of item.npmDependencies) {
      npmDeps.add(dep);
    }
  }

  spinner.stop(`${toInstall.length} component(s) installed to ${targetDir}`);

  // Install npm dependencies the project doesn't already declare. @loony/*
  // packages are included: copied components import @loony/utils and friends.
  const declared = declaredDependencies(cwd);
  const depsToInstall = [...npmDeps].filter((dep) => !declared.has(dep));

  if (depsToInstall.length > 0) {
    const pm = detectPackageManager(cwd);
    const args = installArgs(pm, depsToInstall);
    const installSpinner = p.spinner();
    installSpinner.start(`Installing npm packages: ${depsToInstall.join(", ")}`);

    try {
      await execa(pm, args, { cwd });
      installSpinner.stop("Dependencies installed.");
    } catch {
      installSpinner.stop("Failed to install dependencies. Install manually:");
      logger.warn(`${pm} ${args.join(" ")}`);
    }
  }

  p.note(
    toInstall
      .map((name) => {
        const item = registry.get(name);
        if (!item) return "";
        const importPath = usageImportPath(config.importAlias, config.componentsDir, item.files);
        return kleur.cyan(`import { ${item.displayName} } from "${importPath}";`);
      })
      .filter(Boolean)
      .join("\n"),
    "Usage",
  );

  p.outro(kleur.green("Done."));
}

/**
 * Import specifier for an installed component, e.g. "@/components/ui/button".
 * The alias conventionally maps to src/, so a leading "src/" is dropped. Points
 * at the folder when its index.ts was installed, otherwise at the first file.
 */
export function usageImportPath(alias: string, componentsDir: string, files: string[]): string {
  const base = `${alias}/${componentsDir.replace(/^\.?\/?src\//, "")}`;
  const folder = files[0]?.split("/")[0] ?? "";
  const target = files.includes(`${folder}/index.ts`)
    ? folder
    : (files[0] ?? "").replace(/\.tsx?$/, "");
  return `${base}/${target}`;
}
