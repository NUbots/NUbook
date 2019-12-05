module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
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
}
