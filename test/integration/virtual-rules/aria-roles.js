describe('aria-roles virtual-rule', function () {
  it('should pass for valid role', function () {
    var results = axe.runVirtualRule('aria-roles', {
      nodeName: 'div',
      attributes: {
        role: 'alert'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for abstract role', function () {
    var results = axe.runVirtualRule('aria-roles', {
      nodeName: 'div',
      attributes: {
        role: 'command'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for invalid role', function () {
    var results = axe.runVirtualRule('aria-roles', {
      nodeName: 'div',
      attributes: {
        role: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for fallback role', function () {
    var results = axe.runVirtualRule('aria-roles', {
      nodeName: 'div',
      attributes: {
        role: 'presentation none'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for unsupported role', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          alert: {
            unsupported: true
          }
        }
      }
    });

    var results = axe.runVirtualRule('aria-roles', {
      nodeName: 'div',
      attributes: {
        role: 'alert'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
