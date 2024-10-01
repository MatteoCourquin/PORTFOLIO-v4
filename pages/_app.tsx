import Layout from '@/layout/default';
import SmoothScrolling from '@/layout/lenis';
import '@/styles/main.sass';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';
// import { useLenis } from '@studio-freight/react-lenis';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  // const router = useRouter();
  // const lenis = useLenis();

  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     if (!lenis) return;

  //     lenis.scrollTo(lenis.actualScroll);

  //     setTimeout(() => {
  //       lenis.scrollTo(0, {
  //         immediate: true,
  //       });
  //     }, 800);
  //   };

  //   router.events.on('routeChangeStart', handleRouteChange);
  // }, [router.events, lenis, pathname]);

  return (
    <>
      {pathname?.includes('studio') ? (
        <Component key={pathname} {...pageProps} />
      ) : (
        <Layout>
          <SmoothScrolling>
            <AnimatePresence mode="wait">
              <Component key={pathname} {...pageProps} />
            </AnimatePresence>
          </SmoothScrolling>
        </Layout>
      )}
    </>
  );
}
