describe('aria-roledescription virtual-rule', function () {
  it('should pass for elements with an implicit supported role', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {
        'aria-roledescription': 'Awesome Button'
      }
    });

    var results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for elements with an explicit supported role', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-roledescription': 'Awesome Radio',
        role: 'radio'
      }
    });

    var results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for elements with an unsupported role', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-roledescription': 'Awesome Main',
        role: 'main'
      }
    });

    var results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail for elements without role', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-roledescription': 'Awesome Main'
      }
    });

    var results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for elements with role=presentation', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-roledescription': 'Awesome Main',
        role: 'presentation'
      }
    });

    var results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for elements with role=none', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-roledescription': 'Awesome Main',
        role: 'none'
      }
    });

    var results = axe.runVirtualRule('aria-roledescription', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
