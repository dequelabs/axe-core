describe('dqre.constants', function () {
	'use strict';

	it('should create an object', function () {
		assert.isObject(dqre.constants);
	});
	describe('priority', function () {

		it('should be an object', function () {
			assert.isObject(dqre.constants.priority);
		});

		it('should have TRIVIAL', function () {
			assert.equal(dqre.constants.priority.TRIVIAL, 'TRIVIAL');
		});

		it('should have MINOR', function () {
			assert.equal(dqre.constants.priority.MINOR, 'MINOR');
		});

		it('should have MAJOR', function () {
			assert.equal(dqre.constants.priority.MAJOR, 'MAJOR');
		});

		it('should have CRITICAL', function () {
			assert.equal(dqre.constants.priority.CRITICAL, 'CRITICAL');
		});
	});
	describe('result', function () {

		it('should be an object', function () {
			assert.isObject(dqre.constants.result);
		});

		it('should have PASS', function () {
			assert.equal(dqre.constants.result.PASS, 'PASS');
		});

		it('should have FAIL', function () {
			assert.equal(dqre.constants.result.FAIL, 'FAIL');
		});

		it('should have WARN', function () {
			assert.equal(dqre.constants.result.WARN, 'WARN');
		});

		it('should have NA', function () {
			assert.equal(dqre.constants.result.NA, 'NA');
		});
	});
});
