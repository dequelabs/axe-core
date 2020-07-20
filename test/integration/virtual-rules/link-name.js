describe('link-name', function() {
	it('should pass for aria-label', function() {
		var node = new axe.SerialVirtualNode({
			nodeName: 'a',
			attributes: {
				href: '/foo.html',
				'aria-label': 'foobar'
			}
		});

		var results = axe.runVirtualRule('link-name', node);

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should incomplete for aria-labelledby', function() {
		var node = new axe.SerialVirtualNode({
			nodeName: 'a',
			attributes: {
				href: '/foo.html',
				'aria-labelledby': 'foobar'
			}
		});

		var results = axe.runVirtualRule('link-name', node);

		assert.lengthOf(results.passes, 0);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 1);
	});

	it('should pass for role=presentation', function() {
		var node = new axe.SerialVirtualNode({
			nodeName: 'a',
			attributes: {
				href: '/foo.html',
				tabindex: '-1',
				role: 'presentation'
			}
		});
		node.children = [];

		var results = axe.runVirtualRule('link-name', node);

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should pass for role=none', function() {
		var node = new axe.SerialVirtualNode({
			nodeName: 'a',
			attributes: {
				href: '/foo.html',
				tabindex: '-1',
				role: 'none'
			}
		});
		node.children = [];

		var results = axe.runVirtualRule('link-name', node);

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	it('should pass for visible text content', function() {
		var node = new axe.SerialVirtualNode({
			nodeName: 'span',
			attributes: {
				role: 'link'
			}
		});
		var child = new axe.SerialVirtualNode({
			nodeName: '#text',
			nodeType: 3,
			nodeValue: 'foobar'
		});
		node.children = [child];

		var results = axe.runVirtualRule('link-name', node);

		assert.lengthOf(results.passes, 1);
		assert.lengthOf(results.violations, 0);
		assert.lengthOf(results.incomplete, 0);
	});

	//   // children are required since titleText comes after subtree text
	//   // in accessible name calculation
	//   node.children = [];
	//   node.parent = parent;
	//   parent.children = [node];

	//   var results = axe.runVirtualRule('link-name', node);

	//   assert.lengthOf(results.passes, 1);
	//   assert.lengthOf(results.violations, 0);
	//   assert.lengthOf(results.incomplete, 0);
	// });

	// it('should pass for title element', function() {
	//   var node = new axe.SerialVirtualNode({
	//     nodeName: 'a',
	//     attributes: {
	//       role: 'img'
	//     }
	//   });
	//   var title = new axe.SerialVirtualNode({
	//     nodeName: 'title'
	//   });
	//   var text = new axe.SerialVirtualNode({
	//     nodeName: '#text',
	//     nodeType: 3,
	//     nodeValue: 'foobar'
	//   });

	//   title.children = [text];
	//   title.parent = node;
	//   node.children = [title];

	//   var results = axe.runVirtualRule('link-name', node);

	//   assert.lengthOf(results.passes, 1);
	//   assert.lengthOf(results.violations, 0);
	//   assert.lengthOf(results.incomplete, 0);
	// });

	// it('should incomplete when aria-label and children are missing', function() {
	//   var node = new axe.SerialVirtualNode({
	//     nodeName: 'a',
	//     attributes: {
	//       role: 'img'
	//     }
	//   });

	//   var results = axe.runVirtualRule('link-name', node);

	//   assert.lengthOf(results.passes, 0);
	//   assert.lengthOf(results.violations, 0);
	//   assert.lengthOf(results.incomplete, 1);
	// });

	// it('should fail when aria-label contains only whitespace', function() {
	//   var node = new axe.SerialVirtualNode({
	//     nodeName: 'a',
	//     attributes: {
	//       role: 'img',
	//       'aria-label': ' \t   \n   '
	//     }
	//   });
	//   node.children = [];

	//   var results = axe.runVirtualRule('link-name', node);

	//   assert.lengthOf(results.passes, 0);
	//   assert.lengthOf(results.violations, 1);
	//   assert.lengthOf(results.incomplete, 0);
	// });

	// it('should fail when aria-label is empty', function() {
	//   var node = new axe.SerialVirtualNode({
	//     nodeName: 'a',
	//     attributes: {
	//       role: 'img',
	//       'aria-label': ''
	//     }
	//   });
	//   node.children = [];

	//   var results = axe.runVirtualRule('link-name', node);

	//   assert.lengthOf(results.passes, 0);
	//   assert.lengthOf(results.violations, 1);
	//   assert.lengthOf(results.incomplete, 0);
	// });

	// it('should fail when title is empty', function() {
	//   var node = new axe.SerialVirtualNode({
	//     nodeName: 'a',
	//     attributes: {
	//       role: 'img',
	//       title: ''
	//     }
	//   });
	//   node.children = [];

	//   var results = axe.runVirtualRule('link-name', node);

	//   assert.lengthOf(results.passes, 0);
	//   assert.lengthOf(results.violations, 1);
	//   assert.lengthOf(results.incomplete, 0);
	// });

	// it('should incomplete when title element has missing children', function() {
	//   var node = new axe.SerialVirtualNode({
	//     nodeName: 'a',
	//     attributes: {
	//       role: 'img'
	//     }
	//   });
	//   var title = new axe.SerialVirtualNode({
	//     nodeName: 'title'
	//   });

	//   title.parent = node;
	//   node.children = [title];

	//   var results = axe.runVirtualRule('link-name', node);

	//   assert.lengthOf(results.passes, 0);
	//   assert.lengthOf(results.violations, 0);
	//   assert.lengthOf(results.incomplete, 1);
	// });
});
