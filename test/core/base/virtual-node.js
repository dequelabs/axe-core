/*global axe, VirtualNode */
describe('VirtualNode', function() {
	'use strict';
	var node;

	beforeEach(function() {
		node = document.createElement('div');
	});

	it('should be a function', function() {
		assert.isFunction(VirtualNode);
	});

	it('should accept two parameters', function() {
		assert.lengthOf(VirtualNode, 2);
	});

	describe('prototype', function() {
		it('should have public properties', function() {
			var vNode = new VirtualNode(node, 'foo');

			assert.equal(vNode.shadowId, 'foo');
			assert.typeOf(vNode.children, 'array');
			assert.equal(vNode.actualNode, node);
		});

		it('should abstract Node and Element APIs', function() {
			node.id = 'monkeys';
			var vNode = new VirtualNode(node);

			assert.equal(vNode.elementNodeType, 1);
			assert.equal(vNode.elementNodeName, 'div');
			assert.equal(vNode.elementId, 'monkeys');
		});

		it('should lowercase nodeName', function() {
			var node = {
				nodeName: 'FOOBAR'
			};
			var vNode = new VirtualNode(node);

			assert.equal(vNode.elementNodeName, 'foobar');
		});

		describe('hasClass', function() {
			it('should return true when the element has the class', function() {
				node.setAttribute('class', 'my-class');
				var vNode = new VirtualNode(node);

				assert.isTrue(vNode.hasClass('my-class'));
			});

			it('should return true when the element contains more than one class', function() {
				node.setAttribute('class', 'my-class a11y-focus visually-hidden');
				var vNode = new VirtualNode(node);

				assert.isTrue(vNode.hasClass('my-class'));
				assert.isTrue(vNode.hasClass('a11y-focus'));
				assert.isTrue(vNode.hasClass('visually-hidden'));
			});

			it('should return true for svg elements', function() {
				node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
				node.setAttribute('class', 'my-class');
				var vNode = new VirtualNode(node);

				assert.isTrue(vNode.hasClass('my-class'));
			});

			it('should return false when the element does not contain the class', function() {
				var vNode = new VirtualNode(node);

				assert.isFalse(vNode.hasClass('my-class'));
			});

			it('should return false when the element contains only part of the class', function() {
				node.setAttribute('class', 'my-class');
				var vNode = new VirtualNode(node);

				assert.isFalse(vNode.hasClass('class'));
			});

			it('should return false for text nodes', function() {
				node.textContent = 'hello';
				var vNode = new VirtualNode(node.firstChild);

				assert.isFalse(vNode.hasClass('my-class'));
			});

			it('should return false if className is not of type string', function() {
				var node = {
					nodeName: 'DIV',
					className: null
				};
				var vNode = new VirtualNode(node);

				assert.isFalse(vNode.hasClass('my-class'));
			});

			it('should return true for whitespace characters', function() {
				node.setAttribute(
					'class',
					'my-class\ta11y-focus\rvisually-hidden\ngrid\fcontainer'
				);
				var vNode = new VirtualNode(node);

				assert.isTrue(vNode.hasClass('my-class'));
				assert.isTrue(vNode.hasClass('a11y-focus'));
				assert.isTrue(vNode.hasClass('visually-hidden'));
				assert.isTrue(vNode.hasClass('grid'));
				assert.isTrue(vNode.hasClass('container'));
			});
		});

		describe('attr', function() {
			it('should return the value of the given attribute', function() {
				node.setAttribute('data-foo', 'bar');
				var vNode = new VirtualNode(node);

				assert.equal(vNode.attr('data-foo'), 'bar');
			});

			it('should return null for text nodes', function() {
				node.textContent = 'hello';
				var vNode = new VirtualNode(node.firstChild);

				assert.isNull(vNode.attr('data-foo'));
			});

			it('should return null if getAttribute is not a function', function() {
				var node = {
					nodeName: 'DIV',
					getAttribute: null
				};
				var vNode = new VirtualNode(node);

				assert.isNull(vNode.attr('data-foo'));
			});
		});

		describe('hasAttr', function() {
			it('should return true if the element has the attribute', function() {
				node.setAttribute('foo', 'bar');
				var vNode = new VirtualNode(node);

				assert.isTrue(vNode.hasAttr('foo'));
			});

			it('should return false if the element does not have the attribute', function() {
				var vNode = new VirtualNode(node);

				assert.isFalse(vNode.hasAttr('foo'));
			});

			it('should return false for text nodes', function() {
				node.textContent = 'hello';
				var vNode = new VirtualNode(node.firstChild);

				assert.isFalse(vNode.hasAttr('foo'));
			});

			it('should return false if hasAttribute is not a function', function() {
				var node = {
					nodeName: 'DIV',
					hasAttribute: null
				};
				var vNode = new VirtualNode(node);

				assert.isFalse(vNode.hasAttr('foo'));
			});
		});

		describe('isFocusable', function() {
			var commons;

			beforeEach(function() {
				commons = axe.commons = axe.commons;
			});

			afterEach(function() {
				axe.commons = commons;
			});

			it('should call dom.isFocusable', function() {
				var called = false;
				axe.commons = {
					dom: {
						isFocusable: function() {
							called = true;
						}
					}
				};
				var vNode = new VirtualNode(node);
				vNode.isFocusable;

				assert.isTrue(called);
			});

			it('should only call dom.isFocusable once', function() {
				var count = 0;
				axe.commons = {
					dom: {
						isFocusable: function() {
							count++;
						}
					}
				};
				var vNode = new VirtualNode(node);
				vNode.isFocusable;
				vNode.isFocusable;
				vNode.isFocusable;
				assert.equal(count, 1);
			});
		});

		describe('tabbableElements', function() {
			var commons;

			beforeEach(function() {
				commons = axe.commons = axe.commons;
			});

			afterEach(function() {
				axe.commons = commons;
			});

			it('should call dom.getTabbableElements', function() {
				var called = false;
				axe.commons = {
					dom: {
						getTabbableElements: function() {
							called = true;
						}
					}
				};
				var vNode = new VirtualNode(node);
				vNode.tabbableElements;

				assert.isTrue(called);
			});

			it('should only call dom.getTabbableElements once', function() {
				var count = 0;
				axe.commons = {
					dom: {
						getTabbableElements: function() {
							count++;
						}
					}
				};
				var vNode = new VirtualNode(node);
				vNode.tabbableElements;
				vNode.tabbableElements;
				vNode.tabbableElements;
				assert.equal(count, 1);
			});
		});
	});
});
