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
  type: string;
};

export type TypePreviewProject = Omit<TypeProject, 'description' | 'imagesUrl'>;

export type TypeCareer = {
  startDate: string;
  endDate: string;
  title: string;
  description: string;
};

export type TypeQuestion = {
  question: string;
  answer: string;
};

export type TypeContactFormData = {
  name: string;
  email: string;
  message: string;
};
