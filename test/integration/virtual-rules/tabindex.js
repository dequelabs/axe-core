describe('tabindex virtual-rule', function () {
  it('should pass for tabindex = 0', function () {
    let node = {
      nodeName: 'div',
      attributes: {
        tabindex: 0
      }
    };

    let results = axe.runVirtualRule('tabindex', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for tabindex = -1', function () {
    let node = {
      nodeName: 'div',
      attributes: {
        tabindex: -1
      }
    };

    let results = axe.runVirtualRule('tabindex', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for tabindex > 0', function () {
    let node = {
      nodeName: 'div',
      attributes: {
        tabindex: 1
      }
    };

    let results = axe.runVirtualRule('tabindex', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
