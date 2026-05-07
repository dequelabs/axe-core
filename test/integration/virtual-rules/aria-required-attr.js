describe('aria-required-attr virtual-rule', () => {
  it('should pass for required attributes', () => {
    const results = axe.runVirtualRule('aria-required-attr', {
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

  it('should fail for missing attributes', () => {
    const results = axe.runVirtualRule('aria-required-attr', {
      nodeName: 'div',
      attributes: {
        role: 'switch'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
