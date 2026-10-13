import { existsSync } from "node:fs";
import { join } from "node:path";
import { readConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";
import { resolvePackageRoot } from "../utils/packages.js";
import { type RegistryItem, getComponent, registry } from "../utils/registry.js";

interface DiffOptions {
  cwd: string;
}

/**
 * loony diff — Show changes between local and upstream component.
 *
 * Compares the user's installed component files against the source
 * in node_modules/@loony/ui so they know what's changed upstream.
 * Without a component name, diffs every component found in componentsDir.
 */
export async function diff(component: string | undefined, opts: DiffOptions) {
  const cwd = opts.cwd ?? process.cwd();
  const config = readConfig(cwd);
  const componentsDir = join(cwd, config.componentsDir);

  const { execa } = await import("execa");

  let components: RegistryItem[];
  if (component) {
    const item = getComponent(component);
    if (!item) {
      logger.error(`Unknown component: "${component}"`);
      process.exit(1);
    }
    components = [item];
  } else {
    components = installedComponents(componentsDir);
    if (components.length === 0) {
      logger.warn(`No Loony components found in ${config.componentsDir}.`);
      return;
    }
  }

  const uiPackagePath = resolvePackageRoot("@loony/ui", cwd);

  if (!uiPackagePath) {
    logger.error("@loony/ui is not installed. Run `pnpm add @loony/ui` first.");
    process.exit(1);
  }

  for (const item of components) {
    logger.heading(`Diff: ${item.displayName}`);

    for (const file of item.files) {
      const localPath = join(componentsDir, file);
      const upstreamPath = join(uiPackagePath, "src", file);

      if (!existsSync(localPath)) {
        logger.warn(`Local file not found: ${file}`);
        continue;
      }

      if (!existsSync(upstreamPath)) {
        logger.warn(`Upstream file not found: ${file}`);
        continue;
      }

      try {
        const result = await execa(
          "diff",
          ["--unified=3", "--color=always", localPath, upstreamPath],
          {
            reject: false,
          },
        );

        if (result.stdout) {
          console.log(result.stdout);
        } else {
          logger.success(`${file}: up to date`);
        }
      } catch {
        logger.warn(`Could not diff ${file}`);
      }
    }
  }
}

/** Registry components with at least one file present in the components directory. */
export function installedComponents(componentsDir: string): RegistryItem[] {
  return registry.filter((item) =>
    item.files.some((file) => existsSync(join(componentsDir, file))),
  );
}
