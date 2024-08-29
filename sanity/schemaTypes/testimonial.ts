import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonials',
  title: '⭐️ TESTIMONIALS',
  type: 'document',
  fieldsets: [
    {
      name: 'authorInfo',
      title: 'Author Information',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'testimonialInfo',
      title: 'Testimonial Information',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'The name of the author in French.',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(100)
          .error('The author name must be between 2 and 100 characters.'),
      fieldset: 'authorInfo',
    }),
    defineField({
      name: 'entity',
      title: 'Entity',
      type: 'string',
      description: 'The organization or entity the author is associated with.',
      validation: (Rule) =>
        Rule.max(200).warning('Entity name should be concise and under 200 characters.'),
      fieldset: 'authorInfo',
    }),
    defineField({
      name: 'testimonialFr',
      title: 'Testimonial 🇫🇷',
      type: 'blockContent',
      description: 'The testimonial text in French.',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(500)
          .warning('Try to keep the testimonial concise, with a maximum of 500 characters.'),
      fieldset: 'testimonialInfo',
    }),
    defineField({
      name: 'testimonialEn',
      title: 'Testimonial 🇬🇧',
      type: 'blockContent',
      description: 'The testimonial text in English.',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(500)
          .warning('Try to keep the testimonial concise, with a maximum of 500 characters.'),
      fieldset: 'testimonialInfo',
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'entity',
    },
  },
});
