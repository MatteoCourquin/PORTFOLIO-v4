export type TypeProject = {
  index: string;
  title: string;
  description: string;
  mainImageUrl: string;
  imagesUrl?: Array<string>;
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
