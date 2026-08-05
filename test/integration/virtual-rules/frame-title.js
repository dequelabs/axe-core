describe('frame-title virtual-rule', () => {
  it('should pass for aria-label', () => {
    const results = axe.runVirtualRule('frame-title', {
      nodeName: 'iframe',
      attributes: {
        'aria-label': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', () => {
    const results = axe.runVirtualRule('frame-title', {
      nodeName: 'iframe',
      attributes: {
        'aria-labelledby': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', () => {
    const results = axe.runVirtualRule('frame-title', {
      nodeName: 'iframe',
      attributes: {
        title: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=presentation', () => {
    const results = axe.runVirtualRule('frame-title', {
      nodeName: 'iframe',
      attributes: {
        role: 'presentation'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=none', () => {
    const results = axe.runVirtualRule('frame-title', {
      nodeName: 'iframe',
      attributes: {
        role: 'none'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', () => {
    const results = axe.runVirtualRule('frame-title', {
      nodeName: 'iframe',
      attributes: {
        'aria-label': ''
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', () => {
    const results = axe.runVirtualRule('frame-title', {
      nodeName: 'iframe',
      attributes: {
        title: ''
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for role=presentation and title', () => {
    const results = axe.runVirtualRule('frame-title', {
      nodeName: 'iframe',
      attributes: {
        role: 'presentation',
        title: ''
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for role=none and title', () => {
    const results = axe.runVirtualRule('frame-title', {
      nodeName: 'iframe',
      attributes: {
        role: 'none',
        title: ''
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
