describe('frame-title', function() {
	it('should pass aria-label check', function() {
		var results = axe.runVirtualRule('frame-title', {
			nodeName: 'iframe',
			attributes: {
				'aria-label': 'foobar'
			}
		});

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should incomplete aria-labelledby check', function() {
		var results = axe.runVirtualRule('frame-title', {
			nodeName: 'iframe',
			attributes: {
				'aria-labelledby': 'foobar'
			}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 1);
	});

	it('should pass non-empty-title check', function() {
		var results = axe.runVirtualRule('frame-title', {
			nodeName: 'iframe',
			attributes: {
				title: 'foobar'
			}
		});

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should pass role-presentation check', function() {
		var results = axe.runVirtualRule('frame-title', {
			nodeName: 'iframe',
			attributes: {
				role: 'presentation'
			}
		});

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should pass role-none check', function() {
		var results = axe.runVirtualRule('frame-title', {
			nodeName: 'iframe',
			attributes: {
				role: 'none'
			}
		});

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should fail aria-label check', function() {
		var results = axe.runVirtualRule('frame-title', {
			nodeName: 'iframe',
			attributes: {
				'aria-label': ''
			}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 1);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should fail non-empty-title check', function() {
		var results = axe.runVirtualRule('frame-title', {
			nodeName: 'iframe',
			attributes: {
				title: ''
			}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 1);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should fail role-presentation/none checks', function() {
		var results = axe.runVirtualRule('frame-title', {
			nodeName: 'iframe',
			attributes: {
				role: 'image'
			}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 1);
		assert.lengthOf(results.incomplete, 0);
	});
});
