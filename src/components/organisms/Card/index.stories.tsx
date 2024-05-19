import { Meta, Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import Card from '.';

export default {
  title: 'Components/organisms/Card',
  argTypes: {},
} as Meta;


export const division: Story = () => (
  <BrowserRouter>

    <Card.Division
      thumbnail="https://picsum.photos/500"
      title="Sun Habor"
      description="Now that there is the Tec-9, a crappy spray Now that there is the Tec-9, a crappy spray"
      link={{
        text: 'See detail'
      }}
    />

  </BrowserRouter>
);


