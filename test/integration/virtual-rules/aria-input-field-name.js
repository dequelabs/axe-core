describe('aria-input-field-name virtual-rule', function () {
  it('should pass for aria-label', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'combobox',
        'aria-label': 'foobar'
      }
    });
    node.parent = null;

    var results = axe.runVirtualRule('aria-input-field-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'listbox',
        'aria-labelledby': 'foobar'
      }
    });
    node.parent = null;

    var results = axe.runVirtualRule('aria-input-field-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', function () {
    var node = new axe.SerialVirtualNode({
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

    var results = axe.runVirtualRule('aria-input-field-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label contains only whitespace', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'spinbutton',
        'aria-label': ' \t   \n   '
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('aria-input-field-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'textbox',
        'aria-label': ''
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('aria-input-field-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'combobox',
        title: ''
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('aria-input-field-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete if has explicit and implicit label', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'listbox',
        'aria-label': 'name'
      }
    });
    var parent = new axe.SerialVirtualNode({
      nodeName: 'label'
    });
    var child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'first name'
    });
    node.parent = parent;
    node.children = [];
    parent.children = [child, node];

    var results = axe.runVirtualRule('aria-input-field-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });
});
