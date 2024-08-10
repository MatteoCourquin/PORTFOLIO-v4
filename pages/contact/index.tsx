import Button, { BUTTON_SIZE, BUTTON_TYPE } from '@/components/atoms/Button';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import FormContact from '@/components/FormContact';
import SEO from '@/components/SEO';
import { LanguageContext } from '@/layout/default';
import { useContext } from 'react';

export default function Contact() {
  const { data } = useContext(LanguageContext);

  return (
    <>
      <SEO title={data.head.titleAbout} image='/ogContact.png' />
      <section className="flex min-h-screen flex-col items-center justify-between gap-16 px-x-default py-y-default">
        <Typography type={TYPOGRAPHY_TYPE.HEADING1} className="pt-y-default text-center">
          {data.contact.title}
        </Typography>
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <FormContact />
          <div className="flex flex-col items-center justify-center gap-8">
            <Typography
              as={TYPOGRAPHY_TYPE.TEXT}
              dangerouslySetInnerHTML={data.contact.consultation}
            />
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
