import tseslint from "typescript-eslint";
import { react } from "./react.js";

/**
 * ESLint config for Next.js applications.
 * Extends react config with Next.js-specific rules.
 *
 * @type {import("typescript-eslint").ConfigArray}
 */
export const next = tseslint.config(
  ...react,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "error",
    },
  },
);

export default next;
