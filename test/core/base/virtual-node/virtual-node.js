describe('VirtualNode', function () {
  'use strict';

  var VirtualNode = axe.VirtualNode;
  var node;

  beforeEach(function () {
    node = document.createElement('div');
  });

  it('should be a function', function () {
    assert.isFunction(VirtualNode);
  });

  it('should accept three parameters', function () {
    assert.lengthOf(VirtualNode, 3);
  });

  describe('prototype', function () {
    it('should have public properties', function () {
      var parent = {};
      var vNode = new VirtualNode(node, parent, 'foo');

      assert.equal(vNode.shadowId, 'foo');
      assert.typeOf(vNode.children, 'array');
      assert.equal(vNode.actualNode, node);
      assert.equal(vNode.parent, parent);
    });

    it('should abstract Node properties', function () {
      node = document.createElement('input');
      node.id = 'monkeys';
      var vNode = new VirtualNode(node);

      assert.isDefined(vNode.props);
      assert.equal(vNode.props.nodeType, 1);
      assert.equal(vNode.props.nodeName, 'input');
      assert.equal(vNode.props.id, 'monkeys');
      assert.equal(vNode.props.type, 'text');
    });

    it('should reflect selected property', function () {
      node = document.createElement('option');
      var vNode = new VirtualNode(node);
      assert.equal(vNode.props.selected, false);

      node.selected = true;
      vNode = new VirtualNode(node);
      assert.equal(vNode.props.selected, true);
    });

    it('should lowercase type', function () {
      var node = document.createElement('input');
      node.setAttribute('type', 'COLOR');
      var vNode = new VirtualNode(node);

      assert.equal(vNode.props.type, 'color');
    });

    it('should default type to text', function () {
      var node = document.createElement('input');
      var vNode = new VirtualNode(node);

      assert.equal(vNode.props.type, 'text');
    });

    it('should default type to text if type is invalid', function () {
      var node = document.createElement('input');
      node.setAttribute('type', 'woohoo');
      var vNode = new VirtualNode(node);

      assert.equal(vNode.props.type, 'text');
    });

    it('should lowercase nodeName', function () {
      var node = {
        nodeName: 'FOOBAR'
      };
      var vNode = new VirtualNode(node);

      assert.equal(vNode.props.nodeName, 'foobar');
    });

    describe('attr', function () {
      it('should return the value of the given attribute', function () {
        node.setAttribute('data-foo', 'bar');
        var vNode = new VirtualNode(node);

        assert.equal(vNode.attr('data-foo'), 'bar');
      });

      it('should return null for text nodes', function () {
        node.textContent = 'hello';
        var vNode = new VirtualNode(node.firstChild);

        assert.isNull(vNode.attr('data-foo'));
      });

      it('should return null if getAttribute is not a function', function () {
        var node = {
          nodeName: 'DIV',
          getAttribute: null
        };
        var vNode = new VirtualNode(node);

        assert.isNull(vNode.attr('data-foo'));
      });
    });

    describe('hasAttr', function () {
      it('should return true if the element has the attribute', function () {
        node.setAttribute('foo', 'bar');
        var vNode = new VirtualNode(node);

        assert.isTrue(vNode.hasAttr('foo'));
      });

      it('should return false if the element does not have the attribute', function () {
        var vNode = new VirtualNode(node);

        assert.isFalse(vNode.hasAttr('foo'));
      });

      it('should return false for text nodes', function () {
        node.textContent = 'hello';
        var vNode = new VirtualNode(node.firstChild);

        assert.isFalse(vNode.hasAttr('foo'));
      });

      it('should return false if hasAttribute is not a function', function () {
        var node = {
          nodeName: 'DIV',
          hasAttribute: null
        };
        var vNode = new VirtualNode(node);

        assert.isFalse(vNode.hasAttr('foo'));
      });
    });

    describe('attrNames', function () {
      it('should return a list of attribute names', function () {
        node.setAttribute('foo', 'bar');
        var vNode = new VirtualNode(node);

        assert.deepEqual(vNode.attrNames, ['foo']);
      });

      it('should work with clobbered attributes', function () {
        var node = document.createElement('form');
        node.setAttribute('id', '123');
        node.innerHTML = '<select name="attributes"></select>';
        var vNode = new VirtualNode(node);

        assert.deepEqual(vNode.attrNames, ['id']);
      });

      it('should return an empty array if there are no attributes', function () {
        var vNode = new VirtualNode(node);
        assert.deepEqual(vNode.attrNames, []);
      });
    });

    describe('nodeIndex', function () {
      it('increments nodeIndex when a parent is passed', function () {
        var vHtml = new VirtualNode({ nodeName: 'html' });
        var vHead = new VirtualNode({ nodeName: 'head' }, vHtml);
        var vTitle = new VirtualNode({ nodeName: 'title' }, vHead);
        var vBody = new VirtualNode({ nodeName: 'body' }, vHtml);

        assert.equal(vHtml.nodeIndex, 0);
        assert.equal(vHead.nodeIndex, 1);
        assert.equal(vTitle.nodeIndex, 2);
        assert.equal(vBody.nodeIndex, 3);
      });

      it('resets nodeIndex when no parent is passed', function () {
        var vHtml = new VirtualNode({ nodeName: 'html' });
        var vHead = new VirtualNode({ nodeName: 'head' }, vHtml);
        assert.equal(vHtml.nodeIndex, 0);
        assert.equal(vHead.nodeIndex, 1);

        vHtml = new VirtualNode({ nodeName: 'html' });
        vHead = new VirtualNode({ nodeName: 'head' }, vHtml);
        assert.equal(vHtml.nodeIndex, 0);
        assert.equal(vHead.nodeIndex, 1);
      });
    });

    describe.skip('isFocusable', function () {
      var commons;

      beforeEach(function () {
        commons = axe.commons = axe.commons;
      });

      afterEach(function () {
        axe.commons = commons;
      });

      it('should call dom.isFocusable', function () {
        var called = false;
        axe.commons = {
          dom: {
            isFocusable: function () {
              called = true;
            }
          }
        };
        var vNode = new VirtualNode(node);
        vNode.isFocusable;

        assert.isTrue(called);
      });

      it('should only call dom.isFocusable once', function () {
        var count = 0;
        axe.commons = {
          dom: {
            isFocusable: function () {
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

    describe.skip('tabbableElements', function () {
      var commons;

      beforeEach(function () {
        commons = axe.commons = axe.commons;
      });

      afterEach(function () {
        axe.commons = commons;
      });

      it('should call dom.getTabbableElements', function () {
        var called = false;
        axe.commons = {
          dom: {
            getTabbableElements: function () {
              called = true;
            }
          }
        };
        var vNode = new VirtualNode(node);
        vNode.tabbableElements;

        assert.isTrue(called);
      });

      it('should only call dom.getTabbableElements once', function () {
        var count = 0;
        axe.commons = {
          dom: {
            getTabbableElements: function () {
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

    describe('getComputedStylePropertyValue', function () {
      var computedStyle;

      beforeEach(function () {
        computedStyle = window.getComputedStyle;
      });

      afterEach(function () {
        window.getComputedStyle = computedStyle;
      });

      it('should call window.getComputedStyle and return the property', function () {
        var called = false;
        window.getComputedStyle = function () {
          called = true;
          return {
            getPropertyValue: function () {
              return 'result';
            }
          };
        };
        var vNode = new VirtualNode(node);
        var result = vNode.getComputedStylePropertyValue('prop');

        assert.isTrue(called);
        assert.equal(result, 'result');
      });

      it('should only call window.getComputedStyle and getPropertyValue once', function () {
        var computedCount = 0;
        var propertyCount = 0;
        window.getComputedStyle = function () {
          computedCount++;
          return {
            getPropertyValue: function () {
              propertyCount++;
            }
          };
        };
        var vNode = new VirtualNode(node);
        vNode.getComputedStylePropertyValue('prop');
        vNode.getComputedStylePropertyValue('prop');
        vNode.getComputedStylePropertyValue('prop');
        assert.equal(computedCount, 1);
        assert.equal(propertyCount, 1);
      });
    });

    describe('clientRects', function () {
      it('should call node.getClientRects', function () {
        var called = false;
        node.getClientRects = function () {
          called = true;
          return [];
        };
        var vNode = new VirtualNode(node);
        vNode.clientRects;

        assert.isTrue(called);
      });

      it('should only call node.getClientRects once', function () {
        var count = 0;
        node.getClientRects = function () {
          count++;
          return [];
        };
        var vNode = new VirtualNode(node);
        vNode.clientRects;
        vNode.clientRects;
        vNode.clientRects;
        assert.equal(count, 1);
      });

      it('should filter out 0 width rects', function () {
        node.getClientRects = function () {
          return [{ width: 10 }, { width: 0 }, { width: 20 }];
        };
        var vNode = new VirtualNode(node);

        assert.deepEqual(vNode.clientRects, [{ width: 10 }, { width: 20 }]);
      });
    });

    describe('boundingClientRect', function () {
      it('should call node.getBoundingClientRect', function () {
        var called = false;
        node.getBoundingClientRect = function () {
          called = true;
        };
        var vNode = new VirtualNode(node);
        vNode.boundingClientRect;

        assert.isTrue(called);
      });

      it('should only call node.getBoundingClientRect once', function () {
        var count = 0;
        node.getBoundingClientRect = function () {
          count++;
        };
        var vNode = new VirtualNode(node);
        vNode.boundingClientRect;
        vNode.boundingClientRect;
        vNode.boundingClientRect;
        assert.equal(count, 1);
      });
    });
  });
});
