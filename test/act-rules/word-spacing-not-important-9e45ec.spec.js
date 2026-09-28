require('./act-runner.js')({
  id: '9e45ec',
  title: 'Word spacing in style attributes is not !important',
  axeRules: ['avoid-inline-spacing'],
  // Passed Example 5: the div is tested against its own font-size, not the
  // one of the p that has the text. See:
  // https://github.com/dequelabs/axe-core/issues/4232
  skipTests: ['15905a239d6755102be6a60aa152ad963d5b1dbb']
});
