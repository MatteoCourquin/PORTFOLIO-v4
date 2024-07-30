import { useMagnet, useResetMagnet } from '@/utils/animations';
import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef, ReactNode } from 'react';

export enum BUTTON_SIZE {
  S = 's',
  M = 'm',
  L = 'l',
}

export enum BUTTON_TYPE {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

type ButtonProps = {
  as: 'a' | 'button';
  target?: '_blank';
  type?: BUTTON_TYPE;
  color?: 'black' | 'white';
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  inForm?: boolean;
  size?: BUTTON_SIZE;
  isActive?: boolean;
};

const Button = forwardRef<any, ButtonProps>(
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
    return (
      <>
        {as === 'a' && href && (
          <Link
            ref={ref}
            href={href}
            target={target}
            onMouseMove={(e) => useMagnet(e, 1)}
            onMouseOut={(e) => useResetMagnet(e)}
            className={clsx(
              'wrapper-button button-text w-fit',
              `button-${type} button-${color}`,
              isActive && 'button-active',
              className,
            )}
          >
            <span
              className={clsx('button', `button-${size}`)}
              onMouseMove={(e) => useMagnet(e, 0.4)}
              onMouseOut={(e) => useResetMagnet(e)}
            >
              {children}
            </span>
          </Link>
        )}
        {as === 'button' && (
          <button
            ref={ref}
            onClick={onClick}
            type={inForm ? 'submit' : 'button'}
            className={clsx(
              'wrapper-button button-text w-fit',
              `button-${type} button-${color}`,
              isActive && 'button-active',
              className,
            )}
            onMouseMove={(e) => useMagnet(e, 1)}
            onMouseOut={(e) => useResetMagnet(e)}
          >
            <p
              className={clsx('button', `button-${size}`)}
              onMouseMove={(e) => useMagnet(e, 0.4)}
              onMouseOut={(e) => useResetMagnet(e)}
            >
              {children}
            </p>
          </button>
        )}
      </>
    );
  },
);

export default Button;
