import Button, { BUTTON_SIZE } from '@/components/atoms/Button';
import { IconArrowTopRight } from '@/components/atoms/Icons';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import CardProject from '@/components/CardProject';
import Questions from '@/components/Questions';
import SEO from '@/components/SEO';
import { TypeProject, TypeQuestion } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import { client } from '@/sanity/lib/client';
import { interpolate } from '@/utils/functions';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import { useContext, useRef } from 'react';

export default function Home({
  projects,
  questions,
}: {
  projects: TypeProject[];
  questions: TypeQuestion[];
}) {
  const { data } = useContext(LanguageContext);

  const heroRefs = {
    triggerRef: useRef(null),
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
    triggerRef: useRef(null),
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

    gsap.to(heroRefs.texts.text1.current, {
      xPercent: 70,
      ease: 'power4.out',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        toggleActions: 'play reverse play reverse',
        scrub: true,
      },
    });

    gsap.to(heroRefs.texts.text2.current, {
      xPercent: -70,
      ease: 'power4.out',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        toggleActions: 'play reverse play reverse',
        scrub: true,
      },
    });

    gsap.to(heroRefs.button.current, {
      y: -100,
      ease: 'power4.out',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        toggleActions: 'play reverse play reverse',
        scrub: true,
      },
    });

    gsap.to(aboutRefs.line.current, {
      width: '100%',
      scrollTrigger: {
        start: 'top top',
        end: '50% 50%',
        scrub: true,
      },
    });

    gsap.to([aboutRefs.texts.text1.current, aboutRefs.texts.text2.current], {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.2,
      scrollTrigger: {
        start: '10% top',
        end: 'bottom bottom',
        toggleActions: 'play reverse play reverse',
      },
    });

    gsap.to(aboutRefs.img.current, {
      y: 0,
      duration: 0.6,
      ease: 'power4.out',
      scrollTrigger: {
        start: '15% top',
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
        gsap.to([heroRefs.texts.text1.current, heroRefs.texts.text2.current], {
          x: 0,
          duration: 1,
          opacity: 1,
          ease: 'power2.out',
          stagger: 0.1,
        }),
        '-=1',
      )
      .add(
        gsap.to([heroRefs.texts.text3.current, heroRefs.button.current], {
          y: 0,
          duration: 1,
          opacity: 1,
          ease: 'power4.out',
          stagger: 0.2,
        }),
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
      <SEO title={data.head.titleIndex} />
      <section
        ref={heroRefs.triggerRef}
        className="relative h-screen w-screen px-x-default py-y-default text-center text-black"
      >
        <div className="relative h-full w-full">
          <div
            ref={heroRefs.lines.H1}
            className="absolute -right-x-default top-0 h-px w-0 bg-black"
          ></div>
          <div
            ref={heroRefs.lines.H2}
            className="absolute -left-x-default bottom-0 h-px w-0 bg-black"
          ></div>
          <div
            ref={heroRefs.lines.V1}
            className="absolute -top-y-default right-0 h-0 w-px bg-black"
          ></div>
          <div
            ref={heroRefs.lines.V2}
            className="absolute -bottom-y-default left-0 h-0 w-px bg-black"
          ></div>
          <div className="flex h-full w-full flex-col justify-center overflow-hidden px-4">
            <Typography
              ref={heroRefs.texts.text1}
              type={TYPOGRAPHY_TYPE.HEADING1}
              className="text-home w-full -translate-x-full whitespace-nowrap text-left text-primary opacity-0"
            >
              MA<span className="inline-block -translate-x-2">TTEO</span>
            </Typography>
            <Typography
              ref={heroRefs.texts.text2}
              type={TYPOGRAPHY_TYPE.HEADING2}
              as={TYPOGRAPHY_TYPE.HEADING1}
              className="text-home shrink translate-x-full self-end whitespace-nowrap pb-4 text-right opacity-0"
            >
              COURQUIN
            </Typography>
            <Typography
              ref={heroRefs.texts.text3}
              type={TYPOGRAPHY_TYPE.SUBTITLE}
              className="-translate-y-4 pb-20 opacity-0"
            >
              {data.home.hero.subtitle}
            </Typography>
            {/* <div className="translate-x-8 "> */}
            <Button
              ref={heroRefs.button}
              size={BUTTON_SIZE.L}
              as="a"
              href="/contact"
              className="translate-y-4 self-center opacity-0 sm:self-end"
            >
              {data.home.hero.button}{' '}
              <IconArrowTopRight className="ml-2 h-full w-3 py-[0.6vw] md:w-5" />
            </Button>
            {/* </div> */}
          </div>
          <div className="absolute bottom-0 flex w-full items-end justify-center overflow-hidden p-4 sm:justify-between">
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
              className="hidden translate-x-full uppercase opacity-0 sm:block"
            >
              ©{new Date().getFullYear()}
            </Typography>
          </div>
        </div>
      </section>
      <section
        ref={aboutRefs.triggerRef}
        className="relative min-h-screen w-screen overflow-hidden bg-black px-x-default pt-y-default text-white md:py-y-default"
      >
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
          src="/images/matteo.webp"
          alt=""
          className="translate-y-full md:absolute md:bottom-0 md:left-x-default md:w-1/3"
        />
      </section>
      <section className="px-x-default py-y-default">
        <Typography className="w-full text-center sm:text-left" type={TYPOGRAPHY_TYPE.HEADING3}>
          {data.home.projects.title}
        </Typography>
        <div className="grid grid-cols-1 gap-10 pt-y-default md:grid-cols-2">
          {projects.map((project, index) => (
            <CardProject {...project} projectIndex={index + 1} key={project.title + index} />
          ))}
        </div>
        <Button as="a" href="/projects" size={BUTTON_SIZE.L} className="mx-auto my-20">
          {data.home.projects.button}
        </Button>
      </section>
      <section className="px-x-default pb-y-default">
        <Questions questions={questions} />
      </section>
    </>
  );
}

export async function getStaticProps() {
  const queryProjects = `
    *[_type == "projects"] | order(_createdAt desc)[0...4] {
      projectIndex,
      title,
      slug,
      mainImageDesktop,
      mainImageMobile,
      websiteUrl,
    }`;

  const queryQuestions = `
    *[_type == "questions"] {
      questionEn,
      questionFr,
      answerEn,
      answerFr,
    }`;

  const projects = await client.fetch(queryProjects);
  const questions = await client.fetch(queryQuestions);
  return {
    props: {
      projects,
      questions,
    },
  };
}
