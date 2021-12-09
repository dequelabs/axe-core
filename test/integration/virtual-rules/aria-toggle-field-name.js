describe('aria-toggle-field-name virtual-rule', function () {
  it('should pass for aria-label', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'menuitemcheckbox',
        'aria-label': 'foobar'
      }
    });
    node.parent = null;

    var results = axe.runVirtualRule('aria-toggle-field-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', function () {
    var results = axe.runVirtualRule('aria-toggle-field-name', {
      nodeName: 'div',
      attributes: {
        role: 'menuitemradio',
        'aria-labelledby': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'checkbox',
        title: 'foobar'
      }
    });
    // children are required since titleText comes after subtree text
    // in accessible name calculation
    node.children = [];
    node.parent = null;

    var results = axe.runVirtualRule('aria-toggle-field-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for visible text content', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'radio'
      }
    });
    var child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    node.children = [child];
    node.parent = null;

    var results = axe.runVirtualRule('aria-toggle-field-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for hidden text', function () {
    var button = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'radio'
      }
    });

    var span = new axe.SerialVirtualNode({
      nodeName: 'span',
      attributes: {
        'aria-hidden': true
      }
    });
    span.parent = button;
    button.children = [span];

    var text = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    text.parent = span;
    span.children = [text];

    var results = axe.runVirtualRule('aria-toggle-field-name', button);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete when children are missing', function () {
    var results = axe.runVirtualRule('aria-toggle-field-name', {
      nodeName: 'div',
      attributes: {
        role: 'switch'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail children contain no visible text', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'option'
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('aria-toggle-field-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label contains only whitespace', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'menuitemcheckbox',
        'aria-label': ' \t   \n   '
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('aria-toggle-field-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'menuitemcheckbox',
        'aria-label': ''
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('aria-toggle-field-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'menuitemcheckbox',
        title: ''
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('aria-toggle-field-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete if has explicit and implicit label', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'menuitemcheckbox',
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

    var results = axe.runVirtualRule('aria-toggle-field-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });
});
