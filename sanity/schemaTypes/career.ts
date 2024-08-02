import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'careers',
  title: '👔 CAREERS',
  type: 'document',
  fieldsets: [
    {
      name: 'dateInfo',
      title: 'Date Information',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'titleInfo',
      title: 'Title Information 🏷️',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'descriptionInfo',
      title: 'Description Information 📝',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'startDate',
      title: 'Start Date 📅',
      type: 'date',
      description: 'The start date of the career.',
      validation: (Rule) => Rule.required().error('The start date is required.'),
      fieldset: 'dateInfo',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date 📅',
      type: 'date',
      description: 'The end date of the career. Leave blank if ongoing.',
      fieldset: 'dateInfo',
    }),
    defineField({
      name: 'titleFr',
      title: 'Title 🇫🇷',
      type: 'string',
      description: 'The title of the career position in French.',
      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(100)
          .error('The title is required and should be between 5 and 100 characters.'),
      fieldset: 'titleInfo',
    }),
    defineField({
      name: 'titleEn',
      title: 'Title 🇬🇧',
      type: 'string',
      description: 'The title of the career position in English.',
      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(100)
          .error('The title is required and should be between 5 and 100 characters.'),
      fieldset: 'titleInfo',
    }),
    defineField({
      name: 'descriptionFr',
      title: 'Description 🇫🇷',
      type: 'blockContent',
      description: 'A brief description of the career in French.',
      validation: (Rule) =>
        Rule.required().max(500).warning('A shorter description is more engaging.'),
      fieldset: 'descriptionInfo',
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description 🇬🇧',
      type: 'blockContent',
      description: 'A brief description of the career in English.',
      validation: (Rule) =>
        Rule.required().max(500).warning('A shorter description is more engaging.'),
      fieldset: 'descriptionInfo',
    }),
  ],
  preview: {
    select: {
      title: 'titleEn',
      subtitle: 'startDate',
    },
  },
});
