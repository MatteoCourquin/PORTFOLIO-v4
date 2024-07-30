export const formatSlug = (slug: string) =>
  slug
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

export const isEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const interpolate = (template: string, variables: { [key: string]: string }): string => {
  return template.replace(/{{(\w+)}}/g, (_, key) => {
    return variables[key] || '';
  });
};
