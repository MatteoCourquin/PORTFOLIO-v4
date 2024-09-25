import Button, { BUTTON_SIZE, BUTTON_TYPE } from '@/components/atoms/Button';
import { IconBack } from '@/components/atoms/Icons';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import FormContact from '@/components/FormContact';
import PageTransition from '@/components/PageTransition';
import SEO from '@/components/SEO';
import { LanguageContext } from '@/layout/default';
import { useMagnet, useResetMagnet } from '@/utils/animations';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export default function Contact() {
  const { data } = useContext(LanguageContext);
  const router = useRouter();

  return (
    <PageTransition>
      <SEO title={data.head.titleAbout} image="/ogContact.png" />
      <section className="px-x-default py-y-default">
        <div className="absolute left-x-default top-y-default z-50 flex -translate-y-1/2 cursor-pointer items-center shadow-white transition-transform sm:-translate-x-1/2">
          <div
            onMouseMove={(e) => useMagnet(e, 1)}
            onMouseOut={(e) => useResetMagnet(e)}
            onClick={() => router.back()}
          >
            <IconBack className="stroke-primary" />
          </div>
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
    </PageTransition>
  );
}
