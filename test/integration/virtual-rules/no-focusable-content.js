describe('no-focusable-content virtual-rule', function () {
  it('should incomplete for element with undefined children', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'text'
      }
    });
    node.children = null; // not needed, but makes the test more explicit

    var results = axe.runVirtualRule('aria-text', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
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

  // testing: !isNaN(tabIndex) && tabIndex < 0;
  it('should fail   ??? test if tabIndex !isNaN(tabIndex) && tabIndex < 0', function () {
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
        // role: 'none',
        href: '#'
      }
    });

    node.children = [child];

    var results = axe.runVirtualRule('aria-text', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass when an anchor has no href', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'text'
      }
    });
    var child = new axe.SerialVirtualNode({
      nodeName: 'a'
      // attributes: {
      //   // tabindex: '-1'
      //   // role: 'none',
      //   // href: null
      // }
    });

    node.children = [child];

    var results = axe.runVirtualRule('aria-text', node);
    assert.lengthOf(results.incomplete, 0);
    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });
  //   xit('should pass if the element is empty', function () {
  //     var node = new axe.SerialVirtualNode({
  //       nodeName: 'button'
  //     });

  //     node.children = [];
  //     node.parent = null;

  //     var results = axe.runVirtualRule('aria-text', node);

  //     assert.lengthOf(results.passes, 1);
  //     assert.lengthOf(results.violations, 0);
  //     assert.lengthOf(results.incomplete, 0);
  //   });

  //   xit('should pass if element only has text content', function () {
  //     var node = new axe.SerialVirtualNode({
  //       nodeName: 'button'
  //     });
  //     var child = new axe.SerialVirtualNode({
  //       nodeName: '#text',
  //       nodeType: 3,
  //       nodeValue: 'Hello World'
  //     });
  //     node.children = [child];

  //     var results = axe.runVirtualRule('aria-text', node);

  //     assert.lengthOf(results.passes, 1);
  //     assert.lengthOf(results.violations, 0);
  //     assert.lengthOf(results.incomplete, 0);
  //   });
});
