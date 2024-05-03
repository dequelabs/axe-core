let path = require('path');
let fs = require('fs');
let extRegex = /\.json$/;
let template = fs.readFileSync(path.join(__dirname, 'runner.js'), 'utf-8');

/**
 * Turn each rule.json integration test JSON into a js file using
 * the runner.js script. This allow us to load the JSON files in
 * the karma config and they'll run as js files.
 */
let createIntegrationPreprocessor = function (logger) {
  let log = logger.create('preprocessor.integration');

  return function (content, file, done) {
    try {
      log.debug('Processing "%s".', file.originalPath);
      file.path = file.originalPath.replace(extRegex, '.js');

      // turn the json file into the a test file using the js test template
      // and add the test data to it
      let htmlpath = file.originalPath.replace(extRegex, '.html');
      let html = fs.readFileSync(htmlpath, 'utf-8');
      try {
        JSON.parse(content);
      } catch (e) {
        throw new Error('Unable to parse content of ' + file.originalPath);
      }
      test.content = html;

      let result = template.replace('{}; /*tests*/', JSON.stringify(test));

      done(null, result);
    } catch (e) {
      console.log('e:', e);
      done(e, null);
    }
  };
};

createIntegrationPreprocessor.$inject = ['logger'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:integration': ['factory', createIntegrationPreprocessor]
};
