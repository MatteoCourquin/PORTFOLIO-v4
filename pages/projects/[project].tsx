import Button, { BUTTON_SIZE } from '@/components/atoms/Button';
import { IconArrowTopRight } from '@/components/atoms/Icons';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import { TypeProject } from '@/data/types';
import { formatSlug } from '@/utils/functions';
import gsap from 'gsap';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Page({ project }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!project) {
    // console.log(any)
    return <div>Projet non trouvé.</div>;
  }

  const heroRefs = {
    lines: {
      H1: useRef(null),
      H2: useRef(null),
      H3: useRef(null),
      V1: useRef(null),
      V2: useRef(null),
    },
    wrappers: {
      wrapperImg: useRef(null),
      wrapperAbout: useRef(null),
    },
    texts: {
      text1: useRef(null),
      text2: useRef(null),
      text3: useRef(null),
    },
    img: useRef(null),
  };

  const timelineRef = useRef(gsap.timeline({ paused: true }));

  const playAnimation = () => {
    timelineRef.current
      .add(
        gsap.to([heroRefs.lines.V1.current, heroRefs.lines.V2.current], {
          height: '100%',
          duration: 2,
          ease: 'power3.inOut',
          stagger: 1,
        }),
        0,
      )
      .add(
        gsap.to([heroRefs.lines.H2.current, heroRefs.lines.H1.current, heroRefs.lines.H3.current], {
          width: '100%',
          duration: 2,
          ease: 'power3.inOut',
          stagger: 0.1,
        }),
        0,
      )
      .add(
        gsap.to(heroRefs.wrappers.wrapperImg.current, {
          width: '100%',
          duration: 1.5,
          ease: 'power3.inOut',
          stagger: 1,
        }),
        1.2,
      )
      .play();
  };

  useEffect(() => {
    playAnimation();
  });

  return (
    <div className="pt-y-default">
      <div className="relative">
        <div ref={heroRefs.lines.H1} className="absolute left-0 top-0 h-px w-0 bg-black"></div>
        <div
          ref={heroRefs.lines.V1}
          className="absolute left-x-default top-0 h-0 w-px bg-black"
        ></div>
        <div
          ref={heroRefs.lines.V2}
          className="absolute right-x-default top-0 h-0 w-px bg-black"
        ></div>
        <section className="relative px-x-default pb-px">
          <div
            ref={heroRefs.lines.H2}
            className="absolute bottom-0 right-0 h-px w-0 bg-black"
          ></div>
          <div ref={heroRefs.wrappers.wrapperImg} className="h-screen w-0 overflow-hidden p-px">
            <img
              ref={heroRefs.img}
              className="hidden h-[calc(100%+100px)] w-full object-cover object-top md:block"
              src={project.mainImageUrlDesktop}
              alt=""
            />
            <img
              ref={heroRefs.img}
              className="block h-[calc(100%+100px)] w-full object-cover object-top md:hidden"
              src={project.mainImageUrlMobile}
              alt=""
            />
          </div>
        </section>
        <section className="px-x-default py-y-default">
          <div
            ref={heroRefs.lines.H3}
            className="absolute bottom-0 right-0 h-px w-0 bg-black"
          ></div>
          <div className="px-x-default">
            <Typography
              type={TYPOGRAPHY_TYPE.HEADING1}
              as={TYPOGRAPHY_TYPE.HEADING4}
              className="w-full pb-4 text-center"
            >
              {project.title}
            </Typography>
            <Typography type={TYPOGRAPHY_TYPE.TEXT}>{project.description}</Typography>
          </div>
        </section>
      </div>
      <section className="flex justify-between px-x-default py-y-default">
        <div className="flex justify-between gap-2">
          <Typography>Made by 🤝</Typography>
          <div>
            <Link href="/" target="_blank" className="text block font-medium hover:underline">
              Matteo Couruqin
            </Link>
            <Link href="/" target="_blank" className="text block font-medium hover:underline">
              Erwan Donisa
            </Link>
          </div>
        </div>
        <Button size={BUTTON_SIZE.M} as="button">
          Check the website <IconArrowTopRight className="ml-2 h-full w-4" />
        </Button>
      </section>
      <section className="flex flex-col gap-y-default px-x-default pb-y-default">
        {project.imagesUrl?.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} alt="" className="w-full" />
          </div>
        ))}
      </section>
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const projects: TypeProject[] = [
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      index: '1',
      title: 'Super projet',
      mainImageUrlDesktop: '/images/image.png',
      mainImageUrlMobile: '/images/image.png',
      websiteUrl: 'https://www.google.com',
      imagesUrl: [
        '/images/image.png',
        '/images/image.png',
        '/images/image.png',
        '/images/image.png',
      ],
      type: 'Developement',
    },
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      index: '2',
      title: 'Project Master',
      mainImageUrlDesktop: '/images/matteo.png',
      mainImageUrlMobile: '/images/matteo.png',
      imagesUrl: ['/images/matteo.png', '/images/matteo.png'],
      type: 'Design',
    },
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      index: '3',
      title: '2.26 Tours',
      mainImageUrlDesktop: '/images/site.png',
      mainImageUrlMobile: '/images/mobile.png',
      websiteUrl: 'https://www.google.com',
      imagesUrl: ['/images/exemple1.png', '/images/exemple2.png', '/images/exemple3.png'],
      type: 'Developement',
    },
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      index: '4',
      title: 'Bel',
      mainImageUrlDesktop: '/images/matteo.png',
      mainImageUrlMobile: '/images/matteo.png',
      type: 'Design',
    },
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      index: '5',
      title: 'zLawyer',
      mainImageUrlDesktop: '/images/matteo.png',
      mainImageUrlMobile: '/images/matteo.png',
      websiteUrl: 'https://www.google.com',
      type: 'Developement',
    },
  ];

  const { params } = context;
  const project = projects.find((project) => formatSlug(project.title) === params?.project);

  return {
    props: {
      project: project || null,
    },
  };
}

export async function getStaticPaths() {
  const projects: TypeProject[] = [
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      index: '1',
      title: 'Super projet',
      mainImageUrlDesktop: '/images/matteo.png',
      mainImageUrlMobile: '/images/matteo.png',
      websiteUrl: 'https://www.google.com',
      imagesUrl: ['/images/matteo.png', '/images/matteo.png'],
      type: 'Developement',
    },
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      index: '2',
      title: 'Project Master',
      mainImageUrlDesktop: '/images/matteo.png',
      mainImageUrlMobile: '/images/matteo.png',
      imagesUrl: ['/images/matteo.png', '/images/matteo.png'],
      type: 'Design',
    },
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      index: '3',
      title: '2.26 Tours',
      mainImageUrlMobile: '/images/site.png',
      mainImageUrlDesktop: '/images/mobile.png',
      websiteUrl: 'https://www.google.com',
      imagesUrl: ['/images/matteo.png', '/images/matteo.png'],
      type: 'Developement',
    },
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      index: '4',
      title: 'Bel',
      mainImageUrlDesktop: '/images/matteo.png',
      mainImageUrlMobile: '/images/matteo.png',
      type: 'Design',
    },
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      index: '5',
      title: 'zLawyer',
      mainImageUrlDesktop: '/images/matteo.png',
      mainImageUrlMobile: '/images/matteo.png',
      websiteUrl: 'https://www.google.com',
      type: 'Developement',
    },
  ];

  const paths = projects.map((project) => ({
    params: { project: formatSlug(project.title) },
  }));

  return {
    paths,
    fallback: false,
  };
}
