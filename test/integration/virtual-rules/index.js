describe('virtual rules', function() {
	describe('checks', function() {
		describe('autocomplete-valid', function() {
			it('should pass', function() {
				var results = axe.runVirtualRule(
					'autocomplete-valid',
					new axe.SerialVirtualNode({
						nodeName: 'input',
						attributes: {
							type: 'text',
							autocomplete: 'country-name'
						}
					})
				);

				assert.lengthOf(results.passes, 1);
				assert.lengthOf(results.violations, 0);
				assert.lengthOf(results.incomplete, 0);
			});

			it('should fail', function() {
				var results = axe.runVirtualRule(
					'autocomplete-valid',
					new axe.SerialVirtualNode({
						nodeName: 'input',
						attributes: {
							type: 'text',
							autocomplete: 'foobar'
						}
					})
				);

				assert.lengthOf(results.passes, 0);
				assert.lengthOf(results.violations, 1);
				assert.lengthOf(results.incomplete, 0);
			});
		});

		describe('autocomplete-appropriate', function() {
			it('should pass', function() {
				var results = axe.runVirtualRule(
					'autocomplete-valid',
					new axe.SerialVirtualNode({
						nodeName: 'input',
						attributes: {
							type: 'text',
							autocomplete: 'email'
						}
					})
				);

				assert.lengthOf(results.passes, 1);
				assert.lengthOf(results.violations, 0);
				assert.lengthOf(results.incomplete, 0);
			});

			it('should fail', function() {
				var results = axe.runVirtualRule(
					'autocomplete-valid',
					new axe.SerialVirtualNode({
						nodeName: 'input',
						attributes: {
							type: 'color',
							autocomplete: 'email'
						}
					})
				);

				assert.lengthOf(results.passes, 0);
				assert.lengthOf(results.violations, 1);
				assert.lengthOf(results.incomplete, 0);
			});
		});

		describe('has-alt', function() {
			it('should pass', function() {
				var results = axe.runVirtualRule(
					'image-alt',
					new axe.SerialVirtualNode({
						nodeName: 'img',
						attributes: {
							alt: 'foobar'
						}
					})
				);

				assert.lengthOf(results.passes, 1);
				assert.lengthOf(results.violations, 0);
				assert.lengthOf(results.incomplete, 0);
			});

			it('should fail', function() {
				var results = axe.runVirtualRule(
					'image-alt',
					new axe.SerialVirtualNode({
						nodeName: 'img',
						attributes: {}
					})
				);

				assert.lengthOf(results.passes, 0);
				assert.lengthOf(results.violations, 1);
				assert.lengthOf(results.incomplete, 0);
			});
		});

		describe('aria-label', function() {
			it('should pass', function() {
				var results = axe.runVirtualRule(
					'image-alt',
					new axe.SerialVirtualNode({
						nodeName: 'img',
						attributes: {
							'aria-label': 'foobar'
						}
					})
				);

				assert.lengthOf(results.passes, 1);
				assert.lengthOf(results.violations, 0);
				assert.lengthOf(results.incomplete, 0);
			});

			it('should fail', function() {
				var results = axe.runVirtualRule(
					'image-alt',
					new axe.SerialVirtualNode({
						nodeName: 'img',
						attributes: {
							'aria-label': ''
						}
					})
				);

				assert.lengthOf(results.passes, 0);
				assert.lengthOf(results.violations, 1);
				assert.lengthOf(results.incomplete, 0);
			});
		});

		describe('aria-labelledby', function() {
			it('should incomplete', function() {
				var results = axe.runVirtualRule(
					'image-alt',
					new axe.SerialVirtualNode({
						nodeName: 'img',
						attributes: {
							'aria-labelledby': 'foobar'
						}
					})
				);

				assert.lengthOf(results.passes, 0);
				assert.lengthOf(results.violations, 0);
				assert.lengthOf(results.incomplete, 1);
			});
		});

		describe('non-empty-title', function() {
			it('should pass', function() {
				var results = axe.runVirtualRule(
					'image-alt',
					new axe.SerialVirtualNode({
						nodeName: 'img',
						attributes: {
							title: 'foobar'
						}
					})
				);

				assert.lengthOf(results.passes, 1);
				assert.lengthOf(results.violations, 0);
				assert.lengthOf(results.incomplete, 0);
			});

			it('should fail', function() {
				var results = axe.runVirtualRule(
					'image-alt',
					new axe.SerialVirtualNode({
						nodeName: 'img',
						attributes: {
							title: ''
						}
					})
				);

				assert.lengthOf(results.passes, 0);
				assert.lengthOf(results.violations, 1);
				assert.lengthOf(results.incomplete, 0);
			});
		});

		describe('role-presentation', function() {
			it('should pass', function() {
				var results = axe.runVirtualRule(
					'image-alt',
					new axe.SerialVirtualNode({
						nodeName: 'img',
						attributes: {
							role: 'presentation'
						}
					})
				);

				assert.lengthOf(results.passes, 1);
				assert.lengthOf(results.violations, 0);
				assert.lengthOf(results.incomplete, 0);
			});

			it('should fail', function() {
				var results = axe.runVirtualRule(
					'image-alt',
					new axe.SerialVirtualNode({
						nodeName: 'img',
						attributes: {
							role: 'text'
						}
					})
				);

				assert.lengthOf(results.passes, 0);
				assert.lengthOf(results.violations, 1);
				assert.lengthOf(results.incomplete, 0);
			});
		});

		describe('role-none', function() {
			it('should pass', function() {
				var results = axe.runVirtualRule(
					'image-alt',
					new axe.SerialVirtualNode({
						nodeName: 'img',
						attributes: {
							role: 'none'
						}
					})
				);

				assert.lengthOf(results.passes, 1);
				assert.lengthOf(results.violations, 0);
				assert.lengthOf(results.incomplete, 0);
			});

			it('should fail', function() {
				var results = axe.runVirtualRule(
					'image-alt',
					new axe.SerialVirtualNode({
						nodeName: 'img',
						attributes: {
							role: 'text'
						}
					})
				);

				assert.lengthOf(results.passes, 0);
				assert.lengthOf(results.violations, 1);
				assert.lengthOf(results.incomplete, 0);
			});
		});

		describe('alt-space-value', function() {
			it('should fail', function() {
				var results = axe.runVirtualRule(
					'image-alt',
					new axe.SerialVirtualNode({
						nodeName: 'img',
						attributes: {
							alt: '     '
						}
					})
				);

				assert.lengthOf(results.passes, 0);
				assert.lengthOf(results.violations, 1);
				assert.lengthOf(results.incomplete, 0);
			});
		});

		describe('non-empty-alt', function() {
			it('should pass', function() {
				var results = axe.runVirtualRule(
					'input-image-alt',
					new axe.SerialVirtualNode({
						nodeName: 'input',
						attributes: {
							type: 'image',
							alt: 'foobar'
						}
					})
				);

				assert.lengthOf(results.passes, 1);
				assert.lengthOf(results.violations, 0);
				assert.lengthOf(results.incomplete, 0);
			});

			it('should fail', function() {
				var results = axe.runVirtualRule(
					'input-image-alt',
					new axe.SerialVirtualNode({
						nodeName: 'input',
						attributes: {
							type: 'image',
							alt: ''
						}
					})
				);

				assert.lengthOf(results.passes, 0);
				assert.lengthOf(results.violations, 1);
				assert.lengthOf(results.incomplete, 0);
			});
		});
	});
});
