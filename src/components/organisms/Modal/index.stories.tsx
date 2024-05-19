/* eslint-disable react-hooks/rules-of-hooks */
import { Story, Meta } from '@storybook/react';
import React, { useState } from 'react';

import Modal from '.';

export default {
  title: 'Components/organisms/Modal',
  component: Modal,
  argTypes: {},
} as Meta;

export const normal: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <button type="button" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      <Modal
        modifiers="image"
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      >
        <div style={{
          background: 'white',
          color: '#000',
        }}
        >
          <br />
          <br />
          <br />
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled
          it to make a type specimen book.
          <br />
          <br />
          <br />
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled
          it to make a type specimen book.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled
          it to make a type specimen book.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled
          it to make a type specimen book.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled
          it to make a type specimen book.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled
          it to make a type specimen book.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled
          it to make a type specimen book.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled
          it to make a type specimen book.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled
          it to make a type specimen book.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled
          it to make a type specimen book.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled
          it to make a type specimen book.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled
          it to make a type specimen book.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled
          it to make a type specimen book.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled
          it to make a type specimen book.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled
          it to make a type specimen book.
        </div>
      </Modal>
    </div>
  );
};
