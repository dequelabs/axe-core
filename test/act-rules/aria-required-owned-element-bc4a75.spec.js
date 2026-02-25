require('./act-runner.js')({
  id: 'bc4a75',
  title: 'ARIA required owned elements',
  axeRules: ['list', 'aria-required-children'],
  // See https://github.com/act-rules/act-rules.github.io/pull/2387
  skipTests: ['837f92d0ac41c14e55782991cbab75975b492702']
});
