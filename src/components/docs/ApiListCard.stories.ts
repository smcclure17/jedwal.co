import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import "../../app/globals.css"

import { ApiListCard } from "./ApiListCard";

const meta = {
  title: "Example/ApiListCard",
  component: ApiListCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof ApiListCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},};
