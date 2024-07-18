import Button, { BUTTON_SIZE } from '@/components/atoms/Button';
import { IconArrowTopRight } from '@/components/atoms/Icons';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import CardProject from '@/components/CardProject';
import { TypePreviewProjects } from '@/data/types';
import gsap from 'gsap';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Home({ projects }: { projects: TypePreviewProjects[] }) {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const button1Ref = useRef(null);
  const text4Ref = useRef(null);
  const text5Ref = useRef(null);
  const timelineRef = useRef(gsap.timeline({ paused: true }));

  const playAnimation = () => {
    if (
      !line1Ref.current ||
      !line2Ref.current ||
      !line3Ref.current ||
      !line4Ref.current ||
      !text1Ref.current ||
      !text2Ref.current ||
      !text3Ref.current ||
      !button1Ref.current
    )
      return;
    timelineRef.current
      .add(
        gsap.to([line1Ref.current, line2Ref.current], {
          height: '100vh',
          duration: 2,
          ease: 'power4.inOut',
          stagger: 0,
        }),
        0,
      )
      .add(
        gsap.to([line3Ref.current, line4Ref.current], {
          width: '100vw',
          duration: 2,
          ease: 'power4.inOut',
          stagger: 0,
        }),
        0,
      )
      .add(
        gsap.to([text1Ref.current, text2Ref.current, text3Ref.current, button1Ref.current], {
          y: 0,
          duration: 1,
          opacity: 1,
          ease: 'power4.out',
          stagger: 0.2,
        }),
        '-=1',
      )
      .add(
        gsap.to([text4Ref.current, text5Ref.current], {
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
  }, []);
  return (
    <>
      <section className="bg-gradient relative h-screen w-screen px-x-default py-y-default text-center text-white">
        <div className="relative h-full w-full">
          <div ref={line1Ref} className="absolute -bottom-y-default left-0 h-0 w-px bg-white"></div>
          <div ref={line2Ref} className="absolute -top-y-default right-0 h-0 w-px bg-white"></div>
          <div ref={line3Ref} className="absolute -left-x-default bottom-0 h-px w-0 bg-white"></div>
          <div ref={line4Ref} className="absolute -right-x-default top-0 h-px w-0 bg-white"></div>
          <div className="flex h-full flex-col items-center justify-center">
            <Typography
              ref={text1Ref}
              type={TYPOGRAPHY_TYPE.HEADING1}
              className="-translate-y-4 text-center opacity-0"
            >
              Hey👋 I'm
            </Typography>
            <Typography
              ref={text2Ref}
              type={TYPOGRAPHY_TYPE.HEADING2}
              className="-translate-y-4 pb-4 text-center opacity-0"
            >
              Matteo COURQUIN
            </Typography>
            <Typography
              ref={text3Ref}
              type={TYPOGRAPHY_TYPE.SUBTITLE}
              className="-translate-y-4 pb-20 opacity-0"
            >
              WEB DEVELOPER ( SINCE 2019 )
            </Typography>
            <Button
              ref={button1Ref}
              size={BUTTON_SIZE.L}
              as="button"
              className="-translate-y-4 opacity-0"
            >
              Start Project <IconArrowTopRight className="ml-2 h-full" />
            </Button>
          </div>
          <div className="absolute bottom-0 flex w-full items-end justify-between overflow-hidden p-4">
            <Link
              ref={text4Ref}
              className="-translate-x-full uppercase underline opacity-0"
              href="mailto:matteo.courquin@gmail.com"
            >
              matteo.courquin@gmail.com
            </Link>
            <Typography
              ref={text5Ref}
              type={TYPOGRAPHY_TYPE.TEXT}
              className="translate-x-full uppercase opacity-0"
            >
              ©{new Date().getFullYear()}
            </Typography>
          </div>
        </div>
      </section>
      <section className="relative min-h-screen w-screen bg-black px-x-default pt-y-default text-white md:py-y-default">
        <div className="absolute left-0 h-px w-full px-x-default">
          <div className="h-px w-full bg-white"></div>
        </div>
        <div className="pt-y-default md:grid md:grid-cols-2">
          <Typography type={TYPOGRAPHY_TYPE.HEADING3} className="pb-10 uppercase md:pb-0">
            Qui suis-je ?
          </Typography>
          <Typography type={TYPOGRAPHY_TYPE.TEXT} className="text-2xl">
            Salut 👋 ! Moi c'est Matteo, développeur FullStack depuis{' '}
            {Math.floor(
              (new Date().getTime() - new Date('Wed Jan 15 2019 16:00:00 GMT+0100').getTime()) /
                31536000000,
            )}{' '}
            ans. <br />
            <br />
            Initialement parti pour être architecte, ma passion pour le développement web a émergé
            pendant le confinement, consolidée par un Bachelor à l'
            <a
              href="https://www.iim.fr/cursus/bachelor-coding-digital-innovation/"
              target="_blank"
              className="underline"
            >
              IIM
            </a>{' '}
            et un Master à l'
            <a
              href="https://www.hetic.net/formations/mastere-cto-tech-lead"
              target="_blank"
              className="underline"
            >
              HETIC
            </a>
            . 💻
            <br />
            <br />
            Tout a commencé depuis{' '}
            <a href="https://openclassrooms.com/fr/" target="_blank" className="underline">
              OpenClassrooms
            </a>
            . Le premier site vers lequel on se dirige lorsque l'on s'intéresse au web !<br />
            <br />
            Actuellement en Freelance, j'ai l'habitude de créer de multiple projets. 🚀
            <br />
            <br />
            Ma rigueur, ma persévérance et ma sensibilité esthétique se reflètent dans ma vision du
            développement.
            <br />
            <br />« Un code propre en vaut 10 » 😉
          </Typography>
        </div>
        <img
          src="/images/matteo.png"
          alt=""
          className="md:absolute md:bottom-0 md:left-x-default md:w-1/3"
        />
      </section>
      <section className="px-x-default py-y-default">
        <div className="grid min-h-screen grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <CardProject
              key={project.title + index}
              index={project.index}
              title={project.title}
              mainImageUrl={project.mainImageUrl}
            />
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
    },
  ];
  return {
    props: {
      projects,
    },
  };
}
