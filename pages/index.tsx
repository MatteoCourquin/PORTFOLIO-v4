import Button, { BUTTON_SIZE } from '@/components/atoms/Button';
import { IconArrowTopRight } from '@/components/atoms/Icons';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';

export default function Home() {
  return (
    <>
      <section className="bg-gradient flex h-screen w-screen flex-col items-center justify-center text-white">
        <Typography type={TYPOGRAPHY_TYPE.HEADING1} className="text-center">
          Hey👋 I'm
        </Typography>
        <Typography type={TYPOGRAPHY_TYPE.HEADING2} className="text-center">
          Matteo COURQUIN
        </Typography>
        <Typography type={TYPOGRAPHY_TYPE.SUBTITLE}>WEB DEVELOPER ( SINCE 2019 )</Typography>
        <Button size={BUTTON_SIZE.L} as="button">
          Start Project <IconArrowTopRight className="ml-2 h-4" />
        </Button>
      </section>
    </>
  );
}
