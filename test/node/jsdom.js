var axe = require('../../');
var jsdom = require('jsdom');
var assert = require('assert');

var domStr =
	'<!DOCTYPE html>' +
	'<html lang="en">' +
	'<head>' +
	'<meta charset="UTF-8">' +
	'<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
	'<title>Document</title>' +
	'</head>' +
	'<body>' +
	'Hello' +
	'</body>' +
	'</html>';

describe('jsdom axe-core', function() {
	it('should run without setting globals', function(done) {
		var dom = new jsdom.JSDOM(domStr);

		axe
			.run(dom.window.document.documentElement, {
				rules: { 'color-contrast': { enabled: false } }
			})
			.then(function(results) {
				assert.equal(results.violations.length, 2);
				done();
			});
	});

	it('should unset globals so it can run with a new set of globals', function(done) {
		var dom = new jsdom.JSDOM(domStr);

		axe
			.run(dom.window.document.documentElement, {
				rules: { 'color-contrast': { enabled: false } }
			})
			.then(function(results) {
				assert.equal(results.violations.length, 2);

				var dom = new jsdom.JSDOM(domStr);

				axe
					.run(dom.window.document.documentElement, {
						rules: { 'color-contrast': { enabled: false } }
					})
					.then(function(results) {
						assert.equal(results.violations.length, 2);
						done();
					});
			});
	});
});
