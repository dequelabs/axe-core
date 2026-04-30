describe('AbstractVirtualNode', () => {
  it('should be a function', () => {
    assert.isFunction(axe.AbstractVirtualNode);
  });

  it('should throw an error when accessing props', () => {
    function fn() {
      const abstractNode = new axe.AbstractVirtualNode();
      if (abstractNode.props.nodeType === 1) {
        return;
      }
    }

    assert.throws(fn);
  });

  it('should throw an error when accessing attrNames', () => {
    function fn() {
      const abstractNode = new axe.AbstractVirtualNode();
      return abstractNode.attrNames;
    }

    assert.throws(fn, 'VirtualNode class must have an "attrNames" property');
  });

  it('should throw an error when accessing hasClass', () => {
    function fn() {
      const abstractNode = new axe.AbstractVirtualNode();
      if (abstractNode.hasClass('foo')) {
        return;
      }
    }

    assert.throws(fn);
  });

  it('should throw an error when accessing attr', () => {
    function fn() {
      const abstractNode = new axe.AbstractVirtualNode();
      if (abstractNode.attr('foo') === 'bar') {
        return;
      }
    }

    assert.throws(fn);
  });

  it('should throw an error when accessing hasAttr', () => {
    function fn() {
      const abstractNode = new axe.AbstractVirtualNode();
      if (abstractNode.hasAttr('foo')) {
        return;
      }
    }

    assert.throws(fn);
  });

  describe('hasClass, when attr is set', () => {
    it('should return true when the element has the class', () => {
      const vNode = new axe.AbstractVirtualNode();
      vNode.attr = () => {
        return 'my-class';
      };

      assert.isTrue(vNode.hasClass('my-class'));
    });

    it('should return true when the element contains more than one class', () => {
      const vNode = new axe.AbstractVirtualNode();
      vNode.attr = () => {
        return 'my-class a11y-focus visually-hidden';
      };

      assert.isTrue(vNode.hasClass('my-class'));
      assert.isTrue(vNode.hasClass('a11y-focus'));
      assert.isTrue(vNode.hasClass('visually-hidden'));
    });

    it('should return false when the element does not contain the class', () => {
      const vNode = new axe.AbstractVirtualNode();
      vNode.attr = () => {
        return undefined;
      };

      assert.isFalse(vNode.hasClass('my-class'));
    });

    it('should return false when the element contains only part of the class', () => {
      const vNode = new axe.AbstractVirtualNode();
      vNode.attr = () => {
        return 'my-class';
      };
      assert.isFalse(vNode.hasClass('class'));
    });

    it('should return false if className is not of type string', () => {
      const vNode = new axe.AbstractVirtualNode();
      vNode.attr = () => {
        return null;
      };

      assert.isFalse(vNode.hasClass('my-class'));
    });

    it('should return true for whitespace characters', () => {
      const vNode = new axe.AbstractVirtualNode();
      vNode.attr = () => {
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
