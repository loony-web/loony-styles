import { configureAxe } from "jest-axe";

/**
 * Pre-configured axe instance for accessibility testing.
 *
 * Runs WCAG 2.1 AA rules. Components must pass these before merging.
 */
export const axe = configureAxe({
  rules: {
    // Skip rules that require a full page context (we test components in isolation)
    region: { enabled: false },
    "landmark-one-main": { enabled: false },
  },
});
