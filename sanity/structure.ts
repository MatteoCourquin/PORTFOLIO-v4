import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('PORTFOLIO')
    .items([
      orderableDocumentListDeskItem({
        type: 'projects',
        title: 'PROJECTS',
        icon: () => '🚀',
        S,
        context,
      }),
      S.documentTypeListItem('projectType')
        .title('PROJECT TYPES')
        .icon(() => '🏷️'),
      S.divider(),
      S.documentTypeListItem('careers')
        .title('CAREERS')
        .icon(() => '👔'),
      S.documentTypeListItem('questions')
        .title('QUESTIONS')
        .icon(() => '❓'),
      S.documentTypeListItem('testimonials')
        .title('TESTIMONIALS')
        .icon(() => '⭐️'),
      S.divider(),
    ]);
