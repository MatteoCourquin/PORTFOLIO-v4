import { TypeProject } from '@/data/types';
import { fetchPaths } from '@/services/paths.sevices';
import { GetServerSideProps } from 'next';

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const projects = await fetchPaths();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml" 
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd 
        http://www.w3.org/1999/xhtml 
        http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd">
  <url>
    <loc>https://matteocourquin.com</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://matteocourquin.com/projects</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://matteocourquin.com/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://matteocourquin.com/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  ${projects
    .map(
      (project: TypeProject) => `
  <url>
    <loc>https://matteocourquin.com/projects/${project.slug}</loc>
    <lastmod>${project.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  `,
    )
    .join('')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap.trim());
  res.end();

  return { props: {} };
};

export default Sitemap;
