import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  return <p>PROJECT : {router.query.project}</p>;
}
