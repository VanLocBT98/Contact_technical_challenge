import { Meta, StoryObj } from '@storybook/react';

import AgGrid from '.';

const meta = {
  title: 'Components/templates/AgGrid',
  component: AgGrid,
  tags: ['autodocs'],
  argTypes: {}
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = () => <AgGrid columnDefs={[]} rowData={[]} />;
Normal.args = {};
