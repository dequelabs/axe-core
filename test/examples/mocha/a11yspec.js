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

	it("should be able to run a11yCheck", function() {
		var n = document.createElement("div");
		dqre.configure(dqreRules);
		dqre.a11yCheck(n, null, function() {
			expect(true).to.be(true);
		});
	});
});

