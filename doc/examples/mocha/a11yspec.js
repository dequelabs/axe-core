/* global describe, it, expect, dqre, document */

describe("dqre", function() {
	'use strict';

	it("should be able to load a dom", function() {
		var n = document.createElement("div");
		expect(n).not.to.be.an('undefined');
	});

	it("should be able to see a11ycheck", function() {
		expect(dqre).not.to.be.an('undefined');
		expect(dqre.a11yCheck).not.to.be.an('undefined');
	});

	it("should report that good HTML is good", function() {
		var n = document.getElementById("working");
		dqre.a11yCheck(n, null, function(result) {
			expect(result.violations.length).to.equal(0);
		});
	});

	it("should report that bad HTML is bad", function() {
		var n = document.getElementById("broken");
		dqre.a11yCheck(n, null, function(result) {
			expect(result.violations.length).to.equal(1);
		});
	});
});

