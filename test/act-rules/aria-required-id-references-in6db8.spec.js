require('./act-runner.js')({
  id: 'in6db8',
  title: 'ARIA required ID references exist',
  axeRules: ['aria-valid-attr-value'],
  // See: https://github.com/dequelabs/axe-core/issues/4202
  skipTests: ['97bd98302238b32e9131d042174502a83db2a4b2']
});
