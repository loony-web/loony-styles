import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createIcon } from "./create-icon.js";
import { IconBase } from "./icon-base.js";
import * as exports from "./index.js";

const render = (node: React.ReactElement) => renderToStaticMarkup(node);

describe("IconBase", () => {
  it("is decorative by default (aria-hidden, no role)", () => {
    const html = render(
      <IconBase>
        <path d="M0 0" />
      </IconBase>,
    );
    expect(html).toContain('aria-hidden="true"');
    expect(html).not.toContain('role="img"');
    expect(html).not.toContain("aria-label");
  });

  it("exposes role=img and aria-label when labelled", () => {
    const html = render(
      <IconBase label="Search">
        <path d="M0 0" />
      </IconBase>,
    );
    expect(html).toContain('role="img"');
    expect(html).toContain('aria-label="Search"');
    expect(html).not.toContain("aria-hidden");
  });

  it("defaults to 1em so it scales with surrounding text", () => {
    const html = render(
      <IconBase>
        <path d="M0 0" />
      </IconBase>,
    );
    expect(html).toContain('width="1em"');
    expect(html).toContain('height="1em"');
  });

  it("applies `size` to both dimensions and prefers it over width/height", () => {
    const html = render(
      <IconBase size={20} width={10} height={10}>
        <path d="M0 0" />
      </IconBase>,
    );
    expect(html).toContain('width="20"');
    expect(html).toContain('height="20"');
  });

  it("inherits color via currentColor and is not focusable", () => {
    const html = render(
      <IconBase>
        <path d="M0 0" />
      </IconBase>,
    );
    expect(html).toContain('stroke="currentColor"');
    expect(html).toContain('focusable="false"');
  });

  it("passes through arbitrary SVG props", () => {
    const html = render(
      <IconBase className="custom" data-testid="icon">
        <path d="M0 0" />
      </IconBase>,
    );
    expect(html).toContain('class="custom"');
    expect(html).toContain('data-testid="icon"');
  });
});

describe("createIcon", () => {
  it("sets displayName and renders the given paths", () => {
    const TestIcon = createIcon("TestIcon", <circle cx="12" cy="12" r="4" />);
    expect(TestIcon.displayName).toBe("TestIcon");
    expect(render(<TestIcon />)).toContain('<circle cx="12" cy="12" r="4">');
  });
});

describe("icon set", () => {
  const icons = Object.entries(exports).filter(([name]) => /^[A-Z]\w*Icon$/.test(name));

  it("exports icons", () => {
    expect(icons.length).toBeGreaterThan(0);
  });

  it.each(icons)("%s has a matching displayName and renders an svg", (name, Icon) => {
    const Component = Icon as React.FC & { displayName?: string };
    expect(Component.displayName).toBe(name);

    const html = render(<Component />);
    expect(html).toMatch(/^<svg[^>]*data-icon/);
    expect(html).toContain('viewBox="0 0 24 24"');
  });
});
