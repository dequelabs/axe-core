
describe('frame-exclude test', function () {
	'use strict';

	var rulesToRun = ['frame-title', 'html-lang', 'document-title'];
	var config = { runOnly: { type: 'rule', values: rulesToRun } };
	before(function (done) {
		window.addEventListener('load', function () {
			done();
		});
	});

	describe('direct exclude', function () {
		var results;
		before(function (done) {
			axe.a11yCheck({ include: [document.body], exclude: [['iframe']] }, config, function (r) {
				results = r;
				done();
			});
		});

		it('should find no nodes', function () {
			assert.lengthOf(results.violations, 0, 'violations');
			assert.lengthOf(results.passes, 0, 'passes');
		});
	});

	describe('indirect exclude', function () {
		var results;
		before(function (done) {
			axe.a11yCheck({ include: [document.body], exclude: [['#frame']] }, config, function (r) {
				results = r;
				done();
			});
		});
		it('should find no nodes', function () {
			assert.lengthOf(results.violations, 0, 'violations');
			assert.lengthOf(results.passes, 0, 'passes');
		});
	});

	describe('direct include', function () {
		var results;
		before(function (done) {
			axe.a11yCheck({ include: [['#frame']] }, config, function (r) {
				results = r;
				done();
			});
		});
		it('should find a bunch of nodes', function () {
			assert.lengthOf(results.violations, 3, 'violations');
			assert.lengthOf(results.passes, 1, 'passes');
		});
	});
});
