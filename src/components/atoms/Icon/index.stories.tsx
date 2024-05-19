import { Meta, Story } from '@storybook/react';

import Icon, { iconList, IconName } from '.';

export default {
  title: 'Components/atoms/Icon',
  component: Icon,
  argTypes: {
    size: {
      control: {
        type: 'select'
      },
      options: ['10x10', '14x14', '16x16', '18x18', '20x20', '24x24', '40x40'],
      defaultValue: '24x24'
    }
  }
} as Meta;

const listIcon = Object.keys(iconList).map((item) => item as IconName);

// eslint-disable-next-line react/prop-types
export const Normal: Story = ({ size }) => (
  <div
    style={{
      backgroundColor: '#ddd',
      padding: 10,
      display: 'flex',
      flexWrap: 'wrap'
    }}
  >
    {listIcon.map((item, index) => (
      <div key={`icon-${index.toString()}`} style={{ marginLeft: 7 }}>
        <Icon size={size} iconName={item} />
      </div>
    ))}
  </div>
);
