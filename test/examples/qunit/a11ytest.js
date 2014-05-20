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

test("should be able to run a11yCheck", function() {
	var n = document.createElement("div");
	dqre.configure(dqreRules);
	dqre.a11yCheck(n, null, function() {
		ok(true);
	});
});

