require('./act-runner.js')({
  id: '2ee8b8',
  title: 'Visible label is part of accessible name',
  axeRules: ['label-content-name-mismatch'],
  skipTests: [
    // ACT made abbreviation and hyphenation differences inapplicable, but axe
    // cannot detect either reliably and reports a violation instead. This
    // divergence is accepted; see
    // https://github.com/act-rules/act-rules.github.io/pull/2443
    // Both are load-bearing against the nightly, which installs
    // `wcag-act-rules#main`, not the pinned dependency.
    '4c8c38022d15c92158ecaaa647fe8ca2c330f485', // Inapplicable Example 5
    'e9bbdbec137223e2973c6d2896050770c84c26e5', // Inapplicable Example 6
    // See: https://github.com/dequelabs/axe-core/issues/5207
    'fab659b02c1edb4f2c8f0bda524b1076abab7df6', // Passed Example 11
    '94a7ce7aea9dbfaa375c459c26d3a5923de84e7a' // Passed Example 14
  ]
});
