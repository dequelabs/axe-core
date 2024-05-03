describe('button-name virtual-rule', function () {
  it('should pass for aria-label', function () {
    let results = axe.runVirtualRule('button-name', {
      nodeName: 'button',
      attributes: {
        'aria-label': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', function () {
    let results = axe.runVirtualRule('button-name', {
      nodeName: 'button',
      attributes: {
        'aria-labelledby': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', function () {
    let results = axe.runVirtualRule('button-name', {
      nodeName: 'button',
      attributes: {
        title: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=presentation when disabled', function () {
    let results = axe.runVirtualRule('button-name', {
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

  it('should pass for role=none when disabled', function () {
    let results = axe.runVirtualRule('button-name', {
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

  it('should pass for visible text content', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'button'
    });
    let child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    node.children = [child];

    let results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for hidden text', function () {
    let button = new axe.SerialVirtualNode({
      nodeName: 'button'
    });

    let span = new axe.SerialVirtualNode({
      nodeName: 'span',
      attributes: {
        'aria-hidden': true
      }
    });
    span.parent = button;
    button.children = [span];

    let text = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    text.parent = span;
    span.children = [text];

    let results = axe.runVirtualRule('button-name', button);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete when alt and children are missing', function () {
    let results = axe.runVirtualRule('button-name', {
      nodeName: 'button',
      attributes: {}
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail children contain no visible text', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'button'
    });
    node.children = [];

    let results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when alt contains only whitespace', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {
        alt: ' \t   \n   '
      }
    });
    node.children = [];

    let results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {
        alt: ''
      }
    });
    node.children = [];

    let results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {
        title: ''
      }
    });
    node.children = [];

    let results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for role=presentation', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {
        role: 'presentation'
      }
    });
    node.children = [];

    let results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for role=none', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {
        role: 'none'
      }
    });
    node.children = [];

    let results = axe.runVirtualRule('button-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
