import { TypeQuestion } from '@/data/types';
import { LanguageContext } from '@/layout/default';
import clsx from 'clsx';
import { useContext } from 'react';
import { IconAdd } from './atoms/Icons';
import RichText from './atoms/RichText';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';

interface CardQuestionProps extends TypeQuestion {
  isOpen: boolean;
  onToggle: () => void;
}

const CardQuestion = ({
  isOpen,
  onToggle,
  questionFr,
  questionEn,
  answerFr,
  answerEn,
}: CardQuestionProps) => {
  const { language } = useContext(LanguageContext);
  return (
    <div className="cursor-pointer border-t border-t-black py-6 md:py-10" onClick={onToggle}>
      <div className="flex items-center justify-between">
        <Typography className="!font-normal" type={TYPOGRAPHY_TYPE.HEADING4} as={TYPOGRAPHY_TYPE.HEADING5}>
          {language === 'fr' ? questionFr : questionEn}
        </Typography>
        <IconAdd
          className={clsx(isOpen ? 'rotate-[135deg]' : 'rotate-0', 'transition-transform')}
          size={42}
        />
      </div>
      <div
        className={clsx(
          'overflow-hidden transition-[height,padding]',
          isOpen ? 'h-60 pt-4 sm:h-52 md:h-40 lg:h-40' : 'h-0 pt-0',
        )}
      >
        <RichText value={language === 'fr' ? answerFr : answerEn} />
      </div>
    </div>
  );
};

export default CardQuestion;
