import { Meta, Story } from '@storybook/react';
import { useState } from 'react';

import Notify from '.';

export default {
  title: 'Components/organisms/Notify',
  component: Notify,
  argTypes: {},
} as Meta;

export const normal: Story = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>Open</button>
      <Notify
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Contact successful"
        message="Thank you for contacting us. We will contact as soon as possible."
        btnText="Confirm"
      />
    </>
  );
};
