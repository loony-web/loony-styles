import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  // Globs are resolved relative to this .storybook/ directory.
  stories: [
    // Component stories from the UI package
    "../../../packages/ui/src/**/*.stories.@(ts|tsx)",
    // Documentation-only stories in this app
    "../src/stories/**/*.stories.@(ts|tsx)",
    // MDX documentation
    "../../../packages/ui/src/**/*.mdx",
    "../src/stories/**/*.mdx",
  ],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    {
      name: "@storybook/addon-docs",
      options: {
        csfPluginOptions: null,
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [],
          },
        },
      },
    },
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  docs: {
    autodocs: "tag",
    defaultName: "Docs",
  },

  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        // Filter out HTML element props to keep prop tables clean
        if (prop.parent) {
          return !prop.parent.fileName.includes("node_modules/@types/react");
        }
        return true;
      },
    },
  },

  viteFinal: async (config) => {
    return {
      ...config,
      // This app's tsconfig uses `"jsx": "preserve"` for Next.js, which makes
      // esbuild fall back to the classic `React.createElement` runtime here.
      esbuild: { ...config.esbuild, jsx: "automatic" },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
        },
      },
    };
  },
};

export default config;
