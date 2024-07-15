import SmoothScrolling from '@/layout/lenis';
import '@/styles/main.scss';
import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  return (
    <SmoothScrolling>
      <Component key={pathname} {...pageProps} />
    </SmoothScrolling>
  );
}
