describe('object-alt', function() {
	it('should incomplete has-visible-text check', function() {
		var results = axe.runVirtualRule('object-alt', {
			nodeName: 'object',
			attributes: {}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 1);
	});

	it('should pass aria-label check', function() {
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

	it('should incomplete aria-labelledby check', function() {
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

	it('should pass non-empty-title check', function() {
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

	it('should pass role-presentation check', function() {
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

	it('should pass role-none check', function() {
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
});
