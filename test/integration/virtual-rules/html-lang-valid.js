describe('html-lang-valid virtual-rule', () => {
  it('is inapplicable without lang or xml:lang', () => {
    // Error caught by html-has-lang instead
    const results = axe.runVirtualRule('html-lang-valid', {
      nodeName: 'html',
      attributes: {}
    });

    assert.lengthOf(results.inapplicable, 1);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('is inapplicable with empty lang or xml:lang', () => {
    // Error caught by html-has-lang instead
    const results = axe.runVirtualRule('html-lang-valid', {
      nodeName: 'html',
      attributes: {
        lang: ''
      }
    });

    assert.lengthOf(results.inapplicable, 1);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass with a valid lang', () => {
    const results = axe.runVirtualRule('html-lang-valid', {
      nodeName: 'html',
      attributes: {
        lang: 'en'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass with a valid xml:lang', () => {
    const results = axe.runVirtualRule('html-lang-valid', {
      nodeName: 'html',
      attributes: {
        'xml:lang': 'en'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for both lang and xml:lang', () => {
    const results = axe.runVirtualRule('html-lang-valid', {
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

  it('should fail with an invalid lang', () => {
    const results = axe.runVirtualRule('html-lang-valid', {
      nodeName: 'html',
      attributes: {
        lang: 'invalid'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail with an invalid xml:lang', () => {
    const results = axe.runVirtualRule('html-lang-valid', {
      nodeName: 'html',
      attributes: {
        'xml:lang': 'invalid'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail with an invalid lang, and explicitly no children', () => {
    const html = new axe.SerialVirtualNode({
      nodeName: 'html',
      attributes: {
        lang: 'invalid'
      }
    });
    html.children = [];

    const results = axe.runVirtualRule('html-lang-valid', html);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
