import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { MutableRefObject, useRef } from 'react';

export enum ANIM_TEXT_TYPE {
  SPIN = 'SPIN',
  VARIABLE = 'VARIABLE',
}

const AnimText = ({
  value,
  playAnimation,
  type,
  repeat = 1,
  className,
}: {
  value: string[];
  playAnimation?: MutableRefObject<() => void>;
  type: ANIM_TEXT_TYPE;
  repeat?: number;
  className?: string;
}) => {
  switch (type) {
    case ANIM_TEXT_TYPE.SPIN:
      return (
        <SpinText
          className={className}
          repeat={repeat}
          value={value}
          playAnimation={playAnimation}
        />
      );
    case ANIM_TEXT_TYPE.VARIABLE:
      return <VariableText value={value} playAnimation={playAnimation} />;
  }
};

export default AnimText;

const SpinText = ({
  value,
  playAnimation,
  repeat,
  className,
}: {
  value: string[];
  playAnimation?: MutableRefObject<() => void>;
  repeat: number;
  className?: string;
}) => {
  const { contextSafe } = useGSAP();
  const textRefs = useRef<HTMLSpanElement[][]>(Array.from({ length: 2 }, () => []));

  useGSAP(() => {
    if (!playAnimation) return;
    playAnimation.current = animText;
  }, [playAnimation]);

  const animText = contextSafe(() => {
    const timeline = gsap.timeline({ repeat: repeat, repeatDelay: 0 });

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
    <div className={clsx('shadow-y-white text flex h-6 flex-col justify-end', className)}>
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

const VariableText = ({
  value,
  playAnimation,
}: {
  value: string[];
  playAnimation?: MutableRefObject<() => void>;
}) => {
  const { contextSafe } = useGSAP();
  const textRefs = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    if (!playAnimation) return;
    playAnimation.current = animText;
  }, [playAnimation]);

  const animText = contextSafe(() => {
    const timeline = gsap.timeline({ paused: true });

    timeline
      .add(
        gsap.to(textRefs.current, {
          fontWeight: 100,
          duration: 0.8,
          ease: 'power2.inOut',
          stagger: 0.05,
        }),
      )
      .add(
        gsap.to(textRefs.current, {
          fontWeight: 1000,
          duration: 0.8,
          ease: 'power2.inOut',
          stagger: 0.05,
        }),
        `-=0.${value.length}`,
      )
      .add(
        gsap.to(textRefs.current, {
          fontWeight: 520,
          duration: 0.8,
          ease: 'power2.inOut',
          stagger: 0.05,
        }),
        `-=0.${value.length}`,
      );

    return timeline.play();
  });

  return (
    <>
      {value.map((text, index) => (
        <span
          key={index}
          ref={(el) => {
            if (el) textRefs.current[index] = el;
          }}
          className={clsx('inline-block')}
        >
          {text === ' ' ? '\u00A0' : text}
        </span>
      ))}
    </>
  );
};
