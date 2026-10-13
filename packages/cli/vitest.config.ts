import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**"],
      exclude: ["**/*.test.*", "src/index.ts"],
      // Ratchet: floors just below current coverage so it can only go up.
      // Remaining gaps: interactive prompt branches and the commander wiring (cli.ts).
      thresholds: {
        statements: 68,
        branches: 66,
        functions: 75,
        lines: 68,
      },
    },
  },
});
