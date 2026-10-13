import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";
import { react } from "./react.js";

/**
 * ESLint config for Next.js applications.
 * Extends the react config with Next.js rules (recommended + Core Web Vitals).
 *
 * @type {import("typescript-eslint").ConfigArray}
 */
export const next = tseslint.config(...react, {
  ignores: [".next/**", "next-env.d.ts"],
  plugins: { "@next/next": nextPlugin },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs["core-web-vitals"].rules,
  },
});

export default next;
