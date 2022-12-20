describe('html-lang-valid virtual-rule', function () {
  it('is inapplicable without lang or xml:lang', function () {
    // Error caught by html-has-lang instead
    var results = axe.runVirtualRule('html-lang-valid', {
      nodeName: 'html',
      attributes: {}
    });

    assert.lengthOf(results.inapplicable, 1);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('is inapplicable with empty lang or xml:lang', function () {
    // Error caught by html-has-lang instead
    var results = axe.runVirtualRule('html-lang-valid', {
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

  it('should pass with a valid lang', function () {
    var results = axe.runVirtualRule('html-lang-valid', {
      nodeName: 'html',
      attributes: {
        lang: 'en'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass with a valid xml:lang', function () {
    var results = axe.runVirtualRule('html-lang-valid', {
      nodeName: 'html',
      attributes: {
        'xml:lang': 'en'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for both lang and xml:lang', function () {
    var results = axe.runVirtualRule('html-lang-valid', {
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

  it('should fail with an invalid lang', function () {
    var results = axe.runVirtualRule('html-lang-valid', {
      nodeName: 'html',
      attributes: {
        lang: 'invalid'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail with an invalid xml:lang', function () {
    var results = axe.runVirtualRule('html-lang-valid', {
      nodeName: 'html',
      attributes: {
        'xml:lang': 'invalid'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail with an invalid lang, and explicitly no children', function () {
    var html = new axe.SerialVirtualNode({
      nodeName: 'html',
      attributes: {
        lang: 'invalid'
      }
    });
    html.children = [];

    var results = axe.runVirtualRule('html-lang-valid', html);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
