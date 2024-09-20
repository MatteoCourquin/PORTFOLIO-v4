import { motion, TargetAndTransition } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

export const curve = (initialPath: string, targetPath: string) => {
  return {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 0.6, delay: 0.3, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
  };
};

export const translate = {
  initial: {
    top: '-300px',
  },
  enter: {
    top: '-100vh',
    transition: { duration: 0.6, delay: 0.3, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: {
      top: '100vh',
    },
  },
  exit: {
    top: '-300px',
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
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
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
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
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="page curve">
      {/* <div style={{ opacity: dimensions.width == 0 ? 1 : 0 }} className="background" /> */}
      {dimensions.width !== 0 && dimensions.height !== 0 && <SVG {...dimensions} />}
      {children}
    </div>
  );
}

const SVG = ({ height, width }: { height: number; width: number }) => {
  const initialPath = `
      M0 300 
      Q${width / 2} 0 ${width} 300
      L${width} ${height + 300}
      Q${width / 2} ${height + 600} 0 ${height + 300}
      L0 0
  `;

  const targetPath = `
      M0 300
      Q${width / 2} 0 ${width} 300
      L${width} ${height}
      Q${width / 2} ${height} 0 ${height}
      L0 0
  `;

  return (
    <motion.svg className="svg" {...anim(translate)}>
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};
