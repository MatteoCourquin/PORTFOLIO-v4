import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { useRef } from 'react';

const AnimText = ({
  value,
  playAnimation,
}: {
  value: string[];
  playAnimation: React.MutableRefObject<() => void>;
}) => {
  const { contextSafe } = useGSAP();
  const textRefs = useRef<HTMLSpanElement[][]>(Array.from({ length: 2 }, () => []));

  useGSAP(() => {
    playAnimation.current = animText;
  }, [playAnimation]);

  const animText = contextSafe(() => {
    const timeline = gsap.timeline({ repeat: 1, repeatDelay: 0 });

    textRefs.current.forEach((line, lineIndex) => {
      timeline.add(
        gsap.fromTo(
          line,
          { yPercent: 0 },
          {
            yPercent: 100,
            duration: 0.6 + lineIndex * 0.1,
            ease: 'power4.inOut',
            stagger: 0.1,
          },
        ),
        0,
      );
    });

    return timeline.play();
  });

  return (
    <div className="shadow-y-white flex h-6 flex-col justify-end text">
      {Array.from({ length: 2 }).map((_, lineIndex) => (
        <div key={lineIndex}>
          {value.map((text, index) => (
            <span
              key={index}
              ref={(el) => {
                if (el) textRefs.current[lineIndex][index] = el;
              }}
              className={clsx('inline-block')}
            >
              {text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimText;
