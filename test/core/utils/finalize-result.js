describe('axe.utils.finalizeRuleResult', function() {
	'use strict';

	it('should be a function', function() {
		assert.isFunction(axe.utils.finalizeRuleResult);
	});

	it('returns the first param object', function() {
		var goingIn = {
			nodes: []
		};
		var comingOut = axe.utils.finalizeRuleResult(goingIn);

		assert.equal(goingIn, comingOut);
	});
});
