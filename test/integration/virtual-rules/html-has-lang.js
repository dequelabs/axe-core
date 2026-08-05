describe('html-has-lang virtual-rule', () => {
  it('should pass for lang', () => {
    const results = axe.runVirtualRule('html-has-lang', {
      nodeName: 'html',
      attributes: {
        lang: 'en'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for lang and xml:lang', () => {
    const results = axe.runVirtualRule('html-has-lang', {
      nodeName: 'html',
      attributes: {
        lang: 'en',
        'xml:lang': 'en'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for missing lang', () => {
    const results = axe.runVirtualRule('html-has-lang', {
      nodeName: 'html'
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for just xml:lang', () => {
    const results = axe.runVirtualRule('html-has-lang', {
      nodeName: 'html',
      attributes: {
        'xml:lang': 'en'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
