import Button, { BUTTON_TYPE } from '@/components/atoms/Button';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import CardProject from '@/components/CardProject';
import { TypeFilters, TypePreviewProject } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import { client } from '@/sanity/lib/client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useContext, useRef, useState } from 'react';

export default function Projects({
  projects,
  filters,
}: {
  projects: TypePreviewProject[];
  filters: TypeFilters[];
}) {
  const { data, language } = useContext(LanguageContext);

  const [activeFilter, setActiveFilter] = useState('all');

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

  useGSAP(() => {
    playAnimation();
  }, []);

  return (
    <>
      <section className="flex h-[60vh] items-center justify-center">
        <Typography
          ref={heroRefs.text}
          type={TYPOGRAPHY_TYPE.HEADING1}
          className="-translate-y-4 opacity-0"
        >
          {data.projects.title}
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
              key={filter.value + index}
              ref={(el) => (heroRefs.buttons.filters[index].current = el)}
              isActive={activeFilter === filter.value}
              as="button"
              type={BUTTON_TYPE.SECONDARY}
              onClick={() => setActiveFilter(filter.value)}
              className="translate-y-24"
            >
              {language === 'fr' ? filter.labelFr : filter.labelEn}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-10 px-x-default py-y-default md:grid-cols-2">
          {projects
            .filter(
              (project) =>
                project.types.join().includes(activeFilter.toLowerCase()) || activeFilter === 'all',
            )
            .map((project, index) => (
              <CardProject {...project} key={project.title + index} />
            ))}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const queryProjects = `
    *[_type == "projects"] {
      title,
      slug,
      mainImageDesktop,
      mainImageMobile,
      "types": types[]->value,
    }`;

  const queryProjectType = `
    *[_type == "projectType"] {
      labelFr,
      labelEn,
      value,
    }`;

  const projects = await client.fetch(queryProjects);
  const projectTypes = await client.fetch(queryProjectType);
  const filters = [
    {
      labelFr: 'Tous',
      labelEn: 'All',
      value: 'all',
    },
    ...projectTypes,
  ];

  return {
    props: {
      projects,
      filters,
    },
  };
}
