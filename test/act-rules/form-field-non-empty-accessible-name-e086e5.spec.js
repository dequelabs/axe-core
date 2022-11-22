require('./act-runner.js')({
  id: 'e086e5',
  title: 'Form field has non-empty accessible name',
  axeRules: [
    'label',
    'select-name',
    'aria-input-field-name',
    'aria-toggle-field-name'
  ],
  // See: https://github.com/act-rules/act-rules.github.io/pull/1974
  skipTests: ['b8e68dccf37727dd39af9fca76a8371a8ec5a81f']
});
