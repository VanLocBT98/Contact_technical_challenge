import emailjs from '@emailjs/browser';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import {
  Controller, FormProvider,
  useForm
} from 'react-hook-form';
import { dataConfirm } from '~/assets/dummy/mock';
import Button from '~/components/atoms/Button';
import Input from '~/components/atoms/Input';
import TextArea from '~/components/atoms/TextArea';
import Typography from '~/components/atoms/Typography';
import Notify from '~/components/organisms/Notify';
import { ContactFormInput, ContactFormProps } from '~/components/templates/ContactFormNormal';
import { capitalizeKeys } from '~/hooks/useCapitalize';
import { TYPE } from '~/utils/enums';
import { consultancyStandardSchemas } from '~/utils/schemas';
import './index.scss';

const ContactFormStandard: React.FC<ContactFormProps> = ({
  title, description, submitText, placeholders, price
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const method = useForm<ContactFormInput>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
    resolver: yupResolver(consultancyStandardSchemas as any)
  });
  const handleSubmit = async (params: ContactFormInput) => {
    const dataForm = capitalizeKeys(params as unknown as Record<string, unknown>);
    fetch(
      `${import.meta.env.VITE_API_URL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...dataForm, Type: TYPE.STANDARD, Price: price })
      }
    )
      .then((res) => res.json())
      .then((data) => {
        emailjs.sendForm('service_f58kpgh', 'template_vg4nxcn', '#contact-form', 'FTMvBV_oyO4vTkgs3')
        setIsOpen(true)
        method.reset()
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="t-contactForm">
      <div className="t-contactForm_wrap">
        <Typography type="h3" modifiers={['32x48', 'deepSpaceSparkle', 'center', '700']} content={title} />
        {description
          && (
            <div className="t-contactForm_description">
              <Typography type="p" modifiers={['14x21', 'darkLiver', 'center']} content={description} />
            </div>
          )}

        <FormProvider {...method}>
          <form className="t-contactForm_form"
            id="contact-form"
            onSubmit={method.handleSubmit(handleSubmit)}
          >
            <div className="t-contactForm_field">
              <Controller
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <Input
                    id={field.name}
                    label={field.name}
                    type="text"
                    variant="borderRadius"
                    placeholder={placeholders?.name}
                    {...field}
                    error={error?.message}
                  />
                )}
              />
            </div>
            <div className="t-contactForm_field">
              <Controller
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <div className="t-contactForm_field">
                    <Input
                      id={field.name}
                      label={field.name}
                      variant="borderRadius"
                      placeholder={placeholders?.email}
                      {...field}
                      error={error?.message}
                    />
                  </div>
                )}
              />
            </div>
            <div className="t-contactForm_field">
              <Controller
                name="phone"
                render={({ field, fieldState: { error } }) => (
                  <div className="t-contactForm_field">
                    <Input
                      id={field.name}
                      label={field.name}
                      type="text"
                      variant="borderRadius"
                      placeholder={placeholders?.phone}
                      {...field}
                      error={error?.message}
                    />
                  </div>
                )}
              />
            </div>
            <div className="t-contactForm_field">
              <Controller
                name="message"
                render={({ field, fieldState: { error } }) => (
                  <TextArea
                    rows={5}
                    id={field.name}
                    label={field.name}
                    placeholder={placeholders?.message}
                    {...field}
                    handleOnchange={field.onChange}
                    error={error?.message}
                    readOnly={false}
                  />
                )}
              />
            </div>
            <div className="t-contactForm_hidden">
              <Controller
                name="type"
                render={({ field, fieldState: { error } }) => (
                  <div className="t-contactForm_field">
                    <Input
                      id={field.name}
                      label={field.name}
                      type="text"
                      variant="borderRadius"
                      placeholder={placeholders?.phone}
                      {...field}
                      value={TYPE.STANDARD}
                      error={error?.message}
                    />
                  </div>
                )}
              />
            </div>
            <div className="t-contactForm_hidden">
              <Controller
                name="price"
                render={({ field, fieldState: { error } }) => (
                  <div className="t-contactForm_field">
                    <Input
                      id={field.name}
                      label={field.name}
                      type="text"
                      variant="borderRadius"
                      placeholder={placeholders?.phone}
                      {...field}
                      value={price}
                      error={error?.message}
                    />
                  </div>
                )}
              />
            </div>
            <div className="t-contactForm_action">
              <Button type="submit">
                {submitText}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
      <Notify
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        {...dataConfirm}
      />
    </div>
  );
};


export default ContactFormStandard;
