import Button, { BUTTON_SIZE, BUTTON_TYPE } from '@/components/atoms/Button';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import FormContact from '@/components/FormContact';

export default function Contact() {
  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-between gap-16 px-x-default py-y-default">
        <Typography type={TYPOGRAPHY_TYPE.HEADING1} className="pt-y-default text-center">
          Let’s start a new project 🙌
        </Typography>
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <FormContact />
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
