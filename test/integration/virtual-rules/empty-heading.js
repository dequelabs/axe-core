describe('empty-heading virtual-rule', () => {
  it('should pass with visible text', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'h1',
      attributes: {}
    });
    const child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'OK',
      attributes: {}
    });

    node.children = [child];

    const results = axe.runVirtualRule('empty-heading', node);

    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
    assert.lengthOf(results.passes, 1);
  });

  it('should incomplete if no other properties are set', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'h1'
    });

    const results = axe.runVirtualRule('empty-heading', node);

    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
    assert.lengthOf(results.passes, 0);
  });

  it('should pass for title', () => {
    const results = axe.runVirtualRule('empty-heading', {
      nodeName: 'h1',
      attributes: {
        title: 'it has a title'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass on explicit role', () => {
    const results = axe.runVirtualRule('empty-heading', {
      nodeName: 'span',
      attributes: {
        role: 'heading',
        title: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass on implicit role', () => {
    const results = axe.runVirtualRule('empty-heading', {
      nodeName: 'h1',
      attributes: {
        title: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for aria-label', () => {
    const results = axe.runVirtualRule('empty-heading', {
      nodeName: 'h1',
      attributes: {
        'aria-label': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'h1',
      attributes: {
        'aria-label': ''
      }
    });
    node.children = [];

    const results = axe.runVirtualRule('empty-heading', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', () => {
    const results = axe.runVirtualRule('empty-heading', {
      nodeName: 'h1',
      attributes: {
        'aria-labelledby': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail when title is empty', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'h1',
      attributes: {
        title: ''
      }
    });
    node.children = [];

    const results = axe.runVirtualRule('empty-heading', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail in order to account for presentation conflict resolution', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'h1',
      attributes: {
        role: 'none',
        'aria-label': ''
      }
    });
    node.children = [];

    const results = axe.runVirtualRule('empty-heading', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
