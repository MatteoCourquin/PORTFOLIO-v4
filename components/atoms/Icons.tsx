import clsx from 'clsx';
import { forwardRef } from 'react';

export const IconArrowTopRight = forwardRef<
  SVGSVGElement,
  {
    color?: 'black' | 'white';
    className?: string;
  }
>(({ color = 'white', className }, ref) => (
  <svg
    ref={ref}
    className={clsx(
      color === 'white' && 'stroke-white',
      color === 'black' && 'stroke-black',
      className,
    )}
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="24.1133" y1="0.817627" x2="24.1133" y2="23.4679" strokeWidth="3" />
    <line x1="22.6133" y1="2.31763" x2="0.641182" y2="2.31763" strokeWidth="3" />
    <line
      y1="-1.5"
      x2="31.0646"
      y2="-1.5"
      transform="matrix(-0.700005 0.714138 -0.700005 -0.714138 22.6133 1.5083)"
      strokeWidth="3"
    />
  </svg>
));

export const IconBack = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="60"
    height="58"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.3501 7.99976H16.7504" stroke="black" strokeWidth=".8" strokeLinecap="square" />
    <path
      d="M7.80001 14.0243L1.75 8.0003L7.80001 1.97534"
      stroke="black"
      strokeWidth=".8"
      strokeLinecap="square"
    />
  </svg>
);

export const IconAdd = ({ size = 24, className }: { size: number; className: string }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 12H18" stroke="black" strokeWidth="1"></path>
    <path d="M12 6V18" stroke="black" strokeWidth="1"></path>
  </svg>
);

export const IconLinkedin = ({ className }: { className?: string }) => (
  <svg
    className={clsx('stroke-white', className)}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.8179 9.38098C17.5228 9.1599 19.1158 9.82852 19.9196 11.4219C20.4819 12.5344 20.4921 13.7365 20.5002 14.9503C20.5 16.6418 20.5009 18.3332 20.5 20.0247C20.4998 20.2864 20.288 20.4988 20.0262 20.4994C19.1636 20.5011 18.3573 20.4993 17.4947 20.4997C17.2321 20.4998 17.0189 20.2873 17.0185 20.0248C17.0162 18.1752 17.0189 16.7324 17.0178 14.8828C17.0193 14.7258 16.9926 14.5705 16.9822 14.4144C16.6483 12.145 13.4748 12.1366 13.231 14.3214C13.1955 14.5661 13.2082 14.8135 13.2064 15.0596C13.2054 16.8505 13.208 18.2345 13.2057 20.0254C13.2054 20.2877 12.9925 20.5 12.7302 20.5C11.8596 20.4998 11.0298 20.4997 10.1592 20.5001C9.89608 20.5002 9.68275 20.2866 9.6836 20.0234C9.69432 16.7025 9.73443 13.3932 9.69021 10.0735C9.68667 9.80772 9.90111 9.59012 10.1669 9.59029C11.0349 9.59086 11.8626 9.59023 12.7307 9.59049C12.9934 9.59057 13.2062 9.80373 13.2064 10.0664C13.2066 10.4238 13.207 10.5916 13.2056 10.949C13.8068 10.0064 14.6962 9.53843 15.8179 9.38098Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M3.63422 10.0656C3.63415 9.80304 3.84691 9.59008 4.1095 9.58999C4.97087 9.58972 5.83227 9.58986 6.69381 9.59007C6.95645 9.59013 7.16929 9.80313 7.16921 10.0658C7.16808 13.3854 7.17145 16.705 7.16768 20.0246C7.16738 20.2871 6.95438 20.4997 6.69189 20.4995C5.83174 20.4991 4.97147 20.4991 4.11132 20.4995C3.84881 20.4997 3.63581 20.2871 3.63553 20.0246C3.63197 16.7049 3.63513 13.3853 3.63422 10.0656Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <ellipse
      cx="5.40195"
      cy="5.40195"
      rx="1.90195"
      ry="1.90195"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></ellipse>
  </svg>
);

export const IconGithub = ({ className }: { className?: string }) => (
  <svg
    className={clsx('stroke-white', className)}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.923 20.1452V19.3648C15.9931 18.4746 15.6769 17.5969 15.0551 16.9557C17.9536 16.6327 21 15.5342 21 10.4942C21 9.20504 20.5038 7.96548 19.6155 7.03239C20.0358 5.90472 20.0066 4.65834 19.5318 3.55207C19.5318 3.55207 18.443 3.22904 15.923 4.91812C13.8078 4.34504 11.5768 4.34504 9.46151 4.91812C6.94151 3.22904 5.85178 3.55207 5.85178 3.55207C5.37795 4.65834 5.34876 5.90472 5.76908 7.03239C4.87395 7.97326 4.37773 9.22353 4.38454 10.5215C4.38454 15.5245 7.43092 16.623 10.3294 16.983C9.71546 17.6183 9.39924 18.4833 9.46151 19.3648V20.1675C4.84573 21.5521 4.84573 17.8596 3 17.3984"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

export const IconInsta = ({ className }: { className?: string }) => (
  <svg
    className={clsx('stroke-white', className)}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.78216 3H16.2169C19.165 3 21 5.08119 21 8.02638V15.9736C21 18.9188 19.165 21 16.2159 21H7.78216C4.83405 21 3 18.9188 3 15.9736V8.02638C3 5.08119 4.84281 3 7.78216 3Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M11.8445 8.82812C9.91023 8.82812 8.3418 10.3966 8.3418 12.3308C8.3418 14.2651 9.91023 15.8335 11.8445 15.8335C13.7788 15.8335 15.3472 14.2651 15.3472 12.3308C15.3472 10.3966 13.7788 8.82812 11.8445 8.82812Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M16.8661 7.36374V7.43274V7.36374ZM17.1481 7.37875C17.1481 7.53575 17.0211 7.66275 16.8641 7.66275C16.7071 7.66275 16.5791 7.53575 16.5791 7.37875C16.5791 7.22175 16.7071 7.09375 16.8641 7.09375C17.0211 7.09375 17.1481 7.22175 17.1481 7.37875Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);
