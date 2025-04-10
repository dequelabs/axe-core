var path = require('path');
var fs = require('fs');
var extRegex = /\.json$/;
var template = fs.readFileSync(path.join(__dirname, 'runner.js'), 'utf-8');

/**
 * Turn each rule.json integration test JSON into a js file using
 * the runner.js script. This allow us to load the JSON files in
 * the karma config and they'll run as js files.
 */
var createIntegrationPreprocessor = function (logger) {
  var log = logger.create('preprocessor.integration');

  return function (content, file, done) {
    try {
      log.debug('Processing "%s".', file.originalPath);
      file.path = file.originalPath.replace(extRegex, '.js');

      // turn the json file into the a test file using the js test template
      // and add the test data to it
      var htmlpath = file.originalPath.replace(extRegex, '.html');
      var html = fs.readFileSync(htmlpath, 'utf-8');
      try {
        var test = JSON.parse(content);
      } catch {
        throw new Error('Unable to parse content of ' + file.originalPath);
      }
      test.content = html;

      var result = template.replace('{}; /*tests*/', JSON.stringify(test));

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
