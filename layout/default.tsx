import Burger from '@/components/Burger';
import Footer from '@/components/Footer';
import english from '@/data/languages/english.json';
import french from '@/data/languages/french.json';
import { Language } from '@/data/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import { createContext, ReactNode, useEffect, useState } from 'react';

type TypeLanguageContext = {
  language: string;
  setLanguage: (language: string) => void;
  data: Language;
};

type TypeAnimationContext = {
  isAnimationEnabled: boolean;
  setIsAnimationEnabled: (enabled: boolean) => void;
};

export const LanguageContext = createContext<TypeLanguageContext>({
  language: 'en',
  setLanguage: () => {},
  data: english,
});

export const AnimationContext = createContext<TypeAnimationContext>({
  isAnimationEnabled: true,
  setIsAnimationEnabled: () => {},
});

const queryClient = new QueryClient();

const Layout = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>('en');
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);
  const data = language === 'en' ? english : french;

  useEffect(() => {
    setLanguage(localStorage.getItem('language') || navigator.language.split('-')[0]);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={{ language, setLanguage, data }}>
        <AnimationContext.Provider value={{ isAnimationEnabled, setIsAnimationEnabled }}>
          <Head>
            <title>{data.head.titleIndex}</title>
            <meta name="description" content={data.head.description} />
            <meta
              name="keywords"
              content="Matteo Courquin, FullStack Developer, Développeur FullStack, Web Developer, Développeur Web, Freelance, React, Node.js, Express, MongoDB, JavaScript, TypeScript, HTML, CSS, Sass, TailwindCSS, IIM, HETIC, AWS"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Burger />
          <main>{children}</main>
          <Footer />
        </AnimationContext.Provider>
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
};

export default Layout;
