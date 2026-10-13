import { base } from "@loony/eslint-config/base";

export default [
  ...base,
  {
    // A CLI's job is to print to stdout.
    rules: { "no-console": "off" },
  },
];
