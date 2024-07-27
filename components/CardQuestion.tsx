import { TypeQuestion } from '@/data/types';
import clsx from 'clsx';
import { IconAdd } from './atoms/Icons';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';

interface CardQuestionProps extends TypeQuestion {
  isOpen: boolean;
  onToggle: () => void;
}

const CardQuestion = ({ isOpen, onToggle, question, answer }: CardQuestionProps) => {
  return (
    <div className="cursor-pointer border-t border-t-black py-6 md:py-10" onClick={onToggle}>
      <div className="flex items-center justify-between">
        <Typography className="!font-normal" type={TYPOGRAPHY_TYPE.HEADING5}>
          {question}
        </Typography>
        <IconAdd
          className={clsx(isOpen ? 'rotate-[135deg]' : 'rotate-0', 'transition-transform')}
          size={42}
        />
      </div>
      <div
        className={clsx(
          'overflow-hidden transition-all',
          isOpen ? 'h-64 sm:h-52 md:h-36 lg:h-28' : 'h-0',
        )}
      >
        <Typography className="pt-4" type={TYPOGRAPHY_TYPE.TEXT}>
          {answer}
        </Typography>
      </div>
    </div>
  );
};

export default CardQuestion;
