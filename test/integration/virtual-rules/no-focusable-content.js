describe('no-focusable-content virtual-rule', function () {
  // Test cases:
  // no children
  //   "\"role=text\" should have no focusable descendants"
  it('should pass for element without focusable content', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'button'
    });
    var child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'Hello World'
    });
    node.children = [child];

    var results = axe.runVirtualRule('nested-interactive', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass if element has no focusable content', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'button'
    });
    var child = new axe.SerialVirtualNode({
      nodeName: 'span'
    });
    var grandchild = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3, // what is this????
      nodeValue: 'hello'
    });

    child.children = [grandchild];
    node.children = [child];
    node.parent = null;

    var results = axe.runVirtualRule('aria-text', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass if the element is empty', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'button'
    });

    node.children = [];
    node.parent = null;

    var results = axe.runVirtualRule('aria-text', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass if element only has text content', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'button'
    });
    var child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'Hello World'
    });
    node.children = [child];

    var results = axe.runVirtualRule('aria-text', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });
});
