import { Story, Meta } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Link from '.';

export default {
  title: 'Components/atoms/Link',
  component: Link,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <BrowserRouter>
    <Link href="internal">
      internal
    </Link>
    <br />
    <Link href="https://google.com">
      external
    </Link>
  </BrowserRouter>
);
