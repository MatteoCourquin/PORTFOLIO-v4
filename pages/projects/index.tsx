import Button, { BUTTON_TYPE } from '@/components/atoms/Button';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import CardProject from '@/components/CardProject';
import { TypePreviewProject } from '@/data/types';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

export default function Projects({ projects }: { projects: TypePreviewProject[] }) {
  const filters = ['All', 'Developement', 'Design'];
  const [activeFilter, setActiveFilter] = useState('All');

  const heroRefs = {
    lines: {
      H1: useRef(null),
      H2: useRef(null),
      V1: useRef(null),
      V2: useRef(null),
    },
    text: useRef(null),
    buttons: {
      filters: filters.map(() => useRef(null)),
    },
  };

  const timelineRef = useRef(gsap.timeline({ paused: true }));

  const playAnimation = () => {
    timelineRef.current
      .add(
        gsap.to(heroRefs.text.current, {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: 'power3.out',
        }),
        0,
      )
      .add(
        gsap.to([heroRefs.lines.H2.current, heroRefs.lines.H1.current], {
          width: '100%',
          duration: 2,
          ease: 'power3.inOut',
          stagger: 0,
        }),
        0,
      )
      .add(
        gsap.to([heroRefs.lines.V1.current, heroRefs.lines.V2.current], {
          height: '100%',
          duration: 2,
          ease: 'power3.inOut',
          stagger: 0,
        }),
        0.3,
      )
      .add(
        gsap.to(
          heroRefs.buttons.filters.map((ref) => ref.current),
          {
            y: 0,
            duration: 1,
            ease: 'power3.inOut',
            stagger: 0.2,
          },
        ),
        1,
      )
      .play();
  };

  useEffect(() => {
    playAnimation();
  });
  return (
    <>
      <section className="flex h-[60vh] items-center justify-center">
        <Typography
          ref={heroRefs.text}
          type={TYPOGRAPHY_TYPE.HEADING1}
          className="-translate-y-4 opacity-0"
        >
          Projects
        </Typography>
      </section>
      <section className="">
        <div className="relative flex h-24 items-center justify-center gap-4 overflow-hidden">
          <div ref={heroRefs.lines.H1} className="absolute right-0 top-0 h-px w-0 bg-black"></div>
          <div ref={heroRefs.lines.H2} className="absolute bottom-0 left-0 h-px w-0 bg-black"></div>
          <div
            ref={heroRefs.lines.V1}
            className="absolute right-x-default top-0 h-0 w-px bg-black"
          ></div>
          <div
            ref={heroRefs.lines.V2}
            className="absolute bottom-0 left-x-default h-0 w-px bg-black"
          ></div>
          {filters.map((filter, index) => (
            <Button
              key={filter + index}
              ref={(el) => (heroRefs.buttons.filters[index].current = el)}
              isActive={activeFilter === filter}
              as="button"
              type={BUTTON_TYPE.SECONDARY}
              onClick={() => setActiveFilter(filter)}
              className="translate-y-24"
            >
              {filter}
            </Button>
          ))}
        </div>
        <div className="grid min-h-screen grid-cols-1 gap-10 px-x-default py-y-default md:grid-cols-2">
          {projects
            .filter((project) => project.type === activeFilter || activeFilter === 'All')
            .map((project, index) => (
              <CardProject {...project} key={project.title + index} />
            ))}
        </div>
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
      type: 'Developement',
    },
    {
      index: '2',
      title: 'Project Master',
      mainImageUrl: '/images/matteo.png',
      type: 'Design',
    },
    {
      index: '3',
      title: '2.26 Tours',
      mainImageUrl: '/images/matteo.png',
      websiteUrl: 'https://www.google.com',
      type: 'Developement',
    },
    {
      index: '4',
      title: 'Bel',
      mainImageUrl: '/images/matteo.png',
      type: 'Design',
    },
    {
      index: '5',
      title: 'zLawyer',
      mainImageUrl: '/images/matteo.png',
      websiteUrl: 'https://www.google.com',
      type: 'Developement',
    },
  ];

  return {
    props: {
      projects,
    },
  };
}
