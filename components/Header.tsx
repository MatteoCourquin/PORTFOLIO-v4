import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';
import { useContext } from 'react';
import { LanguageContext } from '@/layout/default';

const Header = () => {
  const pathname = usePathname();
  const { data } = useContext(LanguageContext);
  return (
    <header className="absolute z-10 mx-auto hidden h-y-default w-screen max-w-default items-center justify-center gap-4 uppercase text-white mix-blend-difference md:flex">
      <Link
        scroll={false}
        href="/"
        className={clsx('link link_white', pathname === '/' && 'active')}
      >
        <Typography as={TYPOGRAPHY_TYPE.HEADING6}>{data.nav.home}</Typography>
      </Link>
      <Link
        scroll={false}
        href="/projects"
        className={clsx('link link_white', pathname?.includes('/projects') && 'active')}
      >
        <Typography as={TYPOGRAPHY_TYPE.HEADING6}>{data.nav.projects}</Typography>
      </Link>
      <Link
        scroll={false}
        href="/about"
        className={clsx('link link_white', pathname === '/about' && 'active')}
      >
        <Typography as={TYPOGRAPHY_TYPE.HEADING6}>{data.nav.about}</Typography>
      </Link>
      <Link
        scroll={false}
        href="/contact"
        className={clsx('link link_white', pathname === '/contact' && 'active')}
      >
        <Typography as={TYPOGRAPHY_TYPE.HEADING6}>{data.nav.contact}</Typography>
      </Link>
    </header>
  );
};

export default Header;
