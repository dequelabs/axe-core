
describe('context test', function () {
	'use strict';

	var config = { runOnly: { type: 'rule', values: ['document-title'] } };
	before(function (done) {
		window.addEventListener('load', function () {
			done();
		});
	});

	describe('direct exclude', function () {

		describe('no include', function () {

			it('should find no violations given a selector array', function (done) {
				axe.a11yCheck({ exclude: [['iframe']] }, config, function (results) {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'context.html has a title');
					done();
				});
			});

			it('should find one violation given a multi-level selector array', function (done) {
				axe.a11yCheck({ exclude: [['iframe', 'iframe']] }, config, function (results) {
					assert.lengthOf(results.violations, 1, 'violations');
					assert.lengthOf(results.violations[0].nodes, 1, 'level1.html; 2-a & 2-b excluded');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'context.html (main doc) not excluded');
					done();
				});
			});

			it('should find no violations given a direct reference', function (done) {
				axe.a11yCheck({ exclude: [document.querySelector('iframe')] }, config, function (results) {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'context.html has a title');
					done();
				});
			});

			it('should find no violations given a NodeList', function (done) {
				axe.a11yCheck({ exclude: document.getElementsByTagName('iframe') }, config, function (results) {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'context.html has a title');
					done();
				});
			});
		});

		describe('body include', function () {

			it('should find no violations given a selector array', function (done) {
				axe.a11yCheck({ include: [document.body], exclude: [['iframe']] }, config, function (results) {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 0, 'passes');
					done();
				});
			});

			it('should find one violation given a multi-level selector array', function (done) {
				axe.a11yCheck({ include: [document.body], exclude: [['iframe', 'iframe']] }, config, function (results) {
					assert.lengthOf(results.violations, 1, 'violations');
					assert.lengthOf(results.passes, 0, 'passes');
					done();
				});
			});

			it('should find no violations given a direct reference', function (done) {
				axe.a11yCheck({ include: [document.body], exclude: [document.querySelector('iframe')] }, config, function (results) {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 0, 'passes');
					done();
				});
			});

			it('should find no violations given a NodeList', function (done) {
				axe.a11yCheck({ include: [document.body], exclude: document.getElementsByTagName('iframe') }, config, function (results) {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 0, 'passes');
					done();
				});
			});
		});

	});

	describe('indirect exclude', function () {
		it('should find no nodes', function (done) {
			axe.a11yCheck({ include: [document.body], exclude: [['#frame']] }, config, function (results) {
				assert.lengthOf(results.violations, 0, 'violations');
				assert.lengthOf(results.passes, 0, 'passes');
				done();
			});
		});

		describe('no include', function () {

			it('should find no violations given a selector array', function (done) {
				axe.a11yCheck({ exclude: [['#frame-container']] }, config, function (results) {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'context.html has a title');
					done();
				});
			});

			it('should find one violation given a multi-level selector array', function (done) {
				axe.a11yCheck({ exclude: [['iframe', 'body']] }, config, function (results) {
					assert.lengthOf(results.violations, 1, 'violations');
					assert.lengthOf(results.violations[0].nodes, 1, 'level1.html; 2-a & 2-b excluded');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'context.html (main doc) not excluded');
					done();
				});
			});

			it('should find no violations given a direct reference', function (done) {
				axe.a11yCheck({ exclude: [document.querySelector('#frame-container')] }, config, function (results) {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'context.html has a title');
					done();
				});
			});

			it('should find no violations given a NodeList', function (done) {
				axe.a11yCheck({ exclude: document.getElementsByTagName('div') }, config, function (results) {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'context.html has a title');
					done();
				});
			});
		});

		describe('body include', function () {

			it('should find no violations given a selector array', function (done) {
				axe.a11yCheck({ include: [document.body], exclude: [['#frame-container']] }, config, function (results) {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 0, 'passes');
					done();
				});
			});

			it('should find one violation given a multi-level selector array', function (done) {
				axe.a11yCheck({ include: [document.body], exclude: [['iframe', 'body']] }, config, function (results) {
					assert.lengthOf(results.violations, 1, 'violations');
					assert.lengthOf(results.violations[0].nodes, 1, 'level1.html; 2-a & 2-b excluded');
					assert.lengthOf(results.passes, 0, 'passes');
					done();
				});
			});

			it('should find no violations given a direct reference', function (done) {
				axe.a11yCheck({ include: [document.body], exclude: [document.querySelector('#frame-container')] }, config, function (results) {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 0, 'passes');
					done();
				});
			});

			it('should find no violations given a NodeList', function (done) {
				axe.a11yCheck({ include: [document.body], exclude: document.getElementsByTagName('div') }, config, function (results) {
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 0, 'passes');
					done();
				});
			});
		});
	});
	describe('direct include', function () {
		it('should find the frames given a context object', function (done) {
			axe.a11yCheck({ include: [['#frame']] }, config, function (results) {
				assert.lengthOf(results.violations, 1, 'violations');
				assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
				assert.lengthOf(results.passes, 0, 'passes');
				done();
			});
		});
		it('should find the frames given a direct reference', function (done) {
			axe.a11yCheck(document.getElementById('frame'), config, function (results) {
				assert.lengthOf(results.violations, 1, 'violations');
				assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
				assert.lengthOf(results.passes, 0, 'passes');
				done();
			});
		});
		it('should find the frames given a NodeList', function (done) {
			axe.a11yCheck(document.getElementsByTagName('iframe'), config, function (results) {
				assert.lengthOf(results.violations, 1, 'violations');
				assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
				assert.lengthOf(results.passes, 0, 'passes');
				done();
			});
		});
	});

	describe('indirect include', function () {
		it('should find the frames given context object with a node reference', function (done) {
			axe.a11yCheck({ include: [document.body] }, config, function (results) {
				assert.lengthOf(results.violations, 1, 'violations');
				assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
				assert.lengthOf(results.passes, 0, 'passes');
				done();
			});
		});
		it('should find the frames give a node', function (done) {
			axe.a11yCheck(document.body, config, function (results) {
				assert.lengthOf(results.violations, 1, 'violations');
				assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
				assert.lengthOf(results.passes, 0, 'passes');
				done();
			});
		});
		it('should find the frames give a NodeList', function (done) {
			axe.a11yCheck(document.getElementsByTagName('body'), config, function (results) {
				assert.lengthOf(results.violations, 1, 'violations');
				assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
				assert.lengthOf(results.passes, 0, 'passes');
				done();
			});
		});
	});

});
