describe('export', function () {
	'use strict';

	it('should publish a global `dqre` variable', function () {
		assert.isDefined(dqre);
	});
	it('should define version', function () {
		assert.equal(dqre.version, 'dev');
	});
});