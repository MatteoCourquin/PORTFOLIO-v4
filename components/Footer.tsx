import { LanguageContext } from '@/layout/default';
import Link from 'next/link';
import { useContext } from 'react';
import Button, { BUTTON_SIZE, BUTTON_TYPE } from './atoms/Button';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';
import { IconGithub, IconInsta, IconLinkedin } from './atoms/Icons';

const Footer = () => {
  const { data } = useContext(LanguageContext);

  return (
    <footer className="relative bg-black px-x-default py-y-default text-white">
      <div className="mx-auto flex max-w-default text-center md:gap-10 md:text-left">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Typography
            type={TYPOGRAPHY_TYPE.HEADING4}
            className="w-full text-center uppercase md:w-2/3 md:text-left"
          >
            {data.footer.title}
          </Typography>
          <Button
            as="a"
            href="/contact"
            className="font-medium uppercase"
            color="white"
            size={BUTTON_SIZE.L}
          >
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
            as={TYPOGRAPHY_TYPE.HEADING4}
            className="pb-4 uppercase"
          >
            Menu
          </Typography>
          <Link className="link link_white heading5 !font-thin uppercase text-white-light" href="/">
            {data.nav.home}
          </Link>
          <Link
            className="link link_white heading5 whitespace-nowrap !font-thin uppercase text-white-light"
            href="/projects"
          >
            {data.nav.projects}
          </Link>
          <Link
            className="link link_white heading5 whitespace-nowrap !font-thin uppercase text-white-light"
            href="/about"
          >
            {data.nav.about}
          </Link>
          <Link
            className="link link_white heading5 whitespace-nowrap !font-thin uppercase text-white-light"
            href="/contact"
          >
            {data.nav.contact}
          </Link>
          <div className="flex items-center justify-center gap-4 pt-10">
            <Link
              href="https://github.com/matteocourquin"
              target="_blank"
              className="group/icon shadow-bakground"
            >
              <IconGithub className="transition-colors duration-300 group-hover/icon:stroke-primary" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/matteo-courquin/"
              target="_blank"
              className="group/icon shadow-bakground"
            >
              <IconLinkedin className="transition-colors duration-300 group-hover/icon:stroke-primary" />
            </Link>
            <Link
              href="https://www.instagram.com/matteocourquin.dev/"
              target="_blank"
              className="group/icon shadow-bakground"
            >
              <IconInsta className="transition-colors duration-300 group-hover/icon:stroke-primary" />
            </Link>
          </div>
        </div>
      </div>
      <Typography
        type={TYPOGRAPHY_TYPE.TEXT}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white-light"
      >
        MATTEO COURQUIN ©{new Date().getFullYear()}
      </Typography>
    </footer>
  );
};

export default Footer;
