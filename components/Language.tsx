import { LanguageContext } from '@/layout/default';
import clsx from 'clsx';
import { useContext } from 'react';
import Typography from './atoms/Typography';

const Language = ({ className }: { className?: string }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  return (
    <div
      className={clsx('cube', language === 'fr' && 'rotate', className)}
      onClick={() => {
        localStorage.setItem('language', language === 'en' ? 'fr' : 'en');
        setLanguage(language === 'en' ? 'fr' : 'en');
      }}
    >
      <Typography className="link link_white face front whitespace-nowrap text-xl">
        FRA 🇫🇷
      </Typography>
      <Typography className="link link_white face top whitespace-nowrap text-xl">ENG 🇬🇧</Typography>
    </div>
  );
};

export default Language;
