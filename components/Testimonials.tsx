import { TypeTestimonial } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import { useContext } from 'react';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';
import CardTestimonial from './CardTestimonial';

export default function Testimonials({ testimonials }: { testimonials: TypeTestimonial[] }) {
  const { data } = useContext(LanguageContext);

  return (
    <>
      <Typography
        className="w-full px-x-default text-center sm:text-left"
        type={TYPOGRAPHY_TYPE.HEADING3}
      >
        {data.home.testimonials.title}
      </Typography>
      <div className="no-scrollbar flex flex-row overflow-x-scroll px-x-default pt-y-default">
        {testimonials.map((testimonial, index) => (
          <CardTestimonial key={testimonial.author + index} {...testimonial} />
        ))}
      </div>
    </>
  );
}
