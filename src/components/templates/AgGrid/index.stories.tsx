import { Meta, StoryObj } from '@storybook/react';

import AgGrid, { IAgGridProps } from '.';

interface StoryProps extends IAgGridProps {
  children?: React.ReactNode;
}
const meta = {
  title: 'Components/templates/AgGrid',
  component: AgGrid,
  tags: ['autodocs'],
  argTypes: {}
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = ({children}:StoryProps) => (
  <AgGrid>{children}</AgGrid>
);
Normal.args = {}
