import { Meta, Story } from '@storybook/react';

import Button from '.';

export default {
  title: 'Components/atoms/Button',
  component: Button,
  argTypes: {
    isLoading: {
      control: {
        type: 'boolean'
      },
      options: [false, true],
      defaultValue: false
    },
    children: {
      control: {
        type: 'text'
      },
      defaultValue: 'Button'
    }
  }
} as Meta;

export const normal: Story = ({ isLoading, children }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
    <Button isLoading={isLoading} modifiers={['cancel']}>
      hii
      {children}
    </Button>
  </div>
);
