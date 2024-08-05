import { PortableText } from 'next-sanity';
import { TypedObject } from 'sanity';

const RichText = ({ value, className }: { value: TypedObject[]; className?: string }) => {
  return (
    <div className={className}>
      <PortableText
        value={value}
        components={{
          block: {
            normal: ({ children }) => <p className="mb-2">{children}</p>,
          },
          marks: {
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            link: ({ value, children }) => (
              <a href={value.href} className="underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          },
          list: {
            bullet: ({ children }) => <ul className="ml-4 list-disc">{children}</ul>,
          },
          listItem: {
            bullet: ({ children }) => <li className="mb-1">{children}</li>,
          },
        }}
      />
    </div>
  );
};

export default RichText;
