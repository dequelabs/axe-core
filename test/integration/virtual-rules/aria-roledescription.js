describe('aria-roledescription virtual-rule', () => {
  it('should pass for elements with an implicit supported role', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {
        'aria-roledescription': 'Awesome Button'
      }
    });

    const results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for elements with an explicit supported role', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-roledescription': 'Awesome Radio',
        role: 'radio'
      }
    });

    const results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for elements with an unsupported role', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-roledescription': 'Awesome Main',
        role: 'main'
      }
    });

    const results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail for elements without role', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-roledescription': 'Awesome Main'
      }
    });

    const results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for elements with role=presentation', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-roledescription': 'Awesome Main',
        role: 'presentation'
      }
    });

    const results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for elements with role=none', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-roledescription': 'Awesome Main',
        role: 'none'
      }
    });

    const results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
