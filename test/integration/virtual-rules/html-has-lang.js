describe('html-has-lang virtual-rule', function () {
  it('should pass for lang', function () {
    var results = axe.runVirtualRule('html-has-lang', {
      nodeName: 'html',
      attributes: {
        lang: 'en'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for lang and xml:lang', function () {
    var results = axe.runVirtualRule('html-has-lang', {
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

  it('should fail for missing lang', function () {
    var results = axe.runVirtualRule('html-has-lang', {
      nodeName: 'html'
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for just xml:lang', function () {
    var results = axe.runVirtualRule('html-has-lang', {
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
