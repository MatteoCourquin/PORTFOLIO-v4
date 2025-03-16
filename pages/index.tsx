import Button, { BUTTON_SIZE } from '@/components/atoms/Button';
import {
  IconArrowTopRight,
  IconAWS,
  IconFigma,
  IconGSAP,
  IconIllustrator,
  IconNext,
  IconNuxt,
  IconPhotoshop,
  IconReact,
  IconStar,
  IconThreeJS,
  IconVue,
} from '@/components/atoms/Icons';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import CardProject from '@/components/CardProject';
import DropUp from '@/components/DropUp';
import Questions from '@/components/Questions';
import SEO from '@/components/SEO';
import Testimonials from '@/components/Testimonials';
import { TypePaths, TypeProject, TypeQuestion, TypeTestimonial } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import { fetchPaths } from '@/services/paths.sevices';
import { fetchProjects } from '@/services/projects.sevices';
import { fetchQuestions } from '@/services/questions.sevices';
import { fetchTestimonials } from '@/services/testimonials.sevices';
import { interpolate } from '@/utils/functions';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);

export default function Home({
  projects,
  questions,
  testimonials,
}: {
  paths: TypePaths[];
  projects: TypeProject[];
  questions: TypeQuestion[];
  testimonials: TypeTestimonial[];
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
      firstName: useRef(null),
      lastName: useRef(null),
      testimonials: useRef(null),
      subtitle: useRef(null),
      mail: useRef(null),
    },
    icons: useRef<HTMLDivElement>(null),
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
    gsap.to(heroRefs.texts.firstName.current, {
      xPercent: 100,
      ease: 'power4.out',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        toggleActions: 'play reverse play reverse',
        scrub: true,
      },
    });

    gsap.to(heroRefs.texts.lastName.current, {
      xPercent: -100,
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
      .addLabel('startAnimations')
      .add(
        gsap.to([heroRefs.lines.H1.current, heroRefs.lines.H2.current], {
          width: '100vw',
          duration: 2,
          ease: 'power4.inOut',
          stagger: 0,
        }),
        'startAnimations',
      )
      .add(
        gsap.to([heroRefs.lines.V1.current, heroRefs.lines.V2.current], {
          height: '100vh',
          duration: 2,
          ease: 'power4.inOut',
          stagger: 0,
        }),
        'startAnimations',
      )
      .add(
        gsap.to([heroRefs.texts.firstName.current, heroRefs.texts.lastName.current], {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
        }),
        '-=1',
      )
      .add(
        gsap.to([heroRefs.texts.subtitle.current, heroRefs.button.current], {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.2,
        }),
        '-=1',
      )
      .add(
        gsap.to([heroRefs.texts.testimonials.current, heroRefs.texts.mail.current], {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.2,
        }),
        '-=1',
      );

    if (heroRefs.icons.current) {
      timelineRef.current
        .add(
          gsap.to(heroRefs.icons.current.querySelectorAll('.dropup'), {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.12,
          }),
          '-=0.8',
        )
        .add(
          gsap.to(heroRefs.icons.current.querySelectorAll('.dropup-line'), {
            height: '66%',
            duration: 2,
            ease: 'power4.out',
          }),
          '-=1',
        );
    }

    timelineRef.current.play();
  };

  useGSAP(() => {
    playAnimation();
    scrollTriggerAnimation();
  }, []);

  return (
    <>
      <SEO title={data.head.titleIndex} image="/ogIndex.png" />
      <section
        ref={heroRefs.triggerRef}
        className="relative h-screen w-screen overflow-hidden px-x-default py-y-default text-center text-white"
      >
        {/* <div className="absolute inset-0 z-0 h-screen w-screen bg-black object-cover opacity-50 lg:opacity-30" /> */}
        <Image
          width={2080}
          height={1920}
          src="/images/matteo.jpg"
          alt="Matteo Courquin"
          className="absolute inset-0 -z-10 h-screen w-screen object-cover object-[80%] lg:object-right"
        />
        <div
          ref={heroRefs.lines.H1}
          className="absolute right-0 top-y-default h-px w-0 bg-white"
        ></div>
        <div
          ref={heroRefs.lines.H2}
          className="absolute bottom-y-default left-0 h-px w-0 bg-white"
        ></div>
        <div className="relative mx-auto h-full w-full max-w-default">
          <div
            ref={heroRefs.lines.V1}
            className="absolute -top-y-default right-0 h-0 w-px bg-white"
          ></div>
          <div
            ref={heroRefs.lines.V2}
            className="absolute -bottom-y-default left-0 h-0 w-px bg-white"
          ></div>
          <div className="flex h-full w-full flex-col justify-center overflow-hidden px-x-default pb-28">
            <Typography
              ref={heroRefs.texts.firstName}
              type={TYPOGRAPHY_TYPE.HEADING1}
              className="text-home w-full -translate-x-full whitespace-nowrap text-center opacity-0 sm:text-left"
            >
              MATTEO
            </Typography>
            <Typography
              ref={heroRefs.texts.lastName}
              type={TYPOGRAPHY_TYPE.HEADING2}
              as={TYPOGRAPHY_TYPE.HEADING1}
              className="text-home w-full shrink translate-x-full self-end whitespace-nowrap text-center opacity-0 sm:text-left"
            >
              COURQUIN
            </Typography>
            <div
              ref={heroRefs.texts.subtitle}
              className="flex -translate-x-full flex-col items-center pt-10 opacity-0 sm:items-start"
            >
              <Typography
                type={TYPOGRAPHY_TYPE.SUBTITLE}
                dangerouslySetInnerHTML={data.home.hero.subtitle}
                className="text-center md:text-left"
              />
              {/* <Link
                scroll={false}
                href="/contact"
                className="hidden w-fit items-center gap-3 text-green-500 md:flex"
              >
                <div className="relative flex h-2 w-2 items-center justify-center">
                  <div className="absolute h-1 w-1 animate-pulse rounded-full bg-green-500"></div>
                  <div className="absolute h-2 w-2 animate-ping rounded-full bg-green-500"></div>
                </div>
                <Typography
                  type={TYPOGRAPHY_TYPE.TEXT}
                  className="$ font-medium"
                  dangerouslySetInnerHTML={data.home.hero.avaible}
                />
              </Link> */}
            </div>
            <div
              ref={heroRefs.texts.testimonials}
              className="flex w-full -translate-x-full flex-col items-center justify-center gap-2 pb-10 pt-8 uppercase opacity-0 sm:flex-row sm:justify-start"
            >
              <div className="flex">
                5/5
                <IconStar />
                <IconStar />
                <IconStar />
                <IconStar />
                <IconStar />
              </div>
              <p>{data.home.hero.rating}</p>
            </div>
            <Button
              ref={heroRefs.button}
              size={BUTTON_SIZE.M}
              as="a"
              href="/contact"
              className="translate-x-full self-center !bg-white opacity-0 sm:self-start sm:!bg-black"
            >
              {data.home.hero.button}
              <IconArrowTopRight className="ml-2 h-full w-3 py-[0.6vw] md:w-5" />
            </Button>
          </div>
          <div className="absolute bottom-0 flex w-full flex-col items-center justify-center overflow-hidden p-4 pt-10 md:flex-row md:items-end md:justify-between">
            <Link
              ref={heroRefs.texts.mail}
              className="-translate-x-full uppercase underline opacity-0"
              href="mailto:contact@matteocourquin.com"
            >
              contact@matteocourquin.com
            </Link>
            <div ref={heroRefs.icons} className="hidden h-6 items-center gap-2 lg:flex">
              <DropUp
                className="dropup -translate-y-full opacity-0"
                text="React"
                icon={<IconReact className="h-full w-auto fill-white" />}
              />
              <DropUp
                className="dropup -translate-y-full opacity-0"
                text="Next.js"
                icon={<IconNext className="h-full w-auto fill-white" />}
              ></DropUp>
              <DropUp
                className="dropup -translate-y-full opacity-0"
                text="Vue.js"
                icon={<IconVue className="h-full w-auto fill-white" />}
              ></DropUp>
              <DropUp
                className="dropup -translate-y-full opacity-0"
                text="Nuxt.js"
                icon={<IconNuxt className="h-full w-auto fill-white" />}
              ></DropUp>
              <DropUp
                className="dropup -translate-y-full opacity-0"
                text="AWS"
                icon={<IconAWS className="h-full w-auto fill-white" />}
              ></DropUp>
              <div className="dropup-line mx-2 h-0 w-px bg-white"></div>
              <DropUp
                className="dropup -translate-y-full opacity-0"
                text="GSAP"
                icon={<IconGSAP className="h-4 w-auto fill-white" />}
              ></DropUp>
              <DropUp
                className="dropup -translate-y-full opacity-0"
                text="THREE.js"
                icon={<IconThreeJS className="h-full w-auto stroke-white" />}
              ></DropUp>
              <div className="dropup-line mx-2 h-0 w-px bg-white"></div>
              <DropUp
                className="dropup -translate-y-full opacity-0"
                text="Illustrator"
                icon={<IconIllustrator className="h-full w-auto fill-white" />}
              ></DropUp>
              <DropUp
                className="dropup -translate-y-full opacity-0"
                text="Photoshop"
                icon={<IconPhotoshop className="h-full w-auto fill-white" />}
              ></DropUp>
              <DropUp
                className="dropup -translate-y-full opacity-0"
                text="Figma"
                icon={<IconFigma className="h-full w-auto fill-white" />}
              ></DropUp>
            </div>
          </div>
        </div>
      </section>
      <section
        ref={aboutRefs.triggerRef}
        className="relative h-fit w-screen overflow-hidden bg-black px-x-default text-white"
      >
        <div className="relative mx-auto max-w-default pt-y-default md:py-y-default">
          <div className="absolute left-0 h-px w-full">
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
                    (new Date().getTime() -
                      new Date('Wed Jan 15 2019 16:00:00 GMT+0100').getTime()) /
                      31536000000,
                  ).toString(),
                }),
              }}
            />
            <Image
              width={300}
              height={300}
              ref={aboutRefs.img}
              src="/images/avatar.webp"
              alt=""
              className="translate-y-full md:absolute md:bottom-0 md:left-0 md:w-1/3"
            />
          </div>
        </div>
      </section>
      <section className="bg-white px-x-default py-y-default">
        <div className="mx-auto max-w-default">
          <Typography className="w-full text-center sm:text-left" type={TYPOGRAPHY_TYPE.HEADING3}>
            {data.home.projects.title}
          </Typography>
          <div className="grid grid-cols-1 gap-10 pt-y-default md:grid-cols-2">
            {projects.map((project, index) => (
              <CardProject {...project} projectIndex={index + 1} key={project.title} />
            ))}
          </div>
          <Button as="a" href="/projects" size={BUTTON_SIZE.L} className="mx-auto my-20">
            {data.home.projects.button}
          </Button>
        </div>
      </section>
      <section className="bg-black">
        <div className="py-y-default">
          <Testimonials testimonials={testimonials} />
        </div>
      </section>
      <section className="bg-white px-x-default py-y-default">
        <div className="mx-auto max-w-default">
          <Questions questions={questions} />
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const projects = await fetchProjects();
  const testimonials = await fetchTestimonials();
  const questions = await fetchQuestions();
  const paths = await fetchPaths();

  return {
    props: {
      paths,
      projects: projects.slice(0, 4),
      testimonials,
      questions,
    },
  };
}
