import { client } from '@/sanity/lib/client';
import { ParsedUrlQuery } from 'querystring';

export const fetchProject = async (params: ParsedUrlQuery | undefined) => {
  const query = `
    *[_type == "projects" && slug.current == $project][0] {
      projectIndex,
      title,
      slug,
      ogImage,
      mainImageDesktop,
      mainImageMobile,
      descriptionEn,
      descriptionFr,
      websiteUrl,
      gallery,
      "authors": authors[]->{
        name,
        websiteUrl
      },
    }
  `;

  const project = await client.fetch(query, {
    project: params?.project,
  });

  return project;
};
