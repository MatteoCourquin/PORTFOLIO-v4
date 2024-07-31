import Burger from '@/components/Burger';
import Footer from '@/components/Footer';
import english from '@/data/languages/english.json';
import french from '@/data/languages/french.json';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, ReactNode, useState } from 'react';

export const LanguageContext = createContext({
  language: 'en',
  setLanguage: (language: string) => {},
  data: english,
});

const queryClient = new QueryClient();

const Layout = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');
  const data = language === 'en' ? english : french;

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={{ language, setLanguage, data }}>
        <Burger />
        <main>{children}</main>
        <Footer />
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
};

export default Layout;
