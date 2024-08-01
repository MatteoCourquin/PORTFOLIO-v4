import { Image, Slug } from 'sanity';

export type TypeProject = {
  index: string;
  title: string;
  slug: Slug;
  description: string;
  mainImageDesktop: Image;
  mainImageMobile: Image;
  gallery?: Image[];
  websiteUrl?: string;
  types: string[];
};

export type TypePreviewProject = Omit<TypeProject, 'description' | 'imagesUrl'>;

export type TypeFilters = {
  labelFr: string;
  labelEn: string;
  value: string;
};

export type TypeCareer = {
  startDate: string;
  endDate: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
};

export type TypeQuestion = {
  questionFr: string;
  questionEn: string;
  answerFr: string;
  answerEn: string;
};

export type TypeContactFormData = {
  name: string;
  email: string;
  message: string;
};
