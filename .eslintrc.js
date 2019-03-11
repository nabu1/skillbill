/* eslint-disable  */
module.exports = {
  env: { node: true },
  //extends: ['plugin:vue/recommended', '@vue/airbnb', 'prettier', 'plugin:prettier/recommended'],
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  //plugins: ['prettier'],
  root: true,
  rules: {
    'no-console': 0,
    'no-debugger': 'off',
    'array-bracket-spacing': 0,
    'array-callback-return': 'warn',
    'arrow-parens': 0,
    'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    'camelcase': 'warn',
    'computed-property-spacing': 0,
    'comma-dangle': 'off',
    'consistent-return': 'off',
    'dot-notation':'off',
    'func-call-spacing': 0,
    'import/prefer-default-export': 'warn',
    'indent': ['error', 2],
    'linebreak-style': 'off',
    'max-len': [1, 120, 1, { ignoreUrls: true, ignoreTrailingComments: true, ignoreTemplateLiterals: true }],
    "newline-per-chained-call": 'off',
    'no-alert': 'off',
    'no-multiple-empty-lines': [1, { max: 1 }],
    'no-multi-str': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 0,
    'no-restricted-globals': 'off',
    'no-spaced-func': 0,
    'no-underscore-dangle': 'off',
    'no-warning-comments': 'warn',
    'no-whitespace-before-property': 0,
    'no-trailing-spaces': 2,
    'prefer-destructuring': 'off',
    'prefer-template': 'off',
    // 'prettier/prettier': ['error'],
    'semi': ['error', 'never'],
    'space-in-parens': 0,
    'space-before-function-paren': 0,
    'spaced-comment': 0,
    'vue/html-self-closing': 'off'
  },

  parserOptions: {
    parser: 'babel-eslint',
  },
}
