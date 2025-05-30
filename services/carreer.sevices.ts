import { client } from '@/sanity/lib/client';

export const fetchCarreer = async () => {
  const query = `
  *[_type == "careers"] | order(orderRank) {
    startDate,
    endDate,
    titleEn,
    titleFr,
    descriptionEn,
    descriptionFr,
  }`;

  const carreer = await client.fetch(query);

  return carreer;
};
