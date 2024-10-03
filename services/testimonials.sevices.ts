import { client } from '@/sanity/lib/client';

export const fetchTestimonials = async () => {
  const query = `
  *[_type == "testimonials"] {
    author,
    entity,
    testimonialFr,
    testimonialEn,
  }`;

  const testimonials = await client.fetch(query);

  return testimonials;
};
