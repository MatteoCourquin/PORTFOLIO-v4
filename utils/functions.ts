export const formatSlug = (slug: string) =>
  slug
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

export const isEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
