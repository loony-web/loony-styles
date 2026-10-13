import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["**/test/**", "**/*.stories.*", "**/*.test.*", "**/index.ts", "src/styles/**"],
      // Ratchet: floors just below current coverage so it can only go up.
      // Raise these as tests land (target from the brief: >95%).
      thresholds: {
        statements: 91,
        branches: 76,
        functions: 62,
        lines: 91,
      },
    },
  },
});
