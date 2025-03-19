import { Meta, StoryObj } from '@storybook/react';

import Menu, { IMenuProps } from '.';

interface StoryProps extends IMenuProps {
  children?: React.ReactNode;
}
const meta = {
  title: 'Components/organisms/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {}
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = ({ children }: StoryProps) => <Menu>{children}</Menu>;
Normal.args = {};
