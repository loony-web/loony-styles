import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    // Icons are pure render functions — server rendering is enough, no DOM needed.
    environment: "node",
  },
});
