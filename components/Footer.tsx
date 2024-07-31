import { LanguageContext } from '@/layout/default';
import Link from 'next/link';
import { useContext } from 'react';
import Button, { BUTTON_SIZE, BUTTON_TYPE } from './atoms/Button';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';

const Footer = () => {
  const { data } = useContext(LanguageContext);

  return (
    <footer className="flex bg-black px-x-default py-y-default text-center text-white md:gap-10 md:text-left">
      <div className="flex flex-col items-center gap-4 md:items-start">
        <Typography type={TYPOGRAPHY_TYPE.HEADING4} className="w-2/3 uppercase">
          {data.footer.title}
        </Typography>
        <Button as="button" className="font-medium uppercase" color="white" size={BUTTON_SIZE.L}>
          {data.footer.button}
        </Button>
        <Button
          href="mailto:matteo.courquin@gmail.com"
          as="a"
          className="uppercase underline"
          color="white"
          size={BUTTON_SIZE.M}
          type={BUTTON_TYPE.SECONDARY}
        >
          matteo.courquin@gmail.com
        </Button>
      </div>
      <div className="hidden flex-col items-end gap-3 md:flex">
        <Typography
          type={TYPOGRAPHY_TYPE.TEXT}
          as={TYPOGRAPHY_TYPE.HEADING5}
          className="pb-4 uppercase"
        >
          Menu
        </Typography>
        <Link className="link link_white heading5 !font-thin uppercase !opacity-80" href="/">
          {data.nav.home}
        </Link>
        <Link
          className="link link_white heading5 whitespace-nowrap !font-thin uppercase !opacity-80"
          href="/projects"
        >
          {data.nav.projects}
        </Link>
        <Link
          className="link link_white heading5 whitespace-nowrap !font-thin uppercase !opacity-80"
          href="/story"
        >
          {data.nav.about}
        </Link>
        <Link
          className="link link_white heading5 whitespace-nowrap !font-thin uppercase !opacity-80"
          href="/contact"
        >
          {data.nav.contact}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
