/* global module, test, equal, document, dqre */

module('dqre');

test('should report that good HTML is good', function () {
	var n = document.getElementById('working');
	dqre.a11yCheck(n, null, function (result) {
		equal(result.violations.length, 0);
	});
});

test('should report that bad HTML is bad', function () {
	var n = document.getElementById('broken');
	dqre.a11yCheck(n, null, function (result) {
		equal(result.violations.length, 1);
	});
});

