import { TypeProject } from '@/data/types';
import { client } from '@/sanity/lib/client';

export const fetchPaths = async () => {
  const query = `
    *[_type == "projects"] {
      slug,
      title
    }
  `;

  const projects = await client.fetch(query);

  const paths = projects.map((project: TypeProject) => ({
    slug: project.slug.current,
    title: project.title,
  }));

  return paths;
};
