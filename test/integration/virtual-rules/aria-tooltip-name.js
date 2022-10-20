describe('aria-tooltip-name virtual-rule', function () {
  it('should pass for aria-label', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'tooltip',
        'aria-label': 'foobar'
      }
    });
    node.parent = null;

    var results = axe.runVirtualRule('aria-tooltip-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'tooltip',
        'aria-labelledby': 'foobar'
      }
    });
    node.parent = null;

    var results = axe.runVirtualRule('aria-tooltip-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'tooltip',
        title: 'foobar'
      }
    });
    // children are required since titleText comes after subtree text
    // in accessible name calculation
    node.children = [];
    node.parent = null;

    var results = axe.runVirtualRule('aria-tooltip-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label contains only whitespace', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'tooltip',
        'aria-label': ' \t   \n   '
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('aria-tooltip-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'tooltip',
        title: ''
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('aria-tooltip-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
