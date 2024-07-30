import clsx from 'clsx';
import { ChangeEvent, useState } from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder = '',
  required = false,
  value,
  onChange,
  validate,
  errorMessage = 'Valeur invalide',
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  validate?: (value: string) => boolean;
  errorMessage?: string;
}) => {
  const [isValid, setIsValid] = useState(true);

  const handleBlur = () => {
    if (validate) {
      setIsValid(validate(value));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {label && (
        <label className="heading6">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          required={required}
          className={clsx(
            'w-full rounded-t-md border-b py-2 !transition-[padding] focus:bg-slate-50 focus:pl-2 focus:outline-none',
            isValid ? 'border-b-black' : 'border-b-red-500',
          )}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          required={required}
          className={clsx(
            'w-full rounded-t-md border-b py-2 !transition-[padding] focus:bg-slate-50 focus:pl-2 focus:outline-none',
            isValid ? 'border-b-black' : 'border-b-red-500',
          )}
        />
      )}
      {!isValid && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default Input;
