import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import CardCareer from '@/components/CardCareer';
import CardQuestion from '@/components/CardQuestion';
import { TypeCareer, TypeQuestion } from '@/data/types';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

export default function About({
  career,
  questions,
}: {
  career: TypeCareer[];
  questions: TypeQuestion[];
}) {
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);

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

  useEffect(() => {
    playAnimation();
    scrollTriggerAnimation();
  });

  return (
    <>
      <section className="flex h-[60vh] items-center justify-center">
        <Typography
          ref={heroRefs.texts.text1}
          type={TYPOGRAPHY_TYPE.HEADING1}
          className="-translate-y-4 opacity-0"
        >
          My Story
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
              Let me introduce myself 👋
            </Typography>
            <Typography
              ref={heroRefs.texts.text3}
              className="-translate-y-10 px-x-default"
              type={TYPOGRAPHY_TYPE.TEXT}
            >
              Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
              dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
              sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
              velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
              conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac
              scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor
              urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia.
              Aliquam in elementum tellus. Curabitur tempor quis eros tempus lacinia. Nam bibendum
              pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo
              vestibulum venenatis. Suspendisse.
            </Typography>
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
          My Career
        </Typography>
        <div className="gap-y-default relative flex flex-col pb-y-default">
          <div className="absolute bottom-0 left-0 h-full w-px bg-black md:left-x-default"></div>
          {career.map((career, index) => (
            <CardCareer key={career.title + index} {...career} />
          ))}
        </div>
        <div className="absolute bottom-0 right-0 h-px w-full bg-black"></div>
      </section>
      <section className="px-x-default py-y-default">
        <Typography className="w-full text-center" type={TYPOGRAPHY_TYPE.HEADING3}>
          Any questions ?
        </Typography>
        <div className="flex flex-col pt-y-default">
          {questions.map((question, index) => (
            <CardQuestion
              onToggle={() => setOpenQuestionIndex(openQuestionIndex === index ? null : index)}
              isOpen={openQuestionIndex === index}
              key={question.question + index}
              {...question}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const career = [
    {
      startDate: '2020',
      endDate: '2023',
      title: 'Bachelor • IIM',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      startDate: '2020',
      endDate: '2023',
      title: 'Bachelor • IIM',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      startDate: '2020',
      endDate: '2023',
      title: 'Bachelor • IIM',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      startDate: '2020',
      endDate: '2023',
      title: 'Bachelor • IIM',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
  ];

  const questions = [
    {
      question: 'How to contact you ?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      question: 'How to contact you ?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      question: 'How to contact you ?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      question: 'How to contact you ?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
  ];
  return {
    props: {
      career,
      questions,
    },
  };
}
