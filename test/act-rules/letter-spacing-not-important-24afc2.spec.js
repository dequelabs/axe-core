require('./act-runner.js')({
  id: '24afc2',
  title: 'Letter spacing in style attributes is not !important',
  axeRules: ['avoid-inline-spacing'],
  // See: https://github.com/dequelabs/axe-core/issues/4232
  skipTests: [
    '9af5662e9957191c22c558a1a8511bae709a2b36',
    'd6d5bf7c081939e64d10022dd29f5e31d2153d50'
  ]
});
