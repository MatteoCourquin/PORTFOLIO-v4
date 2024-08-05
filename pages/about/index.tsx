import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import CardCareer from '@/components/CardCareer';
import Questions from '@/components/Questions';
import SEO from '@/components/SEO';
import { TypeCareer, TypeQuestion } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import { client } from '@/sanity/lib/client';
import { interpolate } from '@/utils/functions';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Head from 'next/head';
import { useContext, useRef } from 'react';

export default function About({
  career,
  questions,
}: {
  career: TypeCareer[];
  questions: TypeQuestion[];
}) {
  const { data } = useContext(LanguageContext);

  const heroRefs = {
    lines: {
      H1: useRef(null),
      H2: useRef(null),
      H3: useRef(null),
      H4: useRef(null),
      H5: useRef(null),
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

    gsap.to([heroRefs.lines.H4.current, heroRefs.lines.H5.current], {
      width: '100%',
      scrollTrigger: {
        trigger: heroRefs.wrappers.wrapperAbout.current,
        start: '-50vw bottom',
        scrub: true,
      },
    });
    gsap.to(heroRefs.img.current, {
      y: -100,
      scrollTrigger: {
        start: 'top top',
        scrub: true,
      },
    });
    gsap.to([heroRefs.texts.text2.current, heroRefs.texts.text3.current], {
      y: 0,
      paddingBottom: 0,
      scrollTrigger: {
        start: 'top top',
        scrub: true,
      },
    });
  };

  const playAnimation = () => {
    timelineRef.current
      .add(
        gsap.to(heroRefs.texts.text1.current, {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: 'power3.out',
        }),
        0,
      )
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

  useGSAP(() => {
    playAnimation();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    ScrollTrigger.refresh();
    scrollTriggerAnimation();
  }, [data]);

  return (
    <>
      <SEO title={data.head.titleAbout} />
      <section className="flex h-[60vh] items-center justify-center">
        <Typography
          ref={heroRefs.texts.text1}
          type={TYPOGRAPHY_TYPE.HEADING1}
          className="-translate-y-4 opacity-0"
        >
          {data.about.title}
        </Typography>
      </section>
      <section className="relative flex flex-col">
        <div
          ref={heroRefs.lines.V1}
          className="absolute left-x-default top-0 h-0 w-px bg-black"
        ></div>
        <div
          ref={heroRefs.lines.V2}
          className="absolute right-x-default top-0 h-0 w-px bg-black"
        ></div>
        <div className="relative h-24">
          <div ref={heroRefs.lines.H1} className="absolute bottom-0 left-0 h-px w-0 bg-black"></div>
          <div ref={heroRefs.lines.H2} className="absolute left-0 top-0 h-px w-0 bg-black"></div>
        </div>
        <div className="aspect-[3/2] max-h-[70vh] px-x-default">
          <div ref={heroRefs.wrappers.wrapperImg} className="h-full w-0 overflow-hidden px-px">
            <img
              ref={heroRefs.img}
              className="h-[calc(100%+100px)] w-full object-cover object-top"
              src="/images/image.png"
              alt=""
            />
          </div>
        </div>
        <div ref={heroRefs.wrappers.wrapperAbout} className="relative">
          <div ref={heroRefs.lines.H3} className="absolute right-0 top-0 h-px w-0 bg-black"></div>
          <div className="px-x-default py-y-default">
            <Typography
              ref={heroRefs.texts.text2}
              className="-translate-y-10 px-x-default pb-4"
              type={TYPOGRAPHY_TYPE.HEADING2}
              as={TYPOGRAPHY_TYPE.HEADING4}
            >
              {data.about.about.title}
            </Typography>
            <div
              ref={heroRefs.texts.text3}
              className="text -translate-y-10 px-x-default"
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
          </div>
        </div>
        <div className="relative h-24">
          <div
            ref={heroRefs.lines.H4}
            className="absolute bottom-0 right-0 h-px w-0 bg-black"
          ></div>
          <div ref={heroRefs.lines.H5} className="absolute left-0 top-0 h-px w-0 bg-black"></div>
        </div>
      </section>
      <section className="relative px-x-default">
        <Typography className="w-full py-y-default text-center" type={TYPOGRAPHY_TYPE.HEADING3}>
          {data.about.carreer.title}
        </Typography>
        <div className="relative flex flex-col gap-y-default pb-y-default">
          <div className="absolute bottom-0 left-0 h-full w-px bg-black md:left-x-default"></div>
          {career.map((career, index) => (
            <CardCareer key={career.titleEn + index} {...career} />
          ))}
        </div>
        <div className="absolute bottom-0 right-0 h-px w-full bg-black"></div>
      </section>
      <section className="px-x-default py-y-default">
        <Questions questions={questions} />
      </section>
    </>
  );
}

export async function getStaticProps() {
  const queryCarreer = `
    *[_type == "careers"] | order(endDate desc) {
      startDate,
      endDate,
      titleEn,
      titleFr,
      descriptionEn,
      descriptionFr,
    }`;

  const queryQuestions = `
      *[_type == "questions"] {
        questionEn,
        questionFr,
        answerEn,
        answerFr,
      }`;

  const career = await client.fetch(queryCarreer);
  const questions = await client.fetch(queryQuestions);

  return {
    props: {
      career,
      questions,
    },
  };
}
