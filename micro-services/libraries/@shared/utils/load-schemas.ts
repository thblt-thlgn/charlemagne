import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import * as path from 'path';

const ROOT = path.resolve();

export const loadSchemas = () => {
  const typesArray = fileLoader(path.join(ROOT, './assets/schema/*.gql'));
  return mergeTypes(typesArray);
};
