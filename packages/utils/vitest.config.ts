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
      exclude: ["**/test/**", "**/*.stories.*", "**/*.test.*", "**/index.ts"],
      // Ratchet: floors just below current coverage so it can only go up.
      // Raise these as tests land (target from the brief: >95%).
      thresholds: {
        statements: 84,
        branches: 77,
        functions: 80,
        lines: 84,
      },
    },
  },
});
