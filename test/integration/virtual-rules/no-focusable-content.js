describe('no-focusable-content virtual-rule', function () {
  describe('focusable descendents detection', function () {
    it('should incomplete for element with undefined children', function () {
      var node = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          role: 'text'
        }
      });
      delete node.children; // not strictly required, but makes the test more explicit

      var results = axe.runVirtualRule('aria-text', node);

      assert.lengthOf(results.passes, 0);
      assert.lengthOf(results.violations, 0);
      assert.lengthOf(results.incomplete, 1);
    });

    it('should fail for focusable widget children', function () {
      var node = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          role: 'text'
        }
      });
      var child = new axe.SerialVirtualNode({
        nodeName: 'button',
        attributes: {
          role: 'widget'
        }
      });
      node.children = [child];

      var results = axe.runVirtualRule('aria-text', node);

      assert.lengthOf(results.passes, 0);
      assert.lengthOf(results.violations, 1);
      assert.lengthOf(results.incomplete, 0);
    });

    it('should fail for children with native focus', function () {
      var node = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          role: 'text'
        }
      });
      var child = new axe.SerialVirtualNode({
        nodeName: 'button'
      });
      node.children = [child];

      var results = axe.runVirtualRule('aria-text', node);

      assert.lengthOf(results.passes, 0);
      assert.lengthOf(results.violations, 1);
      assert.lengthOf(results.incomplete, 0);
    });

    it('should pass if element only has descendants that are not focusable', function () {
      var node = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          role: 'text'
        }
      });
      var child = new axe.SerialVirtualNode({
        nodeName: 'span'
      });
      var grandchild = new axe.SerialVirtualNode({
        nodeName: '#text',
        nodeType: 3,
        nodeValue: 'hello'
      });

      child.children = [grandchild];
      node.children = [child];

      var results = axe.runVirtualRule('aria-text', node);

      assert.lengthOf(results.passes, 1);
      assert.lengthOf(results.violations, 0);
      assert.lengthOf(results.incomplete, 0);
    });

    it('should fail for deeply nested focusable children', function () {
      var node = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          role: 'text'
        }
      });
      var child = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      var grandchild = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      var greatgrandchild = new axe.SerialVirtualNode({
        nodeName: 'button'
      });
      greatgrandchild.parent = grandchild;
      grandchild.children = [greatgrandchild];
      child.children = [grandchild];
      node.children = [child];

      var results = axe.runVirtualRule('aria-text', node);

      assert.lengthOf(results.passes, 0);
      assert.lengthOf(results.violations, 1);
      assert.lengthOf(results.incomplete, 0);
    });
  });

  describe('handles error conditions', function () {
    it('should incomplete when vNode has no children and is type 1', function () {
      var node = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          role: 'text',
          nodeType: 1
        }
      });

      var results = axe.runVirtualRule('aria-text', node);

      assert.lengthOf(results.violations, 0);
      assert.lengthOf(results.incomplete, 1);
      assert.lengthOf(results.passes, 0);
    });
  });

  describe('special edge cases', function () {
    //TODO help?! Why is this incomplete and not passing? It seems to match the html integration test
    xit('should pass when an anchor has no href and has implicit role of link', function () {
      var node = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          role: 'text'
        }
      });
      var child = new axe.SerialVirtualNode({
        nodeName: 'a',
        attributes: {
          tabindex: '-1'
        }
      });

      child.parent = node;
      node.children = [child];

      var results = axe.runVirtualRule('aria-text', node);

      assert.lengthOf(results.violations, 0);
      assert.lengthOf(results.incomplete, 0);
      assert.lengthOf(results.passes, 1);
    });
  });

  describe('when author uses unreliable hiding strategies', function () {
    it('should fail when tabIndex is negative', function () {
      var node = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          role: 'text'
        }
      });
      var child = new axe.SerialVirtualNode({
        nodeName: 'a',
        attributes: {
          tabindex: '-1',
          href: '#'
        }
      });

      node.children = [child];

      var results = axe.runVirtualRule('aria-text', node);

      assert.lengthOf(results.passes, 0);
      assert.lengthOf(results.violations, 1);
      assert.lengthOf(results.incomplete, 0);
    });

    it('should fail when tabIndex is NaN', function () {
      var node = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          role: 'text'
        }
      });
      var child = new axe.SerialVirtualNode({
        nodeName: 'a',
        attributes: {
          tabindex: 'foo',
          href: '#'
        }
      });

      node.children = [child];

      var results = axe.runVirtualRule('aria-text', node);

      assert.lengthOf(results.passes, 0);
      assert.lengthOf(results.violations, 1);
      assert.lengthOf(results.incomplete, 0);
    });
  });
});
