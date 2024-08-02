import { TypeProject } from '@/data/types';
import { urlForImage } from '@/sanity/lib/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Button, { BUTTON_SIZE } from './atoms/Button';
import { IconArrowTopRight } from './atoms/Icons';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';
import clsx from 'clsx';
import AnimText from './AnimText';

const CardProject = ({
  projectIndex,
  title,
  slug,
  mainImageDesktop,
  mainImageMobile,
}: TypeProject) => {
  const [animIndex, _] = useState(['0', '0', '1']);

  const triggerRef = useRef(null);
  const imageRef = useRef(null);
  const animIndexRefs = animIndex.map(() => useRef<HTMLSpanElement | null>(null));

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
    console.log(animIndexRefs);
  }, []);

  return (
    <Link href={'/projects/' + slug.current} className="group/card-project" ref={triggerRef}>
      <div className="group/card-project relative">
        <div className="absolute left-0 top-0 h-px w-full bg-black"></div>
        <div className="absolute bottom-0 right-0 h-px w-full bg-black"></div>
        <div className="absolute bottom-0 left-0 h-full w-px bg-black"></div>
        <div className="absolute bottom-0 right-0 h-full w-px bg-black"></div>
        <Typography type={TYPOGRAPHY_TYPE.HEADING5} className="w-full py-4 text-center uppercase">
          {title}
        </Typography>
        <div className="relative h-[700px] p-px md:h-[700px] lg:h-[500px]">
          <div className="absolute right-0 top-0 h-px w-full bg-black"></div>
          <div className="h-full overflow-hidden">
            <div ref={imageRef} className="h-full w-full">
              <img
                src={urlForImage(mainImageDesktop)}
                alt={title}
                className="hidden h-[calc(100%+100px)] w-full cursor-pointer object-cover object-bottom grayscale transition-[transform,filter] duration-300 group-hover/card-project:scale-[1.02] group-hover/card-project:grayscale-0 md:block"
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
        <Typography
          type={TYPOGRAPHY_TYPE.HEADING3}
          as={TYPOGRAPHY_TYPE.TEXT}
          className="overflow-hidden text-center font-medium uppercase flex "
        >
          DEV.
          <AnimText value={animIndex} />
        </Typography>
        <Button
          as="button"
          size={BUTTON_SIZE.S}
          className="transition-transform duration-300 group-hover/card-project:-translate-x-2"
        >
          View
          <IconArrowTopRight className="ml-2 h-3" />
        </Button>
      </div>
    </Link>
  );
};

export default CardProject;
