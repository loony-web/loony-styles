import * as p from "@clack/prompts";
import kleur from "kleur";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { execa } from "execa";
import { readConfig } from "../utils/config.js";
import { registry, resolveComponentTree, getComponent } from "../utils/registry.js";
import { logger } from "../utils/logger.js";

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

  // Interactive selection if no components provided
  let selectedComponents = components;

  if (selectedComponents.length === 0) {
    const options = registry.map((item) => ({
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

    selectedComponents = selected as string[];
  }

  // Validate component names
  const invalid = selectedComponents.filter((name) => !getComponent(name));
  if (invalid.length > 0) {
    for (const name of invalid) {
      logger.error(`Unknown component: "${name}". Run \`loony list\` to see available components.`);
    }
    process.exit(1);
  }

  // Resolve full dependency tree
  const allComponents = new Set<string>();
  for (const name of selectedComponents) {
    for (const item of resolveComponentTree(name)) {
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

  // Find source files in @loony/ui
  const uiPackagePath = findPackagePath("@loony/ui", cwd);

  const spinner = p.spinner();
  spinner.start(`Installing ${toInstall.length} component(s)...`);

  const npmDeps = new Set<string>();

  for (const componentName of toInstall) {
    const item = getComponent(componentName);
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

  // Install npm dependencies
  if (npmDeps.size > 0) {
    const depsToInstall = Array.from(npmDeps).filter((dep) => !dep.startsWith("@loony/"));

    if (depsToInstall.length > 0) {
      const installSpinner = p.spinner();
      installSpinner.start(`Installing npm packages: ${depsToInstall.join(", ")}`);

      try {
        const pm = detectPackageManager(cwd);
        await execa(pm, [pm === "npm" ? "install" : "add", ...depsToInstall], { cwd });
        installSpinner.stop("Dependencies installed.");
      } catch {
        installSpinner.stop("Failed to install dependencies. Install manually:");
        logger.warn(`pnpm add ${depsToInstall.join(" ")}`);
      }
    }
  }

  p.note(
    toInstall
      .map((name) => {
        const item = getComponent(name);
        if (!item?.files[0]) return "";
        const importPath = `${config.importAlias}/components/ui/${item.files[0]?.replace(/\.tsx?$/, "")}`;
        return kleur.cyan(`import { ${item.displayName} } from "${importPath}";`);
      })
      .filter(Boolean)
      .join("\n"),
    "Usage",
  );

  p.outro(kleur.green("Done."));
}

function findPackagePath(packageName: string, cwd: string): string {
  try {
    const resolvedPath = require.resolve(`${packageName}/package.json`, { paths: [cwd] });
    return dirname(resolvedPath);
  } catch {
    // Fallback: assume monorepo structure
    return join(cwd, "../../packages/ui");
  }
}

function detectPackageManager(cwd: string): string {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  if (existsSync(join(cwd, "bun.lockb"))) return "bun";
  return "npm";
}
