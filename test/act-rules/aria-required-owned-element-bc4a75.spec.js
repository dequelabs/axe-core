require('./act-runner.js')({
  id: 'bc4a75',
  title: 'ARIA required owned elements',
  axeRules: ['aria-required-children'],
  // we fail failed example 10 with the list rule and not aria-required-children
  skipTests: ['8b65672c9aefc4957b09a338eb85ad7dff6e53de']
});
