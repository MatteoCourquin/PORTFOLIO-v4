import { useMagnet, useResetMagnet } from '@/utils/animations';
import Link from 'next/link';
import { IconBack } from './atoms/Icons';

const ArrowBack = ({ href }: { href: string }) => {
  return (
    <>
      <Link
        href={href}
        scroll={false}
        onMouseMove={(e) => useMagnet(e, 1)}
        onMouseOut={(e) => useResetMagnet(e)}
      >
        <IconBack className="stroke-primary" />
      </Link>
    </>
  );
};

export default ArrowBack;
