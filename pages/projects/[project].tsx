import ArrowBack from '@/components/ArrowBack';
import Button, { BUTTON_SIZE } from '@/components/atoms/Button';
import { IconArrowTopRight } from '@/components/atoms/Icons';
import ImageMockup from '@/components/atoms/ImageMockuped';
import RichText from '@/components/atoms/RichText';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import Video from '@/components/atoms/Video';
import SEO from '@/components/SEO';
import { TypePaths, TypeProject } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import { urlForImage } from '@/sanity/lib/image';
import { fetchPaths } from '@/services/paths.sevices';
import { fetchProject } from '@/services/project.sevices';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useRef } from 'react';

export enum SECTIONS_TYPES {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
}

export default function Page({ project }: { project: TypeProject; paths: TypePaths[] }) {
  const { language } = useContext(LanguageContext);

  if (!project) {
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

  const scrollTriggerAnimation = () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(heroRefs.img.current, {
      y: 200,
      scrollTrigger: {
        start: 'top top',
        scrub: true,
      },
    });
  };

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
          width: '100vw',
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

  useGSAP(() => {
    playAnimation();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    ScrollTrigger.refresh();
    scrollTriggerAnimation();
  }, []);

  return (
    <>
      <SEO
        title={'Matteo Courquin • ' + project.title}
        image={project.ogImage ? urlForImage(project.ogImage).toString() : '/ogProjects.png'}
      />
      <div className="pt-y-default">
        <div className="absolute left-x-default top-y-default z-50 flex -translate-y-1/2 cursor-pointer items-center shadow-white transition-transform sm:-translate-x-1/2">
          <ArrowBack href="/projects" />
        </div>
        <div className="relative px-x-default">
          <div className="mx-auto max-w-default pt-y-default">
            <div className="relative py-px">
              <div
                ref={heroRefs.lines.H1}
                className="-left-x-calc-padding absolute top-0 h-px w-0 bg-black"
              ></div>
              <div
                ref={heroRefs.lines.V1}
                className="absolute left-0 top-0 h-0 w-px bg-black"
              ></div>
              <div
                ref={heroRefs.lines.V2}
                className="absolute right-0 top-0 h-0 w-px bg-black"
              ></div>
              <section className="relative pb-px">
                <div
                  ref={heroRefs.lines.H2}
                  className="-right-x-calc-padding absolute bottom-0 h-px w-0 bg-black"
                ></div>
                <div
                  ref={heroRefs.wrappers.wrapperImg}
                  className="h-screen-header w-0 overflow-hidden p-px"
                >
                  <div ref={heroRefs.img} className="h-full py-px">
                    <Image
                      width={1920}
                      height={1080}
                      className="absolute bottom-0 hidden h-[calc(100%+100px)] w-full object-cover object-top md:block"
                      src={urlForImage(project.mainImageDesktop).toString()}
                      alt=""
                    />
                    <Image
                      width={1080}
                      height={1920}
                      className="absolute bottom-0 block h-[calc(100%+100px)] w-full object-cover md:hidden"
                      src={urlForImage(project.mainImageMobile).toString()}
                      alt=""
                    />
                  </div>
                </div>
              </section>
              <section className="py-y-default">
                <div
                  ref={heroRefs.lines.H3}
                  className="-right-x-calc-padding absolute bottom-0 h-px w-0 bg-black"
                ></div>
                <div className="px-x-default">
                  <Typography
                    type={TYPOGRAPHY_TYPE.HEADING1}
                    as={TYPOGRAPHY_TYPE.HEADING4}
                    className="w-full pb-4 text-center sm:text-left"
                  >
                    {project.title}
                  </Typography>
                  <RichText
                    className="text-black-light"
                    value={language === 'fr' ? project.descriptionFr : project.descriptionEn}
                  />
                </div>
              </section>
            </div>
            <section className="flex flex-col-reverse items-center justify-between gap-4 py-y-default sm:flex-row">
              <div className="flex justify-between gap-2">
                <Typography className="text-primary">
                  {project.types.includes('design') ? 'Made' : 'Code'} by 🤝
                </Typography>
                <div>
                  <p className="text block font-medium">
                    Matteo Courquin ({language === 'fr' ? 'moi' : 'me'})
                  </p>
                  {project.authors?.map((author: { name: string; websiteUrl: string }) => {
                    if (!author.websiteUrl) {
                      return (
                        <Typography key={author.name} className="text block font-medium">
                          {author.name}
                        </Typography>
                      );
                    }
                    return (
                      <Link
                        key={author.name}
                        href={author.websiteUrl}
                        target="_blank"
                        className="text block font-medium hover:underline"
                      >
                        {author.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
              {project.websiteUrl && (
                <Button
                  size={BUTTON_SIZE.M}
                  as="a"
                  href={project.websiteUrl}
                  target="_blank"
                  className="h-fit"
                >
                  Check the website <IconArrowTopRight className="ml-2 h-full w-4" />
                </Button>
              )}
            </section>
            {project.sections && (
              <section className="pb-y-default">
                {(() => {
                  const elements: JSX.Element[] = [];
                  let skipNext = false;

                  project.sections.forEach((section, index) => {
                    if (skipNext) {
                      skipNext = false;
                      return;
                    }

                    if (
                      section.sectionType === SECTIONS_TYPES.TEXT &&
                      section.text.contentEn &&
                      section.text.contentFr
                    ) {
                      const textKey = `text-${section.text.contentEn.slice(0, 20)}`;
                      elements.push(
                        <div
                          key={textKey}
                          className="md:py-y-double-default w-full py-y-default md:w-2/3 lg:w-1/2"
                        >
                          <RichText
                            value={
                              language === 'fr' ? section.text.contentFr : section.text.contentEn
                            }
                          />
                        </div>,
                      );
                      return;
                    }

                    if (
                      section.sectionType === SECTIONS_TYPES.VIDEO &&
                      section.video.url &&
                      section.video.mockuped
                    ) {
                      elements.push(
                        <div key={`video-${section.video.url}`} className="w-full pb-y-default">
                          <Video mockuped={true}>
                            <source src={section.video.url} type="video/mp4" />
                          </Video>
                        </div>,
                      );
                      return;
                    }

                    if (
                      section.sectionType === SECTIONS_TYPES.IMAGE &&
                      section.image &&
                      section.image.mockuped
                    ) {
                      elements.push(
                        <div
                          key={`image-mockup-${section.image.url}`}
                          className="w-full pb-y-default"
                        >
                          <ImageMockup
                            mockuped={true}
                            alt="Project image"
                            className="w-full"
                            height={1080}
                            src={section.image.url}
                            width={1920}
                          />
                        </div>,
                      );
                      return;
                    }

                    const nextSection = project.sections[index + 1];
                    const isCurrentMediaNonMockup =
                      (section.sectionType === SECTIONS_TYPES.IMAGE &&
                        section.image &&
                        !section.image.mockuped) ||
                      (section.sectionType === SECTIONS_TYPES.VIDEO &&
                        section.video.url &&
                        !section.video.mockuped);

                    const isNextMediaNonMockup =
                      nextSection &&
                      ((nextSection.sectionType === SECTIONS_TYPES.IMAGE &&
                        nextSection.image &&
                        !nextSection.image.mockuped) ||
                        (nextSection.sectionType === SECTIONS_TYPES.VIDEO &&
                          nextSection.video.url &&
                          !nextSection.video.mockuped));

                    if (isCurrentMediaNonMockup && isNextMediaNonMockup) {
                      const currentKey =
                        section.sectionType === SECTIONS_TYPES.IMAGE
                          ? `image-${section.image.url}`
                          : `video-${section.video.url}`;

                      const nextKey =
                        nextSection.sectionType === SECTIONS_TYPES.IMAGE
                          ? `image-${nextSection.image.url}`
                          : `video-${nextSection.video.url}`;

                      elements.push(
                        <div
                          key={`group-${currentKey}-${nextKey}`}
                          className="grid w-full grid-cols-1 gap-y-default gap-x-4 pb-y-default md:grid-cols-2"
                        >
                          {section.sectionType === SECTIONS_TYPES.IMAGE ? (
                            <div className="w-full border border-gray-100">
                              <ImageMockup
                                mockuped={false}
                                alt="Project image"
                                className="w-full"
                                height={1080}
                                src={section.image.url}
                                width={1920}
                              />
                            </div>
                          ) : (
                            <div className="w-full">
                              <Video mockuped={false}>
                                <source src={section.video.url} type="video/mp4" />
                              </Video>
                            </div>
                          )}

                          {nextSection.sectionType === SECTIONS_TYPES.IMAGE ? (
                            <div className="w-full border border-gray-100">
                              <ImageMockup
                                alt="Project image"
                                className="w-full"
                                mockuped={false}
                                height={1080}
                                src={nextSection.image.url}
                                width={1920}
                              />
                            </div>
                          ) : (
                            <div className="w-full">
                              <Video mockuped={false}>
                                <source src={nextSection.video.url} type="video/mp4" />
                              </Video>
                            </div>
                          )}
                        </div>,
                      );

                      skipNext = true;
                      return;
                    }

                    if (isCurrentMediaNonMockup) {
                      if (section.sectionType === SECTIONS_TYPES.IMAGE) {
                        elements.push(
                          <div
                            key={'single-image-' + section.image.url}
                            className="w-full border border-gray-100 pb-y-default"
                          >
                            <ImageMockup
                              alt="Project image"
                              className="w-full"
                              mockuped={false}
                              height={1080}
                              src={section.image.url}
                              width={1920}
                            />
                          </div>,
                        );
                      } else {
                        elements.push(
                          <div
                            key={'single-video-' + section.video.url}
                            className="w-full border border-gray-100 pb-y-default"
                          >
                            <Video mockuped={false}>
                              <source src={section.video.url} type="video/mp4" />
                            </Video>
                          </div>,
                        );
                      }
                    }
                  });

                  return elements;
                })()}
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  const paths = await fetchPaths();
  const project = await fetchProject(params);

  return {
    props: {
      paths,
      project: project || null,
      params,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = (await fetchPaths()).map((project: TypeProject) => ({
    params: { project: project.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};
