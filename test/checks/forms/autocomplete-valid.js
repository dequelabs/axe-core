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

	var _isValidAutocomplete;
	beforeEach(function() {
		axe._tree = undefined;
		_isValidAutocomplete = axe.commons.text.isValidAutocomplete;
	});

	afterEach(function() {
		axe.commons.text.isValidAutocomplete = _isValidAutocomplete;
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('passes autocomplete attribute to text.isValidAutocomplete', function() {
		var params = checkSetup('<input autocomplete="foo" id="target" />');
		var called = false;
		axe.commons.text.isValidAutocomplete = function(arg1) {
			assert.equal(arg1, 'foo');
			called = true;
		};
		evaluate.apply(checkContext, params);
		assert.isTrue(called);
	});

	it('passes options to text.isValidAutocomplete', function() {
		var options = { foo: 'bar' };
		var params = checkSetup(
			'<input autocomplete="foo" id="target" />',
			options
		);
		var called = false;
		axe.commons.text.isValidAutocomplete = function(_, arg2) {
			assert.equal(arg2, options);
			called = true;
		};
		evaluate.apply(checkContext, params);
		assert.isTrue(called);
	});

	it('returns the outcome of text.isValidAutocomplete', function() {
		var params1 = checkSetup(
			'<input autocomplete="badvalue" id="target" />',
			options
		);
		assert.isFalse(_isValidAutocomplete('badvalue'));
		assert.isFalse(evaluate.apply(checkContext, params1));

		var params2 = checkSetup(
			'<input autocomplete="email" id="target" />',
			options
		);
		assert.isTrue(_isValidAutocomplete('email'));
		assert.isTrue(evaluate.apply(checkContext, params2));
	});
});
