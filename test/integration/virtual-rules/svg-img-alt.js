describe('svg-img-alt virtual-rule', () => {
  it('should pass for aria-label', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'svg',
      attributes: {
        role: 'img',
        'aria-label': 'foobar'
      }
    });

    const results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'svg',
      attributes: {
        role: 'graphics-document',
        'aria-labelledby': 'foobar'
      }
    });

    const results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', () => {
    const parent = new axe.SerialVirtualNode({
      nodeName: 'svg'
    });
    const node = new axe.SerialVirtualNode({
      nodeName: 'circle',
      attributes: {
        role: 'graphics-symbol',
        title: 'foobar'
      }
    });

    // children are required since titleText comes after subtree text
    // in accessible name calculation
    node.children = [];
    node.parent = parent;
    parent.children = [node];

    const results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for title element', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'svg',
      attributes: {
        role: 'img'
      }
    });
    const title = new axe.SerialVirtualNode({
      nodeName: 'title'
    });
    const text = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });

    title.children = [text];
    title.parent = node;
    node.children = [title];

    const results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete when aria-label and children are missing', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'svg',
      attributes: {
        role: 'img'
      }
    });

    const results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail when aria-label contains only whitespace', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'svg',
      attributes: {
        role: 'img',
        'aria-label': ' \t   \n   '
      }
    });
    node.children = [];

    const results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'svg',
      attributes: {
        role: 'img',
        'aria-label': ''
      }
    });
    node.children = [];

    const results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'svg',
      attributes: {
        role: 'img',
        title: ''
      }
    });
    node.children = [];

    const results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete when title element has missing children', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'svg',
      attributes: {
        role: 'img'
      }
    });
    const title = new axe.SerialVirtualNode({
      nodeName: 'title'
    });

    title.parent = node;
    node.children = [title];

    const results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });
});
