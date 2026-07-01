"use client";

import Link from "next/link";

/* ── Mini component previews ─────────────────────────────────────── */
function PreviewButton({ children, variant = "solid" }: { children: string; variant?: "solid" | "outline" | "ghost" }) {
  const styles: Record<string, string> = {
    solid:   "bg-[#3b82f6] text-white hover:bg-[#2563eb]",
    outline: "border border-[#374151] text-[#e5e7eb] hover:bg-[#1f2937]",
    ghost:   "text-[#9ca3af] hover:text-[#e5e7eb] hover:bg-[#1f2937]",
  };
  return (
    <button type="button" className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${styles[variant]}`}>
      {children}
    </button>
  );
}

function PreviewInput({ placeholder }: { placeholder: string }) {
  return (
    <input
      readOnly
      placeholder={placeholder}
      className="w-full rounded-md border border-[#374151] bg-[#111827] px-3 py-1.5 text-xs text-[#9ca3af] placeholder:text-[#4b5563] focus:outline-none"
    />
  );
}

function PreviewBadge({ children, color = "blue" }: { children: string; color?: "blue" | "green" | "orange" | "purple" }) {
  const c: Record<string, string> = {
    blue:   "bg-[#1e3a5f] text-[#60a5fa]",
    green:  "bg-[#052e16] text-[#4ade80]",
    orange: "bg-[#431407] text-[#fb923c]",
    purple: "bg-[#2e1065] text-[#c084fc]",
  };
  return <span className={`rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium ${c[color]}`}>{children}</span>;
}

function PreviewAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white" style={{ background: color }}>
      {initials}
    </div>
  );
}

/* ── Card panels ─────────────────────────────────────────────────── */
function ButtonsCard() {
  return (
    <div className="rounded-xl border border-[#1f2937] bg-[#0d1117] p-4">
      <p className="mb-3 text-[0.625rem] font-semibold uppercase tracking-widest text-[#4b5563]">Buttons</p>
      <div className="flex flex-wrap gap-2">
        <PreviewButton variant="solid">Get started</PreviewButton>
        <PreviewButton variant="outline">Learn more</PreviewButton>
        <PreviewButton variant="ghost">Cancel</PreviewButton>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <PreviewBadge color="blue">v0.1.0</PreviewBadge>
        <PreviewBadge color="green">Stable</PreviewBadge>
        <PreviewBadge color="orange">Beta</PreviewBadge>
        <PreviewBadge color="purple">New</PreviewBadge>
      </div>
    </div>
  );
}

function FormCard() {
  return (
    <div className="rounded-xl border border-[#1f2937] bg-[#0d1117] p-4">
      <p className="mb-3 text-[0.625rem] font-semibold uppercase tracking-widest text-[#4b5563]">Form</p>
      <div className="space-y-2">
        <PreviewInput placeholder="Your name" />
        <PreviewInput placeholder="Email address" />
        <div className="flex gap-2">
          <PreviewButton variant="solid">Submit</PreviewButton>
          <PreviewButton variant="ghost">Reset</PreviewButton>
        </div>
      </div>
    </div>
  );
}

function StatsCard() {
  const bars = [40, 65, 50, 80, 60, 90, 75];
  return (
    <div className="rounded-xl border border-[#1f2937] bg-[#0d1117] p-4">
      <p className="mb-1 text-[0.625rem] font-semibold uppercase tracking-widest text-[#4b5563]">Analytics</p>
      <p className="mb-3 text-xl font-bold text-[#e5e7eb]">24,531</p>
      <div className="flex h-16 items-end gap-1">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-sm bg-[#3b82f6] opacity-70" style={{ height: `${h}%`, opacity: i === bars.length - 1 ? 1 : 0.4 + (i / bars.length) * 0.5 }} />
        ))}
      </div>
      <div className="mt-2 flex justify-between">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
          <span key={d} className="text-[0.5625rem] text-[#4b5563]">{d}</span>
        ))}
      </div>
    </div>
  );
}

function TeamCard() {
  const members = [
    { initials: "JD", color: "#3b82f6", name: "Jordan", role: "Design" },
    { initials: "AK", color: "#8b5cf6", name: "Aiko", role: "Frontend" },
    { initials: "MR", color: "#10b981", name: "Marcus", role: "Backend" },
  ];
  return (
    <div className="rounded-xl border border-[#1f2937] bg-[#0d1117] p-4">
      <p className="mb-3 text-[0.625rem] font-semibold uppercase tracking-widest text-[#4b5563]">Team</p>
      <div className="space-y-2.5">
        {members.map((m) => (
          <div key={m.initials} className="flex items-center gap-3">
            <PreviewAvatar initials={m.initials} color={m.color} />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-[#e5e7eb]">{m.name}</p>
              <p className="text-[0.6875rem] text-[#4b5563]">{m.role}</p>
            </div>
            <PreviewBadge color="blue">Active</PreviewBadge>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsCard() {
  const items = [
    { icon: "✓", text: "Deployment complete", time: "2m ago", color: "#4ade80" },
    { icon: "!", text: "Review requested",    time: "5m ago", color: "#fb923c" },
    { icon: "◉", text: "Build succeeded",     time: "12m ago", color: "#60a5fa" },
  ];
  return (
    <div className="rounded-xl border border-[#1f2937] bg-[#0d1117] p-4">
      <p className="mb-3 text-[0.625rem] font-semibold uppercase tracking-widest text-[#4b5563]">Notifications</p>
      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.text} className="flex items-start gap-2.5">
            <span className="mt-0.5 text-xs font-bold" style={{ color: item.color }}>{item.icon}</span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-[#e5e7eb]">{item.text}</p>
            </div>
            <span className="shrink-0 text-[0.625rem] text-[#4b5563]">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressCard() {
  const tasks = [
    { label: "Design system", pct: 87 },
    { label: "Component library", pct: 64 },
    { label: "Documentation", pct: 42 },
  ];
  return (
    <div className="rounded-xl border border-[#1f2937] bg-[#0d1117] p-4">
      <p className="mb-3 text-[0.625rem] font-semibold uppercase tracking-widest text-[#4b5563]">Progress</p>
      <div className="space-y-3">
        {tasks.map((t) => (
          <div key={t.label}>
            <div className="mb-1 flex justify-between">
              <span className="text-[0.6875rem] text-[#9ca3af]">{t.label}</span>
              <span className="text-[0.6875rem] font-medium text-[#e5e7eb]">{t.pct}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1f2937]">
              <div className="h-full rounded-full bg-[#3b82f6]" style={{ width: `${t.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section
      className="relative overflow-hidden pb-0 pt-24"
      style={{ background: "#09090b" }}
    >
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse at 50% 0%, oklch(0.546 0.245 262.881 / 0.12), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <a
            href="/docs"
            className="inline-flex items-center gap-2 rounded-full border border-[#27272a] bg-[#18181b] px-4 py-1.5 text-xs font-medium text-[#a1a1aa] transition-colors hover:border-[#3f3f46] hover:text-[#e4e4e7]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
            Introducing Loony UI v0.1
            <span className="text-[#52525b]">→</span>
          </a>
        </div>

        {/* Heading */}
        <h1 className="mx-auto mb-5 max-w-3xl text-center text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl md:leading-tight">
          Build your design system{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #60a5fa 0%, oklch(0.546 0.245 262.881) 50%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            your way
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-center text-base leading-relaxed text-[#71717a] md:text-lg">
          44 accessible components you copy and own — not install. React 19, TypeScript strict, Tailwind v4, Radix UI.
        </p>

        {/* CTAs */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Get started
          </Link>
          <Link
            href="/docs/components/button"
            className="inline-flex items-center gap-2 rounded-lg border border-[#27272a] bg-transparent px-6 py-2.5 text-sm font-medium text-[#a1a1aa] transition-colors hover:border-[#3f3f46] hover:text-[#e4e4e7]"
          >
            Browse components
          </Link>
        </div>

        {/* Component showcase grid */}
        <div
          className="relative overflow-hidden rounded-t-2xl"
          style={{
            border: "1px solid #27272a",
            borderBottom: "none",
            boxShadow: "0 -16px 60px -10px rgba(59, 130, 246, 0.08)",
          }}
        >
          {/* Window bar */}
          <div
            className="flex items-center gap-1.5 border-b border-[#27272a] px-4 py-3"
            style={{ background: "#111113" }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-4 rounded border border-[#27272a] bg-[#18181b] px-3 py-0.5 text-[0.6875rem] text-[#52525b]">
              localhost:3000/docs/components
            </span>
          </div>

          {/* Component grid */}
          <div
            className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3"
            style={{ background: "#0a0a0b" }}
          >
            <ButtonsCard />
            <FormCard />
            <StatsCard />
            <TeamCard />
            <NotificationsCard />
            <ProgressCard />
          </div>

          {/* Fade to bottom */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
            style={{ background: "linear-gradient(to top, #09090b, transparent)" }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
