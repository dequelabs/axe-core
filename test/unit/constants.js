describe('dqre.constants', function () {
	'use strict';

	it('should create an object', function () {
		assert.isObject(dqre.constants);
	});
	describe('impact', function () {

		it('should be an object', function () {
			assert.isObject(dqre.constants.impact);
		});

		it('should have TRIVIAL', function () {
			assert.equal(dqre.constants.impact.TRIVIAL, 'TRIVIAL');
		});

		it('should have MINOR', function () {
			assert.equal(dqre.constants.impact.MINOR, 'MINOR');
		});

		it('should have MAJOR', function () {
			assert.equal(dqre.constants.impact.MAJOR, 'MAJOR');
		});

		it('should have CRITICAL', function () {
			assert.equal(dqre.constants.impact.CRITICAL, 'CRITICAL');
		});
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
	describe('certainty', function () {

		it('should be an object', function () {
			assert.isObject(dqre.constants.certainty);
		});

		it('should have DEFINITE', function () {
			assert.equal(dqre.constants.certainty.DEFINITE, 'DEFINITE');
		});

		it('should have POTENTIAL', function () {
			assert.equal(dqre.constants.certainty.POTENTIAL, 'POTENTIAL');
		});

		it('should have FALSEPOSITIVE', function () {
			assert.equal(dqre.constants.certainty.FALSEPOSITIVE, 'FALSEPOSITIVE');
		});
	});
	describe('type', function () {

		it('should be an object', function () {
			assert.isObject(dqre.constants.type);
		});

		it('should have PASS', function () {
			assert.equal(dqre.constants.type.PASS, 'PASS');
		});

		it('should have FAIL', function () {
			assert.equal(dqre.constants.type.FAIL, 'FAIL');
		});
	});
});
