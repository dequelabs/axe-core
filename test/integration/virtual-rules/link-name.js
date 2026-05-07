describe('link-name virtual-rule', () => {
  it('should pass for aria-label', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        'aria-label': 'foobar'
      }
    });

    const results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        'aria-labelledby': 'foobar'
      }
    });

    const results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        title: 'foobar'
      }
    });
    node.children = [];

    const results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete when aria-label and children are missing', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html'
      }
    });

    const results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail when aria-label contains only whitespace', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        'aria-label': ' \t   \n   '
      }
    });
    node.children = [];

    const results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        'aria-label': ''
      }
    });
    node.children = [];

    const results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete if anchor is still focusable and missing children', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        role: 'presentation'
      }
    });

    const results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail if anchor is still focusable and no children', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        role: 'presentation'
      }
    });
    node.children = [];

    const results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        title: ''
      }
    });
    node.children = [];

    const results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
