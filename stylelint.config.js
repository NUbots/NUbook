/*eslint-env node*/

module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'no-descending-specificity': null,
    'declaration-empty-line-before': 'never',
    'declaration-block-no-duplicate-properties': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'declaration-colon-newline-after': null,
  },
}
