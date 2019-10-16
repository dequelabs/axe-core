var path = require('path');
var fs = require('fs');
var extRegex = /\.json$/;
var template = fs.readFileSync(
	path.join(__dirname, 'integration-template.js'),
	'utf-8'
);

var createIntegrationPreprocessor = function(logger) {
	var log = logger.create('preprocessor.integration');

	return function(content, file, done) {
		try {
			log.debug('Processing "%s".', file.originalPath);
			file.path = file.originalPath.replace(extRegex, '.js');

			var htmlpath = file.originalPath.replace(extRegex, '.html');
			var html = fs.readFileSync(htmlpath, 'utf-8');
			var test = JSON.parse(content);
			test.content = html;

			var result = template.replace('{}/*test*/', JSON.stringify(test));

			// console.log('test:', test);
			// console.log('content:', content);
			// console.log('result:', result);

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
