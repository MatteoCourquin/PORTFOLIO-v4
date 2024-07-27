import Burger from '@/components/Burger';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Burger />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
