import axeCore from "axe-core";

const DISABLED_RULES = ["region", "landmark-one-main"];

export async function axe(element: Element): Promise<axeCore.AxeResults> {
  const config: axeCore.RunOptions = {
    rules: Object.fromEntries(DISABLED_RULES.map((id) => [id, { enabled: false }])),
  };
  return axeCore.run(element, config);
}

export function toHaveNoViolations(results: axeCore.AxeResults): void {
  if (results.violations.length > 0) {
    const messages = results.violations
      .map((v) => `[${v.impact}] ${v.id}: ${v.description}\n  ${v.helpUrl}`)
      .join("\n");
    throw new Error(`Accessibility violations found:\n${messages}`);
  }
}
