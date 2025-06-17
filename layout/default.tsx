import Burger from '@/components/Burger';
import Cursor from '@/components/Cursor';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollTop from '@/components/ScrollTop';
import english from '@/data/languages/english.json';
import french from '@/data/languages/french.json';
import { Language } from '@/data/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Head from 'next/head';
import { createContext, ReactNode, useEffect, useState } from 'react';

type TypeLanguageContext = {
  language: string;
  setLanguage: (language: string) => void;
  data: Language;
};

export const LanguageContext = createContext<TypeLanguageContext>({
  language: 'en',
  setLanguage: () => {},
  data: english,
});

const queryClient = new QueryClient();

const Layout = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');
  const data = language === 'en' ? english : french;

  useEffect(() => {
    setLanguage(localStorage.getItem('language') || navigator.language.split('-')[0]);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={{ language, setLanguage, data }}>
        <Head>
          <title>{data.head.titleIndex}</title>
          <meta name="description" content={data.head.description} />
          <meta
            name="keywords"
            content="Matteo Courquin, Creative Developer, Développeur creatif, FullStack Developer, Développeur FullStack, Web Developer, Développeur Web, Freelance, React, Node.js, Express, MongoDB, JavaScript, TypeScript, HTML, CSS, Sass, TailwindCSS, IIM, HETIC, AWS"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Cursor />
        <ScrollTop />
        <Header />
        <Burger />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
};

export default Layout;
