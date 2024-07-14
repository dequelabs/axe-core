describe('aria-prohibited-attr virtual-rule', () => {
  it('should pass for required attributes', () => {
    const results = axe.runVirtualRule('aria-prohibited-attr', {
      nodeName: 'div',
      attributes: {
        role: 'checkbox',
        'aria-checked': true
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for allowed attributes', () => {
    const results = axe.runVirtualRule('aria-prohibited-attr', {
      nodeName: 'div',
      attributes: {
        role: 'radio',
        'aria-required': true,
        'aria-checked': true
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for invalid attributes', () => {
    const results = axe.runVirtualRule('aria-prohibited-attr', {
      nodeName: 'div',
      attributes: {
        role: 'dialog',
        'aria-cats': true
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for prohibited attributes', () => {
    const vNode = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'code',
        'aria-label': 'foo'
      }
    });
    vNode.children = [];

    const results = axe.runVirtualRule('aria-prohibited-attr', vNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for invalid role', () => {
    const vNode = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'foo',
        'aria-label': 'foo'
      }
    });
    vNode.children = [];

    const results = axe.runVirtualRule('aria-prohibited-attr', vNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for fallback roles', () => {
    const results = axe.runVirtualRule('aria-prohibited-attr', {
      nodeName: 'div',
      attributes: {
        role: 'foo dialog',
        'aria-label': 'foo'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for multiple invalid roles', () => {
    const vNode = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'foo bar',
        'aria-label': 'foo'
      }
    });
    vNode.children = [];

    const results = axe.runVirtualRule('aria-prohibited-attr', vNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
