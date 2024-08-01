import { TypePreviewProject } from '@/data/types';
import { urlForImage } from '@/sanity/lib/image';
import Link from 'next/link';
import Button, { BUTTON_SIZE } from './atoms/Button';
import { IconArrowTopRight } from './atoms/Icons';
import Typography, { TYPOGRAPHY_TYPE } from './atoms/Typography';

const CardProject = ({
  index,
  title,
  slug,
  mainImageDesktop,
  mainImageMobile,
  websiteUrl,
}: TypePreviewProject) => {
  return (
    <div>
      <Link href={'/projects/' + slug.current} className="group/card-project relative">
        <div className="absolute left-0 top-0 h-px w-full bg-black"></div>
        <div className="absolute bottom-0 right-0 h-px w-full bg-black"></div>
        <div className="absolute bottom-0 left-0 h-full w-px bg-black"></div>
        <div className="absolute bottom-0 right-0 h-full w-px bg-black"></div>
        <Typography type={TYPOGRAPHY_TYPE.HEADING5} className="w-full py-4 text-center uppercase">
          Project {index}
        </Typography>
        <div className="relative p-px">
          <div className="absolute right-0 top-0 h-px w-full bg-black"></div>
          <div className="overflow-hidden">
            <img
              src={urlForImage(mainImageDesktop)}
              alt={title}
              className="hidden cursor-pointer grayscale transition-[transform,filter] duration-300 group-hover/card-project:scale-105 group-hover/card-project:grayscale-0 md:block"
            />
            <img
              src={urlForImage(mainImageMobile)}
              alt={title}
              className="block cursor-pointer grayscale transition-[transform,filter] duration-300 group-hover/card-project:scale-105 group-hover/card-project:grayscale-0 md:hidden"
            />
          </div>
        </div>
      </Link>
      <div className="relative flex w-full items-center justify-between py-4">
        <div className="absolute bottom-0 right-0 h-px w-full bg-black"></div>
        <Typography
          type={TYPOGRAPHY_TYPE.HEADING3}
          as={TYPOGRAPHY_TYPE.TEXT}
          className="text-center font-medium uppercase"
        >
          DEV.{title.replace(/ /g, '')}
        </Typography>
        {websiteUrl && (
          <Button as="a" href={websiteUrl} target="_blank" size={BUTTON_SIZE.S}>
            View
            <IconArrowTopRight className="ml-2 h-3" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CardProject;
