import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'questions',
  title: '❓ QUESTIONS',
  type: 'document',
  fieldsets: [
    {
      name: 'questionInfo',
      title: 'Question Information',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'answerInfo',
      title: 'Answer Information',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'questionFr',
      title: 'Question 🇫🇷',
      type: 'string',
      description: 'The question to be asked.',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(200)
          .error('The question must be between 10 and 200 characters.'),
      fieldset: 'questionInfo',
    }),
    defineField({
      name: 'questionEn',
      title: 'Question 🇬🇧',
      type: 'string',
      description: 'The question to be asked.',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(200)
          .error('The question must be between 10 and 200 characters.'),
      fieldset: 'questionInfo',
    }),
    defineField({
      name: 'answerFr',
      title: 'Answer 🇫🇷',
      type: 'text',
      description: 'The answer to the question.',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(1000)
          .warning('Try to keep the answer concise, with a maximum of 1000 characters.'),
      fieldset: 'answerInfo',
    }),
    defineField({
      name: 'answerEn',
      title: 'Answer 🇬🇧',
      type: 'text',
      description: 'The answer to the question.',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(1000)
          .warning('Try to keep the answer concise, with a maximum of 1000 characters.'),
      fieldset: 'answerInfo',
    }),
  ],
  preview: {
    select: {
      title: 'questionEn',
      subtitle: 'answerEn',
    },
  },
});
