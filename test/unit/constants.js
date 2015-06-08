describe('dqre.constants', function () {
	'use strict';

	it('should create an object', function () {
		assert.isObject(dqre.constants);
	});
	describe('ruleResult', function () {

		it('should be an object', function () {
			assert.isObject(dqre.constants.result);
		});

		it('should have PASS', function () {
			assert.equal(dqre.constants.result.PASS, 'PASS');
		});

		it('should have FAIL', function () {
			assert.equal(dqre.constants.result.FAIL, 'FAIL');
		});

		it('should have NA', function () {
			assert.equal(dqre.constants.result.NA, 'NA');
		});
	});
});
