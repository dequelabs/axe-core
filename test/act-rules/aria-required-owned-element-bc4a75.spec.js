require('./act-runner.js')({
  id: 'bc4a75',
  title: 'ARIA required owned elements',
  axeRules: ['aria-required-children'],
  // Awaiting https://github.com/act-rules/act-rules.github.io/pull/1950
  skipTests: ['52c725e462af074a3559cf4bf4d4dd2386168938']
});
