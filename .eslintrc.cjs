/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '@remix-run/eslint-config/jest-testing-library',
    'prettier',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        useTabs: false,
        tabWidth: 2,
        printWidth: 100,
      },
    ],
  },
  overrides: [
    {
      files: ['./src/**/*.tsx', './src/**/*.graphql.ts', './src/**/graphql.ts'],
      processor: '@graphql-eslint/graphql',
    },
    {
      files: ['./src/**/*.graphql'],
      extends: ['plugin:@graphql-eslint/operations-all', 'plugin:@graphql-eslint/relay'],
      parserOptions: {
        operations: './src/**/*.{ts,tsx}',
        schema: './graphql/schema.graphql',
      },
      rules: {
        '@graphql-eslint/naming-convention': [
          'error',
          {
            VariableDefinition: 'camelCase',
            OperationDefinition: {
              style: 'PascalCase',
              forbiddenPrefixes: ['Query', 'Mutation', 'Subscription', 'Get'],
              forbiddenSuffixes: ['Query', 'Mutation', 'Subscription'],
            },
            FragmentDefinition: {
              forbiddenPrefixes: ['Fragment'],
              forbiddenSuffixes: ['Fragment'],
            },
          },
        ],
      },
    },
  ],
  // we're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but it means we have to explicitly
  // set the jest version.
  settings: {
    jest: {
      version: 27,
    },
    tailwindcss: {
      config: './src/styles/tailwind-base.js',
    },
  },
};
