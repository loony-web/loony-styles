import js from "@eslint/js";
import tseslint from "typescript-eslint";

/**
 * Base ESLint config for all TypeScript packages.
 * Biome handles formatting; ESLint focuses on logic and type-aware rules.
 *
 * @type {import("typescript-eslint").ConfigArray}
 */
export const base = tseslint.config(
  { ignores: ["dist/**", "build/**", "node_modules/**", "*.d.ts", "coverage/**"] },

  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    rules: {
      // TypeScript — strict but practical
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", fixStyle: "inline-type-imports" }],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/return-await": ["error", "in-try-catch"],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": ["warn", { ignorePrimitives: true }],
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/no-confusing-void-expression": ["error", { ignoreArrowShorthand: true }],
      "@typescript-eslint/restrict-template-expressions": ["warn", { allowNumber: true }],

      // Core JS
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      "object-shorthand": "warn",
      "prefer-destructuring": "off",

      // Imports
      "no-duplicate-imports": "error",
    },
  },
);

export default base;
