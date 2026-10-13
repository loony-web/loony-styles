import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./aspect-ratio.js";
import { Box } from "./box.js";
import { Container } from "./container.js";
import { Flex } from "./flex.js";
import { Grid } from "./grid.js";
import { Spacer } from "./spacer.js";

const Item = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-(--loony-radius-md) bg-(--loony-color-accent-subtle) px-4 py-2 text-center text-sm">
    {children}
  </div>
);

/** Layout primitives share one story file — they are almost always used together. */
const meta = {
  title: "Layout/Primitives",
  component: Flex,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FlexRow: Story = {
  args: { gap: 3, align: "center", justify: "between" },
  render: (args) => (
    <Flex {...args}>
      <Item>Left</Item>
      <Item>Center</Item>
      <Item>Right</Item>
    </Flex>
  ),
};

export const GridColumns: Story = {
  render: () => (
    <Grid cols={3} gap={3}>
      {Array.from({ length: 6 }, (_, i) => `Cell ${i + 1}`).map((label) => (
        <Item key={label}>{label}</Item>
      ))}
    </Grid>
  ),
};

export const ContainerSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Container key={size} size={size}>
          <Item>Container {size}</Item>
        </Container>
      ))}
    </div>
  ),
};

export const BoxAsChild: Story = {
  render: () => (
    <Box asChild className="rounded-(--loony-radius-md) border border-(--loony-color-border) p-4">
      <section>A Box rendered as a &lt;section&gt; via asChild.</section>
    </Box>
  ),
};

export const AspectRatioVideo: Story = {
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full items-center justify-center rounded-(--loony-radius-md) bg-(--loony-color-bg-muted)">
          16 : 9
        </div>
      </AspectRatio>
    </div>
  ),
};

export const SpacerPushesApart: Story = {
  render: () => (
    <Flex className="w-96">
      <Item>Logo</Item>
      <Spacer />
      <Item>Sign in</Item>
    </Flex>
  ),
};
