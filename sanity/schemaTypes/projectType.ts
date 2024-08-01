// schemas/projectType.js
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'projectType',
  title: '🏷️ PROJECT TYPE',
  type: 'document',
  fieldsets: [
    {
      name: 'labels',
      title: 'Labels 🏷️',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'labelFr',
      title: 'Label 🇫🇷',
      type: 'string',
      description: 'The project type label in French.',
      validation: (Rule) => Rule.required().error('The French label is required.'),
      fieldset: 'labels',
    }),
    defineField({
      name: 'labelEn',
      title: 'Label 🇬🇧',
      type: 'string',
      description: 'The project type label in English.',
      validation: (Rule) => Rule.required().error('The English label is required.'),
      fieldset: 'labels',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'A unique identifier for the project type.',
      validation: (Rule) => Rule.required().error('The value is required.'),
    }),
  ],
  preview: {
    select: {
      title: 'labelEn',
      subtitle: 'value',
    },
  },
});
