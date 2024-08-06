import { useMagnet, useResetMagnet } from '@/utils/animations';
import { useTouchDevice } from '@/utils/states';
import clsx from 'clsx';
import Link from 'next/link';
import { ForwardedRef, forwardRef, MouseEvent, ReactNode, useRef, useState } from 'react';

export enum BUTTON_SIZE {
  S = 's',
  M = 'm',
  L = 'l',
}

export enum BUTTON_TYPE {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ICON = 'icon',
}

type ButtonProps = {
  as: 'a' | 'button';
  target?: '_blank';
  type?: BUTTON_TYPE;
  color?: 'black' | 'white' | 'red';
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  inForm?: boolean;
  size?: BUTTON_SIZE;
  isActive?: boolean;
};

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement | null, ButtonProps>(
  (
    {
      as,
      target,
      type = BUTTON_TYPE.PRIMARY,
      color = 'black',
      href,
      children,
      className,
      onClick,
      inForm = false,
      size = BUTTON_SIZE.M,
      isActive = false,
    },
    ref,
  ) => {
    const [circleActive, setCircleActive] = useState(false);
    const circleRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (!circleRef.current || isActive || useTouchDevice()) return;
      const bounding = e.currentTarget.getBoundingClientRect();
      setCircleActive(true);
      circleRef.current.style.left = `${e.clientX - bounding.left}px`;
      circleRef.current.style.top = `${e.clientY - bounding.top}px`;
    };

    const handleMouseLeave = () => {
      setCircleActive(false);
    };

    return (
      <>
        {as === 'a' && href && ref && (
          <Link
            ref={ref as ForwardedRef<HTMLAnchorElement>}
            href={href}
            target={target}
            onMouseMove={(e) => {
              useMagnet(e, 1);
              handleMouseEnter(e);
            }}
            onMouseOut={(e) => {
              useResetMagnet(e);
              handleMouseLeave();
            }}
            className={clsx(
              'wrapper-button button-text relative w-fit overflow-hidden transition-colors',
              `button-${type} button-${color}`,
              isActive && '!border-primary !bg-primary !text-white',
              className,
            )}
          >
            <div
              ref={circleRef}
              className={clsx(
                'circle-button absolute z-0 scale-0 transform rounded-full transition-all',
                circleActive && 'active',
                isActive && 'bg-primary',
                color === 'black' && type === BUTTON_TYPE.PRIMARY && 'bg-white',
                color === 'black' && type === BUTTON_TYPE.SECONDARY && 'bg-black',
                color === 'white' && type === BUTTON_TYPE.PRIMARY && 'bg-black',
                color === 'white' && type === BUTTON_TYPE.SECONDARY && 'bg-white',
                color === 'red' && 'bg-black',
              )}
            ></div>
            <span
              className={clsx('button', `button-${size}`, isActive && '!mix-blend-normal')}
              onMouseMove={(e) => useMagnet(e, 0.4)}
              onMouseOut={(e) => useResetMagnet(e)}
            >
              {children}
            </span>
          </Link>
        )}
        {as === 'button' && (
          <button
            ref={ref as ForwardedRef<HTMLButtonElement>}
            onClick={onClick}
            type={inForm ? 'submit' : 'button'}
            onMouseMove={(e) => {
              useMagnet(e, 1);
              handleMouseEnter(e);
            }}
            onMouseOut={(e) => {
              useResetMagnet(e);
              handleMouseLeave();
            }}
            className={clsx(
              'wrapper-button button-text relative w-fit overflow-hidden transition-colors',
              `button-${type} button-${color}`,
              isActive && '!border-primary !bg-primary !text-white',
              className,
            )}
          >
            <div
              ref={circleRef}
              className={clsx(
                'circle-button absolute z-0 scale-0 transform rounded-full transition-all',
                circleActive && 'active',
                isActive && 'bg-primary',
                color === 'black' && type === BUTTON_TYPE.PRIMARY && 'bg-white',
                color === 'black' && type === BUTTON_TYPE.SECONDARY && 'bg-black',
                color === 'white' && type === BUTTON_TYPE.PRIMARY && 'bg-black',
                color === 'white' && type === BUTTON_TYPE.SECONDARY && 'bg-white',
                color === 'white' && type === BUTTON_TYPE.ICON && 'bg-black',
                color === 'red' && 'bg-black',
              )}
            ></div>
            <div
              className={clsx(
                'button',
                type !== BUTTON_TYPE.ICON && `button-${size}`,
                isActive && '!mix-blend-normal',
              )}
              onMouseMove={(e) => useMagnet(e, 0.4)}
              onMouseOut={(e) => useResetMagnet(e)}
            >
              {children}
            </div>
          </button>
        )}
      </>
    );
  },
);

export default Button;
