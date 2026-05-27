describe('aria-input-field-name virtual-rule', () => {
  it('should pass for aria-label', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'combobox',
        'aria-label': 'foobar'
      }
    });
    node.parent = null;

    const results = axe.runVirtualRule('aria-input-field-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'listbox',
        'aria-labelledby': 'foobar'
      }
    });
    node.parent = null;

    const results = axe.runVirtualRule('aria-input-field-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'searchbox',
        title: 'foobar'
      }
    });
    // children are required since titleText comes after subtree text
    // in accessible name calculation
    node.children = [];
    node.parent = null;

    const results = axe.runVirtualRule('aria-input-field-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label contains only whitespace', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'spinbutton',
        'aria-label': ' \t   \n   '
      }
    });
    node.children = [];

    const results = axe.runVirtualRule('aria-input-field-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'textbox',
        'aria-label': ''
      }
    });
    node.children = [];

    const results = axe.runVirtualRule('aria-input-field-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'combobox',
        title: ''
      }
    });
    node.children = [];

    const results = axe.runVirtualRule('aria-input-field-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete if has explicit and implicit label', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'listbox',
        'aria-label': 'name'
      }
    });
    const parent = new axe.SerialVirtualNode({
      nodeName: 'label'
    });
    const child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'first name'
    });
    node.parent = parent;
    node.children = [];
    parent.children = [child, node];

    const results = axe.runVirtualRule('aria-input-field-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });
});
