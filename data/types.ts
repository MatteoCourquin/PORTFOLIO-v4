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

export type Language = {
  head: {
    titleIndex: string;
    titleProjects: string;
    titleAbout: string;
    titleContact: string;
    description: string;
  };
  nav: {
    home: string;
    projects: string;
    about: string;
    contact: string;
  };
  footer: {
    title: string;
    button: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      button: string;
    };
    about: {
      title: string;
      description: string;
    };
    projects: {
      title: string;
      button: string;
    };
  };
  projects: {
    title: string;
  };
  about: {
    title: string;
    about: {
      title: string;
      description: string;
    };
    carreer: {
      title: string;
    };
    questions: {
      title: string;
    };
  };
  contact: {
    title: string;
    form: {
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      message: {
        label: string;
        placeholder: string;
      };
      errors: {
        name: string;
        email: string;
        emailValid: string;
      };
      button: string;
    };
    consultation: string;
  };
};
