import Button, { BUTTON_SIZE, BUTTON_TYPE } from '@/components/atoms/Button';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import { TypePaths } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import { fetchPaths } from '@/services/paths.sevices';
import MotionNumber from 'motion-number';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export default function Custom404(_: { paths: TypePaths[] }) {
  const router = useRouter();
  const { data } = useContext(LanguageContext);
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
    <section className="mx-auto flex min-h-screen max-w-default flex-col items-center justify-center gap-8 px-x-default py-y-default pb-[20vh] text-center">
      <Typography type={TYPOGRAPHY_TYPE.HEADING1} className="text-home">
        404
      </Typography>
      <Typography type={TYPOGRAPHY_TYPE.TEXT}>{data[404].text} 🕵️‍♂️</Typography>
      <Typography type={TYPOGRAPHY_TYPE.TEXT}>
        {data[404].redirect} <MotionNumber value={countdown} className="w-8 font-bold" />
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
  );
}

export const getStaticProps = async () => {
  const paths = await fetchPaths();

  return {
    props: {
      paths,
    },
  };
};
