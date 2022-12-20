describe('aria-valid-attr virtual-rule', function () {
  it('should pass for valid aria attrs', function () {
    var results = axe.runVirtualRule('aria-valid-attr', {
      nodeName: 'button',
      attributes: {
        'aria-expanded': true,
        'aria-label': 'Expand'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for invalid aria attr', function () {
    var results = axe.runVirtualRule('aria-valid-attr', {
      nodeName: 'button',
      attributes: {
        'aria-expanded': true,
        'aria-undefined': 'Expand'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass when configured to accept attribute names', function () {
    axe.configure({
      checks: [
        {
          id: 'aria-valid-attr',
          options: ['aria-undefined']
        }
      ]
    });

    var results = axe.runVirtualRule('aria-valid-attr', {
      nodeName: 'button',
      attributes: {
        'aria-expanded': true,
        'aria-undefined': 'Expand'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });
});
