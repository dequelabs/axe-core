describe('input-button-name virtual-rule', function () {
  it('should pass for type=submit without value', function () {
    var results = axe.runVirtualRule('input-button-name', {
      nodeName: 'input',
      attributes: {
        type: 'submit'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for value', function () {
    var results = axe.runVirtualRule('input-button-name', {
      nodeName: 'input',
      attributes: {
        type: 'button',
        value: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for aria-label', function () {
    var results = axe.runVirtualRule('input-button-name', {
      nodeName: 'input',
      attributes: {
        type: 'button',
        'aria-label': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', function () {
    var results = axe.runVirtualRule('input-button-name', {
      nodeName: 'input',
      attributes: {
        type: 'button',
        'aria-labelledby': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', function () {
    var results = axe.runVirtualRule('input-button-name', {
      nodeName: 'input',
      attributes: {
        type: 'button',
        title: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=presentation when disabled', function () {
    var results = axe.runVirtualRule('input-button-name', {
      nodeName: 'input',
      attributes: {
        type: 'button',
        role: 'presentation',
        disabled: true
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=none when disabled', function () {
    var results = axe.runVirtualRule('input-button-name', {
      nodeName: 'input',
      attributes: {
        type: 'button',
        role: 'none',
        disabled: true
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when no other attributes are passed', function () {
    var results = axe.runVirtualRule('input-button-name', {
      nodeName: 'input',
      attributes: {
        type: 'button'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when value is empty', function () {
    var results = axe.runVirtualRule('input-button-name', {
      nodeName: 'input',
      attributes: {
        type: 'button',
        value: ''
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when alt contains only whitespace', function () {
    var results = axe.runVirtualRule('input-button-name', {
      nodeName: 'input',
      attributes: {
        type: 'button',
        alt: ' \t   \n   '
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', function () {
    var results = axe.runVirtualRule('input-button-name', {
      nodeName: 'input',
      attributes: {
        type: 'button',
        'aria-label': ''
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', function () {
    var results = axe.runVirtualRule('input-button-name', {
      nodeName: 'input',
      attributes: {
        type: 'button',
        title: ''
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=presentation', function () {
    var results = axe.runVirtualRule('input-button-name', {
      nodeName: 'input',
      attributes: {
        type: 'button',
        role: 'presentation'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=none', function () {
    var results = axe.runVirtualRule('input-button-name', {
      nodeName: 'input',
      attributes: {
        type: 'button',
        role: 'none'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
