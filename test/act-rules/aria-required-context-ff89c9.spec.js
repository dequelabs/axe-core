require('./act-runner.js')({
  id: 'ff89c9',
  title: 'ARIA required context role',
  axeRules: ['aria-required-parent', 'aria-required-children'],
  // See https://github.com/act-rules/act-rules.github.io/pull/1973
  skipTests: ['c18579dc18aaebf7eeaa4e24e4bc199d77c432bc']
});
