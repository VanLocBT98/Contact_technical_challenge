import { PLACEHOLDERS } from "~/utils/enums"

export const dataOption = [
  {
    thumbnail: 'https://picsum.photos/500',
    title: 'Normal',
    description: 'Starting at free',
    link: {
      url: '/services/normal',
      text: 'See detail'
    },
  },
  {
    thumbnail: 'https://picsum.photos/500',
    title: 'Standard',
    description: 'Starting at 10$/first send',
    link: {
      url: '/services/standard',
      text: 'See detail'
    },
  },
  {
    thumbnail: 'https://picsum.photos/500',
    title: 'Premium',
    description: 'Starting at 15$/first send',
    link: {
      url: '/services/premium',
      text: 'See detail'
    },
  }
]

export const dataMockForm = {
  normal: {
    title: "Contact Normal",
    placeholders: {
      name: PLACEHOLDERS.NAME,
      email: PLACEHOLDERS.EMAIL,
      message: PLACEHOLDERS.MESSAGE
    },
    submitText: "Submit",
    price: 'free'
  },
  standard: {
    title: "Contact Standard",
    placeholders: {
      name: PLACEHOLDERS.NAME,
      email: PLACEHOLDERS.EMAIL,
      phone: PLACEHOLDERS.PHONE,
      message: PLACEHOLDERS.MESSAGE
    },
    submitText: "Submit",
    price: '10$'
  },
  premium: {
    title: "Contact Premium",
    placeholders: {
      name: PLACEHOLDERS.NAME,
      email: PLACEHOLDERS.EMAIL,
      message: PLACEHOLDERS.MESSAGE,
      phone: PLACEHOLDERS.PHONE,
      address: PLACEHOLDERS.ADDRESS,
      company: PLACEHOLDERS.COMPANY,

    },
    submitText: "Submit",
    price: '15$'
  },
}

export const dataConfirm = {
  title: "Contact successful",
  message: "Thank you for contacting us. We will contact as soon as possible.",
  btnText: "Confirm"
}