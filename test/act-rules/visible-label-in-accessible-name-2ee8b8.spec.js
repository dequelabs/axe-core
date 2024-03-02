require('./act-runner.js')({
  id: '2ee8b8',
  title: 'Visible label is part of accessible name',
  axeRules: ['label-content-name-mismatch'],
  // See: https://github.com/dequelabs/axe-core/issues/4311
  skipTests: ['e9bbdbec137223e2973c6d2896050770c84c26e5']
});
