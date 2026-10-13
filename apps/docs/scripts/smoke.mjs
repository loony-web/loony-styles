/**
 * Smoke-tests the built docs site: starts `next start`, crawls every internal
 * /docs link reachable from /docs, and fails if any page doesn't return 200.
 *
 * Catches runtime-only failures the build can't, such as a server component
 * calling a function exported from a "use client" module (renders as a 500).
 *
 * Usage: pnpm --filter @loony/docs build && pnpm --filter @loony/docs smoke
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { setTimeout as delay } from "node:timers/promises";

const PORT = Number(process.env.SMOKE_PORT ?? 3199);
const ORIGIN = `http://localhost:${PORT}`;
const TIMEOUT_MS = 120_000;

// Run Next's CLI directly (not via `pnpm exec`) in its own process group, so
// stopping it kills next-server too. A surviving grandchild would keep the
// inherited stderr open and make whatever runs this script hang.
const nextBin = createRequire(import.meta.url).resolve("next/dist/bin/next");
const server = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], {
  stdio: ["ignore", "ignore", "inherit"],
  detached: true,
});

function stopServer() {
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {
    // already gone
  }
}

const watchdog = setTimeout(() => {
  console.error(`✗ smoke test timed out after ${TIMEOUT_MS / 1000}s`);
  stopServer();
  process.exit(1);
}, TIMEOUT_MS);

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      const res = await fetch(`${ORIGIN}/docs`);
      if (res.ok) return;
    } catch {
      // not listening yet
    }
    await delay(500);
  }
  throw new Error("docs server did not start");
}

async function crawl() {
  const queue = ["/docs"];
  const seen = new Set(queue);
  const failures = [];

  while (queue.length > 0) {
    const path = queue.shift();
    const res = await fetch(ORIGIN + path);
    if (!res.ok) {
      failures.push(`${res.status} ${path}`);
      continue;
    }
    const html = await res.text();
    for (const [, href] of html.matchAll(/href="(\/docs[^"#?]*)"/g)) {
      if (!seen.has(href)) {
        seen.add(href);
        queue.push(href);
      }
    }
  }
  return { checked: seen.size, failures };
}

let exitCode = 0;
try {
  await waitForServer();
  const { checked, failures } = await crawl();
  if (failures.length > 0) {
    console.error(
      `✗ ${failures.length} of ${checked} docs pages failed:\n  ${failures.join("\n  ")}`,
    );
    exitCode = 1;
  } else {
    console.log(`✓ ${checked} docs pages returned 200`);
  }
} catch (error) {
  console.error(error);
  exitCode = 1;
} finally {
  clearTimeout(watchdog);
  stopServer();
}
process.exit(exitCode);
