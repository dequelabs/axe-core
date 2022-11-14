describe('aria-allowed-attr virtual-rule', function () {
  it('should pass for required attributes', function () {
    var results = axe.runVirtualRule('aria-allowed-attr', {
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

  it('should pass for allowed attributes', function () {
    var results = axe.runVirtualRule('aria-allowed-attr', {
      nodeName: 'div',
      attributes: {
        role: 'radio',
        'aria-required': true,
        'aria-checked': true
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for invalid attributes', function () {
    var results = axe.runVirtualRule('aria-allowed-attr', {
      nodeName: 'div',
      attributes: {
        role: 'dialog',
        'aria-cats': true
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for global attributes and element with no role', function () {
    var results = axe.runVirtualRule('aria-allowed-attr', {
      nodeName: 'div',
      attributes: {
        'aria-busy': true
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for non-global attributes and element with no role', function () {
    var results = axe.runVirtualRule('aria-allowed-attr', {
      nodeName: 'div',
      attributes: {
        'aria-checked': true
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for unallowed attributes', function () {
    var results = axe.runVirtualRule('aria-allowed-attr', {
      nodeName: 'div',
      attributes: {
        role: 'link',
        'aria-selected': true
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for unallowed attributes - implicit role', function () {
    var results = axe.runVirtualRule('aria-allowed-attr', {
      nodeName: 'a',
      attributes: {
        href: '#',
        'aria-selected': true
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for unsupported attributes', function () {
    axe.configure({
      standards: {
        ariaAttrs: {
          'aria-mccheddarton': {
            unsupported: true
          }
        }
      }
    });

    var results = axe.runVirtualRule('aria-allowed-attr', {
      nodeName: 'div',
      attributes: {
        role: 'checkbox',
        'aria-mccheddarton': true
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for non-global attributes and custom element', function () {
    var results = axe.runVirtualRule('aria-allowed-attr', {
      nodeName: 'custom-elm1',
      attributes: {
        'aria-checked': true
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });
});
