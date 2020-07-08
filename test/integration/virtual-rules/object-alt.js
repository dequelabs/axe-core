describe('object-alt', function() {
	it('should pass for aria-label', function() {
		var results = axe.runVirtualRule('object-alt', {
			nodeName: 'object',
			attributes: {
				'aria-label': 'foobar'
			}
		});

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should incomplete for aria-labelledby', function() {
		var results = axe.runVirtualRule('object-alt', {
			nodeName: 'object',
			attributes: {
				'aria-labelledby': 'foobar'
			}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 1);
	});

	it('should pass for title', function() {
		var results = axe.runVirtualRule('object-alt', {
			nodeName: 'object',
			attributes: {
				title: 'foobar'
			}
		});

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should pass for role=presentation', function() {
		var results = axe.runVirtualRule('object-alt', {
			nodeName: 'object',
			attributes: {
				role: 'presentation'
			}
		});

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should pass for role=none', function() {
		var results = axe.runVirtualRule('object-alt', {
			nodeName: 'object',
			attributes: {
				role: 'none'
			}
		});

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should incomplete when no attributes are provided', function() {
		var results = axe.runVirtualRule('object-alt', {
			nodeName: 'object',
			attributes: {}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 1);
	});

	it('should incomplete for empty aria-label', function() {
		var results = axe.runVirtualRule('object-alt', {
			nodeName: 'object',
			attributes: {
				'aria-label': ''
			}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 1);
	});

	it('should incomplete for empty title', function() {
		var results = axe.runVirtualRule('object-alt', {
			nodeName: 'object',
			attributes: {
				title: ''
			}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 1);
	});
});
