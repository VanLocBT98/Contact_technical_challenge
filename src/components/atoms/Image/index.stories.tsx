import { Story, Meta } from '@storybook/react';
import React from 'react';

import Image from '.';

export default {
  title: 'Components/atoms/Image',
  component: Image,
  argTypes: {
    size: {
      options: ['contain', 'cover'],
      control: { type: 'select' },
    },
    loading: {
      options: ['lazy', 'eager'],
      control: { type: 'select' },
    }
  },
  args: {
    src: 'https://source.unsplash.com/random',
    srcTablet: 'https://source.unsplash.com/random',
    srcMobile: 'https://source.unsplash.com/random',
    alt: 'alt holder',
    ratio: '1x1',
    size: 'cover',
    loading: 'lazy',
  }
} as Meta;

export const normal: Story = ({ ...args }) => (
  <div style={{ maxWidth: 500 }}>
    <Image {...args} />
  </div>
);
