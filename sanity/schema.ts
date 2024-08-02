import { type SchemaTypeDefinition } from 'sanity';
import author from './schemaTypes/author';
import career from './schemaTypes/career';
import project from './schemaTypes/project';
import projectType from './schemaTypes/projectType';
import question from './schemaTypes/question';
import blockContent from './schemaTypes/blockContent';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, projectType, career, question, author, blockContent],
};
