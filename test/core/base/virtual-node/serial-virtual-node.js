/*global axe, SerialVirtualNode */
describe('SerialVirtualNode', function() {
	it('extends AbstractVirtualNode', function() {
		var vNode = new SerialVirtualNode({
			nodeName: 'div'
		});
		assert.instanceOf(vNode, axe.AbstractVirtualNode);
	});

	describe('props', function() {
		it('assigns any properties to .props', function() {
			var props = {
				nodeType: 1,
				nodeName: 'div',
				someType: 'bar',
				somethingElse: 'baz'
			};
			var vNode = new SerialVirtualNode(props);
			assert.deepEqual(vNode.props, props);
		});

		it('returns a frozen object', function() {
			var vNode = new SerialVirtualNode({ nodeName: 'div' });
			assert.isTrue(Object.isFrozen(vNode.props), 'Expect object to be frozen');
		});

		it('has a default nodeType of 1', function() {
			var vNode = new SerialVirtualNode({ nodeName: 'div' });
			assert.equal(vNode.props.nodeType, 1);
		});

		it('converts nodeNames to lower case', function() {
			var htmlNodes = [
				'DIV',
				'SPAN',
				'INPUT',
				'HeAdEr',
				'TABLE',
				'TITLE',
				'BUTTON',
				'Foo'
			];
			htmlNodes.forEach(function(nodeName) {
				var vNode = new SerialVirtualNode({ nodeName: nodeName });
				assert.equal(vNode.props.nodeName, nodeName.toLowerCase());
			});
		});

		it('ignores the `attributes` property', function() {
			var vNode = new SerialVirtualNode({
				nodeName: 'div',
				attributes: {
					foo: 'foo',
					bar: 'bar',
					baz: 'baz'
				}
			});
			assert.isUndefined(vNode.props.attributes);
		});
	});

	describe('attr', function() {
		it('returns a string value for the attribute', function() {
			var vNode = new SerialVirtualNode({
				nodeName: 'div',
				attributes: {
					foo: 'foo',
					bar: 123,
					baz: true
				}
			});
			assert.equal(vNode.attr('foo'), 'foo');
			assert.equal(vNode.attr('bar'), '123');
			assert.equal(vNode.attr('baz'), 'true');
		});

		it('returns null if the attribute is null', function() {
			var vNode = new SerialVirtualNode({
				nodeName: 'div',
				attributes: { foo: null }
			});
			assert.isNull(vNode.attr('foo'));
		});

		it('returns null if the attribute is not set', function() {
			var vNode = new SerialVirtualNode({
				nodeName: 'div'
			});
			assert.isNull(vNode.attr('foo'));
		});

		it('converts `className` to `class`', function() {
			var vNode = new SerialVirtualNode({
				nodeName: 'div',
				attributes: {
					className: 'foo bar baz'
				}
			});
			assert.equal(vNode.attr('class'), 'foo bar baz');
		});

		it('converts `htmlFor` to `for`', function() {
			var vNode = new SerialVirtualNode({
				nodeName: 'div',
				attributes: {
					htmlFor: 'foo'
				}
			});
			assert.equal(vNode.attr('for'), 'foo');
		});
	});

	describe('hasAttr', function() {
		it('returns true if the attribute has a value', function() {
			var vNode = new SerialVirtualNode({
				nodeName: 'div',
				attributes: {
					foo: '',
					bar: 0,
					baz: false
				}
			});
			assert.isTrue(vNode.hasAttr('foo'));
			assert.isTrue(vNode.hasAttr('bar'));
			assert.isTrue(vNode.hasAttr('baz'));
		});

		it('returns true if the attribute is null', function() {
			var vNode = new SerialVirtualNode({
				nodeName: 'div',
				attributes: { foo: null }
			});
			assert.isTrue(vNode.hasAttr('foo'));
		});

		it('returns false if the attribute is undefined', function() {
			var vNode = new SerialVirtualNode({
				nodeName: 'div',
				attributes: { foo: undefined }
			});
			assert.isFalse(vNode.hasAttr('foo'));
			assert.isFalse(vNode.hasAttr('bar'));
		});

		it('converts `htmlFor` to `for`', function() {
			var nodeWithoutFor = new SerialVirtualNode({
				nodeName: 'div',
				attributes: {}
			});
			var nodeWithFor = new SerialVirtualNode({
				nodeName: 'div',
				attributes: { htmlFor: 'foo' }
			});

			assert.isFalse(nodeWithoutFor.hasAttr('for'));
			assert.isTrue(nodeWithFor.hasAttr('for'));
		});

		it('converts `className` to `class`', function() {
			var nodeWithoutClass = new SerialVirtualNode({
				nodeName: 'div',
				attributes: {}
			});
			var nodeWithClass = new SerialVirtualNode({
				nodeName: 'div',
				attributes: { className: 'foo bar baz' }
			});

			assert.isFalse(nodeWithoutClass.hasAttr('class'));
			assert.isTrue(nodeWithClass.hasAttr('class'));
		});
	});
});
