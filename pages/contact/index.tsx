import ArrowBack from '@/components/ArrowBack';
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
      <SEO title={data.head.titleAbout} image="/ogContact.png" />
      <section className="px-x-default py-y-default">
        <div className="absolute left-x-default top-y-default z-50 flex -translate-y-1/2 cursor-pointer items-center shadow-white transition-transform sm:-translate-x-1/2">
          <ArrowBack href="/" />
        </div>
        <div className="mx-auto flex min-h-screen max-w-default flex-col items-center gap-16">
          <Typography type={TYPOGRAPHY_TYPE.HEADING1} className="pt-y-default text-center">
            {data.contact.title}
          </Typography>
          <div className="flex w-full flex-col items-center justify-center gap-8">
            <FormContact />
            <div className="flex flex-col items-center justify-center gap-8">
              <Typography
                className="text-black-light"
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
        </div>
      </section>
    </>
  );
}
