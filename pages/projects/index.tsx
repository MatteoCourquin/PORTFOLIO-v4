import ArrowBack from '@/components/ArrowBack';
import Button, { BUTTON_TYPE } from '@/components/atoms/Button';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import CardProject from '@/components/CardProject';
import SEO from '@/components/SEO';
import { TypeFilters, TypePaths, TypeProject } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import { fetchFilters } from '@/services/filters.sevices';
import { fetchPaths } from '@/services/paths.sevices';
import { fetchProjects } from '@/services/projects.sevices';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { useContext, useRef, useState } from 'react';

export default function Projects({
  projects,
  filters,
}: {
  projects: TypeProject[];
  filters: TypeFilters[];
  paths: TypePaths[];
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
      wrapperFilters: useRef<HTMLDivElement | null>(null),
    },
  };

  const timelineRef = useRef(gsap.timeline({ paused: true }));

  const playAnimation = () => {
    if (!heroRefs.buttons.wrapperFilters.current) return;

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
        gsap.to(heroRefs.buttons.wrapperFilters.current.querySelectorAll('button'), {
          y: 0,
          duration: 1,
          ease: 'power3.inOut',
          stagger: 0.2,
        }),
        1,
      )
      .play();
  };

  useGSAP(() => {
    playAnimation();
  }, []);

  return (
    <>
      <SEO title={data.head.titleProjects} image="/ogProjects.png" />
      <section className="flex h-[60vh] items-center justify-center">
        <Typography
          ref={heroRefs.text}
          type={TYPOGRAPHY_TYPE.HEADING1}
          className="-translate-y-4 text-center opacity-0"
        >
          {data.projects.title}
        </Typography>
      </section>
      <section className="">
        <div className="absolute left-x-default top-y-default z-50 flex -translate-y-1/2 cursor-pointer items-center shadow-white transition-transform sm:-translate-x-1/2">
          <ArrowBack href="/" />
        </div>
        <div className="">
          <div className="relative">
            <div ref={heroRefs.lines.H1} className="absolute right-0 top-0 h-px w-0 bg-black"></div>
            <div
              ref={heroRefs.lines.H2}
              className="absolute bottom-0 left-0 h-px w-0 bg-black"
            ></div>
            <div className="px-x-default">
              <div className="relative mx-auto max-w-default">
                <div
                  ref={heroRefs.lines.V1}
                  className="absolute right-0 top-0 h-0 w-px bg-black"
                ></div>
                <div
                  ref={heroRefs.lines.V2}
                  className="absolute bottom-0 left-0 h-0 w-px bg-black"
                ></div>
                <div className="p-px">
                  <div className="shadow-x-white h-24 overflow-hidden">
                    <div className="no-scrollbar h-24 w-full overflow-scroll">
                      <div
                        ref={heroRefs.buttons.wrapperFilters}
                        className="mx-auto flex h-full w-fit items-center justify-center gap-4 overflow-hidden px-x-default"
                      >
                        {filters.map((filter, index) => (
                          <Button
                            key={filter.value + index}
                            isActive={activeFilter === filter.value}
                            as="button"
                            type={BUTTON_TYPE.SECONDARY}
                            onClick={() => setActiveFilter(filter.value)}
                            className="h-fit shrink-0 translate-y-24"
                          >
                            {language === 'fr' ? filter.labelFr : filter.labelEn}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-x-default">
          <div className="mx-auto grid max-w-default grid-cols-1 gap-10 py-y-default lg:grid-cols-2">
            <AnimatePresence>
              {projects
                .filter(
                  (project) =>
                    project.types.join().includes(activeFilter.toLowerCase()) ||
                    activeFilter === 'all',
                )
                .map((project, index) => (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut',
                      delay: index * 0.02,
                    }}
                  >
                    <CardProject {...project} projectIndex={index + 1} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const paths = await fetchPaths();
  const projects = await fetchProjects();
  const filters = await fetchFilters();

  return {
    props: {
      paths,
      projects,
      filters,
    },
  };
}
