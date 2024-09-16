import { LanguageContext } from '@/layout/default';
import { useGSAP } from '@gsap/react';
import { useLenis } from '@studio-freight/react-lenis';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { useContext, useRef, useState } from 'react';
import Button, { BUTTON_TYPE } from './atoms/Button';
import { IconGithub, IconInsta, IconLinkedin } from './atoms/Icons';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';
import Language from './Language';

const Burger = () => {
  const { contextSafe } = useGSAP();
  const { data } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState(false);
  const lenis = useLenis();

  lenis?.on('scroll', (event: { targetScroll: number }) => {
    if (event.targetScroll > 300 || window.innerWidth < 1024) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  });

  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const buttonLanguageRef = useRef(null);
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);
  const button3Ref = useRef(null);
  const wrapperRef = useRef(null);
  const backgroundRef = useRef(null);

  const openBurger = contextSafe(() => {
    const timelineOpen = gsap.timeline({ paused: true });
    timelineOpen
      .add(
        gsap.fromTo(
          wrapperRef.current,
          {
            visibility: 'invisible',
            scale: 0,
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
            duration: 0.8,
            ease: 'power4.inOut',
            stagger: 0.1,
          },
        ),
        '-=0.6',
      )
      .add(
        gsap.fromTo(
          [button1Ref.current, button2Ref.current, button3Ref.current],
          {
            y: -16,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power4.inOut',
            stagger: 0.1,
          },
        ),
        '-=1',
      )
      .add(
        gsap.fromTo(
          buttonLanguageRef.current,
          {
            x: -16,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power4.inOut',
          },
        ),
        '-=1',
      )
      .play();

    return timelineOpen;
  });

  const closeBurger = contextSafe(() => {
    const timelineClose = gsap.timeline({ paused: true });
    timelineClose
      .addLabel('startAnimations')
      .add(
        gsap.fromTo(
          buttonLanguageRef.current,
          {
            x: 0,
            opacity: 1,
          },
          {
            x: -16,
            opacity: 0,
            duration: 0.8,
            ease: 'power4.inOut',
          },
        ),
        'startAnimations',
      )
      .add(
        gsap.fromTo(
          [button1Ref.current, button2Ref.current, button3Ref.current].reverse(),
          {
            y: 0,
            opacity: 1,
          },
          {
            y: -16,
            opacity: 0,
            duration: 0.8,
            ease: 'power4.inOut',
            stagger: 0.1,
          },
        ),
        'startAnimations',
      )
      .add(
        gsap.fromTo(
          [text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current].reverse(),
          {
            y: 0,
            opacity: 1,
          },
          {
            y: -16,
            opacity: 0,
            duration: 0.8,
            ease: 'power4.inOut',
            stagger: 0.1,
          },
        ),
        'startAnimations',
      )
      .add(
        gsap.fromTo(
          backgroundRef.current,
          {
            scale: 60,
          },
          {
            scale: 0,
            duration: 0.8,
            ease: 'power3.inOut',
          },
        ),
        0.3,
      )
      .add(
        gsap.fromTo(
          wrapperRef.current,
          {
            visibility: 'visible',
            scale: 1,
          },
          {
            visibility: 'hidden',
            scale: 0,
            duration: 0,
          },
        ),
      )
      .play();

    return timelineClose;
  });

  const handdleOpen = () => {
    setIsOpen(true);
    openBurger();
  };

  const handdleClose = () => {
    setIsOpen(false);
    closeBurger();
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="invisible fixed left-0 right-0 top-0 z-[600] h-screen w-screen scale-0"
      >
        <div
          ref={backgroundRef}
          className="absolute right-10 top-10 aspect-square h-16 w-16 scale-100 rounded-full bg-black sm:right-x-default sm:h-20 sm:w-20 sm:translate-x-10"
        ></div>
        <div className="absolute left-x-default top-y-default flex h-20 -translate-y-1/2 items-center sm:-translate-x-1/2">
          <div ref={buttonLanguageRef} className="-translate-x-4 opacity-0">
            <Language />
          </div>
        </div>
        <nav className="z-[90] flex h-screen w-screen flex-col items-center justify-center gap-8 uppercase text-white">
          <Link ref={text1Ref} href="/" onClick={handdleClose} className="-translate-y-4 opacity-0">
            <Typography
              type={TYPOGRAPHY_TYPE.TEXT}
              as={TYPOGRAPHY_TYPE.HEADING3}
              className="whitespace-nowrap"
            >
              {data.nav.home}
            </Typography>
          </Link>
          <Link
            ref={text2Ref}
            href="/projects"
            onClick={handdleClose}
            className="-translate-y-4 opacity-0"
          >
            <Typography
              type={TYPOGRAPHY_TYPE.TEXT}
              as={TYPOGRAPHY_TYPE.HEADING3}
              className="whitespace-nowrap"
            >
              {data.nav.projects}
            </Typography>
          </Link>
          <Link
            ref={text3Ref}
            href="/about"
            onClick={handdleClose}
            className="-translate-y-4 opacity-0"
          >
            <Typography
              type={TYPOGRAPHY_TYPE.TEXT}
              as={TYPOGRAPHY_TYPE.HEADING3}
              className="whitespace-nowrap"
            >
              {data.nav.about}
            </Typography>
          </Link>
          <Link
            ref={text4Ref}
            href="/contact"
            onClick={handdleClose}
            className="-translate-y-4 opacity-0"
          >
            <Typography
              type={TYPOGRAPHY_TYPE.TEXT}
              as={TYPOGRAPHY_TYPE.HEADING3}
              className="whitespace-nowrap"
            >
              {data.nav.contact}
            </Typography>
          </Link>
          <div className="absolute bottom-y-large left-0 flex w-screen items-center justify-center gap-4 md:bottom-y-default">
            <Link
              ref={button1Ref}
              href="https://github.com/matteocourquin"
              target="_blank"
              className="group/icon shadow-bakground -translate-y-4 opacity-0"
            >
              <IconGithub className="transition-colors duration-300 group-hover/icon:stroke-primary" />
            </Link>
            <Link
              ref={button2Ref}
              href="https://www.linkedin.com/in/matteo-courquin/"
              target="_blank"
              className="group/icon shadow-bakground -translate-y-4 opacity-0"
            >
              <IconLinkedin className="transition-colors duration-300 group-hover/icon:stroke-primary" />
            </Link>
            <Link
              ref={button3Ref}
              href="https://www.instagram.com/matteocourquin.dev/"
              target="_blank"
              className="group/icon shadow-bakground -translate-y-4 opacity-0"
            >
              <IconInsta className="transition-colors duration-300 group-hover/icon:stroke-primary" />
            </Link>
          </div>
        </nav>
      </div>
      <div
        className={clsx(
          'right-x-calc fixed right-x-default top-y-default z-[700] -translate-y-1/2 transition-[transform,height,width] sm:translate-x-10',
          display ? 'scale-100' : 'scale-0',
        )}
      >
        <Button
          onClick={() => (isOpen ? handdleClose() : handdleOpen())}
          type={BUTTON_TYPE.ICON}
          color="white"
          as="button"
          className={clsx('group/burger !h-16 !w-16 !border-black !p-0 sm:!h-20 sm:!w-20')}
        >
          <div className="flex h-3 w-8 flex-col items-end justify-between">
            <div
              className={clsx(
                'h-[2px] bg-white transition-all duration-300',
                isOpen ? 'w-full translate-y-[5px] rotate-45' : 'w-full',
              )}
            ></div>
            <div
              className={clsx(
                'h-[2px] bg-white transition-all duration-300',
                isOpen ? 'w-full -translate-y-[5px] -rotate-45' : 'w-2/3 group-hover/burger:w-full',
              )}
            ></div>
          </div>
        </Button>
      </div>
    </>
  );
};

export default Burger;
