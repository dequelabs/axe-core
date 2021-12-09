module.exports = function (config) {
  config.set({
    basePath: '../../',
    singleRun: true,
    autoWatch: false,
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-spec-reporter',
      'karma-chrome-launcher',
      require('./preprocessor')
    ],
    frameworks: ['mocha', 'chai'],
    files: [
      'axe.js',
      'test/act-mapping/*.json',
      {
        pattern: 'node_modules/act-rules.github.io/test-assets/**/*',
        included: false,
        served: true
      }
    ],
    browsers: ['ChromeHeadless'],
    proxies: {
      '/test-assets': '/base/node_modules/act-rules.github.io/test-assets'
    },
    reporters: ['spec'],
    preprocessors: {
      '**/*.json': ['act']
    },
    client: {
      useIframe: false,
      mocha: {
        timeout: 4000,
        reporter: 'html'
      }
    }
  });
};
