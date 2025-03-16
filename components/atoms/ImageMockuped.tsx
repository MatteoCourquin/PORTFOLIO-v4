import clsx from 'clsx';
import Image from 'next/image';

interface ImageMockupProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  mockuped?: boolean;
}

const ImageMockup = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  quality = 80,
  mockuped = false,
}: ImageMockupProps) => {
  const imageElement = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={quality}
      className={clsx(className, mockuped && 'h-full w-full object-fill')}
    />
  );

  if (mockuped) {
    return (
      <div className="relative w-full p-1">
        <Image
          src="/images/macbook-mockup.png"
          alt="MacBook mockup"
          fill
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full"
        />
        <div className="bg-[#000000] px-[7%] pb-[8%] pt-[4%]">{imageElement}</div>
      </div>
    );
  }

  return <>{imageElement}</>;
};

export default ImageMockup;
