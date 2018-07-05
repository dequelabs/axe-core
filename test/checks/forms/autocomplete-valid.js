describe('autocomplete-valid', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var checkContext = axe.testUtils.MockCheckContext();
	var evaluate = checks['autocomplete-valid'].evaluate;

	var options = {
		standaloneTerms: ['standalone-term'],
		qualifiedTerms: ['qualified-term']
	};

	beforeEach(function() {
		axe._tree = undefined;
	});

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	function autocompleteCheckParams(arg, opt) {
		return checkSetup(
			'<input autocomplete="' + arg + '" id="target" />',
			opt || options
		);
	}

	it('returns true the only term is a valid autocomplete term', function() {
		var params = autocompleteCheckParams('standalone-term');
		assert.isTrue(evaluate.apply(checkContext, params));
	});

	it('returns false the only term is an invalid autocomplete term', function() {
		var params = autocompleteCheckParams('bad-term');
		assert.isFalse(evaluate.apply(checkContext, params));
	});

	it('returns true if section-* is used as the first term', function() {
		var params = autocompleteCheckParams('section-foo standalone-term');
		assert.isTrue(evaluate.apply(checkContext, params));
	});

	it('returns true if `shipping` or `billing` is used as the first term', function() {
		var params1 = autocompleteCheckParams('shipping standalone-term');
		assert.isTrue(evaluate.apply(checkContext, params1));

		var params2 = autocompleteCheckParams('billing standalone-term');
		assert.isTrue(evaluate.apply(checkContext, params2));
	});

	it('returns true if section-*  is used before `shipping` or `billing`', function() {
		var params = autocompleteCheckParams(
			'section-foo shipping standalone-term'
		);
		assert.isTrue(evaluate.apply(checkContext, params));
	});

	it('returns false if `shipping` or `billing` is used before section-*', function() {
		var params = autocompleteCheckParams(
			'shipping section-foo standalone-term'
		);
		assert.isFalse(evaluate.apply(checkContext, params));
	});

	it('returns true if "home", "work", "mobile", "fax" or "pager" is used before aqualifier', function() {
		['home', 'work', 'mobile', 'fax', 'pager'].forEach(function(qualifier) {
			var params = autocompleteCheckParams(qualifier + ' qualified-term');
			assert.isTrue(
				evaluate.apply(checkContext, params),
				'failed for ' + qualifier
			);
		});
	});

	it('returns false if "home", "work", "mobile", "fax" or "pager" is used before an inappropriate term', function() {
		['home', 'work', 'mobile', 'fax', 'pager'].forEach(function(qualifier) {
			var params = autocompleteCheckParams(qualifier + ' standalone-term');
			assert.isFalse(
				evaluate.apply(checkContext, params),
				'failed for ' + qualifier
			);
		});
	});

	describe('options.strictMode:false', function() {
		it('returns true if the last term is a valid autocomplete term', function() {
			var params = autocompleteCheckParams('do not care! valid-term', {
				looseTyped: true,
				standaloneTerms: ['valid-term']
			});
			assert.isTrue(evaluate.apply(checkContext, params));
		});

		it('returns false if the last term is an invalid autocomplete term', function() {
			var params = autocompleteCheckParams('shipping invalid', {
				looseTyped: true,
				standaloneTerms: ['valid-term']
			});
			assert.isFalse(evaluate.apply(checkContext, params));
		});
	});
});
