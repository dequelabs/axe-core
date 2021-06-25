describe('aria-valid-attr-value virtual-rule', function() {
  it('should pass for valid values', function() {
    var results = axe.runVirtualRule('aria-valid-attr-value', {
      nodeName: 'div',
      attributes: {
        role: 'slider',
        'aria-valuemin': 1,
        'aria-valuetext': 'Range',
        'aria-expanded': false,
        'aria-haspopup': 'grid',
        'aria-valuenow': 2.1
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for invalid values', function() {
    var results = axe.runVirtualRule('aria-valid-attr-value', {
      nodeName: 'div',
      attributes: {
        role: 'slider',
        'aria-valuemin': true,
        'aria-valuetext': '',
        'aria-expanded': 'grid',
        'aria-haspopup': 'Range',
        'aria-valuenow': false
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);

    assert.lengthOf(results.violations[0].nodes[0].all[0].data, 4);
  });
});
