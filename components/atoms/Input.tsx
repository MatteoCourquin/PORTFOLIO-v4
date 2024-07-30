import clsx from 'clsx';
import { ChangeEvent, useRef } from 'react';

const Input = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  required = false,
  value,
  onChange,
  onBlur,
  error = false,
  errorMessage,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: boolean;
  errorMessage?: string;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const autoHeight = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!textAreaRef.current) return;

    if (e.target.value === '') {
      textAreaRef.current.style.height = '64px';
    } else {
      textAreaRef.current.style.height = e.target.scrollHeight + 1 + 'px';
    }
  };

  return (
    <div className="relative flex flex-col gap-4">
      {label && (
        <label htmlFor={name} className="heading6">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={name}
          placeholder={placeholder}
          value={value}
          ref={textAreaRef}
          onBlur={onBlur}
          onChange={(e) => {
            autoHeight(e);
            onChange(e);
          }}
          className={clsx(
            'h-16 w-full resize-none rounded-t-md border-b py-2 !transition-[padding,height] focus:bg-slate-50 focus:pl-2 focus:outline-none',
            error ? 'border-b-red-500' : 'border-b-black',
          )}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          className={clsx(
            'w-full rounded-t-md border-b py-2 !transition-[padding] focus:bg-slate-50 focus:pl-2 focus:outline-none',
            error ? 'border-b-red-500' : 'border-b-black',
          )}
        />
      )}
      <p className="absolute -bottom-5 text-xs text-red-500">{errorMessage}</p>
    </div>
  );
};

export default Input;
