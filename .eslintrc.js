/* eslint-env node */

module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    strict: 0,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['add-readmes.js'],
      env: {
        node: true,
        es6: true,
      },
    },
  ],
}
