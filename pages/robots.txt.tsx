import { GetServerSideProps } from 'next';

const Robots = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robots = `User-agent: *
Allow: /
Allow: /projects
Allow: /about
Allow: /contact
Disallow: /api
Disallow: /_next
Disallow: /static
Disallow: /favicon.ico
Disallow: /robots.txt
Disallow: /sitemap.xml
Disallow: /images
Sitemap: https://matteocourquin.com/sitemap2.xml`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(robots);
  res.end();

  return { props: {} };
};

export default Robots;
