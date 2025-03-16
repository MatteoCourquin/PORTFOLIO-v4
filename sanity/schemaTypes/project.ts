import { DocumentVideoIcon, EditIcon, ImageIcon, TextIcon } from '@sanity/icons';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'projects',
  title: '🚀 PROJECTS',
  type: 'document',
  orderings: [orderRankOrdering],
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
    orderRankField({ type: 'projects' }),
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
      name: 'sections',
      title: 'Sections 📑',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'sectionType',
              title: 'Section Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Image', value: 'image' },
                  { title: 'Video', value: 'video' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'contentFr',
              title: 'Contenu 🇫🇷',
              type: 'blockContent',
              hidden: ({ parent }) => parent?.sectionType !== 'text',
              description: 'Contenu en français pour cette section.',
            }),
            defineField({
              name: 'contentEn',
              title: 'Content 🇺🇸',
              type: 'blockContent',
              hidden: ({ parent }) => parent?.sectionType !== 'text',
              description: 'Content in English for this section.',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              hidden: ({ parent }) => parent?.sectionType !== 'image',
              description: 'Image for this section.',
            }),
            defineField({
              name: 'video',
              title: 'Video',
              type: 'file',
              hidden: ({ parent }) => parent?.sectionType !== 'video',
              description: 'Video for this section.',
              options: {
                accept: 'video/webm,video/mp4',
              },
            }),
            defineField({
              name: 'mockuped',
              title: 'Mockuped',
              type: 'boolean',
              initialValue: false,
              hidden: ({ parent }) => parent?.sectionType === 'text',
              description: 'Check if this video is a mockup.',
            }),
          ],
          preview: {
            select: {
              title: 'sectionType',
              media: 'image',
              contentPreview: 'contentEn',
              videoAsset: 'video.asset.originalFilename',
              isMockup: 'mockuped',
            },
            prepare(selection) {
              const { title, media, contentPreview, videoAsset, isMockup } = selection;
              let text = '';
              let icon;
              switch (title) {
                case 'text':
                  text = contentPreview ? contentPreview[0].children[0].text : 'Text (empty)';
                  icon = TextIcon;
                  break;
                case 'image':
                  text = media ? 'Image' : 'Image (empty)';
                  icon = ImageIcon;
                  break;
                case 'video':
                  text = videoAsset || 'Video';
                  if (isMockup) {
                    text += ' (Mockup)';
                  }
                  icon = DocumentVideoIcon;
                  break;
                default:
                  text = 'Edit';
                  icon = EditIcon;
              }

              return {
                title: text,
                media: media || icon,
              };
            },
          },
        },
      ],
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
