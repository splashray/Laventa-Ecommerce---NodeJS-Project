
module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 11,
  },
  rules: {
    'no-console': 0,
    'linebreak-style': 0,
    'indent': 0,
    'key-spacing': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'no-nested-ternary': 0, 
    'consistent-return': 0,
    'no-underscore-dangle': 0,
    'arrow-body-style': 0,
    'no-use-before-define': 0,
    'no-unused-vars': 0,
    'no-restricted-globals': 0,
    'no-alert': 0,
  },
};
