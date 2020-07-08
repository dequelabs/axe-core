describe('input-image-alt', function() {
	it('should pass non-empty-alt check', function() {
		var results = axe.runVirtualRule('input-image-alt', {
			nodeName: 'input',
			attributes: {
				type: 'image',
				alt: 'foobar'
			}
		});

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should pass aria-label check', function() {
		var results = axe.runVirtualRule('input-image-alt', {
			nodeName: 'input',
			attributes: {
				type: 'image',
				'aria-label': 'foobar'
			}
		});

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should incomplete aria-labelledby check', function() {
		var results = axe.runVirtualRule('input-image-alt', {
			nodeName: 'input',
			attributes: {
				type: 'image',
				'aria-labelledby': 'foobar'
			}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 1);
	});

	it('should pass non-empty-title check', function() {
		var results = axe.runVirtualRule('image-alt', {
			nodeName: 'img',
			attributes: {
				title: 'foobar'
			}
		});

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should fail non-empty-alt check', function() {
		var results = axe.runVirtualRule('input-image-alt', {
			nodeName: 'input',
			attributes: {
				type: 'image',
				alt: ''
			}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 1);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should fail has-alt check', function() {
		var results = axe.runVirtualRule('input-image-alt', {
			nodeName: 'input',
			attributes: {
				type: 'image'
			}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 1);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should fail aria-label check', function() {
		var results = axe.runVirtualRule('input-image-alt', {
			nodeName: 'input',
			attributes: {
				type: 'image',
				'aria-label': ''
			}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 1);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should fail non-empty-title check', function() {
		var results = axe.runVirtualRule('input-image-alt', {
			nodeName: 'input',
			attributes: {
				type: 'image',
				title: ''
			}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 1);
		assert.lengthOf(results.incomplete, 0);
	});
});
