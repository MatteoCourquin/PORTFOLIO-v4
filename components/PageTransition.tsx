import clsx from 'clsx';
import { motion, TargetAndTransition } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

const curve = (initialPath: string, targetPath: string) => {
  return {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
    },
  };
};

const translate = {
  initial: {
    top: '-300px',
  },
  enter: {
    top: '-100vh',
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: {
      top: '100vh',
    },
  },
  exit: {
    top: '-300px',
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
};

const anim = (variants: { [key: string]: TargetAndTransition }) => {
  return {
    variants,
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
  };
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    resize();
    window.addEventListener('resize', resize);
  }, []);

  return (
    <div className="page curve">
      {!!dimensions.width && <SVG {...dimensions} />}
      {children}
    </div>
  );
}

const SVG = ({ height, width }: { height: number; width: number }) => {
  const router = useRouter();
  const initialPath = `M0 300 Q${width / 2} 0 ${width} 300 L${width} ${height + 300} Q${width / 2} ${height + 600} 0 ${height + 300} L0 0`;
  const targetPath = `M0 300 Q${width / 2} 0 ${width} 300 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;

  return (
    <motion.svg
      className={clsx(router.query.animate === 'false' && 'hide', 'svg-anim z-[9999]')}
      {...anim(translate)}
    >
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};
