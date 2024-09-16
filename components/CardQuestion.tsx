import { TypeQuestion } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import { useTouchDevice } from '@/utils/states';
import clsx from 'clsx';
import { useContext } from 'react';
import { IconAdd } from './atoms/Icons';
import RichText from './atoms/RichText';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';

interface CardQuestionProps extends TypeQuestion {
  isOpen: boolean;
  onClick: () => void;
}

const CardQuestion = ({ isOpen, onClick, ...question }: CardQuestionProps) => {
  const { language } = useContext(LanguageContext);
  const { questionFr, questionEn, answerFr, answerEn } = question;

  return (
    <div
      className="group/card-question group cursor-pointer border-t border-t-black py-6 md:py-10"
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-8">
        <Typography
          className={clsx(
            '!font-normal transition-transform duration-300 ease-in-out',
            !useTouchDevice() && 'sm:group-hover/card-question:translate-x-4',
          )}
          type={TYPOGRAPHY_TYPE.HEADING4}
          as={TYPOGRAPHY_TYPE.HEADING5}
        >
          {language === 'fr' ? questionFr : questionEn}
        </Typography>
        <IconAdd
          className={clsx(
            'transition-[transform,stroke] duration-300 ease-in-out',
            isOpen ? 'rotate-[135deg] stroke-primary' : 'rotate-0 stroke-black',
            !useTouchDevice() && 'sm:group-hover/card-question:-translate-x-4',
          )}
          size={42}
        />
      </div>
      <div
        className={clsx(
          'overflow-hidden pr-8 transition-[height,padding,transform] duration-300 ease-in-out',
          isOpen ? 'h-96 pt-4 sm:h-52 md:h-40 lg:h-40' : 'h-0 pt-0',
          !useTouchDevice() && 'sm:group-hover/card-question:translate-x-4',
        )}
      >
        <RichText className="text-black-opacity" value={language === 'fr' ? answerFr : answerEn} />
      </div>
    </div>
  );
};

export default CardQuestion;
