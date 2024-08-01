import Button, { BUTTON_SIZE } from '@/components/atoms/Button';
import { IconArrowTopRight } from '@/components/atoms/Icons';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import CardProject from '@/components/CardProject';
import { TypePreviewProject } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import { client } from '@/sanity/lib/client';
import { interpolate } from '@/utils/functions';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import { useContext, useRef } from 'react';

export default function Home({ projects }: { projects: TypePreviewProject[] }) {
  const { data } = useContext(LanguageContext);

  const heroRefs = {
    lines: {
      H1: useRef(null),
      H2: useRef(null),
      V1: useRef(null),
      V2: useRef(null),
    },
    texts: {
      text1: useRef(null),
      text2: useRef(null),
      text3: useRef(null),
      text4: useRef(null),
      text5: useRef(null),
    },
    button: useRef(null),
  };

  const aboutRefs = {
    line: useRef(null),
    img: useRef(null),
    texts: {
      text1: useRef(null),
      text2: useRef(null),
    },
  };

  const timelineRef = useRef(gsap.timeline({ paused: true }));

  const scrollTriggerAnimation = () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(aboutRefs.line.current, {
      width: '100%',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    gsap.to([aboutRefs.texts.text1.current, aboutRefs.texts.text2.current], {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.4,
      ease: 'power2.out',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        toggleActions: 'play reverse play reverse',
      },
    });

    gsap.to(aboutRefs.img.current, {
      y: 0,
      duration: 0.6,
      ease: 'power4.out',
      scrollTrigger: {
        start: '20% top',
        end: 'bottom bottom',
        toggleActions: 'play reverse play reverse',
      },
    });
  };

  const playAnimation = () => {
    timelineRef.current
      .add(
        gsap.to([heroRefs.lines.H1.current, heroRefs.lines.H2.current], {
          width: '100vw',
          duration: 2,
          ease: 'power4.inOut',
          stagger: 0,
        }),
        0,
      )
      .add(
        gsap.to([heroRefs.lines.V1.current, heroRefs.lines.V2.current], {
          height: '100vh',
          duration: 2,
          ease: 'power4.inOut',
          stagger: 0,
        }),
        0,
      )
      .add(
        gsap.to(
          [
            heroRefs.texts.text1.current,
            heroRefs.texts.text2.current,
            heroRefs.texts.text3.current,
            heroRefs.button.current,
          ],
          {
            y: 0,
            duration: 1,
            opacity: 1,
            ease: 'power4.out',
            stagger: 0.2,
          },
        ),
        '-=1',
      )
      .add(
        gsap.to([heroRefs.texts.text4.current, heroRefs.texts.text5.current], {
          x: 0,
          duration: 1,
          opacity: 1,
          ease: 'power4.out',
          stagger: 0.2,
        }),
        '-=1',
      )
      .play();
  };

  useGSAP(() => {
    playAnimation();
    scrollTriggerAnimation();
  }, []);

  return (
    <>
      <section className="bg-gradient relative h-screen w-screen px-x-default py-y-default text-center text-white">
        <div className="relative h-full w-full">
          <div
            ref={heroRefs.lines.H1}
            className="absolute -right-x-default top-0 h-px w-0 bg-white"
          ></div>
          <div
            ref={heroRefs.lines.H2}
            className="absolute -left-x-default bottom-0 h-px w-0 bg-white"
          ></div>
          <div
            ref={heroRefs.lines.V1}
            className="absolute -top-y-default right-0 h-0 w-px bg-white"
          ></div>
          <div
            ref={heroRefs.lines.V2}
            className="absolute -bottom-y-default left-0 h-0 w-px bg-white"
          ></div>
          <div className="flex h-full flex-col items-center justify-center">
            <Typography
              ref={heroRefs.texts.text1}
              type={TYPOGRAPHY_TYPE.HEADING1}
              className="texts.text-center -translate-y-4 opacity-0"
            >
              {data.home.hero.title}
            </Typography>
            <Typography
              ref={heroRefs.texts.text2}
              type={TYPOGRAPHY_TYPE.HEADING2}
              className="-translate-y-4 pb-4 text-center opacity-0"
            >
              Matteo COURQUIN
            </Typography>
            <Typography
              ref={heroRefs.texts.text3}
              type={TYPOGRAPHY_TYPE.SUBTITLE}
              className="-translate-y-4 pb-20 opacity-0"
            >
              {data.home.hero.subtitle}
            </Typography>
            <Button
              ref={heroRefs.button}
              size={BUTTON_SIZE.L}
              as="button"
              className="-translate-y-4 opacity-0"
            >
              {data.home.hero.button} <IconArrowTopRight className="ml-2 h-full py-[0.6vw]" />
            </Button>
          </div>
          <div className="absolute bottom-0 flex w-full items-end justify-between overflow-hidden p-4">
            <Link
              ref={heroRefs.texts.text4}
              className="-translate-x-full uppercase underline opacity-0"
              href="heroRefs.mai:matteo.courquin@gmail.com"
            >
              matteo.courquin@gmail.com
            </Link>
            <Typography
              ref={heroRefs.texts.text5}
              type={TYPOGRAPHY_TYPE.TEXT}
              className="translate-x-full uppercase opacity-0"
            >
              ©{new Date().getFullYear()}
            </Typography>
          </div>
        </div>
      </section>
      <section className="relative min-h-screen w-screen overflow-hidden bg-black px-x-default pt-y-default text-white md:py-y-default">
        <div className="absolute left-0 h-px w-full px-x-default">
          <div ref={aboutRefs.line} className="h-px w-0 bg-white"></div>
        </div>
        <div className="pt-y-default md:grid md:grid-cols-2">
          <Typography
            ref={aboutRefs.texts.text1}
            type={TYPOGRAPHY_TYPE.HEADING3}
            className="-translate-y-4 pb-10 uppercase opacity-0 md:pb-0"
          >
            {data.home.about.title}
          </Typography>
          <div
            ref={aboutRefs.texts.text2}
            className="text -translate-y-4 text-2xl opacity-0"
            dangerouslySetInnerHTML={{
              __html: interpolate(data.home.about.description, {
                yearsExperience: Math.floor(
                  (new Date().getTime() - new Date('Wed Jan 15 2019 16:00:00 GMT+0100').getTime()) /
                    31536000000,
                ).toString(),
              }),
            }}
          />
        </div>
        <img
          ref={aboutRefs.img}
          src="/images/matteo.png"
          alt=""
          className="translate-y-full md:absolute md:bottom-0 md:left-x-default md:w-1/3"
        />
      </section>
      <section className="px-x-default py-y-default">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {projects.map((project, index) => (
            <CardProject {...project} key={project.title + index} />
          ))}
        </div>
        <Button as="a" href="/projects" size={BUTTON_SIZE.L} className="mx-auto my-20">
          {data.home.projects.button}
        </Button>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const query = `
    *[_type == "projects"] | order(_createdAt desc)[0...4] {
      title,
      slug,
      mainImageDesktop,
      mainImageMobile,
      websiteUrl,
    }`;

  const projects = await client.fetch(query);
  return {
    props: {
      projects,
    },
  };
}
