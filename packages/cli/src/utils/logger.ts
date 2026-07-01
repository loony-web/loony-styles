import kleur from "kleur";

/**
 * Logger — Consistent, colorized CLI output.
 *
 * Follows the convention: symbols prefix messages for visual hierarchy.
 * Errors always print to stderr.
 */
export const logger = {
  info: (msg: string) => console.log(`${kleur.blue("ℹ")} ${msg}`),
  success: (msg: string) => console.log(`${kleur.green("✓")} ${msg}`),
  warn: (msg: string) => console.warn(`${kleur.yellow("⚠")} ${msg}`),
  error: (msg: string) => console.error(`${kleur.red("✗")} ${msg}`),
  step: (msg: string) => console.log(`${kleur.gray("·")} ${msg}`),
  heading: (msg: string) => console.log(`\n${kleur.bold().white(msg)}`),
  newline: () => console.log(""),
};
