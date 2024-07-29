import { useMagnet, useResetMagnet } from '@/utils/animations';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';

const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef(null);
  const timelineRef = useRef(gsap.timeline({ paused: true }));

  const playAnimation = () => {
    timelineRef.current
      .add(
        gsap.fromTo(
          wrapperRef.current,
          {
            visibility: 'hidden',
            scale: 0,
            duration: 0,
          },
          {
            visibility: 'visible',
            scale: 1,
            duration: 0,
          },
        ),
      )
      .add(
        gsap.fromTo(
          backgroundRef.current,
          {
            scale: 0,
            duration: 0.8,
            ease: 'power3.inOut',
          },
          {
            scale: 60,
            duration: 0.8,
            ease: 'power3.inOut',
          },
        ),
      )
      .add(
        gsap.fromTo(
          [text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current],
          {
            y: -16,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.inOut',
            stagger: 0.1,
          },
        ),
        '-=0.4',
      )
      .play();
  };

  const handdleOpen = () => {
    setIsOpen(true);
    playAnimation();
  };

  const handdleClose = () => {
    setIsOpen(false);
    timelineRef.current.reverse();
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="invisible fixed left-0 right-0 top-0 z-[90] h-screen w-screen scale-0"
      >
        <div
          ref={backgroundRef}
          className="absolute right-x-default top-10 aspect-square h-16 w-16 translate-x-8 scale-100 rounded-full bg-black sm:h-20 sm:w-20 sm:translate-x-10"
        ></div>
        <nav className="z-[90] flex h-screen w-screen flex-col items-center justify-center gap-8 uppercase text-white">
          <Link ref={text1Ref} href="/" onClick={handdleClose}>
            <Typography type={TYPOGRAPHY_TYPE.TEXT} as={TYPOGRAPHY_TYPE.HEADING3}>
              Home
            </Typography>
          </Link>
          <Link ref={text2Ref} href="/projects" onClick={handdleClose}>
            <Typography type={TYPOGRAPHY_TYPE.TEXT} as={TYPOGRAPHY_TYPE.HEADING3}>
              Projects
            </Typography>
          </Link>
          <Link ref={text3Ref} href="/about" onClick={handdleClose}>
            <Typography type={TYPOGRAPHY_TYPE.TEXT} as={TYPOGRAPHY_TYPE.HEADING3}>
              About
            </Typography>
          </Link>
          <Link ref={text4Ref} href="/contact" onClick={handdleClose}>
            <Typography type={TYPOGRAPHY_TYPE.TEXT} as={TYPOGRAPHY_TYPE.HEADING3}>
              Contact
            </Typography>
          </Link>
        </nav>
      </div>
      <div className="fixed right-x-default top-10 z-[100] translate-x-8 sm:translate-x-10">
        <div
          onClick={() => (isOpen ? handdleClose() : handdleOpen())}
          onMouseMove={(e) => useMagnet(e, 1)}
          onMouseOut={(e) => useResetMagnet(e)}
          className={clsx(
            isOpen ? 'bg-black' : 'bg-white',
            'group flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border transition-colors sm:h-20 sm:w-20',
          )}
        >
          <div
            className="flex h-full w-full items-center justify-center"
            onMouseMove={(e) => useMagnet(e, 0.4)}
            onMouseOut={(e) => useResetMagnet(e)}
          >
            <div className="flex h-3 w-8 flex-col items-end justify-between">
              <div
                className={clsx(
                  'h-[2px] rounded-full transition-all duration-300',
                  isOpen ? 'w-full translate-y-[5px] rotate-45 bg-white' : 'w-full bg-black',
                )}
              ></div>
              <div
                className={clsx(
                  'h-[2px] rounded-full transition-all duration-300',
                  isOpen
                    ? 'w-full -translate-y-[5px] -rotate-45 bg-white'
                    : 'w-2/3 bg-black group-hover:w-full',
                )}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Burger;
