# ADR-008: React Server Components Compatibility

**Status:** Accepted  
**Date:** 2026-07-01

## Context

React 19 and the Next.js App Router use React Server Components (RSC). Component libraries must declare which components can be server components and which require `"use client"`. The wrong decision in either direction causes runtime errors or forces unnecessary JavaScript hydration.

## Decision

**Default to server components** where possible. Add `"use client"` only to components that require browser APIs, event handlers, or React hooks that are client-only.

## Rules

### Server components (no directive needed)
A component can be a server component if it:
- Contains no event handlers (`onClick`, `onChange`, etc.)
- Uses no React hooks
- Accesses no browser APIs (`window`, `document`, `localStorage`)
- Has no animated state

Components: `Badge`, `Card`, `Heading`, `Text`, `Code`, `Kbd`, `VisuallyHidden`, `Skeleton` (static version), `Alert` (static), all layout primitives.

### Client components (requires `"use client"`)
A component must be a client component if it:
- Uses any React hook (`useState`, `useEffect`, `useRef`, `useContext`, etc.)
- Has interactive event handlers
- Uses Radix UI primitives (they internally use hooks)
- Uses Motion animations

Components: All form inputs, overlays, navigation components, interactive feedback.

## Boundary strategy

Place `"use client"` at the **leaf level**, not at the package entry point. This means:

```
// button.tsx
"use client";  // ← on the specific component file

// card.tsx
// (no directive — server component)
```

Do NOT put `"use client"` in the barrel `index.ts`. This would force the entire library client-side, defeating RSC.

## Package exports

`@loony/ui` exports components individually:
```json
{
  "exports": {
    "./button": "./dist/button/index.js",
    "./card": "./dist/card/index.js"
  }
}
```

This allows Next.js RSC tree-shaking to split server/client boundaries at the component level.

## Directive placement

The `"use client"` directive goes at the top of component files, before imports:

```typescript
"use client";

import { useState } from "react";
```

Not in stories, tests, or type files.

## Trade-offs

- Maintaining per-file directives requires discipline — easy to miss when adding a hook to a previously server-safe component.
- Some Radix primitives force client boundaries higher up the tree than ideal.
- SSR-first rendering of client components still works — `"use client"` means "this component can use client features", not "skip SSR".

## Consequences

- Components that add a hook in the future must be audited and have `"use client"` added.
- CI can check for components that use hooks but lack the directive (future lint rule).
- Documentation explicitly marks each component as Server or Client.
