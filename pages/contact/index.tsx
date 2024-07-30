import Button, { BUTTON_SIZE, BUTTON_TYPE } from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import { useState } from 'react';

export default function Contact() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });
  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-between gap-16 px-x-default py-y-default">
        <Typography
          // ref={heroRefs.texts.text1}
          type={TYPOGRAPHY_TYPE.HEADING1}
          className="pt-y-default text-center"
        >
          Let’s start a new project 🙌
        </Typography>
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <form action="" className="flex w-full flex-col gap-16">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
              <Input
                type="text"
                required={true}
                placeholder="John Doe"
                label="What’s your name ?"
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
              />
              <Input
                type="mail"
                required={true}
                placeholder="johndoe@gmail.com"
                label="What’s your e-mail ?"
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
              />
            </div>
            <Input
              type="textarea"
              placeholder="Hey, I love what you’re doing ..."
              label="Your message"
              value={formValues.message}
              onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
            />
            <Button as="button" size={BUTTON_SIZE.L} type={BUTTON_TYPE.PRIMARY} className="mx-auto">
              SEND
            </Button>
          </form>
          <div className="flex flex-col items-center justify-center gap-8">
            <Typography as={TYPOGRAPHY_TYPE.TEXT}>or take a meeting</Typography>
            <Button
              as="a"
              href="https://calendly.com/matteo-courquin/consultation-projet-client"
              target="_blank"
              size={BUTTON_SIZE.L}
              type={BUTTON_TYPE.SECONDARY}
            >
              CALENDLY
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
