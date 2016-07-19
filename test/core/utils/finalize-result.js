describe('axe.utils.finalizeRuleResult', function() {
	'use strict';

	var origAggregate;
	beforeEach(function() {
		origAggregate = axe.utils.aggregateRule;
	});

	afterEach(function () {
		axe.utils.aggregateRule = origAggregate;
	});

	it('should be a function', function() {
		assert.isFunction(axe.utils.finalizeRuleResult);
	});

	it('returns the first param object', function () {
		axe.utils.aggregateRule = function () {};

		var goingIn = {};
		var comingOut = axe.utils.finalizeRuleResult(goingIn);

		assert.equal(goingIn, comingOut);
	});

	it('passes the nodes property to utils.aggregateRule', function() {
		var isCalled = false;
		var nodes = [];
		axe.utils.aggregateRule = function (n) {
			assert.equal(n, nodes);
			isCalled = true;
		};
		axe.utils.finalizeRuleResult({ nodes: nodes });
		assert.ok(isCalled);
	});

	it('adds properties returned from utils.aggregateRule to the return value', function() {
		axe.utils.aggregateRule = function () {
			return {
				vulgaris:'magistralis'
			};
		};
		var out = axe.utils.finalizeRuleResult({});
		assert.equal(out.vulgaris, 'magistralis');
	});

});
