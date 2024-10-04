import { TypePaths } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import clsx from 'clsx';
import { motion, TargetAndTransition } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';

const curve = (initialPath: string, targetPath: string) => {
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

const text = {
  initial: {
    opacity: 1,
  },
  enter: {
    opacity: 0,
    top: -100,
    transition: { duration: 0.6, delay: 0.3, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: { top: '47.5%' },
  },
  exit: {
    opacity: 1,
    top: '40%',
    transition: { duration: 0.4, delay: 0.3, ease: [0.33, 1, 0.68, 1] },
  },
};

const translate = {
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

const translateMain = {
  initial: {
    opacity: 0,
    y: '50vh',
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    opacity: 1,
    y: '0',
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

const SVG = ({ height, width }: { height: number; width: number }) => {
  const vertical = height > width ? 500 : 300;
  const initialPath = `
      M0 300 
      Q${width / 2} 0 ${width} 300
      L${width} ${height + vertical}
      Q${width / 2} ${height + 600} 0 ${height + vertical}
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

export default function PageTransition({
  children,
  paths,
}: {
  children: ReactNode;
  paths: TypePaths[];
}) {
  const pathname = usePathname();
  const { data } = useContext(LanguageContext);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
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

  const routes = useMemo(() => {
    const baseRoutes: { [key: string]: string } = {
      '/': data.nav.home,
      '/about': data.nav.about,
      '/contact': data.nav.contact,
      '/projects': data.nav.projects,
      '/contact/success': data.nav.success,
    };

    paths?.forEach((path) => {
      baseRoutes[`/projects/${path.slug}`] = path.title;
    });

    return baseRoutes;
  }, [paths]);

  return (
    <div className="page curve">
      {/* TEXTE */}
      <motion.div
        className={clsx('route', isAnimationComplete && 'hidden')}
        onAnimationStart={() => setIsAnimationComplete(false)}
        onAnimationComplete={() => setIsAnimationComplete(true)}
        {...anim(text)}
      >
        <Typography type={TYPOGRAPHY_TYPE.HEADING1} className="whitespace-nowrap uppercase">
          {routes[pathname] || '404'}
        </Typography>
      </motion.div>

      {/* SVG */}
      <div style={{ opacity: dimensions.width === 0 ? 1 : 0 }} className="background" />
      {dimensions.width !== 0 && dimensions.height !== 0 && <SVG {...dimensions} />}

      {/* MAIN */}
      <motion.main {...anim(translateMain)}>{children}</motion.main>
    </div>
  );
}
