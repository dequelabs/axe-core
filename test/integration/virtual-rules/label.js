describe('label virtual-rule', function () {
  it('should not apply if input type is hidden', function () {
    let results = axe.runVirtualRule('label', {
      nodeName: 'input',
      attributes: {
        type: 'hidden'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
    assert.lengthOf(results.inapplicable, 1);
  });

  it('should pass for aria-label (input)', function () {
    let results = axe.runVirtualRule('label', {
      nodeName: 'input',
      attributes: {
        'aria-label': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for aria-label (textarea)', function () {
    let results = axe.runVirtualRule('label', {
      nodeName: 'textarea',
      attributes: {
        'aria-label': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', function () {
    let results = axe.runVirtualRule('label', {
      nodeName: 'input',
      attributes: {
        'aria-labelledby': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for implicit label', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'input'
    });
    let parent = new axe.SerialVirtualNode({
      nodeName: 'label'
    });
    let child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    node.parent = parent;
    parent.children = [child, node];

    let results = axe.runVirtualRule('label', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for explicit label', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'input',
      attributes: {
        id: 'foobar'
      }
    });

    let results = axe.runVirtualRule('label', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', function () {
    let results = axe.runVirtualRule('label', {
      nodeName: 'input',
      attributes: {
        title: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=presentation when disabled', function () {
    let results = axe.runVirtualRule('label', {
      nodeName: 'input',
      attributes: {
        role: 'presentation',
        disabled: true
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=none when disabled', function () {
    let results = axe.runVirtualRule('label', {
      nodeName: 'input',
      attributes: {
        role: 'none',
        disabled: true
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for both missing aria-label and implicit label', function () {
    let results = axe.runVirtualRule('label', {
      nodeName: 'input',
      attributes: {
        'aria-label': ''
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail when aria-label contains only whitespace and no implicit label', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'input',
      attributes: {
        'aria-label': ' \t   \n   '
      }
    });
    node.parent = null;

    let results = axe.runVirtualRule('label', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty and no implicit label', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'input',
      attributes: {
        'aria-label': ''
      }
    });
    node.parent = null;

    let results = axe.runVirtualRule('label', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty and no implicit label', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'input',
      attributes: {
        title: ''
      }
    });
    node.parent = null;

    let results = axe.runVirtualRule('label', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for role=presentation', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'input',
      attributes: {
        role: 'presentation'
      }
    });
    node.parent = null;

    let results = axe.runVirtualRule('label', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for role=none', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'input',
      attributes: {
        role: 'presentation'
      }
    });
    node.parent = null;

    let results = axe.runVirtualRule('label', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
