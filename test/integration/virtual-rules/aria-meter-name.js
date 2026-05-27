describe('aria-meter-name virtual-rule', () => {
  it('should pass for aria-label', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'meter',
        'aria-label': 'foobar'
      }
    });
    node.parent = null;

    const results = axe.runVirtualRule('aria-meter-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'meter',
        'aria-labelledby': 'foobar'
      }
    });
    node.parent = null;

    const results = axe.runVirtualRule('aria-meter-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'meter',
        title: 'foobar'
      }
    });
    // children are required since titleText comes after subtree text
    // in accessible name calculation
    node.children = [];
    node.parent = null;

    const results = axe.runVirtualRule('aria-meter-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label contains only whitespace', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'meter',
        'aria-label': ' \t   \n   '
      }
    });
    node.children = [];

    const results = axe.runVirtualRule('aria-meter-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'meter',
        title: ''
      }
    });
    node.children = [];

    const results = axe.runVirtualRule('aria-meter-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
