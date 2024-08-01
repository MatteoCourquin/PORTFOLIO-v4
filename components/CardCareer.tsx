import { TypeCareer } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import { formatDate, formatDateToYear } from '@/utils/functions';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useContext, useEffect, useRef } from 'react';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';

const CardCareer = ({
  startDate,
  endDate,
  titleFr,
  titleEn,
  descriptionFr,
  descriptionEn,
}: TypeCareer) => {
  const { language } = useContext(LanguageContext);

  const dotRef = useRef(null);

  const scrollTriggerAnimation = () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(dotRef.current, {
      borderWidth: 10,
      duration: 0.2,
      scrollTrigger: {
        start: window.innerWidth <= 768 ? 'top 160px' : 'top 33%',
        toggleActions: 'restart none none reverse',
        trigger: dotRef.current,
      },
    });
  };

  useEffect(() => {
    scrollTriggerAnimation();
  });

  return (
    <div className="md:h-screen">
      <div className="md:sticky md:top-1/3">
        <div className="flex items-center">
          <div className="hidden w-x-default md:block">
            <Typography
              type={TYPOGRAPHY_TYPE.TEXT}
              as={TYPOGRAPHY_TYPE.HEADING6}
              className="hidden w-x-default lg:block"
            >
              {formatDateToYear(startDate)}
              <br />
              {formatDateToYear(endDate) || 'now'}
            </Typography>
          </div>
          <div
            ref={dotRef}
            className="absolute left-0 h-5 w-5 -translate-x-1/2 rounded-full border border-black bg-white md:left-x-default"
          ></div>
          <Typography
            type={TYPOGRAPHY_TYPE.TEXT}
            as={TYPOGRAPHY_TYPE.HEADING4}
            className="pl-[6vw] !font-semibold text-primary md:pl-[4vw]"
          >
            {formatDate(startDate, language)} - {formatDate(endDate, language) || 'now'}
          </Typography>
        </div>
        <div className="w-full pl-0 md:pl-x-default lg:w-3/4">
          <Typography
            type={TYPOGRAPHY_TYPE.HEADING4}
            as={TYPOGRAPHY_TYPE.HEADING5}
            className="pl-[6vw] md:pl-[4vw]"
          >
            {language === 'fr' ? titleFr : titleEn}
          </Typography>
          <Typography type={TYPOGRAPHY_TYPE.TEXT} className="pl-[6vw] md:pl-[4vw]">
            {language === 'fr' ? descriptionFr : descriptionEn}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CardCareer;
