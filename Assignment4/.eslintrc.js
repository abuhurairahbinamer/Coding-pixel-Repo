module.exports = {
  root: true,

  env: {
    node: true,
    es2021: true,
  },

  rules: {
    'prefer-const': 'error',
    eqeqeq: 'error',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
  },

  overrides: [
    {
      files: ['TS-project1/**/*.ts', 'TS-project2/**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        'no-unused-vars': 'off',
      },
    },
  ],
};