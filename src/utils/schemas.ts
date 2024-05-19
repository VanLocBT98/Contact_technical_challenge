
import * as yup from 'yup';

export const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

export const contactSchemas = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your name'),
  email: yup
    .string()
    .required('Please enter your email')
    .email('Invalid email'),
  message: yup.string().required('Please enter a message'),
});
export const consultancyStandardSchemas = yup.object().shape({
  phone: yup
    .string()
    .required('Please enter your phone number')
    .matches(phoneRegExp, 'Invalid phone  '),
  email: yup
    .string()
    .required('')
    .email(''),
  name: yup
    .string()
    .required('Please enter your name'),
  message: yup.string().required('Please enter a message'),
});
export const consultancySchemas = yup.object().shape({
  phone: yup
    .string()
    .required('Please enter your phone number')
    .matches(phoneRegExp, 'Invalid phone  '),
  email: yup
    .string()
    .required('')
    .email(''),
  name: yup
    .string()
    .required('Please enter your name'),
  message: yup.string().required('Please enter a message'),
  company: yup.string().required('Please enter your company'),
});
