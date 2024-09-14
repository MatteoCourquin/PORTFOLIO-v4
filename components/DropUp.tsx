import clsx from 'clsx';
import { ReactNode } from 'react';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';

const DropUp = ({
  text,
  icon,
  className,
}: {
  text: string;
  icon: ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx(className, 'group/icon relative')}>
      {icon}
      <Typography
        type={TYPOGRAPHY_TYPE.TEXT}
        as={TYPOGRAPHY_TYPE.TEXT}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 -translate-y-2 scale-0 whitespace-nowrap rounded-md bg-black px-1 !text-sm uppercase text-white opacity-0 transition-[transform,opacity] group-hover/icon:-translate-y-full group-hover/icon:scale-100 group-hover/icon:opacity-100"
      >
        {text}
      </Typography>
    </div>
  );
};

export default DropUp;
