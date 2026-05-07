describe('select-name virtual-rule', () => {
  it('should pass for aria-label', () => {
    const results = axe.runVirtualRule('select-name', {
      nodeName: 'select',
      attributes: {
        'aria-label': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', () => {
    const results = axe.runVirtualRule('select-name', {
      nodeName: 'select',
      attributes: {
        'aria-labelledby': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for implicit label', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'select'
    });
    const parent = new axe.SerialVirtualNode({
      nodeName: 'label'
    });
    const child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    node.parent = parent;
    parent.children = [child, node];

    const results = axe.runVirtualRule('select-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for explicit label', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'select',
      attributes: {
        id: 'foobar'
      }
    });

    const results = axe.runVirtualRule('select-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', () => {
    const results = axe.runVirtualRule('select-name', {
      nodeName: 'select',
      attributes: {
        title: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=presentation when disabled', () => {
    const results = axe.runVirtualRule('select-name', {
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

  it('should pass for role=none when disabled', () => {
    const results = axe.runVirtualRule('select-name', {
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

  it('should incomplete for both missing aria-label and implicit label', () => {
    const results = axe.runVirtualRule('select-name', {
      nodeName: 'select',
      attributes: {
        'aria-label': ''
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail when aria-label contains only whitespace and no implicit label', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'select',
      attributes: {
        'aria-label': ' \t   \n   '
      }
    });
    node.parent = null;

    const results = axe.runVirtualRule('select-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty and no implicit label', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'select',
      attributes: {
        'aria-label': ''
      }
    });
    node.parent = null;

    const results = axe.runVirtualRule('select-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty and no implicit label', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'select',
      attributes: {
        title: ''
      }
    });
    node.parent = null;

    const results = axe.runVirtualRule('select-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=presentation', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'select',
      attributes: {
        role: 'presentation'
      }
    });
    node.parent = null;

    const results = axe.runVirtualRule('select-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=none', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'select',
      attributes: {
        role: 'none'
      }
    });
    node.parent = null;

    const results = axe.runVirtualRule('select-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
