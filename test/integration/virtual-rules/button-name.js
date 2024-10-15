describe('button-name virtual-rule', () => {
  it('should pass for aria-label', () => {
    const results = axe.runVirtualRule('button-name', {
      nodeName: 'button',
      attributes: {
        'aria-label': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {
        'aria-labelledby': 'foobar'
      }
    });
    node.parent = null;

    const results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', () => {
    const results = axe.runVirtualRule('button-name', {
      nodeName: 'button',
      attributes: {
        title: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=presentation when disabled', () => {
    const results = axe.runVirtualRule('button-name', {
      nodeName: 'button',
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
    const results = axe.runVirtualRule('button-name', {
      nodeName: 'button',
      attributes: {
        role: 'none',
        disabled: true
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for visible text content', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'button'
    });
    const child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    node.children = [child];

    const results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for hidden text', () => {
    const button = new axe.SerialVirtualNode({
      nodeName: 'button'
    });

    const span = new axe.SerialVirtualNode({
      nodeName: 'span',
      attributes: {
        'aria-hidden': true
      }
    });
    span.parent = button;
    button.children = [span];

    const text = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    text.parent = span;
    span.children = [text];
    button.parent = null;

    const results = axe.runVirtualRule('button-name', button);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete when alt and children are missing', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {}
    });
    node.parent = null;

    const results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail children contain no visible text', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'button'
    });
    node.children = [];
    node.parent = null;

    const results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when alt contains only whitespace', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {
        alt: ' \t   \n   '
      }
    });
    node.children = [];
    node.parent = null;

    const results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {
        alt: ''
      }
    });
    node.children = [];
    node.parent = null;

    const results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {
        title: ''
      }
    });
    node.children = [];
    node.parent = null;

    const results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for implicit label', function () {
    const node = new axe.SerialVirtualNode({
      nodeName: 'button'
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
    node.children = [];
    parent.children = [child, node];

    const results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for explicit label', function () {
    const node = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {
        id: 'foobar'
      }
    });
    node.parent = null;

    const results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail for role=presentation', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {
        role: 'presentation'
      }
    });
    node.children = [];
    node.parent = null;

    const results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for role=none', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {
        role: 'none'
      }
    });
    node.children = [];
    node.parent = null;

    const results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
