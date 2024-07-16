import Header from '@/components/Header';
import Link from 'next/link';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
