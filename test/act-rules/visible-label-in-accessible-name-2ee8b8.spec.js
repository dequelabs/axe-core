require('./act-runner.js')({
  id: '2ee8b8',
  title: 'Visible label is part of accessible name',
  axeRules: ['label-content-name-mismatch'],
  skipTests: [
    // See: https://github.com/dequelabs/axe-core/issues/5207
    'fab659b02c1edb4f2c8f0bda524b1076abab7df6', // Passed Example 11
    '94a7ce7aea9dbfaa375c459c26d3a5923de84e7a', // Passed Example 14
    'e117393d6711d6bdf32821005219c9d9474dfeb8', // Failed Example 3
    'f5c9811c984987443476760a1c5b91b1067f7e19', // Failed Example 15
    // Abbreviation differences are inapplicable under ACT rule 2ee8b8 but cannot
    // be reliably detected. See: https://github.com/dequelabs/axe-core/issues/4821
    '4c8c38022d15c92158ecaaa647fe8ca2c330f485' // Inapplicable Example 5
  ]
});
