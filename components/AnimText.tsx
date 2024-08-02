import clsx from 'clsx';

const AnimText = ({ value }: { value: string[] }) => {
  return (
    <div className="shadow-y-white flex h-6 flex-col">
      <div>
        {value.map((text, index) => (
          <span
            key={index}
            className={clsx(
              'animate-topToBottom inline-block',
              index === 0 && 'animate-1s',
              index === 1 && 'animate-2s',
              index === 2 && 'animate-3s',
            )}
          >
            {text}
          </span>
        ))}
      </div>
      <div>
        {value.map((text, index) => (
          <span
            key={index}
            className={clsx(
              'animate-topToBottom inline-block',
              index === 0 && 'animate-1s',
              index === 1 && 'animate-2s',
              index === 2 && 'animate-3s',
            )}
          >
            {text}
          </span>
        ))}
      </div>
      <div>
        {value.map((text, index) => (
          <span
            key={index}
            className={clsx(
              'animate-topToBottom inline-block',
              index === 0 && 'animate-1s',
              index === 1 && 'animate-2s',
              index === 2 && 'animate-3s',
            )}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnimText;
