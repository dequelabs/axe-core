describe('tabindex virtual-rule', function () {
  it('should pass for tabindex = 0', function () {
    var node = {
      nodeName: 'div',
      attributes: {
        tabindex: 0
      }
    };

    var results = axe.runVirtualRule('tabindex', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for tabindex = -1', function () {
    var node = {
      nodeName: 'div',
      attributes: {
        tabindex: -1
      }
    };

    var results = axe.runVirtualRule('tabindex', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for tabindex > 0', function () {
    var node = {
      nodeName: 'div',
      attributes: {
        tabindex: 1
      }
    };

    var results = axe.runVirtualRule('tabindex', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
