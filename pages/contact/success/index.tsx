import Button, { BUTTON_SIZE, BUTTON_TYPE } from '@/components/atoms/Button';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import PageTransition from '@/components/PageTransition';
import { LanguageContext } from '@/layout/default';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export default function Contact() {
  const { data } = useContext(LanguageContext);
  const router = useRouter();

  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown <= 0) {
      clearInterval(interval);
      setCountdown(0);
      router.push('/');
    }

    return () => clearInterval(interval);
  }, [countdown, router]);

  return (
    <PageTransition>
      <section className="mx-auto flex min-h-screen max-w-default flex-col items-center justify-center gap-8 px-x-default py-y-default text-center">
        <Typography type={TYPOGRAPHY_TYPE.HEADING1} className="text-center">
          {data.success.title}
        </Typography>
        <Typography type={TYPOGRAPHY_TYPE.TEXT} dangerouslySetInnerHTML={data.success.text} />
        <Typography type={TYPOGRAPHY_TYPE.TEXT}>
          {data.success.redirect}
          <strong>{countdown}</strong>.
        </Typography>
        <div className="flex gap-4">
          <Button as="a" href="/projects" size={BUTTON_SIZE.L} type={BUTTON_TYPE.PRIMARY}>
            {data.success.buttons.project}
          </Button>
          <Button as="a" href="/" size={BUTTON_SIZE.L} type={BUTTON_TYPE.SECONDARY}>
            {data.success.buttons.home}
          </Button>
        </div>
      </section>
    </PageTransition>
  );
}
