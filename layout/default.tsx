import Burger from '@/components/Burger';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import english from '@/data/languages/english.json';
import french from '@/data/languages/french.json';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, ReactNode, useEffect, useState } from 'react';

type TypeLanguageContext = {
  language: string;
  setLanguage: (language: string) => void;
  data: any;
};

export const LanguageContext = createContext<TypeLanguageContext>({
  language: 'en',
  setLanguage: () => {},
  data: english,
});

const queryClient = new QueryClient();

const Layout = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>('en');
  const data = language === 'en' ? english : french;

  useEffect(() => {
    setLanguage(localStorage.getItem('language') || navigator.language.split('-')[0]);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={{ language, setLanguage, data }}>
        <Burger />
        <Header />
        <main>{children}</main>
        <Footer />
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
};

export default Layout;
