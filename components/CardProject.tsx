import { TypeProject } from '@/data/types';
import { urlForImage } from '@/sanity/lib/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import { useRef } from 'react';
import AnimText, { ANIM_TEXT_TYPE } from './AnimText';
import Button, { BUTTON_SIZE } from './atoms/Button';
import { IconArrowTopRight } from './atoms/Icons';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';

const CardProject = ({
  projectIndex,
  title,
  slug,
  mainImageDesktop,
  mainImageMobile,
}: TypeProject) => {
  const { contextSafe } = useGSAP();

  const triggerRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef(null);
  const animTitleRef = useRef<() => void>(() => {});
  const animIndexRef = useRef<() => void>(() => {});

  const animArrow = contextSafe(() => {
    const timelineArrow = gsap.timeline({ paused: true });

    timelineArrow
      .add(
        gsap.to(arrowRef.current, {
          x: 20,
          y: -20,
          duration: 0.15,
          opacity: 0,
        }),
      )
      .add(
        gsap.to(arrowRef.current, {
          x: -20,
          y: 20,
          duration: 0.15,
          opacity: 0,
        }),
      )
      .add(
        gsap.to(arrowRef.current, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.15,
        }),
      )
      .play();
  });

  const scrollTriggerAnimation = () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      imageRef.current,
      {
        y: -100,
      },
      {
        y: 0,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  };

  useGSAP(() => {
    scrollTriggerAnimation();
  }, [scrollTriggerAnimation]);

  return (
    <Link
      href={'/projects/' + slug.current}
      className="group/card-project"
      ref={triggerRef}
      onMouseEnter={() => {
        animTitleRef.current();
        animIndexRef.current();
        animArrow();
      }}
    >
      <div className="group/card-project relative">
        <div className="absolute left-0 top-0 h-px w-full bg-black"></div>
        <div className="absolute bottom-0 right-0 h-px w-full bg-black"></div>
        <div className="absolute bottom-0 left-0 h-full w-px bg-black"></div>
        <div className="absolute bottom-0 right-0 h-full w-px bg-black"></div>
        <Typography type={TYPOGRAPHY_TYPE.HEADING5} className="w-full py-4 text-center uppercase">
          <AnimText
            type={ANIM_TEXT_TYPE.VARIABLE}
            value={title.toString().padStart(3, '0').split('')}
            playAnimation={animTitleRef}
          />
        </Typography>
        <div className="relative h-[60vh] p-px md:h-[500px]">
          <div className="absolute right-0 top-0 h-px w-full bg-black"></div>
          <div className="h-full overflow-hidden">
            <div ref={imageRef} className="flex h-full w-full justify-end">
              <img
                src={urlForImage(mainImageDesktop)}
                alt={title}
                className="hidden w-full translate-y-[50px] cursor-pointer object-cover object-bottom grayscale transition-[transform,filter] duration-300 group-hover/card-project:scale-[1.02] group-hover/card-project:grayscale-0 md:block"
              />
              <img
                src={urlForImage(mainImageMobile)}
                alt={title}
                className="block h-[calc(100%+100px)] w-full cursor-pointer object-cover object-bottom grayscale transition-[transform,filter] duration-300 group-hover/card-project:scale-[1.02] group-hover/card-project:grayscale-0 md:hidden"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex w-full items-center justify-between py-4">
        <div className="absolute bottom-0 right-0 h-px w-full bg-black"></div>
        <div className="flex font-medium">
          <Typography
            type={TYPOGRAPHY_TYPE.HEADING3}
            as={TYPOGRAPHY_TYPE.TEXT}
            className="overflow-hidden uppercase"
          >
            DEV.
          </Typography>
          <AnimText
            type={ANIM_TEXT_TYPE.SPIN}
            value={projectIndex.toString().padStart(3, '0').split('')}
            playAnimation={animIndexRef}
          />
        </div>
        <Button as="button" size={BUTTON_SIZE.S} className="overflow-hidden">
          View
          <IconArrowTopRight ref={arrowRef} className="ml-2 h-3" />
        </Button>
      </div>
    </Link>
  );
};

export default CardProject;
