describe('nested-interactive virtual-rule', function () {
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

  it('should pass for aria element without focusable content', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'button'
      }
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

  it('should pass for element with non-widget content which has negative tabindex', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'button'
    });
    var child = new axe.SerialVirtualNode({
      nodeName: 'span',
      attributes: {
        tabindex: -1
      }
    });
    child.children = [];
    node.children = [child];

    var results = axe.runVirtualRule('nested-interactive', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for empty element without', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'button'
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('nested-interactive', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for element with non-widget content', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'button'
    });
    var child = new axe.SerialVirtualNode({
      nodeName: 'span',
      attributes: {
        tabindex: 1
      }
    });
    child.children = [];
    node.children = [child];

    var results = axe.runVirtualRule('nested-interactive', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for element with native widget content', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'button'
      }
    });
    var child = new axe.SerialVirtualNode({
      nodeName: 'button'
    });
    child.children = [];
    node.children = [child];

    var results = axe.runVirtualRule('nested-interactive', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should return incomplete if element has undefined children', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'button'
    });

    var results = axe.runVirtualRule('nested-interactive', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should return incomplete if descendant has undefined children', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'button'
    });
    var child = new axe.SerialVirtualNode({
      nodeName: 'span'
    });
    node.children = [child];

    var results = axe.runVirtualRule('nested-interactive', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });
});
