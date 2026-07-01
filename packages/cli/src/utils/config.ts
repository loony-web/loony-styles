import { z } from "zod";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Loony project configuration schema.
 *
 * Stored as loony.config.json in the project root.
 * Validated with Zod to provide clear error messages on malformed config.
 */
export const configSchema = z.object({
  /** Version of the config schema */
  version: z.string().default("1"),
  /** Where components are installed relative to project root */
  componentsDir: z.string().default("src/components/ui"),
  /** Where the global CSS / theme file lives */
  stylesPath: z.string().default("src/styles/globals.css"),
  /** TypeScript path alias for imports (e.g. "@/components") */
  importAlias: z.string().default("@"),
  /** Tailwind CSS version */
  tailwindVersion: z.enum(["3", "4"]).default("4"),
  /** Whether to use TypeScript */
  typescript: z.boolean().default(true),
  /** Registry URL (for custom registries) */
  registryUrl: z.string().url().optional(),
});

export type LoonyCLIConfig = z.infer<typeof configSchema>;

const CONFIG_FILENAME = "loony.config.json";

export function resolveConfigPath(cwd: string): string {
  return join(cwd, CONFIG_FILENAME);
}

export function configExists(cwd: string): boolean {
  return existsSync(resolveConfigPath(cwd));
}

export function readConfig(cwd: string): LoonyCLIConfig {
  const configPath = resolveConfigPath(cwd);

  if (!existsSync(configPath)) {
    throw new Error(`No ${CONFIG_FILENAME} found. Run \`loony init\` first.`);
  }

  const raw = JSON.parse(readFileSync(configPath, "utf-8")) as unknown;
  const result = configSchema.safeParse(raw);

  if (!result.success) {
    throw new Error(
      `Invalid ${CONFIG_FILENAME}:\n${result.error.issues.map((i) => `  · ${i.path.join(".")}: ${i.message}`).join("\n")}`,
    );
  }

  return result.data;
}

export function writeConfig(cwd: string, config: LoonyCLIConfig): void {
  const configPath = resolveConfigPath(cwd);
  writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8");
}
