/* global describe, it, expect, dqre, document */

describe('dqre', function () {
	'use strict';

	document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend',
		'<div id="working">' +
			'<label for="has-label">Label for this text field.</label>' +
			'<input type="text" id="has-label">' +
		'</div>' +
		'<div id="broken">' +
			'<p>Not a label</p><input type="text" id="no-label">' +
		'</div>');

	it('should report that good HTML is good', function () {
		var n = document.getElementById('working');
		dqre.a11yCheck(n, null, function (result) {
			expect(result.violations.length).toBe(0);
		});
	});

	it('should report that bad HTML is bad', function () {
		var n = document.getElementById('broken');
		dqre.a11yCheck(n, null, function (result) {
			expect(result.violations.length).toBe(1);
		});
	});
});

