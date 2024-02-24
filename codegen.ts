import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:8080/graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    './apollo/possibleTypes.json': {
      plugins: ['fragment-matcher'],
    },
    './graphql/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        commentDescriptions: true,
        includeDirectives: true,
        sort: false,
      },
    },
    './graphql/schema.json': {
      plugins: ['introspection'],
      config: {
        minify: true,
      },
    },
    './src/types/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        dedupeOperationSuffix: true,
        useTypeImports: true,
      },
    },
  },
};

export default config;
