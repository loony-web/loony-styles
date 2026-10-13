import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as p from "@clack/prompts";
import kleur from "kleur";
import { readConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";

interface ScaffoldOptions {
  cwd: string;
  path?: string;
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

function generateComponentTemplate(
  name: string,
  ts: boolean,
): {
  component: string;
  styles: string;
  types: string;
  test: string;
  stories: string;
  index: string;
} {
  const pascal = toPascalCase(name);
  const kebab = toKebabCase(name);

  const component = `import { type ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@loony/utils";
import { type ${pascal}Props } from "./${kebab}.types${ts ? "" : ""}.js";
import { ${camelCase(name)}Variants } from "./${kebab}.styles.js";

/**
 * ${pascal}
 *
 * [Add description here]
 */
export function ${pascal}({
  className,
  variant,
  size,
  ...props
}: ${pascal}Props) {
  return (
    <div
      className={cn(${camelCase(name)}Variants({ variant, size }), className)}
      data-component="${kebab}"
      {...props}
    />
  );
}

${pascal}.displayName = "${pascal}";
`;

  const styles = `import { cva } from "class-variance-authority";

export const ${camelCase(name)}Variants = cva(
  // Base styles
  [""],
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
`;

  const types = `import { type ComponentPropsWithRef } from "react";
import { type VariantProps } from "class-variance-authority";
import { type ${camelCase(name)}Variants } from "./${kebab}.styles.js";

export interface ${pascal}Props
  extends ComponentPropsWithRef<"div">,
    VariantProps<typeof ${camelCase(name)}Variants> {}
`;

  const test = `import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ${pascal} } from "./${kebab}.js";

describe("${pascal}", () => {
  it("renders without errors", () => {
    render(<${pascal} />);
    expect(screen.getByTestId("${kebab}") ?? document.querySelector("[data-component=${kebab}]")).toBeTruthy();
  });

  it("applies className", () => {
    const { container } = render(<${pascal} className="custom" />);
    expect(container.firstChild).toHaveClass("custom");
  });
});
`;

  const stories = `import type { Meta, StoryObj } from "@storybook/react";
import { ${pascal} } from "./${kebab}.js";

const meta: Meta<typeof ${pascal}> = {
  title: "Custom/${pascal}",
  component: ${pascal},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ${pascal}>;

export const Default: Story = {};
`;

  const index = `export { ${pascal} } from "./${kebab}.js";
export type { ${pascal}Props } from "./${kebab}.types.js";
`;

  return { component, styles, types, test, stories, index };
}

function camelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

/**
 * loony scaffold — Generate a new component with Loony's standard structure.
 */
export async function scaffold(name: string, opts: ScaffoldOptions) {
  const cwd = opts.cwd ?? process.cwd();
  const config = readConfig(cwd);
  const pascalName = toPascalCase(name);
  const kebabName = toKebabCase(name);

  const targetDir = opts.path
    ? join(cwd, opts.path, kebabName)
    : join(cwd, config.componentsDir, kebabName);

  p.intro(kleur.bold().cyan("  loony scaffold  "));

  if (existsSync(targetDir)) {
    const overwrite = await p.confirm({
      message: `Directory ${targetDir} already exists. Overwrite?`,
      initialValue: false,
    });

    if (p.isCancel(overwrite) || !overwrite) {
      p.cancel("Cancelled.");
      process.exit(0);
    }
  }

  mkdirSync(targetDir, { recursive: true });

  const templates = generateComponentTemplate(name, config.typescript);
  const ext = config.typescript ? "tsx" : "jsx";

  const files: [string, string][] = [
    [`${kebabName}.${ext}`, templates.component],
    [`${kebabName}.styles.ts`, templates.styles],
    [`${kebabName}.types.ts`, templates.types],
    [`${kebabName}.test.${ext}`, templates.test],
    [`${kebabName}.stories.${ext}`, templates.stories],
    ["index.ts", templates.index],
  ];

  for (const [filename, content] of files) {
    writeFileSync(join(targetDir, filename), content, "utf-8");
    logger.success(`Created ${filename}`);
  }

  p.note(
    [
      "Import your component:",
      "",
      kleur.cyan(
        `import { ${pascalName} } from "${config.importAlias}/components/ui/${kebabName}";`,
      ),
    ].join("\n"),
    "Usage",
  );

  p.outro(kleur.green(`${pascalName} scaffolded at ${targetDir}`));
}
