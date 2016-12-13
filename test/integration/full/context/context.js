describe('context test', function () {
	'use strict';

	var config = { runOnly: { type: 'rule', values: ['html-has-lang'] } };
	before(function (done) {
		var frame = document.getElementById('myframe');
		if (frame.contentWindow.document.readyState === 'complete') {
			setTimeout(function () {
				done();
			}, 1000);
		} else {
			frame.addEventListener('load', function () {
				setTimeout(function () {
					done();
				}, 1000);
			});
		}
	});


	describe('direct exclude', function () {

		describe('no include', function () {

			it('should find no violations given a selector array', function (done) {
				axe.run({ exclude: [['iframe']] }, config, function (err, results) {
					assert.isNull(err);
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'context.html has a lang attribute');
					done();
				});
			});

			it('should find one violation given a multi-level selector array', function (done) {
				axe.run({ exclude: [['iframe', 'iframe']] }, config, function (err, results) {
					assert.isNull(err);
					assert.lengthOf(results.violations, 1, 'violations');
					assert.lengthOf(results.violations[0].nodes, 1, 'level1.html; 2-a & 2-b excluded');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'context.html (main doc) not excluded');
					done();
				});
			});

			it('should find no violations given a direct reference', function (done) {
				axe.run({ exclude: [document.querySelector('iframe')] }, config, function (err, results) {
					assert.isNull(err);
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'context.html has a lang attribute');
					done();
				});
			});

			it('should find no violations given a NodeList', function (done) {
				axe.run({ exclude: document.getElementsByTagName('iframe') }, config, function (err, results) {
					assert.isNull(err);
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'context.html has a lang attribute');
					done();
				});
			});

		});

		describe('body include', function () {

			it('should find no violations given a selector array', function (done) {
				axe.run({ include: [document.body], exclude: [['iframe']] }, config, function (err, results) {
					assert.isNull(err);
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 0, 'passes');
					done();
				});
			});

			it('should find one violation given a multi-level selector array', function (done) {
				axe.run({ include: [document.body], exclude: [['iframe', 'iframe']] }, config, function (err, results) {
					assert.isNull(err);
					assert.lengthOf(results.violations, 1, 'violations');
					assert.lengthOf(results.passes, 0, 'passes');
					done();
				});
			});

			it('should find no violations given a direct reference', function (done) {
				axe.run({ include: [document.body], exclude: [document.querySelector('iframe')] }, config, function (err, results) {
					assert.isNull(err);
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 0, 'passes');
					done();
				});
			});

			it('should find no violations given a NodeList', function (done) {
				axe.run({ include: [document.body], exclude: document.getElementsByTagName('iframe') }, config, function (err, results) {
					assert.isNull(err);
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 0, 'passes');
					done();
				});
			});
		});

	});

	describe('indirect exclude', function () {
		it('should find no nodes', function (done) {
			axe.run({ include: [document.body], exclude: [['#myframe']] }, config, function (err, results) {
				assert.isNull(err);
				assert.lengthOf(results.violations, 0, 'violations');
				assert.lengthOf(results.passes, 0, 'passes');
				done();
			});
		});

		describe('no include', function () {

			it('should find no violations given a selector array', function (done) {
				axe.run({ exclude: [['#frame-container']] }, config, function (err, results) {
					assert.isNull(err);
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'context.html has a lang attribute');
					done();
				});
			});

			it('should find one violation given a multi-level selector array', function (done) {
				axe.run({ exclude: [['iframe', 'body']] }, config, function (err, results) {
					assert.isNull(err);
					assert.lengthOf(results.violations, 1, 'violations');
					assert.lengthOf(results.violations[0].nodes, 1, 'level1.html; 2-a & 2-b excluded');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'context.html (main doc) not excluded');
					done();
				});
			});

			it('should find no violations given a direct reference', function (done) {
				axe.run({ exclude: [document.querySelector('#frame-container')] }, config, function (err, results) {
					assert.isNull(err);
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'context.html has a lang attribute');
					done();
				});
			});

			it('should find no violations given a NodeList', function (done) {
				axe.run({ exclude: document.getElementsByTagName('div') }, config, function (err, results) {
					assert.isNull(err);
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 1, 'passes');
					assert.lengthOf(results.passes[0].nodes, 1, 'context.html has a lang attribute');
					done();
				});
			});
		});

		describe('body include', function () {

			it('should find no violations given a selector array', function (done) {
				axe.run({ include: [document.body], exclude: [['#frame-container']] }, config, function (err, results) {
					assert.isNull(err);
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 0, 'passes');
					done();
				});
			});

			it('should find one violation given a multi-level selector array', function (done) {
				axe.run({ include: [document.body], exclude: [['iframe', 'body']] }, config, function (err, results) {
					assert.isNull(err);
					assert.lengthOf(results.violations, 1, 'violations');
					assert.lengthOf(results.violations[0].nodes, 1, 'level1.html; 2-a & 2-b excluded');
					assert.lengthOf(results.passes, 0, 'passes');
					done();
				});
			});

			it('should find no violations given a direct reference', function (done) {
				axe.run({ include: [document.body], exclude: [document.querySelector('#frame-container')] }, config, function (err, results) {
					assert.isNull(err);
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 0, 'passes');
					done();
				});
			});

			it('should find no violations given a NodeList', function (done) {
				axe.run({ include: [document.body], exclude: document.getElementsByTagName('div') }, config, function (err, results) {
					assert.isNull(err);
					assert.lengthOf(results.violations, 0, 'violations');
					assert.lengthOf(results.passes, 0, 'passes');
					done();
				});
			});
		});
	});
	describe('direct include', function () {
		it('should find the frames given a context object', function (done) {
			axe.run({ include: [['#myframe']] }, config, function (err, results) {
				assert.isNull(err);
				assert.lengthOf(results.violations, 1, 'violations');
				assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
				assert.lengthOf(results.passes, 0, 'passes');
				done();
			});
		});
		it('should find the frames given a direct reference', function (done) {
			axe.run(document.getElementById('myframe'), config, function (err, results) {
				assert.isNull(err);
				assert.lengthOf(results.violations, 1, 'violations');
				assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
				assert.lengthOf(results.passes, 0, 'passes');
				done();
			});
		});
		it('should find the frames given a NodeList', function (done) {
			axe.run(document.getElementsByTagName('iframe'), config, function (err, results) {
				assert.isNull(err);
				assert.lengthOf(results.violations, 1, 'violations');
				assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
				assert.lengthOf(results.passes, 0, 'passes');
				done();
			});
		});
	});

	describe('indirect include', function () {
		it('should find the frames given context object with a node reference', function (done) {
			axe.run({ include: [document.body] }, config, function (err, results) {
				assert.isNull(err);
				assert.lengthOf(results.violations, 1, 'violations');
				assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
				assert.lengthOf(results.passes, 0, 'passes');
				done();
			});
		});
		it('should find the frames give a node', function (done) {
			axe.run(document.body, config, function (err, results) {
				assert.isNull(err);
				assert.lengthOf(results.violations, 1, 'violations');
				assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
				assert.lengthOf(results.passes, 0, 'passes');
				done();
			});
		});
		it('should find the frames give a NodeList', function (done) {
			axe.run(document.getElementsByTagName('body'), config, function (err, results) {
				assert.isNull(err);
				assert.lengthOf(results.violations, 1, 'violations');
				assert.lengthOf(results.violations[0].nodes, 3, 'violation nodes');
				assert.lengthOf(results.passes, 0, 'passes');
				done();
			});
		});
	});

});