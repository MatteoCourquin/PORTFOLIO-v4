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
