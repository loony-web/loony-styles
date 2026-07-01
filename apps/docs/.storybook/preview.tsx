import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "@loony/ui/styles";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      sort: "requiredFirst",
    },
    docs: {
      toc: {
        title: "On this page",
        disable: false,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            // Disabled for Storybook-specific layout issues, not component issues
            id: "color-contrast",
            enabled: true,
          },
        ],
      },
    },
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "oklch(1 0 0)" },
        { name: "dark", value: "oklch(0.130 0.028 261.692)" },
        { name: "neutral", value: "oklch(0.967 0.003 264.542)" },
      ],
    },
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),

    (Story) => (
      <div className="p-8 font-sans">
        <Story />
      </div>
    ),
  ],
};

export default preview;
