import { ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

const Video = ({
  poster,
  className,
  children,
  mockuped,
  controls = false,
}: {
  poster?: string;
  className?: string;
  children: ReactNode;
  mockuped?: boolean;
  controls?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error: Error) => {
          console.error('Playback prevented:', error);
        });
      }
    };

    video.addEventListener('loadeddata', playVideo);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        playVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const videoElement = (
    <video
      ref={videoRef}
      aria-hidden="true"
      aria-label="Presentation work video"
      className={clsx(className, mockuped && 'h-full w-full object-fill')}
      controls={controls}
      data-webkit-playsinline="true"
      poster={poster}
      preload="auto"
      autoPlay
      loop
      muted
      playsInline
    >
      {children}
    </video>
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
        <div className="bg-[#000000] px-[5%] pb-[8%] pt-[4%]">{videoElement}</div>
      </div>
    );
  }

  return videoElement;
};

export default Video;

// <!-- Set up -->
//  <video>
//   <!-- Provide the Safari video -->
//    <source src="mp4" type='video/mp4; codecs="hvc1"'>

//   <!-- .. and the Chrome video -->
//    <source src="webm" type="video/webm">
// </video>
