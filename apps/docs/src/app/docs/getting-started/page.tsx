import type { Metadata } from "next";
import { CodeBlock } from "@/components/component-doc";

export const metadata: Metadata = { title: "Installation" };

const steps = [
  {
    n: 1,
    title: "Prerequisites",
    description: "Loony requires a React 19 project with Tailwind CSS v4 configured.",
    code: `# Create a new Next.js project (recommended)
npx create-next-app@latest my-app \\
  --tailwind --typescript --app --turbopack
cd my-app`,
    lang: "bash",
  },
  {
    n: 2,
    title: "Initialize Loony",
    description: "Run the init command. It will ask for your components directory, styles path, and import alias.",
    code: `npx loony init

# This creates loony.json and adds the token import to your CSS`,
    lang: "bash",
    note: `/* Add to your globals.css (loony init does this automatically) */
@import "tailwindcss";
@import "@loony/tokens/css";`,
    noteLabel: "css",
  },
  {
    n: 3,
    title: "Add components",
    description: "Add any component. The CLI resolves dependencies automatically and copies all required files into your project.",
    code: `loony add button
loony add dialog toast
loony add accordion tabs breadcrumb

# Files land at: src/components/ui/`,
    lang: "bash",
  },
  {
    n: 4,
    title: "Use in your app",
    description: "Import directly from your copied file — not from an npm package. It's just your code.",
    code: `import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"

export default function Page() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Hello from Loony</DialogTitle>
      </DialogContent>
    </Dialog>
  )
}`,
    lang: "tsx",
  },
];

const nextSteps = [
  { label: "Component reference", href: "/docs/components/button", description: "Browse all 44 components." },
  { label: "Theming guide",       href: "/docs/theming",           description: "Customize tokens with CSS variables." },
  { label: "CLI reference",       href: "/docs/cli",               description: "All CLI commands explained." },
];

export default function GettingStartedPage() {
  return (
    <div className="max-w-[720px]">
      {/* Header */}
      <div className="mb-8 border-b border-[--loony-color-border] pb-6">
        <p className="mb-2 text-xs text-[--loony-color-fg-muted]">Getting started</p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-[--loony-color-fg]">Installation</h1>
        <p className="text-[--loony-color-fg-muted]">
          Loony is not a traditional npm package — it's a CLI that copies component source files
          directly into your project. Set up takes about 2 minutes.
        </p>
      </div>

      {/* Steps */}
      <div className="relative mb-12">
        {/* Vertical connector */}
        <div className="absolute left-[19px] top-10 bottom-10 w-px bg-[--loony-color-border]" aria-hidden />

        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.n} className="relative flex gap-5">
              {/* Step number */}
              <div
                className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[--loony-color-border] bg-[--loony-color-bg] text-xs font-bold text-[--loony-color-fg]"
                style={{ boxShadow: "0 0 0 4px var(--loony-color-bg)" }}
              >
                {step.n}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1 pb-2 pt-1">
                <h2 className="mb-1 text-base font-semibold text-[--loony-color-fg]">{step.title}</h2>
                <p className="mb-4 text-sm text-[--loony-color-fg-muted]">{step.description}</p>
                <CodeBlock language={step.lang}>{step.code}</CodeBlock>
                {step.note && (
                  <>
                    <p className="mb-2 mt-4 text-xs text-[--loony-color-fg-muted]">
                      This also adds the token import to your stylesheet:
                    </p>
                    <CodeBlock language={step.noteLabel ?? "css"}>{step.note}</CodeBlock>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next steps */}
      <section>
        <h2 className="mb-5 text-base font-semibold text-[--loony-color-fg]">What's next?</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {nextSteps.map((step) => (
            <a
              key={step.href}
              href={step.href}
              className="group rounded-xl border border-[--loony-color-border] p-4 transition-colors hover:border-[--loony-color-border-strong] hover:bg-[--loony-color-surface]"
            >
              <p className="mb-1 text-sm font-semibold text-[--loony-color-fg] group-hover:text-[--loony-color-accent]">
                {step.label} →
              </p>
              <p className="text-xs text-[--loony-color-fg-muted]">{step.description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
