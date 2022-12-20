describe('aria-allowed-role virtual-rule', function () {
  afterEach(function () {
    axe.reset();
  });

  it('should pass for allowed role', function () {
    var results = axe.runVirtualRule('aria-allowed-role', {
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

  it('should fail for unallowed role', function () {
    var results = axe.runVirtualRule('aria-allowed-role', {
      nodeName: 'dd',
      attributes: {
        role: 'link'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for element with ignored option', function () {
    axe.configure({
      checks: [
        {
          id: 'aria-allowed-role',
          options: {
            ignoredTags: ['dd']
          }
        }
      ]
    });

    var results = axe.runVirtualRule('aria-allowed-role', {
      nodeName: 'dd',
      attributes: {
        role: 'link'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for hidden element', function () {
    var results = axe.runVirtualRule('aria-allowed-role', {
      nodeName: 'dd',
      attributes: {
        'aria-hidden': true,
        role: 'link'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should incomplete for hidden element parent', function () {
    var vNode = new axe.SerialVirtualNode({
      nodeName: 'dd',
      attributes: {
        role: 'link'
      }
    });
    var parent = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-hidden': true
      }
    });
    parent.children = [vNode];
    vNode.parent = parent;

    var results = axe.runVirtualRule('aria-allowed-role', vNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });
});
