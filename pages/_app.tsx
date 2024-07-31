import Layout from '@/layout/default';
import SmoothScrolling from '@/layout/lenis';
import '@/styles/main.scss';
import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const [layoutEnabled, setLayoutEnabled] = useState(true);

  useEffect(() => {
    setLayoutEnabled(!pathname?.includes('studio'));
  }, [pathname]);

  return (
    <>
      {layoutEnabled ? (
        <SmoothScrolling>
          <Layout>
            <Component key={pathname} {...pageProps} />
          </Layout>
        </SmoothScrolling>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

{/* <AnimatePresence>
  {filteredApps.map((data, index) => (
    <motion.div
      key={data.application.Id}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.15,
        ease: 'easeInOut',
        delay: index * 0.01,
      }}
    >
      <AppCard
        idx={index}
        lastPipelineExecution={data.lastMasterExecution}
        application={data.application}
      />
    </motion.div>
  ))}
</AnimatePresence>; */}

// https://www.framer.com/motion/animate-presence/
