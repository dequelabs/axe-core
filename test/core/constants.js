describe('axe.constants', function () {
	'use strict';

	it('should create an object', function () {
		assert.isObject(axe.constants);
	});

	it('should have a results array', function () {
		assert.isArray(axe.constants.results);
	});

	it('should have PASS', function () {
		assert.equal(axe.constants.PASS, 'passed');
	});

	it('should have FAIL', function () {
		assert.equal(axe.constants.FAIL, 'failed');
	});

	it('should have NA', function () {
		assert.equal(axe.constants.NA, 'inapplicable');
	});

	it('should have CANTTELL', function () {
		assert.equal(axe.constants.CANTTELL, 'cantTell');
	});

	it('should have priorities for results', function () {
		assert.equal(axe.constants.NA_PRIO, 0);
	});

	it('should have groups for results', function () {
		assert.equal(axe.constants.FAIL_GROUP, 'violations');
	});

});
