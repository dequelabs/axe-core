/* global module, asyncTest, expect, start, document, axe */

module('axe');

asyncTest('should report that good HTML is good', function (assert) {
	var n = document.getElementById('working');
	expect(1);
	axe.run(n, function (err, result) {
		assert.equal(err, null);
		assert.equal(result.violations.length, 0);
		start();
	});
});

asyncTest('should report that bad HTML is bad', function (assert) {
	var n = document.getElementById('broken');
	expect(1);
	axe.run(n, function (err, result) {
		assert.equal(err, null);
		assert.equal(result.violations.length, 1);
		start();
	});
});
