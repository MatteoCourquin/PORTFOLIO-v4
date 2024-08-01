import { type SchemaTypeDefinition } from 'sanity';
import project from './schemaTypes/project';
import career from './schemaTypes/career';
import question from './schemaTypes/question';
import author from './schemaTypes/author';
import projectType from './schemaTypes/projectType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, projectType, career, question, author],
};
