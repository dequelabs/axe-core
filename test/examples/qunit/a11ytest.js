/* global describe, it, expect, dqre, document */

module("dqre");
test("should be able to load a dom", function() {
	var n = document.createElement("div");
	ok(n);
});

test("should be able to see a11ycheck", function() {
	ok(dqre);
	ok(dqre.a11yCheck);
});

test("should report that good HTML is good", function() {
	var n = document.getElementById("working");
	dqre.configure(dqreRules);
	dqre.a11yCheck(n, null, function(result) {
		equal(result.violations.length, 0);
	});
});

test("should report that bad HTML is bad", function() {
	var n = document.getElementById("broken");
	dqre.configure(dqreRules);
	dqre.a11yCheck(n, null, function(result) {
		equal(result.violations.length, 1);
	});
});

