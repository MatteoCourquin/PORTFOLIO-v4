import ArrowBack from '@/components/ArrowBack';
import Button, { BUTTON_SIZE } from '@/components/atoms/Button';
import { IconArrowTopRight } from '@/components/atoms/Icons';
import RichText from '@/components/atoms/RichText';
import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import SEO from '@/components/SEO';
import { TypePaths, TypeProject } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { fetchPaths } from '@/utils/fetchPaths';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useRef } from 'react';

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
                  className="h-screen w-0 overflow-hidden p-px"
                >
                  <div ref={heroRefs.img} className="h-full py-px">
                    <Image
                      width={1920}
                      height={1080}
                      className="hidden h-[calc(100%+100px)] w-full object-cover object-top md:block"
                      src={urlForImage(project.mainImageDesktop).toString()}
                      alt=""
                    />
                    <Image
                      width={1080}
                      height={1920}
                      className="block h-[calc(100%+100px)] w-full object-cover object-top md:hidden"
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
                <Typography className="text-primary">Made by 🤝</Typography>
                <div>
                  <p className="text block font-medium">Matteo Courquin</p>
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
            <section className="flex flex-col gap-y-default pb-y-default">
              {project.gallery?.map((image, index) => (
                <div key={index}>
                  <Image
                    width={1920}
                    height={1080}
                    src={urlForImage(image).toString()}
                    alt=""
                    className="w-full shadow"
                  />
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  const query = `
    *[_type == "projects" && slug.current == $project][0] {
      projectIndex,
      title,
      slug,
      ogImage,
      mainImageDesktop,
      mainImageMobile,
      descriptionEn,
      descriptionFr,
      websiteUrl,
      gallery,
      "authors": authors[]->{
        name,
        websiteUrl
      },
    }
  `;

  const paths = await fetchPaths();
  const project = await client.fetch(query, {
    project: params?.project,
  });

  return {
    props: {
      paths,
      project: project || null,
      params,
    },
  };
};

export const getStaticPaths = async () => {
  const query = `
    *[_type == "projects"] {
      slug
    }
  `;

  const projects = await client.fetch(query);

  const paths = projects.map((project: TypeProject) => ({
    params: { project: project.slug.current },
  }));

  return {
    paths,
    fallback: false,
  };
};
