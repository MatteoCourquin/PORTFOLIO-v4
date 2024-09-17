import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';

const Header = () => {
  const pathname = usePathname();
  return (
    <header
      className={clsx(
        'absolute z-10 mx-auto hidden h-y-default w-screen max-w-default items-center justify-center gap-4 uppercase text-white md:flex',
        pathname === '/' ? 'mix-blend-normal' : 'mix-blend-difference',
      )}
    >
      <Link href="/" className={clsx('link link_white', pathname === '/' && 'active')}>
        <Typography as={TYPOGRAPHY_TYPE.HEADING6}>Home</Typography>
      </Link>
      <Link href="/about" className={clsx('link link_white', pathname === '/about' && 'active')}>
        <Typography as={TYPOGRAPHY_TYPE.HEADING6}>About</Typography>
      </Link>
      <Link
        href="/projects"
        className={clsx('link link_white', pathname === '/projects' && 'active')}
      >
        <Typography as={TYPOGRAPHY_TYPE.HEADING6}>Projects</Typography>
      </Link>
      <Link
        href="/contact"
        className={clsx('link link_white', pathname === '/contact' && 'active')}
      >
        <Typography as={TYPOGRAPHY_TYPE.HEADING6}>Contact</Typography>
      </Link>
    </header>
  );
};

export default Header;
