import { TypeTestimonial } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import clsx from 'clsx';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useContext, useEffect, useRef, useState } from 'react';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';
import CardTestimonial from './CardTestimonial';
gsap.registerPlugin(ScrollTrigger);

const Testimonials = ({ testimonials }: { testimonials: TypeTestimonial[] }) => {
  const { data } = useContext(LanguageContext);
  const [activeIndexTestimonial, setActiveIndexTestimonial] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  const haandleChangeIndexTestimonial = (index: number) => {
    setActiveIndexTestimonial(index);

    if (!wrapperRef.current || !itemsRef.current[index]) return;

    const cardWidth = itemsRef.current[index].getBoundingClientRect().width;
    const gap = 40;

    wrapperRef.current.scrollTo({
      left: index === 0 ? 0 : (cardWidth + gap) * index,
      behavior: 'smooth',
    });
  };

  const setIndexOnScrollTestimonials = () => {
    itemsRef.current.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: '-40px left',
        end: 'left -40px',
        horizontal: true,
        onEnter: () => setActiveIndexTestimonial(index),
        onEnterBack: () => setActiveIndexTestimonial(index),
        scroller: wrapperRef.current,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  };

  useEffect(() => {
    setIndexOnScrollTestimonials();
  }, []);
  return (
    <>
      <Typography
        className="w-full text-center uppercase text-white sm:text-left"
        type={TYPOGRAPHY_TYPE.HEADING3}
      >
        {data.home.testimonials.title}
      </Typography>
      <div
        ref={wrapperRef}
        className="no-scrollbar flex flex-row gap-10 overflow-x-scroll pt-y-default"
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.author + index}
            ref={(el) => {
              if (!el) return;
              itemsRef.current[index] = el;
            }}
            className={clsx('slider-item', index === testimonials.length && 'margin-right')}
          >
            <CardTestimonial {...testimonial} />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-1 pt-10">
        {testimonials.map((_, index) => (
          <div
            key={index}
            onClick={() => haandleChangeIndexTestimonial(index)}
            className={clsx(
              'h-2 cursor-pointer overflow-hidden rounded-full transition-[width] duration-300',
              index === activeIndexTestimonial ? 'w-8' : 'w-2',
            )}
          >
            <div
              className={clsx(
                'h-full rounded-full transition-colors duration-300',
                index === activeIndexTestimonial ? 'bg-white' : 'bg-[#FFFFFF50]',
              )}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Testimonials;
