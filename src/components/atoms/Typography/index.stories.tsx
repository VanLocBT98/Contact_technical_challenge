import { Meta, Story } from '@storybook/react';

import Typography from '.';

export default {
  title: 'Components/atoms/Typography',
  component: Typography,
  argTypes: {
    type: {
      options: ['h1', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
      control: { type: 'select' },
      defaultValue: 'h1'
    },
    colors: {
      control: {
        type: 'select'
      },
      options: ['white', 'black'],
      defaultValue: 'black'
    },
    fontweight: {
      control: {
        type: 'select'
      },
      options: ['400', '700'],
      defaultValue: '700'
    },
    variants: {
      control: {
        type: 'select'
      },
      options: ['uppercase', 'capitalize', 'underline', 'italic', 'center', 'justify']
    },
    text: {
      control: {
        type: 'text'
      },
      defaultValue:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis minus eius vero, non ipsam nostrum. Minus praesentium ad unde, assumenda quam obcaecati vel, fuga magnam in quia libero magni aut?'
    },
    sizes: {
      options: ['16x24', '24x36'],
      control: {
        type: 'select'
      }
    }
  }
} as Meta;

export const normal: Story = ({ sizes, colors, variants, text, fontweight, type }) => (
  <Typography type={type} modifiers={[colors, variants, sizes, fontweight]}>
    {text}
  </Typography>
);
