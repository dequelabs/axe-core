describe('meta-refresh-no-exceptions virtual-rule', () => {
  it('should be inapplicable for missing content', () => {
    const results = axe.runVirtualRule('meta-refresh-no-exceptions', {
      nodeName: 'meta',
      attributes: {
        'http-equiv': 'refresh'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
    assert.lengthOf(results.inapplicable, 1);
  });

  it('should pass for content=0', () => {
    const results = axe.runVirtualRule('meta-refresh-no-exceptions', {
      nodeName: 'meta',
      attributes: {
        'http-equiv': 'refresh',
        content: '0'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for content=0 and url', () => {
    const results = axe.runVirtualRule('meta-refresh-no-exceptions', {
      nodeName: 'meta',
      attributes: {
        'http-equiv': 'refresh',
        content: '0;url=http://example.com/'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for content equal to 72000', () => {
    const results = axe.runVirtualRule('meta-refresh-no-exceptions', {
      nodeName: 'meta',
      attributes: {
        'http-equiv': 'refresh',
        content: '72000'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for content other greater than 72000', () => {
    const results = axe.runVirtualRule('meta-refresh-no-exceptions', {
      nodeName: 'meta',
      attributes: {
        'http-equiv': 'refresh',
        content: '72001'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for content other than 0 and url', () => {
    const results = axe.runVirtualRule('meta-refresh-no-exceptions', {
      nodeName: 'meta',
      attributes: {
        'http-equiv': 'refresh',
        content: '72001;url=http://example.com/'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
