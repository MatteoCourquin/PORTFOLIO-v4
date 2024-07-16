import Link from 'next/link';

const Header = () => {
  return (
    <header className="absolute left-0 top-0 w-screen z-[99] flex items-center gap-8 justify-center h-20">
      <Link className="link link_white uppercase font-medium text-xl" href="/">
        Home
      </Link>
      <Link className="link link_white uppercase font-medium text-xl" href="/projects">
        Projects
      </Link>
      <Link className="link link_white uppercase font-medium text-xl" href="/about">
        About
      </Link>
      <Link className="link link_white uppercase font-medium text-xl" href="/contact">
        Contact
      </Link>
    </header>
  );
};

export default Header;
