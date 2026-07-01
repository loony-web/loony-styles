const colorTokens = [
  { name: "accent",    value: "#3b82f6",  label: "Primary"  },
  { name: "fg",        value: "#fafafa",  label: "Text"     },
  { name: "fg-muted",  value: "#a1a1aa",  label: "Muted"    },
  { name: "surface",   value: "#18181b",  label: "Surface"  },
  { name: "danger",    value: "#f87171",  label: "Danger"   },
  { name: "success",   value: "#4ade80",  label: "Success"  },
  { name: "warning",   value: "#fbbf24",  label: "Warning"  },
  { name: "border",    value: "#27272a",  label: "Border"   },
];

const layers = [
  {
    n: "01",
    name: "Primitives",
    description: "Raw scale values — color palettes in oklch(), 4px spacing scale, radius steps, font metrics, easing curves.",
    example: "--loony-blue-600: #2563eb",
    accentColor: "#60a5fa",
  },
  {
    n: "02",
    name: "Semantic",
    description: "Intent aliases. Maps primitives to purpose. Dark mode only overrides ~40 variables at this layer.",
    example: "--loony-color-accent: var(--loony-blue-600)",
    accentColor: "#c084fc",
  },
  {
    n: "03",
    name: "Component",
    description: "Per-component overrides. Swap --loony-radius-btn to full for pill-shaped buttons everywhere.",
    example: "--loony-radius-btn: var(--loony-radius-md)",
    accentColor: "#4ade80",
  },
];

export function TokensSection() {
  return (
    <section className="px-4 py-24 md:px-6" style={{ background: "#111113", borderTop: "1px solid #27272a", borderBottom: "1px solid #27272a" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3b82f6]">Design tokens</p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Theme from one CSS file.
          </h2>
          <p className="mt-4 max-w-xl text-[#71717a]">
            A 3-layer token architecture. Override ~40 semantic variables to retheme everything — dark mode, brand colors, and contrast levels are built in.
          </p>
        </div>

        {/* 3-layer cards */}
        <div className="mb-12 grid gap-3 md:grid-cols-3">
          {layers.map((layer) => (
            <div key={layer.name} className="overflow-hidden rounded-xl" style={{ background: "#09090b", border: "1px solid #27272a" }}>
              <div className="h-0.5 w-full" style={{ background: layer.accentColor }} />
              <div className="p-5">
                <div className="mb-1 font-mono text-[0.625rem] font-bold uppercase tracking-widest" style={{ color: layer.accentColor }}>
                  Layer {layer.n}
                </div>
                <h3 className="mb-2 font-semibold text-white">{layer.name}</h3>
                <p className="mb-4 text-sm leading-relaxed text-[#71717a]">{layer.description}</p>
                <div
                  className="overflow-x-auto rounded-lg p-3 font-mono text-xs text-[#a5d6ff]"
                  style={{ background: "#0d1117", border: "1px solid #21262d" }}
                >
                  {layer.example}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Color swatches */}
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#52525b]">Semantic color tokens</p>
          <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-8">
            {colorTokens.map((token) => (
              <div key={token.name} className="flex flex-col gap-1.5">
                <div
                  className="h-10 w-full rounded-lg"
                  style={{ backgroundColor: token.value, border: "1px solid rgba(255,255,255,0.06)" }}
                  title={`--loony-color-${token.name}: ${token.value}`}
                />
                <p className="truncate text-center font-mono text-[0.6875rem] text-[#52525b]">{token.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
