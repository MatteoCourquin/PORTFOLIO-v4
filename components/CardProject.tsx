import Button, { BUTTON_SIZE } from './atoms/Button';
import { IconArrowTopRight } from './atoms/Icons';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';

const CardProject = ({
  index,
  title,
  mainImageUrl,
}: {
  index: string;
  title: string;
  mainImageUrl: string;
}) => {
  return (
    <div>
      <div className="relative">
        <div className="absolute left-0 top-0 h-px w-full bg-black"></div>
        <div className="absolute bottom-0 right-0 h-px w-full bg-black"></div>
        <div className="absolute bottom-0 left-0 h-full w-px bg-black"></div>
        <div className="absolute bottom-0 right-0 h-full w-px bg-black"></div>
        <Typography type={TYPOGRAPHY_TYPE.HEADING5} className="w-full py-4 text-center uppercase">
          Project {index}
        </Typography>
        <div className="relative">
          <div className="absolute right-0 top-0 h-px w-full bg-black"></div>
          <img src={mainImageUrl} alt={title} />
        </div>
      </div>
      <div className="relative flex w-full items-center justify-between py-4">
        <div className="absolute bottom-0 right-0 h-px w-full bg-black"></div>
        <Typography
          type={TYPOGRAPHY_TYPE.HEADING3}
          as={TYPOGRAPHY_TYPE.TEXT}
          className="text-center font-medium uppercase"
        >
          DEV.{title.replace(/ /g, '')}
        </Typography>
        <Button as="button" size={BUTTON_SIZE.S}>
          View
          <IconArrowTopRight className="h-3" />
        </Button>
      </div>
    </div>
  );
};

export default CardProject;
