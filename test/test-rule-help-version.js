var https = require('https');
var path = require('path');
var assert = require('assert');
var packageJSON = require(path.join(__dirname, '../package.json'));

var version = packageJSON.version.substr(
	0,
	packageJSON.version.lastIndexOf('.')
);

it('latest axe version rule help docs should be active', function(done) {
	https.get('https://dequeuniversity.com/rules/axe/' + version, function(res) {
		assert(res.statusCode >= 200 && res.statusCode <= 299);
		done();
	});
});
