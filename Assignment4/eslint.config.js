const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  {
    files: ['TS-project1/**/*.ts', 'TS-project2/**/*.ts'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'script',
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'script',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        fetch: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'prefer-const': 'error',
      eqeqeq: 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-vars': 'off',
    },
  },
];
