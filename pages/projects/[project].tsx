import Typography, { TYPOGRAPHY_TYPE } from '@/components/atoms/Typography';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <Typography type={TYPOGRAPHY_TYPE.HEADING1}>PROJECT : {router.query.project}</Typography>
    </div>
  );
}
