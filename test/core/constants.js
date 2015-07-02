describe('axe.constants', function () {
	'use strict';

	it('should create an object', function () {
		assert.isObject(axe.constants);
	});
	describe('ruleResult', function () {

		it('should be an object', function () {
			assert.isObject(axe.constants.result);
		});

		it('should have PASS', function () {
			assert.equal(axe.constants.result.PASS, 'PASS');
		});

		it('should have FAIL', function () {
			assert.equal(axe.constants.result.FAIL, 'FAIL');
		});

		it('should have NA', function () {
			assert.equal(axe.constants.result.NA, 'NA');
		});
	});
});
