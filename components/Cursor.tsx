import { useTouchDevice } from '@/utils/states';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const Cursor = () => {
  if (useTouchDevice()) return;

  const pointerRef = useRef<HTMLDivElement>(null);
  const pointerOutlineRef = useRef<HTMLDivElement>(null);

  const moveCursor = (e: MouseEvent) => {
    if (!pointerRef.current || !pointerOutlineRef.current) return;

    pointerRef.current.style.opacity = '1';
    pointerOutlineRef.current.style.opacity = '1';

    gsap.to(pointerRef.current, {
      duration: 0.4,
      x: e.clientX,
      y: e.clientY,
    });
    gsap.to(pointerOutlineRef.current, {
      duration: 0.1,
      x: e.clientX,
      y: e.clientY,
    });
  };

  // const hideCursor = () => {
  //   if (!pointerRef.current || !pointerOutlineRef.current) return;
  //   pointerRef.current.style.opacity = '0';
  //   pointerOutlineRef.current.style.opacity = '0';
  // };

  useEffect(() => {
    window.addEventListener('mousemove', moveCursor);
    // window.addEventListener('mouseout', hideCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      // window.removeEventListener('mouseout', hideCursor);
    };
  }, []);

  return (
    <>
      <div ref={pointerRef} className="pointer-events-none fixed left-0 top-0 z-[9999]">
        <div className="absolute h-10 w-10 border-spacing-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-400" />
      </div>
      <div ref={pointerOutlineRef} className="pointer-events-none fixed left-0 top-0 z-[9999]">
        <div className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full brightness-200 contrast-200 grayscale saturate-200 backdrop-invert" />
      </div>
    </>
  );
};

export default Cursor;
