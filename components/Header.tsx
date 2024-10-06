import { LanguageContext } from '@/layout/default';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';

const Header = () => {
  const pathname = usePathname();
  const { data } = useContext(LanguageContext);
  return (
    <header className="absolute z-10 hidden h-y-default w-screen items-center justify-center gap-4 uppercase md:flex">
      <Link
        scroll={false}
        href="/"
        className={clsx(
          'link link_white transition-all delay-300 duration-300',
          pathname === '/' ? 'link_white' : 'link_black',
          pathname === '/' && 'active',
        )}
      >
        <Typography as={TYPOGRAPHY_TYPE.HEADING6}>{data.nav.home}</Typography>
      </Link>
      <Link
        scroll={false}
        href="/projects"
        className={clsx(
          'link link_white transition-all delay-300 duration-300',
          pathname === '/' ? 'link_white' : 'link_black',
          pathname?.includes('/projects') && 'active',
        )}
      >
        <Typography as={TYPOGRAPHY_TYPE.HEADING6}>{data.nav.projects}</Typography>
      </Link>
      <Link
        scroll={false}
        href="/about"
        className={clsx(
          'link link_white transition-all delay-300 duration-300',
          pathname === '/' ? 'link_white' : 'link_black',
          pathname === '/about' && 'active',
        )}
      >
        <Typography as={TYPOGRAPHY_TYPE.HEADING6}>{data.nav.about}</Typography>
      </Link>
      <Link
        scroll={false}
        href="/contact"
        className={clsx(
          'link link_white transition-all delay-300 duration-300',
          pathname === '/' ? 'link_white' : 'link_black',
          pathname === '/contact' && 'active',
        )}
      >
        <Typography as={TYPOGRAPHY_TYPE.HEADING6}>{data.nav.contact}</Typography>
      </Link>
    </header>
  );
};

export default Header;
