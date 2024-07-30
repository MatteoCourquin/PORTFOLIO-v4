import Link from 'next/link';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';
import Button, { BUTTON_SIZE, BUTTON_TYPE } from './atoms/Button';

const Footer = () => {
  return (
    <footer className="flex bg-black px-x-default py-y-default text-center text-white md:gap-10 md:text-left">
      <div className="flex flex-col items-center gap-4 md:items-start">
        <Typography type={TYPOGRAPHY_TYPE.HEADING4} className="w-2/3 uppercase">
          Let’s talk about your next project 🔥
        </Typography>
        <Button as="button" className="font-medium uppercase" color="white" size={BUTTON_SIZE.L}>
          i’m ready
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
          Home
        </Link>
        <Link
          className="link link_white heading5 !font-thin uppercase !opacity-80"
          href="/projects"
        >
          Projects
        </Link>
        <Link className="link link_white heading5 !font-thin uppercase !opacity-80" href="/about">
          About
        </Link>
        <Link className="link link_white heading5 !font-thin uppercase !opacity-80" href="/contact">
          Contact
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
