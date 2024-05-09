var path = require('path');
const { globSync } = require('glob');

// allow running only certain directories
var testDirs = [
  'core',
  'commons',
  'rule-matches',
  'checks',
  // npm run test:unit -- --browsers Chrome testDirs=checks
  // npm run test:unit -- --browsers ChromeHeadless testDirs=checks

  // npm run test:unit -- --browsers Chrome testFiles=test/checks/color/color-contrast.js
  // npm run test:unit -- --browsers ChromeHeadless testFiles=test/checks/color/color-contrast.js
  'api',
  'integration',
  // npm run test:unit -- --browsers Chrome testDirs=integration
  // npm run test:unit -- --browsers ChromeHeadless testDirs=integration

  // npm run test:unit -- --browsers Chrome testFiles=test/integration/rules/color-contrast/color-contrast.json
  // npm run test:unit -- --browsers ChromeHeadless testFiles=test/integration/rules/color-contrast/color-contrast.json

  // npm run test:unit -- --browsers Chrome testFiles=test/integration/rules/color-contrast-enhanced/color-contrast-enhanced.json
  // npm run test:unit -- --browsers ChromeHeadless testFiles=test/integration/rules/color-contrast-enhanced/color-contrast-enhanced.json

  // npm run test:unit -- --browsers Chrome testFiles=test/integration/rules/link-in-text-block/link-in-text-block.json
  // npm run test:unit -- --browsers ChromeHeadless testFiles=test/integration/rules/link-in-text-block/link-in-text-block.json

  'virtual-rules'
];
var testFiles = [];
var debugPort = 9765; // arbitrary, sync with .vscode/launch.json
var args = process.argv.slice(2);
const isHeadless = args.includes('ChromeHeadless') || !args.includes('Chrome');

args.forEach(function (arg) {
  // pattern: testDir=commons,core
  var parts = arg.split('=');
  if (parts[0] === 'testDirs') {
    testDirs = parts[1].split(',');
  }
  // pattern: testFiles=path/to/file
  else if (parts[0] === 'testFiles') {
    testFiles = parts[1].split(',');
  }
  // pattern: debugPort=1234
  else if (parts[0] === 'debugPort') {
    debugPort = parseInt(parts[1], 10);
  }
});

var testPaths = [];
if (testFiles.length) {
  testPaths = testFiles.map(function (file) {
    var basename = path.basename(file);
    var extname = path.extname(file);

    // do not transform test files unless it is the integration/rule
    // html, in which case run the json test file
    if (file.includes('test/')) {
      if (file.includes('integration/rules') && extname === '.html') {
        return file.replace('.html', '.json');
      }
      if (file.includes('integration/rules') && extname === '.xhtml') {
        return file.replace('.xhtml', '.json');
      }

      return file;
    } else if (basename.includes('-matches.js')) {
      return path.join('test/rule-matches', basename);
    } else {
      var filePath = file.replace('lib/', 'test/');

      if (file.includes('-evaluate.js')) {
        return filePath.replace('-evaluate.js', '.js');
      }

      return filePath;
    }
  });
} else if (testDirs.length) {
  testPaths = testDirs
    .map(function (dir) {
      if (dir === 'integration') {
        return path.join('test', dir, '**/*.json');
      }
      if (['virtual-rules', 'api'].includes(dir)) {
        return path.join('test', 'integration', dir, '**/*.js');
      }
      return path.join('test', dir, '**/*.js');
    })
    .reduce((acc, cur) => {
      if (cur.includes('integration/**/*.json')) {
        const globbed = globSync(
          cur
          // {
          //   ignore: '**/*-HEADLESS.{json}'
          // }
        ).filter(tp => {
          return !tp.includes('-HEADLESS');
        });
        for (const g of globbed) {
          acc.push(g);
        }
      } else {
        acc.push(cur);
      }
      return acc;
    }, []);
}

console.log(isHeadless, JSON.stringify(args, null, 4));
if (isHeadless) {
  console.log('HEADLESS...');
  for (let i = 0; i < testPaths.length; i++) {
    testPaths[i] = testPaths[i].replace(
      'link-in-text-block.json',
      'link-in-text-block-HEADLESS.json'
    );
    testPaths[i] = testPaths[i].replace(
      'color-contrast.json',
      'color-contrast-HEADLESS.json'
    );
    testPaths[i] = testPaths[i].replace(
      'color-contrast-enhanced.json',
      'color-contrast-enhanced-HEADLESS.json'
    );
  }
}
console.log(JSON.stringify(testPaths, null, 4));

module.exports = function (config) {
  config.set({
    basePath: '../',
    singleRun: true,
    autoWatch: false,
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-spec-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      require('./integration/rules/preprocessor')
    ],
    frameworks: ['mocha', 'chai', 'sinon'],
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
      'test/testutils.js'
    ].concat(testPaths),
    proxies: {
      '/test': '/base/test',
      '/mock': '/base/test/mock',
      '/integration': '/base/test/integration',
      '/axe.js': '/base/axe.js'
    },
    browsers: ['ChromeHeadless'],
    reporters: ['spec'],
    specReporter: {
      failFast: true
    },
    preprocessors: {
      'test/integration/rules/**/*.json': ['integration']
    },
    client: {
      useIframe: false,
      mocha: {
        timeout: 10000,
        reporter: 'html'
      }
    },
    customLaunchers: {
      ChromeDebugging: {
        base: 'Chrome',
        flags: ['--remote-debugging-port=' + debugPort]
      }
    }
  });
};
