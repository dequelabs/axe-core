describe('meta-viewport virtual-rule', function () {
  it('should pass for missing user-scalable', function () {
    var results = axe.runVirtualRule('meta-viewport', {
      nodeName: 'meta',
      attributes: {
        name: 'viewport',
        content: 'foo=bar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for user-scalable=yes', function () {
    var results = axe.runVirtualRule('meta-viewport', {
      nodeName: 'meta',
      attributes: {
        name: 'viewport',
        content: 'user-scalable=yes'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass comma-separated list', function () {
    var results = axe.runVirtualRule('meta-viewport', {
      nodeName: 'meta',
      attributes: {
        name: 'viewport',
        content: 'foo=bar, user-scalable=yes'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass semicolon-separated list', function () {
    var results = axe.runVirtualRule('meta-viewport', {
      nodeName: 'meta',
      attributes: {
        name: 'viewport',
        content: 'foo=bar; user-scalable=yes'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for user-scalable=no', function () {
    var results = axe.runVirtualRule('meta-viewport', {
      nodeName: 'meta',
      attributes: {
        name: 'viewport',
        content: 'user-scalable=no'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for user-scalable=0', function () {
    var results = axe.runVirtualRule('meta-viewport', {
      nodeName: 'meta',
      attributes: {
        name: 'viewport',
        content: 'user-scalable=0'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for maximum-scale=yes', function () {
    var results = axe.runVirtualRule('meta-viewport', {
      nodeName: 'meta',
      attributes: {
        name: 'viewport',
        content: 'maximum-scale=yes'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
