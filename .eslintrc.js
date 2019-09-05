module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    'lines-between-class-members': ["error", "always", { exceptAfterSingleLine: true }],
    'operator-linebreak': ["error", "after"],
    'arrow-parens': 'off',
    'eqeqeq': 'off',
    'no-plusplus': 'off',
    'object-curly-newline': 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
