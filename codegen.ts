import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:8080/graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
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
