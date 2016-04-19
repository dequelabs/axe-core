/* global describe, it, expect, axe, document */

describe('axe', function () {
	'use strict';

	it('should report that good HTML is good', function (done) {
		var n = document.getElementById('working');
		axe.run(n, function (err, result) {
			expect(err).to.be.null();
			expect(result.violations.length).to.equal(0);
			done();
		});
	});

	it('should report that bad HTML is bad', function (done) {
		var n = document.getElementById('broken');
		axe.run(n, function (err, result) {
			expect(err).to.be.null();
			expect(result.violations.length).to.equal(1);
			done();
		});
	});
});
