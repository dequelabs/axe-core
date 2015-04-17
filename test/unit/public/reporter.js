describe('dqre.reporter', function () {
	'use strict';

	it('should add reporter with given name', function () {
		dqre.reporter('bob', 'joe');
		assert.equal(window.reporters.bob, 'joe');
	});

	describe('defaultReporter', function () {

		it('should add set defaultReporter if true', function () {
			dqre.reporter('bob', 'joe', true);
			assert.equal(window.reporters.bob, 'joe');
			assert.equal(window.defaultReporter, 'joe');
		});

		it('should clobber any previous default reporter', function () {
			dqre.reporter('bob', 'joe', true);
			dqre.reporter('sally', 'sue', true);
			assert.equal(window.defaultReporter, 'sue');

		});
	});
});
