import { Story, Meta } from '@storybook/react';
import React from 'react';

import ContactForm, { ContactFormProps } from '.';

export default {
  title: 'Components/templates/ContactForm',
  component: ContactForm,
  argTypes: {},
  args: {
    title: 'THÔNG TIN LIÊN HỆ',
    description: 'Quý khách đăng ký nhận email thông tin dự án, các chương trình ưu đãi, khuyến mại và tin tức mới nhất từ Aqua City',
    placeholders: {
      fullName: 'HỌ VÀ TÊN',
      address: 'ĐỊA CHỈ',
      phone: 'ĐIỆN THOẠI * ',
      email: 'EMAIL * ',
      content: 'NỘI DUNG '
    },
    submitText: 'Đăng ký nhận thông tin'
  },

} as Meta;

export const Normal: Story<ContactFormProps> = ({ ...args }) => (
  <ContactForm
    {...args}
  />
);
