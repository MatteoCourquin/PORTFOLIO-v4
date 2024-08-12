import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'projects',
  title: '🚀 PROJECTS',
  type: 'document',
  fieldsets: [
    {
      name: 'titleInfo',
      title: 'Title Information 🚀',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'descriptionInfo',
      title: 'Description Information 📝',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'mediaInfo',
      title: 'Media Information 📸',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title 🚀',
      type: 'string',
      description: 'The title of the project.',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(100)
          .error('The title is required and should be between 5 and 100 characters.'),
      fieldset: 'titleInfo',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, ''),
      },
      description: 'Slug for the project based on the title.',
      validation: (Rule) => Rule.required(),
      fieldset: 'titleInfo',
    }),
    defineField({
      name: 'projectIndex',
      title: 'Project Index',
      type: 'number',
      description: 'The index of the project.',
      // validation: (Rule) => Rule.required(),
      fieldset: 'titleInfo',
    }),
    defineField({
      name: 'descriptionFr',
      title: 'Description 🇫🇷',
      type: 'blockContent',
      description: 'Une brève description du projet en français.',
      validation: (Rule) =>
        Rule.required().max(500).warning('A shorter description is more engaging.'),
      fieldset: 'descriptionInfo',
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description 🇬🇧',
      type: 'blockContent',
      description: 'A brief description of the project in English.',
      validation: (Rule) =>
        Rule.required().max(500).warning('A shorter description is more engaging.'),
      fieldset: 'descriptionInfo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image 🌐',
      type: 'image',
      description: 'SETUP in Photoshop : 1200x630px, 24% quality',
      options: {
        hotspot: true,
      },
      fieldset: 'mediaInfo',
    }),
    defineField({
      name: 'mainImageDesktop',
      title: 'Main Image 💻',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fieldset: 'mediaInfo',
    }),
    defineField({
      name: 'mainImageMobile',
      title: 'Main Image 📱',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fieldset: 'mediaInfo',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery 📸',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Link to Website 🔗',
      type: 'url',
      description: 'Optional URL to the project website.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'authors',
      title: 'Authors 👥',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'authors' }] }],
      description: 'Select the author(s) of the project.',
    }),
    defineField({
      name: 'types',
      title: 'Types 🏷️',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'projectType' }] }],
      description: 'Select the type(s) of the project.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImageDesktop',
    },
  },
});
