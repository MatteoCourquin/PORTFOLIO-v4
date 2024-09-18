import { useLenis } from '@studio-freight/react-lenis';
import clsx from 'clsx';
import { useState } from 'react';

const ScrollTop = () => {
  const lenis = useLenis();
  const [display, setDisplay] = useState(false);
  const scrollTop = () => {
    lenis?.scrollTo(0, {
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  lenis?.on('scroll', (event: { targetScroll: number }) => {
    if (event.targetScroll > window.innerHeight) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  });

  return (
    <div
      className={clsx(
        'right-x-calc fixed bottom-y-default right-x-default z-[700] flex h-6 w-6 translate-y-1/2 cursor-pointer items-center justify-center transition-transform sm:translate-x-10',
        display ? 'scale-100' : 'scale-0',
      )}
      onClick={scrollTop}
    >
      <div className="absolute h-[1px] w-4 translate-x-[6px] rotate-45 backdrop-invert" />
      <div className="absolute h-[1px] w-[1px] -translate-y-[6px] translate-x-0 rotate-45 backdrop-invert" />
      <div className="absolute h-[1px] w-4 -translate-x-[6px] -rotate-45 backdrop-invert" />
    </div>
  );
};

export default ScrollTop;
