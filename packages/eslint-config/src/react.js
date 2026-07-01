import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";
import { base } from "./base.js";

/**
 * ESLint config for React component packages.
 * Extends base with React, hooks, and a11y rules.
 *
 * @type {import("typescript-eslint").ConfigArray}
 */
export const react = tseslint.config(
  ...base,

  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "warn",
      "react/jsx-no-useless-fragment": "warn",
      "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],
      "react/self-closing-comp": "warn",
      "react/no-unused-prop-types": "warn",
      "react/jsx-sort-props": "off",
      "react/jsx-pascal-case": "error",
      "react/jsx-no-duplicate-props": "error",

      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Accessibility — comprehensive coverage
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/html-has-lang": "error",
      "jsx-a11y/img-redundant-alt": "warn",
      "jsx-a11y/interactive-supports-focus": "error",
      "jsx-a11y/label-has-associated-control": "error",
      "jsx-a11y/mouse-events-have-key-events": "warn",
      "jsx-a11y/no-access-key": "warn",
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/no-noninteractive-element-interactions": "warn",
      "jsx-a11y/no-noninteractive-tabindex": "error",
      "jsx-a11y/no-redundant-roles": "warn",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/scope": "error",
      "jsx-a11y/tabindex-no-positive": "error",
    },
    settings: {
      react: { version: "detect" },
    },
  },
);

export default react;
