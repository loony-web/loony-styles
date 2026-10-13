import storybookPlugin from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";
import { react } from "./react.js";

/**
 * ESLint config for Storybook story files.
 * Relaxes certain rules that don't apply to story authoring context.
 *
 * @type {import("typescript-eslint").ConfigArray}
 */
export const storybook = tseslint.config(...react, ...storybookPlugin.configs["flat/recommended"], {
  files: ["**/*.stories.{ts,tsx}", "**/*.story.{ts,tsx}"],
  rules: {
    "no-console": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/display-name": "off",
    "storybook/prefer-pascal-case": "error",
  },
});

export default storybook;
