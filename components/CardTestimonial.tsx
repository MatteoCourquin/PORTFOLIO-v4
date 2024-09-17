import { TypeTestimonial } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import clsx from 'clsx';
import { useContext, useState } from 'react';
import { IconQuote } from './atoms/Icons';
import RichText from './atoms/RichText';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';

const CardTestimonial = ({ ...testimonial }: TypeTestimonial) => {
  const { testimonialFr, testimonialEn, author, entity } = testimonial;
  const { language } = useContext(LanguageContext);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-white">
      <div className="flex flex-col pb-4">
        <Typography type={TYPOGRAPHY_TYPE.HEADING6}>{author}</Typography>
        <Typography className="text-primary-light" type={TYPOGRAPHY_TYPE.TEXT}>
          @{entity}
        </Typography>
      </div>
      <div className="relative border-t border-white py-4">
        <div className="absolute -top-4 right-6 bg-black px-4 sm:left-3/4">
          <IconQuote className="fill-white" />
        </div>
        <RichText
          className={clsx(!isOpen && 'text-ellipsis-4', 'text-white-light')}
          value={language === 'fr' ? testimonialFr : testimonialEn}
        />
        <button className="pt-2 underline" onClick={() => setIsOpen(!isOpen)}>
          {language === 'fr' && <>voir {isOpen ? 'moins' : 'plus'}</>}
          {language === 'en' && <>view {isOpen ? 'less' : 'more'}</>}
        </button>
      </div>
    </div>
  );
};

export default CardTestimonial;
