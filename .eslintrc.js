module.exports = {
  root: true,
  
  env: {
    node: true,
    es2021: true,
  },
  
  // Common rules for ALL projects
  rules: {
    'prefer-const': 'error',
    'eqeqeq': 'error',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
  },
  
  // Different rules for different projects
  overrides: [
    // Assignment1 & 2: Pure JavaScript
    {
      files: ['Assignment1/**/*.js', 'Assignment2/**/*.js'],
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      extends: ['eslint:recommended'],
      rules: {
        'no-unused-vars': 'error',
        'no-var': 'error',
      },
    },
    
    // Assignment3: TypeScript
    {
      files: ['Assignment3/**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'error',  // ← KEY REQUIREMENT
        '@typescript-eslint/no-unused-vars': 'error',
        'no-unused-vars': 'off',  // TypeScript handles this
      },
    },
  ],
};