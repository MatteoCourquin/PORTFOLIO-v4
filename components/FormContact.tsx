import { LanguageContext } from '@/layout/default';
import { submitContactForm } from '@/services/contact.services';
import { isEmail } from '@/utils/functions';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import Button, { BUTTON_SIZE, BUTTON_TYPE } from './atoms/Button';
import Input from './atoms/Input';

enum FORM_STATE {
  DEFAULT = 'DEFAULT',
  LOAD = 'LOAD',
  SEND = 'SEND',
  ERROR = 'ERROR',
}

const FormContact = () => {
  const { data } = useContext(LanguageContext);
  const router = useRouter();

  const [formState, setFormState] = useState(FORM_STATE.DEFAULT);
  const [loadDots, setLoadDots] = useState('. . .');

  const submitFormMutation = useMutation({
    mutationFn: submitContactForm,
    onMutate: () => {
      setFormState(FORM_STATE.LOAD);
    },
    onError: (error) => {
      setFormState(FORM_STATE.ERROR);
      console.error('onError', error);
    },
    onSuccess: () => {
      resetForm();
      router.push('/contact/success');
    },
  });

  const [formValues, setFormValues] = useState({
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

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadDots((prev) => {
        if (prev === '.') return '..';
        if (prev === '..') return '...';
        if (prev === '...') return '';
        return '.';
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <form onSubmit={(e) => handdleFormSubmit(e)} className="flex w-full flex-col gap-16">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <Input
            name="name"
            type="text"
            placeholder={data.contact.form.name.placeholder}
            dangerouslySetInnerHTML={data.contact.form.name.label}
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
            dangerouslySetInnerHTML={data.contact.form.email.label}
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
          dangerouslySetInnerHTML={data.contact.form.message.label}
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
          {formState === FORM_STATE.DEFAULT ? (
            data.contact.form.button.default
          ) : (
            <>
              {data.contact.form.button.load}
              <span className="w-0">{loadDots}</span>
            </>
          )}
        </Button>
      </form>
    </>
  );
};

export default FormContact;
