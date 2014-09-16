/* global module, test, equal, document, dqre */

module('dqre');

asyncTest('should report that good HTML is good', function (assert) {
	var n = document.getElementById('working');
	expect(1);
	dqre.a11yCheck(n, null, function (result) {
		assert.equal(result.violations.length, 0);
		start();
	});
});

asyncTest('should report that bad HTML is bad', function (assert) {
	var n = document.getElementById('broken');
	expect(1);
	dqre.a11yCheck(n, null, function (result) {
		assert.equal(result.violations.length, 1);
		start();
	});
});

