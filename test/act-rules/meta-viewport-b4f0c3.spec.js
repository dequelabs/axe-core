require('./act-runner.js')({
  id: 'b4f0c3',
  title: 'meta viewport allows for zoom',
  axeRules: ['meta-viewport'],
  // See: https://github.com/dequelabs/axe-core/issues/4231
  skipTests: [
    '9f288c284df9ade53aa33e50ec50c879d5aba4ef',
    'c94a59f8c3b17d722781af36da3556ff4b418776'
  ]
});
