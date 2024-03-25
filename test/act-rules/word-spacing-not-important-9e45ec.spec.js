require('./act-runner.js')({
  id: '9e45ec',
  title: 'Word spacing in style attributes is not !important',
  axeRules: ['avoid-inline-spacing'],
  // See: https://github.com/dequelabs/axe-core/issues/4232
  skipTests: [
    '15905a239d6755102be6a60aa152ad963d5b1dbb',
    '8d2baed183149375922c23a9a5f42b52b627d713',
    'fdd3c30f28464b32eb8a1397f70a41dfd3b2cb1c'
  ]
});
