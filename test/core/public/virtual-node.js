describe('axe.VirtualNode', function() {
	'use strict';

	it('should return an object', function() {
		const node = new axe.VirtualNode('div');
		assert.equal(typeof node, 'object');
	});

	it('should have a nodeName', function() {
		const node = new axe.VirtualNode('div');
		assert.equal(node.nodeName, 'DIV');
	});

	it('should have a nodeType', function() {
		const node = new axe.VirtualNode('div');
		assert.equal(node.nodeType, 1);
	});

	it('should have attributes', function() {
		const node = new axe.VirtualNode('div');
		assert.equal(typeof node.attributes, 'object');
		assert.equal(node.attributes.length, 0);
	});

	it('should allow passing an attribute', function() {
		const node = new axe.VirtualNode('div', { id: 'myDiv' });
		assert.equal(node.attributes.length, 1);
		let id = node.attributes.id;
		assert.equal(node.attributes[0], id);
		assert.equal(typeof id, 'object');
		assert.equal(id.name, 'id');
		assert.equal(id.value, 'myDiv');
	});

	it('should allow passing multiple attributes', function() {
		const node = new axe.VirtualNode('button', {
			id: 'myButton',
			type: 'button',
			'aria-label': 'My Button',
			class: 'btn btn-primary'
		});
		assert.equal(node.attributes.length, 4);

		for (let i = 0; i < node.attributes.length; i++) {
			let attribute = node.attributes[i];
			assert.equal(attribute, node.attributes[attribute.name]);
		}
	});

	it('should have a tabindex', function() {
		const node = new axe.VirtualNode('div');
		assert.equal(node.tabIndex, -1);
	});

	it('should use the tabindex attribute if it exists', function() {
		const node = new axe.VirtualNode('div', { tabindex: 10 });
		assert.equal(node.tabIndex, 10);
	});

	describe('getAttribute', function() {
		it('should return the attribute value', function() {
			const node = new axe.VirtualNode('div', { id: 'myDiv' });
			assert.equal(node.getAttribute('id'), 'myDiv');
		});

		it('should return null if the attribute does not exist', function() {
			const node = new axe.VirtualNode('div', { id: 'myDiv' });
			assert.equal(node.getAttribute('tabindex'), null);
		});

		it('should return null if passed bad data', function() {
			const node = new axe.VirtualNode('div', { id: 'myDiv' });
			assert.equal(node.getAttribute(0), null);
			assert.equal(node.getAttribute(null), null);
			assert.equal(node.getAttribute([]), null);
			assert.equal(node.getAttribute({}), null);
			assert.equal(node.getAttribute(true), null);
		});
	});

	describe('hasAttribute', function() {
		it('should return true if the attribute exists', function() {
			const node = new axe.VirtualNode('div', { id: 'myDiv' });
			assert.isTrue(node.hasAttribute('id'));
		});

		it('should return false if the attribute does not exist', function() {
			const node = new axe.VirtualNode('div');
			assert.isFalse(node.hasAttribute('tabindex'));
		});

		it('should return false if passed bad data', function() {
			const node = new axe.VirtualNode('div', { id: 'myDiv' });
			assert.isFalse(node.hasAttribute(null));
			assert.isFalse(node.hasAttribute([]));
			assert.isFalse(node.hasAttribute({}));
			assert.isFalse(node.hasAttribute(true));
			assert.isFalse(node.hasAttribute(0));
		});
	});

	describe('hasAttributes', function() {
		it('should return true if the node has at least one attributes', function() {
			const node = new axe.VirtualNode('div', { id: 'myDiv' });
			assert.isTrue(node.hasAttributes());
		});

		it('should return false if the node has no attributes', function() {
			const node = new axe.VirtualNode('div');
			assert.isFalse(node.hasAttributes());
		});
	});

	describe('hasAttributes', function() {
		it('should return true if the node has at least one attributes', function() {
			const node = new axe.VirtualNode('div', { id: 'myDiv' });
			assert.isTrue(node.hasAttributes());
		});

		it('should return false if the node has no attributes', function() {
			const node = new axe.VirtualNode('div');
			assert.isFalse(node.hasAttributes());
		});
	});

	describe('matches', function() {
		let qsa = axe.utils.querySelectorAll;

		afterEach(function() {
			axe.utils.querySelectorAll = qsa;
		});

		it('should call axe.utils.querySelectorAll', function() {
			const node = new axe.VirtualNode('div', { id: 'myDiv' });
			let success = false;
			axe.utils.querySelectorAll = function() {
				success = true;
				return [];
			};
			node.matches('div');
			assert.isTrue(success);
		});

		it('should pass an axe virtual node with the node as the actualNode', function() {
			const node = new axe.VirtualNode('div', { id: 'myDiv' });
			axe.utils.querySelectorAll = function(virtualNode) {
				assert.equal(virtualNode.actualNode, node);
				return [];
			};
			node.matches('div');
		});

		it('should pass the selector', function() {
			const node = new axe.VirtualNode('div', { id: 'myDiv' });
			axe.utils.querySelectorAll = function(virtualNode, selector) {
				assert.equal(selector, '[id="myDiv"]');
				return [];
			};
			node.matches('[id="myDiv"]');
		});

		it('should return a boolean', function() {
			const node = new axe.VirtualNode('div', { id: 'myDiv' });
			axe.utils.querySelectorAll = function() {
				return [1];
			};
			let result = node.matches('[id="myDiv"]');
			assert.isTrue(result);
		});
	});

	describe('contains', function() {
		it('should return true if the node is equal', function() {
			const node = new axe.VirtualNode('div', { id: 'myDiv' });
			assert.isTrue(node.contains(node));
		});
	});

	describe('cloneNode', function() {
		it('should return itself', function() {
			const node = new axe.VirtualNode('div', { id: 'myDiv' });
			assert.equal(node, node.cloneNode());
		});
	});

	describe('outerHTML', function() {
		it('should be a function', function() {
			const node = new axe.VirtualNode('div', { id: 'myDiv' });
			assert.equal(typeof node.outerHTML, 'function');
		});
	});
});
