import { Image, Slug, TypedObject } from 'sanity';

export type TypeProject = {
  projectIndex: number;
  slug: Slug;
  title: string;
  mainImageDesktop: Image;
  mainImageMobile: Image;
  descriptionEn: TypedObject[];
  descriptionFr: TypedObject[];
  authors: TypeAuthor[];
  gallery?: Image[];
  websiteUrl?: string;
  types: string[];
};

export type TypeAuthor = {
  name: string;
  websiteUrl: string;
};

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
  descriptionFr: TypedObject[];
  descriptionEn: TypedObject[];
};

export type TypeQuestion = {
  questionFr: string;
  questionEn: string;
  answerFr: TypedObject[];
  answerEn: TypedObject[];
};

export type TypeContactFormData = {
  name: string;
  email: string;
  message: string;
};
