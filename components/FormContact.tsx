import { LanguageContext } from '@/layout/default';
import { isEmail } from '@/utils/functions';
import emailjs from '@emailjs/browser';
import { ChangeEvent, useContext, useState } from 'react';
import Button, { BUTTON_SIZE, BUTTON_TYPE } from './atoms/Button';
import Input from './atoms/Input';

const FormContact = () => {
  const { data } = useContext(LanguageContext);

  const [formValues, setFormValues] = useState({
    tel: '0652647110',
    name: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const resetForm = () => {
    setFormValues({
      tel: '0652647110',
      name: '',
      email: '',
      message: '',
    });
    setFormErrors({
      name: '',
      email: '',
      message: '',
    });
  };

  const isNameValid = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.value === '') {
      setFormErrors({ ...formErrors, name: data.contact.form.errors.name });
    } else {
      setFormErrors({ ...formErrors, name: '' });
    }
  };

  const isEmailValid = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.value === '') {
      setFormErrors({ ...formErrors, email: data.contact.form.errors.email });
    } else if (!isEmail(e.target.value)) {
      setFormErrors({ ...formErrors, email: data.contact.form.errors.emailValid });
    } else {
      setFormErrors({ ...formErrors, email: '' });
    }
  };

  const handdleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formValues.name === '' && formValues.email === '') {
      setFormErrors({
        ...formErrors,
        name: data.contact.form.errors.name,
        email: data.contact.form.errors.email,
      });
    } else if (formValues.name === '') {
      setFormErrors({ ...formErrors, name: data.contact.form.errors.name });
    } else if (formValues.email === '') {
      setFormErrors({ ...formErrors, email: data.contact.form.errors.email });
    } else if (!isEmail(formValues.email)) {
      setFormErrors({ ...formErrors, email: data.contact.form.errors.emailValid });
    }

    if (!formValues.name || !formValues.email || !isEmail(formValues.email)) return;

    if (
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID === undefined ||
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID === undefined
    ) {
      console.error('EmailJS is not configured');
      return;
    }

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formValues,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      )
      .then(
        (response) => {
          resetForm();
          console.log('SUCCESS', response.status, response.text);
        },
        (error) => {
          console.log('FAILED', error);
        },
      );
  };
  return (
    <>
      <form onSubmit={(e) => handdleFormSubmit(e)} className="flex w-full flex-col gap-16">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <Input
            name="name"
            type="text"
            placeholder={data.contact.form.name.placeholder}
            label={data.contact.form.name.label}
            value={formValues.name}
            required={true}
            onChange={(e) => {
              isNameValid(e);
              setFormValues({ ...formValues, name: e.target.value });
            }}
            onBlur={(e) => isNameValid(e)}
            error={formErrors.name !== ''}
            errorMessage={formErrors.name}
          />
          <Input
            name="email"
            type="mail"
            placeholder={data.contact.form.email.placeholder}
            label={data.contact.form.email.label}
            value={formValues.email}
            required={true}
            onChange={(e) => {
              isEmailValid(e);
              setFormValues({ ...formValues, email: e.target.value });
            }}
            onBlur={(e) => isEmailValid(e)}
            error={formErrors.email !== ''}
            errorMessage={formErrors.email}
          />
        </div>
        <Input
          name="message"
          type="textarea"
          placeholder={data.contact.form.message.placeholder}
          label={data.contact.form.message.label}
          value={formValues.message}
          onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
        />
        <Button
          inForm={true}
          as="button"
          size={BUTTON_SIZE.L}
          type={BUTTON_TYPE.PRIMARY}
          className="mx-auto"
        >
          {data.contact.form.button}
        </Button>
      </form>
    </>
  );
};

export default FormContact;
