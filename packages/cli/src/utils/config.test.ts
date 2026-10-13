import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  configExists,
  configSchema,
  readConfig,
  resolveConfigPath,
  writeConfig,
} from "./config.js";

let cwd: string;

beforeEach(() => {
  cwd = mkdtempSync(join(tmpdir(), "loony-cli-"));
});

afterEach(() => {
  rmSync(cwd, { recursive: true, force: true });
});

describe("config", () => {
  it("reports a missing config", () => {
    expect(configExists(cwd)).toBe(false);
    expect(() => readConfig(cwd)).toThrow(/loony init/);
  });

  it("round-trips through writeConfig/readConfig", () => {
    const config = configSchema.parse({ componentsDir: "app/ui", importAlias: "~" });
    writeConfig(cwd, config);

    expect(configExists(cwd)).toBe(true);
    expect(readConfig(cwd)).toEqual(config);
  });

  it("fills defaults for omitted fields", () => {
    writeFileSync(resolveConfigPath(cwd), "{}");
    expect(readConfig(cwd)).toMatchObject({
      version: "1",
      componentsDir: "src/components/ui",
      tailwindVersion: "4",
      typescript: true,
    });
  });

  it("rejects invalid values with the offending path", () => {
    writeFileSync(resolveConfigPath(cwd), JSON.stringify({ tailwindVersion: "2" }));
    expect(() => readConfig(cwd)).toThrow(/tailwindVersion/);
  });
});
