import { TypeContactFormData } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import { submitContactForm } from '@/services/api';
import { isEmail } from '@/utils/functions';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useContext, useState } from 'react';
import Button, { BUTTON_SIZE, BUTTON_TYPE } from './atoms/Button';
import Input from './atoms/Input';

const FormContact = () => {
  const { data } = useContext(LanguageContext);

  const submitFormMutation = useMutation({
    mutationFn: submitContactForm,
    onMutate: () => {
      console.log('onMutate');
    },
    onError: (error) => {
      console.log('onError', error);
    },
    onSuccess: (data) => {
      resetForm();
      console.log('onSuccess', data);
    },
  });

  const [formValues, setFormValues] = useState<TypeContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

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

  const resetForm = () => {
    setFormValues({ name: '', email: '', message: '' });
    setFormErrors({ name: '', email: '', message: '' });
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

    submitFormMutation.mutate(formValues);
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
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
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
