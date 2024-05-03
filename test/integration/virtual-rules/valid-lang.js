describe('valid-lang virtual-rule', function () {
  it('should pass for valid lang value', function () {
    let node = {
      nodeName: 'div',
      attributes: {
        lang: 'en'
      }
    };

    let results = axe.runVirtualRule('valid-lang', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for valid xml:lang value', function () {
    let node = {
      nodeName: 'div',
      attributes: {
        'xml:lang': 'en'
      }
    };

    let results = axe.runVirtualRule('valid-lang', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for valid L10N lang value', function () {
    let node = {
      nodeName: 'div',
      attributes: {
        lang: 'en-GB'
      }
    };

    let results = axe.runVirtualRule('valid-lang', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for valid L10N xml:lang value', function () {
    let node = {
      nodeName: 'div',
      attributes: {
        'xml:lang': 'en-GB'
      }
    };

    let results = axe.runVirtualRule('valid-lang', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for invalid lang value', function () {
    let node = {
      nodeName: 'div',
      attributes: {
        lang: 'a'
      }
    };

    let results = axe.runVirtualRule('valid-lang', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for invalid L10N xml:lang value', function () {
    let node = {
      nodeName: 'div',
      attributes: {
        'xml:lang': 'a'
      }
    };

    let results = axe.runVirtualRule('valid-lang', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should not apply for html element', function () {
    let node = {
      nodeName: 'html',
      attributes: {
        'xml:lang': 'a'
      }
    };

    let results = axe.runVirtualRule('valid-lang', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
    assert.lengthOf(results.inapplicable, 1);
  });
});
