describe('aria-roledescription virtual-rule', function () {
  it('should pass for elements with an implicit supported role', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {
        'aria-roledescription': 'Awesome Button'
      }
    });

    let results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for elements with an explicit supported role', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-roledescription': 'Awesome Radio',
        role: 'radio'
      }
    });

    let results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for elements with an unsupported role', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-roledescription': 'Awesome Main',
        role: 'main'
      }
    });

    let results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail for elements without role', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-roledescription': 'Awesome Main'
      }
    });

    let results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for elements with role=presentation', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-roledescription': 'Awesome Main',
        role: 'presentation'
      }
    });

    let results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for elements with role=none', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-roledescription': 'Awesome Main',
        role: 'none'
      }
    });

    let results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
