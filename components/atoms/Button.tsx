import { useMagnet, useResetMagnet } from '@/utils/animations';
import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

export enum BUTTON_SIZE {
  S = 'S',
  M = 'M',
  L = 'L',
}

const Button = ({
  as,
  target,
  href,
  children,
  className,
  onClick,
  size = BUTTON_SIZE.M,
}: {
  as: 'a' | 'button';
  target?: '_blank';
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  size?: BUTTON_SIZE;
}) => {
  return (
    <>
      {as === 'a' && href && (
        <Link
          href={href}
          target={target}
          onMouseMove={(e) => useMagnet(e, 1)}
          onMouseOut={(e) => useResetMagnet(e)}
          className={clsx('wrapper-button button-text', className)}
        >
          <span
            className={clsx(
              size === BUTTON_SIZE.S && 'button-s',
              size === BUTTON_SIZE.M && 'button-m',
              size === BUTTON_SIZE.L && 'button-l',
              'button',
            )}
            onMouseMove={(e) => useMagnet(e, 0.4)}
            onMouseOut={(e) => useResetMagnet(e)}
          >
            {children}
          </span>
        </Link>
      )}
      {as === 'button' && (
        <button
          onClick={onClick}
          className={clsx('wrapper-button button-text', className)}
          onMouseMove={(e) => useMagnet(e, 1)}
          onMouseOut={(e) => useResetMagnet(e)}
        >
          <span
            className={clsx(
              size === BUTTON_SIZE.S && 'button-s',
              size === BUTTON_SIZE.M && 'button-m',
              size === BUTTON_SIZE.L && 'button-l',
              'button',
            )}
            onMouseMove={(e) => useMagnet(e, 0.4)}
            onMouseOut={(e) => useResetMagnet(e)}
          >
            {children}
          </span>
        </button>
      )}
    </>
  );
};

export default Button;
