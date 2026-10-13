import { CodeBlock, Section } from "@/components/component-doc";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "CLI — Loony" };

export default function CliPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-(--loony-color-fg)">CLI</h1>
        <p className="text-(--loony-color-fg-muted)">
          The <code className="font-mono text-xs">@loony/cli</code> tool copies component source
          files directly into your project. You own the code — no runtime dependency on Loony, no
          version drift.
        </p>
      </div>

      <Section title="Installation">
        <CodeBlock>{`# Run without installing (recommended)
npx @loony/cli@latest init

# Or install globally
npm install -g @loony/cli
loony init`}</CodeBlock>
      </Section>

      <Section title="Commands">
        <div className="space-y-6">
          {[
            {
              cmd: "loony init",
              description:
                "Scaffolds the token file, Tailwind config import, and a components/ directory in your project.",
              example: `loony init

# Interactive prompts:
# > Where should components be placed? (src/components/ui)
# > Which token preset? (default / minimal / custom)
# > TypeScript? (yes)`,
            },
            {
              cmd: "loony add <component>",
              description:
                "Copies a component's source files into your project. Includes all sub-components and peer dependencies.",
              example: `loony add button
# Copies: src/components/ui/button.tsx

loony add dialog
# Copies: src/components/ui/dialog.tsx
# Also adds @radix-ui/react-dialog if not present

loony add button dialog input select
# Multiple components at once`,
            },
            {
              cmd: "loony diff <component>",
              description:
                "Shows a diff between the version in your project and the current registry version. Useful for staying up to date.",
              example: `loony diff button

# Output:
# packages/ui/src/button/button.tsx → src/components/ui/button.tsx
# + <Button variant="ghost-danger"> added
# - loading prop used aria-busy (now uses aria-disabled)`,
            },
            {
              cmd: "loony list",
              description:
                "Lists all available components in the registry with their status and dependencies.",
              example: `loony list

# ✅ button         stable   (no deps)
# ✅ dialog         stable   (@radix-ui/react-dialog)
# ✅ select         stable   (@radix-ui/react-select)
# ✅ command        stable   (cmdk, @radix-ui/react-dialog)
# ...`,
            },
            {
              cmd: "loony update <component>",
              description:
                "Overwrites your local copy with the latest registry version. Will prompt before overwriting customized files.",
              example: `loony update button

# Detected local changes to src/components/ui/button.tsx
# > Overwrite? (y/N)
# > Show diff first? (Y/n)`,
            },
          ].map(({ cmd, description, example }) => (
            <div key={cmd} className="rounded-xl border border-(--loony-color-border) p-5">
              <div className="mb-1">
                <code className="font-mono text-sm font-semibold text-(--loony-color-fg)">
                  {cmd}
                </code>
              </div>
              <p className="mb-3 text-sm text-(--loony-color-fg-muted)">{description}</p>
              <CodeBlock>{example}</CodeBlock>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Registry format">
        <p className="mb-4 text-sm text-(--loony-color-fg-muted)">
          Each component in the registry includes metadata the CLI uses to resolve dependencies and
          copy files.
        </p>
        <CodeBlock>{`// registry.ts (internal format)
export interface RegistryItem {
  name: string;
  description: string;
  files: string[];           // relative paths from packages/ui/src/
  dependencies?: string[];   // npm packages needed at runtime
  devDependencies?: string[];
  radix?: string;            // Radix UI package name if applicable
}

// Example entry
{
  name: "dialog",
  description: "Modal overlay with focus trap and animations",
  files: ["dialog/dialog.tsx"],
  dependencies: ["@radix-ui/react-dialog", "motion"],
  radix: "@radix-ui/react-dialog",
}`}</CodeBlock>
      </Section>

      <Section title="Config file">
        <p className="mb-4 text-sm text-(--loony-color-fg-muted)">
          After <code className="font-mono text-xs">loony init</code>, a{" "}
          <code className="font-mono text-xs">loony.json</code> is created at your project root to
          persist your settings.
        </p>
        <CodeBlock>{`// loony.json
{
  "$schema": "https://loony.dev/schema/loony.json",
  "componentsDir": "src/components/ui",
  "typescript": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}`}</CodeBlock>
      </Section>
    </div>
  );
}
