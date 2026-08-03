require('./act-runner.js')({
  id: '2ee8b8',
  title: 'Visible label is part of accessible name',
  axeRules: ['label-content-name-mismatch'],
  skipTests: [
    // See: https://github.com/dequelabs/axe-core/issues/4311
    'e9bbdbec137223e2973c6d2896050770c84c26e5',
    // See: https://github.com/dequelabs/axe-core/issues/5207
    'fab659b02c1edb4f2c8f0bda524b1076abab7df6',
    '94a7ce7aea9dbfaa375c459c26d3a5923de84e7a',
    'e117393d6711d6bdf32821005219c9d9474dfeb8',
    'f5c9811c984987443476760a1c5b91b1067f7e19'
  ]
});
