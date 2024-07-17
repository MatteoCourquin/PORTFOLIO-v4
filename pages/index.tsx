import Button, { BUTTON_SIZE } from '@/components/atoms/Button';
import { IconArrowTopRight } from '@/components/atoms/Icons';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Home() {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);
  const timelineRef = useRef(gsap.timeline({ paused: true }));

  useEffect(() => {
    if (!line1Ref.current || !line2Ref.current || !line3Ref.current || !line4Ref.current) return;

    timelineRef.current
      .to([line1Ref.current, line2Ref.current], {
        height: '100%',
        duration: 2,
        ease: 'power4.inOut',
        stagger: 0,
      })
      .to(
        [line3Ref.current, line4Ref.current],
        {
          width: '100%',
          duration: 2,
          ease: 'power4.inOut',
          stagger: 0,
        },
        0,
      )
      .play();
  }, []);

  return (
    <>
      <section className="bg-gradient px-x-default py-y-default relative flex h-screen w-screen flex-col items-center justify-between text-white">
        <div ref={line1Ref} className="left-x-default absolute bottom-0 h-0 w-px bg-white"></div>
        <div ref={line2Ref} className="right-x-default absolute top-0 h-0 w-px bg-white"></div>
        <div ref={line3Ref} className="bottom-y-default absolute left-0 h-px w-0 bg-white"></div>
        <div ref={line4Ref} className="top-y-default absolute right-0 h-px w-0 bg-white"></div>
        <div className="flex h-full flex-col items-center justify-center">
          <Typography type={TYPOGRAPHY_TYPE.HEADING1} className="text-center">
            Hey👋 I'm
          </Typography>
          <Typography type={TYPOGRAPHY_TYPE.HEADING2} className="pb-4 text-center">
            Matteo COURQUIN
          </Typography>
          <Typography type={TYPOGRAPHY_TYPE.SUBTITLE} className="pb-20">
            WEB DEVELOPER ( SINCE 2019 )
          </Typography>
          <Button size={BUTTON_SIZE.L} as="button">
            Start Project <IconArrowTopRight className="ml-2 h-4" />
          </Button>
        </div>
        <div className="flex w-full items-end justify-between p-4">
          <Link className="uppercase underline" href="mailto:matteo.courquin@gmail.com">
            matteo.courquin@gmail.com
          </Link>
          <Typography type={TYPOGRAPHY_TYPE.TEXT} className="uppercase">
            ©{new Date().getFullYear()}
          </Typography>
        </div>
      </section>
      <section className="h-screen w-screen bg-black"></section>
    </>
  );
}
