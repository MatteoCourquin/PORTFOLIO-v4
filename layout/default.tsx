import Burger from '@/components/Burger';
import Footer from '@/components/Footer';
import { createContext, ReactNode, useState } from 'react';
import english from '@/data/languages/english.json';
import french from '@/data/languages/french.json';

export const LanguageContext = createContext({
  language: 'en',
  setLanguage: (language: string) => {},
  data: english,
});

const Layout = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');
  const data = language === 'en' ? english : french;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, data }}>
      <Burger />
      <main>{children}</main>
      <Footer />
    </LanguageContext.Provider>
  );
};

export default Layout;
