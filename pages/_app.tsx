import PageTransition from '@/components/PageTransition';
import Layout from '@/layout/default';
import SmoothScrolling from '@/layout/lenis';
import '@/styles/main.sass';
import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  return (
    <>
      {pathname?.includes('studio') ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <SmoothScrolling>
            <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
              <PageTransition key={pathname} paths={pageProps.paths}>
                <Component {...pageProps} />
              </PageTransition>
            </AnimatePresence>
          </SmoothScrolling>
        </Layout>
      )}
    </>
  );
}
