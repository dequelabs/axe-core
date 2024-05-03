describe('select-name virtual-rule', function () {
  it('should pass for aria-label', function () {
    let results = axe.runVirtualRule('select-name', {
      nodeName: 'select',
      attributes: {
        'aria-label': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', function () {
    let results = axe.runVirtualRule('select-name', {
      nodeName: 'select',
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
      nodeName: 'select'
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

    let results = axe.runVirtualRule('select-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for explicit label', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'select',
      attributes: {
        id: 'foobar'
      }
    });

    let results = axe.runVirtualRule('select-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', function () {
    let results = axe.runVirtualRule('select-name', {
      nodeName: 'select',
      attributes: {
        title: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=presentation when disabled', function () {
    let results = axe.runVirtualRule('select-name', {
      nodeName: 'select',
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
    let results = axe.runVirtualRule('select-name', {
      nodeName: 'select',
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
    let results = axe.runVirtualRule('select-name', {
      nodeName: 'select',
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
      nodeName: 'select',
      attributes: {
        'aria-label': ' \t   \n   '
      }
    });
    node.parent = null;

    let results = axe.runVirtualRule('select-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty and no implicit label', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'select',
      attributes: {
        'aria-label': ''
      }
    });
    node.parent = null;

    let results = axe.runVirtualRule('select-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty and no implicit label', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'select',
      attributes: {
        title: ''
      }
    });
    node.parent = null;

    let results = axe.runVirtualRule('select-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=presentation', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'select',
      attributes: {
        role: 'presentation'
      }
    });
    node.parent = null;

    let results = axe.runVirtualRule('select-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=none', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'select',
      attributes: {
        role: 'none'
      }
    });
    node.parent = null;

    let results = axe.runVirtualRule('select-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
