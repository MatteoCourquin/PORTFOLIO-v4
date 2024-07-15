import { type SchemaTypeDefinition } from 'sanity';
import projects from './schemaTypes/projects';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projects],
};
