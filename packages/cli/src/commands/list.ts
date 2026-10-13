import kleur from "kleur";
import { logger } from "../utils/logger.js";
import { registry } from "../utils/registry.js";

interface ListOptions {
  json?: boolean;
}

const CATEGORY_ORDER = [
  "foundation",
  "form",
  "layout",
  "feedback",
  "overlay",
  "navigation",
  "display",
  "advanced",
] as const;

/**
 * loony list — Display all available components.
 */
export function list(opts: ListOptions) {
  if (opts.json) {
    console.log(JSON.stringify(registry, null, 2));
    return;
  }

  logger.heading("Available Components");
  logger.newline();

  const byCategory = new Map<string, typeof registry>();
  for (const item of registry) {
    const current = byCategory.get(item.category) ?? [];
    current.push(item);
    byCategory.set(item.category, current);
  }

  for (const category of CATEGORY_ORDER) {
    const items = byCategory.get(category);
    if (!items?.length) continue;

    console.log(kleur.bold().white(`  ${category.charAt(0).toUpperCase() + category.slice(1)}`));
    for (const item of items) {
      const statusBadge =
        item.status === "stable"
          ? kleur.green("stable")
          : item.status === "beta"
            ? kleur.yellow("beta")
            : item.status === "experimental"
              ? kleur.magenta("experimental")
              : kleur.red("deprecated");

      console.log(`    ${kleur.cyan(item.name.padEnd(20))} ${item.description} [${statusBadge}]`);
    }
    logger.newline();
  }

  console.log(
    kleur.gray(`  Total: ${registry.length} components. Run \`loony add <name>\` to install.\n`),
  );
}
