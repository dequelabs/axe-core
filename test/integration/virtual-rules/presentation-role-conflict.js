describe('presentation-role-conflict virtual-rule', function () {
  it('should fail when role is presentation and aria-label is present', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'li',
      attributes: {
        role: 'presentation',
        'aria-label': 'foobar'
      }
    });

    var results = axe.runVirtualRule('presentation-role-conflict', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when role is none and aria-label is present', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'li',
      attributes: {
        role: 'none',
        'aria-label': 'foobar'
      }
    });

    var results = axe.runVirtualRule('presentation-role-conflict', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should be inapplicable when explicit role is presentation for element without conflict', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'presentation'
      }
    });

    var results = axe.runVirtualRule('presentation-role-conflict', node);

    assert.lengthOf(results.inapplicable, 1);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should be inapplicable when explicit role is none for element without conflict', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'none'
      }
    });

    var results = axe.runVirtualRule('presentation-role-conflict', node);

    assert.lengthOf(results.inapplicable, 1);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
  });

  it('should inapplicable when implicit role is presentation', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {}
    });

    var results = axe.runVirtualRule('presentation-role-conflict', node);

    assert.lengthOf(results.inapplicable, 1);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  //TODO this method name is strange, rename before merging -evaluate:15
  it('should ?? when explicit role is not presentation or none', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {}
    });

    var results = axe.runVirtualRule('presentation-role-conflict', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('TBI should set messageKey if not focusable and has global aria', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'h1',
      attributes: {}
    });

    var results = axe.runVirtualRule('presentation-role-conflict', node);

    assert.lengthOf(results.inapplicable, 1);
    //TODO assert message key/role
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  xit('TBI should set messageKey if no global aria and it is focusable', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {}
    });

    var results = axe.runVirtualRule('presentation-role-conflict', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  xit('TBI should set messageKey if it has both global aria and is focusable', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {}
    });

    var results = axe.runVirtualRule('presentation-role-conflict', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });
});
