import Button, { BUTTON_SIZE } from '@/components/atoms/Button';
import { IconArrowTopRight } from '@/components/atoms/Icons';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import CardProject from '@/components/CardProject';
import { TypePreviewProject } from '@/data/types';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Home({ projects }: { projects: TypePreviewProject[] }) {
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

  useEffect(() => {
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
              Hey👋 I’m
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
              WEB DEVELOPER ( SINCE 2019 )
            </Typography>
            <Button
              ref={heroRefs.button}
              size={BUTTON_SIZE.L}
              as="button"
              className="-translate-y-4 opacity-0"
            >
              Start Project <IconArrowTopRight className="ml-2 h-full py-[0.6vw]" />
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
            Qui suis-je ?
          </Typography>
          <Typography
            ref={aboutRefs.texts.text2}
            type={TYPOGRAPHY_TYPE.TEXT}
            className="-translate-y-4 text-2xl opacity-0"
          >
            Salut 👋 ! Moi c’est Matteo, développeur FullStack depuis{' '}
            {Math.floor(
              (new Date().getTime() - new Date('Wed Jan 15 2019 16:00:00 GMT+0100').getTime()) /
                31536000000,
            )}{' '}
            ans. <br />
            <br />
            Initialement parti pour être architecte, ma passion pour le développement web a émergé
            pendant le confinement, consolidée par un Bachelor à l’
            <a
              href="heroRefs.ht://www.iim.fr/cursus/bachelor-coding-digital-innovation/"
              target="_blank"
              className="underline"
            >
              IIM
            </a>{' '}
            et un Master à l’
            <a
              href="heroRefs.ht://www.hetic.net/formations/mastere-cto-tech-lead"
              target="_blank"
              className="underline"
            >
              HETIC
            </a>
            . 💻
            <br />
            <br />
            Tout a commencé depuis{' '}
            <a href="heroRefs.ht://openclassrooms.com/fr/" target="_blank" className="underline">
              OpenClassrooms
            </a>
            . Le premier site vers lequel on se dirige lorsque l’on s’intéresse au web !<br />
            <br />
            Actuellement en Freelance, j’ai l’habitude de créer de multiple projets. 🚀
            <br />
            <br />
            Ma rigueur, ma persévérance et ma sensibilité esthétique se reflètent dans ma vision du
            développement.
            <br />
            <br />« Un code propre en vaut 10 » 😉
          </Typography>
        </div>
        <img
          ref={aboutRefs.img}
          src="/images/matteo.png"
          alt=""
          className="translate-y-full md:absolute md:bottom-0 md:left-x-default md:w-1/3"
        />
      </section>
      <section className="px-x-default py-y-default">
        <div className="grid min-h-screen grid-cols-1 gap-10 md:grid-cols-2">
          {projects.map((project, index) => (
            <CardProject {...project} key={project.title + index} />
          ))}
        </div>
        <Button as="button" size={BUTTON_SIZE.L} className="mx-auto my-20">
          more
        </Button>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const projects = [
    {
      index: '1',
      title: 'Super projet',
      mainImageUrl: '/images/matteo.png',
      websiteUrl: 'https://www.google.com',
    },
    {
      index: '2',
      title: 'Project Master',
      mainImageUrl: '/images/matteo.png',
    },
    {
      index: '3',
      title: '2.26 Tours',
      mainImageUrl: '/images/matteo.png',
      websiteUrl: 'https://www.google.com',
    },
    {
      index: '4',
      title: 'Bel',
      mainImageUrl: '/images/matteo.png',
    },
    {
      index: '5',
      title: 'zLawyer',
      mainImageUrl: '/images/matteo.png',
      websiteUrl: 'https://www.google.com',
    },
  ];

  return {
    props: {
      projects,
    },
  };
}
