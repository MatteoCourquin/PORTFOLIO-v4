import { client } from '@/sanity/lib/client';

export const fetchFilters = async () => {
  const query = `
  *[_type == "projectType"] {
    labelFr,
    labelEn,
    value,
  }`;

  const projectTypes = await client.fetch(query);

  const filters = [
    {
      labelFr: 'Tous',
      labelEn: 'All',
      value: 'all',
    },
    ...projectTypes,
  ];

  return filters;
};
