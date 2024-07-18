import Link from 'next/link';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';
import Button, { BUTTON_SIZE, BUTTON_TYPE } from './atoms/Button';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div>
        <Typography type={TYPOGRAPHY_TYPE.HEADING4}>
          Let's talk about your next project 🔥
        </Typography>
        <Button as="button" className="font-medium uppercase" color="white" size={BUTTON_SIZE.L}>
          i'm ready
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
      <div className="flex flex-col items-end gap-1">
        <Typography type={TYPOGRAPHY_TYPE.TEXT} className="pb-2 text-xl font-medium uppercase">
          Menu
        </Typography>
        <Link className="link link_white text-xl font-thin uppercase opacity-80" href="/">
          Home
        </Link>
        <Link className="link link_white text-xl font-thin uppercase opacity-80" href="/projects">
          Projects
        </Link>
        <Link className="link link_white text-xl font-thin uppercase opacity-80" href="/about">
          About
        </Link>
        <Link className="link link_white text-xl font-thin uppercase opacity-80" href="/contact">
          Contact
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
