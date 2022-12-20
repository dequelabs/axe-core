describe('AbstractVirtualNode', function () {
  it('should be a function', function () {
    assert.isFunction(axe.AbstractVirtualNode);
  });

  it('should throw an error when accessing props', function () {
    function fn() {
      var abstractNode = new axe.AbstractVirtualNode();
      if (abstractNode.props.nodeType === 1) {
        return;
      }
    }

    assert.throws(fn);
  });

  it('should throw an error when accessing attrNames', function () {
    function fn() {
      var abstractNode = new axe.AbstractVirtualNode();
      return abstractNode.attrNames;
    }

    assert.throws(fn, 'VirtualNode class must have an "attrNames" property');
  });

  it('should throw an error when accessing hasClass', function () {
    function fn() {
      var abstractNode = new axe.AbstractVirtualNode();
      if (abstractNode.hasClass('foo')) {
        return;
      }
    }

    assert.throws(fn);
  });

  it('should throw an error when accessing attr', function () {
    function fn() {
      var abstractNode = new axe.AbstractVirtualNode();
      if (abstractNode.attr('foo') === 'bar') {
        return;
      }
    }

    assert.throws(fn);
  });

  it('should throw an error when accessing hasAttr', function () {
    function fn() {
      var abstractNode = new axe.AbstractVirtualNode();
      if (abstractNode.hasAttr('foo')) {
        return;
      }
    }

    assert.throws(fn);
  });

  describe('hasClass, when attr is set', function () {
    it('should return true when the element has the class', function () {
      var vNode = new axe.AbstractVirtualNode();
      vNode.attr = function () {
        return 'my-class';
      };

      assert.isTrue(vNode.hasClass('my-class'));
    });

    it('should return true when the element contains more than one class', function () {
      var vNode = new axe.AbstractVirtualNode();
      vNode.attr = function () {
        return 'my-class a11y-focus visually-hidden';
      };

      assert.isTrue(vNode.hasClass('my-class'));
      assert.isTrue(vNode.hasClass('a11y-focus'));
      assert.isTrue(vNode.hasClass('visually-hidden'));
    });

    it('should return false when the element does not contain the class', function () {
      var vNode = new axe.AbstractVirtualNode();
      vNode.attr = function () {
        return undefined;
      };

      assert.isFalse(vNode.hasClass('my-class'));
    });

    it('should return false when the element contains only part of the class', function () {
      var vNode = new axe.AbstractVirtualNode();
      vNode.attr = function () {
        return 'my-class';
      };
      assert.isFalse(vNode.hasClass('class'));
    });

    it('should return false if className is not of type string', function () {
      var vNode = new axe.AbstractVirtualNode();
      vNode.attr = function () {
        return null;
      };

      assert.isFalse(vNode.hasClass('my-class'));
    });

    it('should return true for whitespace characters', function () {
      var vNode = new axe.AbstractVirtualNode();
      vNode.attr = function () {
        return 'my-class\ta11y-focus\rvisually-hidden\ngrid\fcontainer';
      };

      assert.isTrue(vNode.hasClass('my-class'));
      assert.isTrue(vNode.hasClass('a11y-focus'));
      assert.isTrue(vNode.hasClass('visually-hidden'));
      assert.isTrue(vNode.hasClass('grid'));
      assert.isTrue(vNode.hasClass('container'));
    });
  });
});
