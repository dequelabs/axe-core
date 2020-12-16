var path = require('path');

// allow running only certain directories
var testDirs = [
  'core',
  'commons',
  'rule-matches',
  'checks',
  'api',
  'integration',
  'virtual-rules'
];
var testFiles = [];
var args = process.argv.slice(2);

args.forEach(function(arg) {
  // pattern: testDir=commons,core
  var parts = arg.split('=');
  if (parts[0] === 'testDirs') {
    testDirs = parts[1].split(',');
  }
  // pattern: testFiles=path/to/file
  else if (parts[0] === 'testFiles') {
    testFiles = parts[1].split(',');
  }
});

var testPaths = [];
if (testFiles.length) {
  testPaths = testFiles.map(function(file) {
    var basename = path.basename(file);

    // do not transform test files
    if (file.includes('test/')) {
      return file;
    } else if (file.includes('lib/checks') || file.includes('lib/commons')) {
      var filePath = file.replace('lib/', 'test/');

      if (file.includes('-evaluate.js')) {
        return filePath.replace('-evaluate.js', '.js');
      }

      return filePath;
    } else if (basename.includes('-matches.js')) {
      return path.join('test/rule-matches', basename);
    }
  });
} else if (testDirs.length) {
  testPaths = testDirs.map(function(dir) {
    if (dir === 'integration') {
      return path.join('test', dir, '**/*.json');
    } else if (['virtual-rules', 'api'].includes(dir)) {
      return path.join('test', 'integration', dir, '**/*.js');
    }

    return path.join('test', dir, '**/*.js');
  });
}

module.exports = function(config) {
  config.set({
    basePath: '../',
    singleRun: true,
    autoWatch: true,
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      require('./integration/rules/preprocessor')
    ],
    frameworks: ['mocha', 'chai'],
    files: [
      { pattern: 'test/mock/**/*.html', included: false, served: true },
      { pattern: 'test/integration/**/*.css', included: false, served: true },
      { pattern: 'test/assets/**/*.*', included: false, served: true },
      {
        pattern: 'test/integration/rules/**/*.html',
        included: false,
        served: true
      },
      'axe.js',

      'test/testutils.js',
      'test/version.js'
    ].concat(testPaths),
    proxies: {
      '/test': '/base/test',
      '/mock': '/base/test/mock',
      '/integration': '/base/test/integration',
      '/axe.js': '/base/axe.js'
    },
    browsers: ['ChromeHeadless'],
    reporters: ['mocha'],
    preprocessors: {
      'test/integration/rules/**/*.json': ['integration']
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
