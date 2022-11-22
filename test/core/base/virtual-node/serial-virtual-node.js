describe('SerialVirtualNode', function () {
  var SerialVirtualNode = axe.SerialVirtualNode;

  it('extends AbstractVirtualNode', function () {
    var vNode = new SerialVirtualNode({
      nodeName: 'div'
    });
    assert.instanceOf(vNode, axe.AbstractVirtualNode);
  });

  describe('props', function () {
    it('assigns any properties to .props', function () {
      var props = {
        nodeType: 1,
        nodeName: 'div',
        someType: 'bar',
        somethingElse: 'baz'
      };
      var vNode = new SerialVirtualNode(props);
      assert.deepEqual(vNode.props, props);
    });

    it('returns a frozen object', function () {
      var vNode = new SerialVirtualNode({ nodeName: 'div' });
      assert.isTrue(Object.isFrozen(vNode.props), 'Expect object to be frozen');
    });

    it('takes 1 as its nodeType', function () {
      var vNode = new SerialVirtualNode({
        nodeType: 1,
        nodeName: 'div'
      });
      assert.equal(vNode.props.nodeType, 1);
    });

    it('takes 3 as its nodeType', function () {
      var vNode = new SerialVirtualNode({
        nodeType: 3,
        nodeName: '#text'
      });
      assert.equal(vNode.props.nodeType, 3);
    });

    it('has a default nodeType of 1', function () {
      var vNode = new SerialVirtualNode({ nodeName: 'div' });
      assert.equal(vNode.props.nodeType, 1);
    });

    it('does not throw if nodeType is falsy', function () {
      [null, undefined].forEach(function (nonThrowingNodeType) {
        assert.doesNotThrow(function () {
          // eslint-disable-next-line no-new
          new SerialVirtualNode({
            nodeType: nonThrowingNodeType,
            nodeName: 'div'
          });
        });
      });
    });

    it('throws if nodeType is a not a number', function () {
      [true, 'one', '1', { foo: 'bar' }].forEach(function (throwingNodeType) {
        assert.throws(function () {
          // eslint-disable-next-line no-new
          new SerialVirtualNode({
            nodeType: throwingNodeType,
            nodeName: 'div'
          });
        });
      });
    });

    it('converts nodeNames to lower case', function () {
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
      htmlNodes.forEach(function (nodeName) {
        var vNode = new SerialVirtualNode({ nodeName: nodeName });
        assert.equal(vNode.props.nodeName, nodeName.toLowerCase());
      });
    });

    it('defaults to the correct nodeType for certain nodeNames', function () {
      var vNode1 = new SerialVirtualNode({ nodeName: 'DIV' });
      assert.equal(vNode1.props.nodeType, 1);
      var vNode2 = new SerialVirtualNode({ nodeName: '#cdata-section' });
      assert.equal(vNode2.props.nodeType, 2);
      var vNode3 = new SerialVirtualNode({ nodeName: '#text' });
      assert.equal(vNode3.props.nodeType, 3);
      var vNode8 = new SerialVirtualNode({ nodeName: '#comment' });
      assert.equal(vNode8.props.nodeType, 8);
      var vNode9 = new SerialVirtualNode({ nodeName: '#document' });
      assert.equal(vNode9.props.nodeType, 9);
      var vNode11 = new SerialVirtualNode({ nodeName: '#document-fragment' });
      assert.equal(vNode11.props.nodeType, 11);
    });

    it('defaults to the correct nodeName for certain nodeTypes', function () {
      var vNode2 = new SerialVirtualNode({ nodeType: 2 });
      assert.equal(vNode2.props.nodeName, '#cdata-section');
      var vNode3 = new SerialVirtualNode({ nodeType: 3 });
      assert.equal(vNode3.props.nodeName, '#text');
      var vNode8 = new SerialVirtualNode({ nodeType: 8 });
      assert.equal(vNode8.props.nodeName, '#comment');
      var vNode9 = new SerialVirtualNode({ nodeType: 9 });
      assert.equal(vNode9.props.nodeName, '#document');
      var vNode11 = new SerialVirtualNode({ nodeType: 11 });
      assert.equal(vNode11.props.nodeName, '#document-fragment');
    });

    it('throws if nodeName is not a string', function () {
      [123, true, null, {}, undefined, []].forEach(function (notAString) {
        assert.throws(function () {
          // eslint-disable-next-line no-new
          new SerialVirtualNode({ nodeName: notAString });
        });
      });
    });

    it('ignores the `attributes` property', function () {
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

    it('converts type prop to lower case', function () {
      var types = ['text', 'COLOR', 'Month', 'uRL'];
      types.forEach(function (type) {
        var vNode = new SerialVirtualNode({
          nodeName: 'input',
          type: type
        });
        assert.equal(vNode.props.type, type.toLowerCase());
      });
    });

    it('converts type attribute to lower case', function () {
      var types = ['text', 'COLOR', 'Month', 'uRL'];
      types.forEach(function (type) {
        var vNode = new SerialVirtualNode({
          nodeName: 'input',
          attributes: {
            type: type
          }
        });
        assert.equal(vNode.props.type, type.toLowerCase());
      });
    });

    it('defaults type prop to "text"', function () {
      var vNode = new SerialVirtualNode({
        nodeName: 'input'
      });
      assert.equal(vNode.props.type, 'text');
    });

    it('default type prop to "text" if type is invalid', function () {
      var vNode = new SerialVirtualNode({
        nodeName: 'input',
        attributes: {
          type: 'woohoo'
        }
      });
      assert.equal(vNode.props.type, 'text');
    });

    it('uses the type property over the type attribute', function () {
      var vNode = new SerialVirtualNode({
        nodeName: 'input',
        type: 'month',
        attributes: {
          type: 'color'
        }
      });
      assert.equal(vNode.props.type, 'month');
    });
  });

  describe('attr', function () {
    it('returns a string value for the attribute', function () {
      var vNode = new SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          foo: 'foo',
          bar: 123,
          baz: true,
          qux: ''
        }
      });
      assert.equal(vNode.attr('foo'), 'foo');
      assert.equal(vNode.attr('bar'), '123');
      assert.equal(vNode.attr('baz'), 'true');
      assert.equal(vNode.attr('qux'), '');
    });

    it('returns null if the attribute is null', function () {
      var vNode = new SerialVirtualNode({
        nodeName: 'div',
        attributes: { foo: null }
      });
      assert.isNull(vNode.attr('foo'));
    });

    it('returns null if the attribute is not set', function () {
      var vNode = new SerialVirtualNode({
        nodeName: 'div'
      });
      assert.isNull(vNode.attr('foo'));
    });

    it('throws if the value is an object (for except null)', function () {
      [{}, [], /foo/].forEach(function (someObject) {
        assert.throws(function () {
          // eslint-disable-next-line no-new
          new SerialVirtualNode({
            nodeName: 'div',
            attributes: { foo: someObject }
          });
        });
      });
    });

    it('converts `className` to `class`', function () {
      var vNode = new SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          className: 'foo bar baz'
        }
      });
      assert.equal(vNode.attr('class'), 'foo bar baz');
    });

    it('converts `htmlFor` to `for`', function () {
      var vNode = new SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          htmlFor: 'foo'
        }
      });
      assert.equal(vNode.attr('for'), 'foo');
    });
  });

  describe('hasAttr', function () {
    it('returns true if the attribute has a value', function () {
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

    it('returns true if the attribute is null', function () {
      var vNode = new SerialVirtualNode({
        nodeName: 'div',
        attributes: { foo: null }
      });
      assert.isTrue(vNode.hasAttr('foo'));
    });

    it('returns false if the attribute is undefined', function () {
      var vNode = new SerialVirtualNode({
        nodeName: 'div',
        attributes: { foo: undefined }
      });
      assert.isFalse(vNode.hasAttr('foo'));
      assert.isFalse(vNode.hasAttr('bar'));
    });

    it('converts `htmlFor` to `for`', function () {
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

    it('converts `className` to `class`', function () {
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

  describe('attrNames', function () {
    it('should return a list of attribute names', function () {
      var vNode = new SerialVirtualNode({
        nodeName: 'div',
        attributes: { foo: 'bar' }
      });

      assert.deepEqual(vNode.attrNames, ['foo']);
    });

    it('should return an empty array if there are no attributes', function () {
      var vNode = new SerialVirtualNode({
        nodeName: 'div'
      });
      assert.deepEqual(vNode.attrNames, []);
    });
  });
});
