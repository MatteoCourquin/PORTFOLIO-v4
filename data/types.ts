export type TypeProjects = {
  index: string;
  title: string;
  description: string;
  mainImageUrl: string;
  imagesUrl?: Array<string>;
  websiteUrl: string;
};

export type TypePreviewProjects = Omit<TypeProjects, 'description' | 'imagesUrl'>;
