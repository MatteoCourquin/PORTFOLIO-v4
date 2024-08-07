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

export const formatDate = (date: string, language: string) => {
  return new Date(date).toLocaleDateString(language, {
    year: 'numeric',
    month: 'short',
  });
};

export const formatDateToYear = (date: string) => {
  return new Date(date).getFullYear();
};
