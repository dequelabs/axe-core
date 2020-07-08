describe('autocomplete-valid', function() {
	it('should pass autocomplete-valid check', function() {
		var results = axe.runVirtualRule('autocomplete-valid', {
			nodeName: 'input',
			attributes: {
				type: 'text',
				autocomplete: 'country-name'
			}
		});

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should pass autocomplete-appropriate check', function() {
		var results = axe.runVirtualRule('autocomplete-valid', {
			nodeName: 'input',
			attributes: {
				type: 'text',
				autocomplete: 'email'
			}
		});

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should fail autocomplete-valid check', function() {
		var results = axe.runVirtualRule('autocomplete-valid', {
			nodeName: 'input',
			attributes: {
				type: 'text',
				autocomplete: 'foobar'
			}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 1);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should fail autocomplete-appropriate check', function() {
		var results = axe.runVirtualRule('autocomplete-valid', {
			nodeName: 'input',
			attributes: {
				type: 'color',
				autocomplete: 'email'
			}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 1);
		assert.lengthOf(results.incomplete, 0);
	});
});
