import clsx from 'clsx';
import { forwardRef, ReactNode } from 'react';

export enum TYPOGRAPHY_TYPE {
  TEXT = 'text',
  SUBTITLE = 'subtitle',
  HEADING1 = 'heading1',
  HEADING2 = 'heading2',
  HEADING3 = 'heading3',
  HEADING4 = 'heading4',
  HEADING5 = 'heading5',
  HEADING6 = 'heading6',
}

type TypographyProps = {
  type?: TYPOGRAPHY_TYPE;
  as?: string;
  children?: ReactNode;
  className?: string;
};

const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ type = TYPOGRAPHY_TYPE.TEXT, as, children, className }, ref) => {

    const Tag = (() => {
      switch (type) {
        case TYPOGRAPHY_TYPE.TEXT:
        case TYPOGRAPHY_TYPE.SUBTITLE:
          return 'p';
        case TYPOGRAPHY_TYPE.HEADING1:
          return 'h1';
        case TYPOGRAPHY_TYPE.HEADING2:
          return 'h2';
        case TYPOGRAPHY_TYPE.HEADING3:
          return 'h3';
        case TYPOGRAPHY_TYPE.HEADING4:
          return 'h4';
        case TYPOGRAPHY_TYPE.HEADING5:
          return 'h5';
        case TYPOGRAPHY_TYPE.HEADING6:
          return 'h6';
        default:
          return 'p';
      }
    })();

    return (
      <Tag ref={ref} className={clsx(as || type, 'w-fit', className)}>
        {children}
      </Tag>
    );
  },
);

export default Typography;
