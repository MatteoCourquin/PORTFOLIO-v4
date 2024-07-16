import clsx from 'clsx';
import { ReactNode } from 'react';

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

const Typography = ({
  type = TYPOGRAPHY_TYPE.TEXT,
  as,
  children,
  className,
}: {
  type?: TYPOGRAPHY_TYPE;
  as?: string;
  children?: ReactNode;
  className?: string;
}) => {
  const Tag = (() => {
    switch (type) {
      case 'text':
        return 'p';
      case 'subtitle':
        return 'p';
      case 'heading1':
        return 'h1';
      case 'heading2':
        return 'h2';
      case 'heading3':
        return 'h3';
      case 'heading4':
        return 'h4';
      case 'heading5':
        return 'h5';
      case 'heading6':
        return 'h6';
      default:
        return 'p';
    }
  })();

  return <Tag className={clsx(as || type, 'w-fit', className)}>{children}</Tag>;
};

export default Typography;
