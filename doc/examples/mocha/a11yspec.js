/* global describe, it, expect, dqre, document */

describe('dqre', function () {
	'use strict';

	it('should report that good HTML is good', function () {
		var n = document.getElementById('working');
		dqre.a11yCheck(n, null, function (result) {
			expect(result.violations.length).to.equal(0);
		});
	});

	it('should report that bad HTML is bad', function () {
		var n = document.getElementById('broken');
		dqre.a11yCheck(n, null, function (result) {
			expect(result.violations.length).to.equal(1);
		});
	});
});

