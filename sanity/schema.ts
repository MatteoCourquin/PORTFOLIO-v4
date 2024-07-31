import { type SchemaTypeDefinition } from 'sanity';
import project from './schemaTypes/project';
import career from './schemaTypes/career';
import question from './schemaTypes/question';
import author from './schemaTypes/author';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, career, question, author],
};
