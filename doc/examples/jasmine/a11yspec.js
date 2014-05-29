/* global describe, it, expect, dqre, document */

describe("dqre", function() {
	'use strict';

	document.getElementsByTagName("body")[0].insertAdjacentHTML('beforeend', '<div id="working"><label for="labelfld">Label for this text field.</label><input type="text" id="labelfld"></div><div id="broken"><p>Not a label</p><input type="text" id="nolblfld"></div>');

	it("should be able to load a dom", function() {
		var n = document.createElement("div");
		expect(n).toBeTruthy();
	});

	it("should be able to see a11ycheck", function() {
		expect(dqre).not.toBe(undefined);
		expect(dqre.a11yCheck).not.toBe(undefined);
	});

	it("should report that good HTML is good", function() {
		var n = document.getElementById("working");
		dqre.a11yCheck(n, null, function(result) {
			expect(result.violations.length).toBe(0);
		});
	});

	it("should report that bad HTML is bad", function() {
		var n = document.getElementById("broken");
		dqre.a11yCheck(n, null, function(result) {
			expect(result.violations.length).toBe(1);
		});
	});
});

