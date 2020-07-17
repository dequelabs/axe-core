describe.only('label', function() {
	it('should not apply if input type is hidden', function() {
		var results = axe.runVirtualRule('label', {
			nodeName: 'input',
			attributes: {
				type: 'hidden'
			}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
		assert.lengthOf(results.inapplicable, 1);
	});

	it('should pass for aria-label', function() {
		var results = axe.runVirtualRule('label', {
			nodeName: 'input',
			attributes: {
				'aria-label': 'foobar'
			}
		});

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should pass for aria-label', function() {
		var results = axe.runVirtualRule('label', {
			nodeName: 'input',
			attributes: {
				'aria-label': 'foobar'
			}
		});

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should incomplete for aria-labelledby', function() {
		var results = axe.runVirtualRule('label', {
			nodeName: 'select',
			attributes: {
				'aria-labelledby': 'foobar'
			}
		});

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 1);
	});

	it('should pass for implicit label', function() {
		var node = new axe.SerialVirtualNode({
			nodeName: 'input'
		});
		var parent = new axe.SerialVirtualNode({
			nodeName: 'label'
		});
		var child = new axe.SerialVirtualNode({
			nodeName: '#text',
			nodeType: 3,
			nodeValue: 'foobar'
		});
		node.parent = parent;
		parent.children = [child, node];

		var results = axe.runVirtualRule('label', node);

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	// it('should pass for role=presentation', function() {
	//   var results = axe.runVirtualRule('label', {
	//     nodeName: 'input',
	//     attributes: {
	//       role: 'presentation'
	//     }
	//   });

	//   assert.lengthOf(results.passes, 1);
	//   assert.lengthOf(results.violations, 0);
	//   assert.lengthOf(results.incomplete, 0);
	// });

	// it('should pass for role=none', function() {
	//   var results = axe.runVirtualRule('label', {
	//     nodeName: 'input',
	//     attributes: {
	//       role: 'none'
	//     }
	//   });

	//   assert.lengthOf(results.passes, 1);
	//   assert.lengthOf(results.violations, 0);
	//   assert.lengthOf(results.incomplete, 0);
	// });

	// it('should fail when alt is missing', function() {
	//   var results = axe.runVirtualRule('label', {
	//     nodeName: 'input',
	//     attributes: {}
	//   });

	//   assert.lengthOf(results.passes, 0);
	//   assert.lengthOf(results.violations, 1);
	//   assert.lengthOf(results.incomplete, 0);
	// });

	// it('should fail when alt contains only whitespace', function() {
	//   var results = axe.runVirtualRule('label', {
	//     nodeName: 'input',
	//     attributes: {
	//       alt: ' \t   \n   '
	//     }
	//   });

	//   assert.lengthOf(results.passes, 0);
	//   assert.lengthOf(results.violations, 1);
	//   assert.lengthOf(results.incomplete, 0);
	// });

	// it('should fail when aria-label is empty', function() {
	//   var results = axe.runVirtualRule('label', {
	//     nodeName: 'input',
	//     attributes: {
	//       'aria-label': ''
	//     }
	//   });

	//   assert.lengthOf(results.passes, 0);
	//   assert.lengthOf(results.violations, 1);
	//   assert.lengthOf(results.incomplete, 0);
	// });

	// it('should fail when title is empty', function() {
	//   var results = axe.runVirtualRule('label', {
	//     nodeName: 'input',
	//     attributes: {
	//       title: ''
	//     }
	//   });

	//   assert.lengthOf(results.passes, 0);
	//   assert.lengthOf(results.violations, 1);
	//   assert.lengthOf(results.incomplete, 0);
	// });
});
