import Link from 'next/link';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';

const Header = () => {
  return (
    <header className="h-y-default absolute z-10 mx-auto hidden w-screen max-w-default items-center justify-center gap-4 uppercase text-white mix-blend-difference md:flex">
      <Link href="/">
        <Typography as={TYPOGRAPHY_TYPE.HEADING6}>Home</Typography>
      </Link>
      <Link href="/about">
        <Typography as={TYPOGRAPHY_TYPE.HEADING6}>About</Typography>
      </Link>
      <Link href="/projects">
        <Typography as={TYPOGRAPHY_TYPE.HEADING6}>Projects</Typography>
      </Link>
      <Link href="/contact">
        <Typography as={TYPOGRAPHY_TYPE.HEADING6}>Contact</Typography>
      </Link>
    </header>
  );
};

export default Header;
