describe('link-name virtual-rule', function () {
  it('should pass for aria-label', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        'aria-label': 'foobar'
      }
    });

    let results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        'aria-labelledby': 'foobar'
      }
    });

    let results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        title: 'foobar'
      }
    });
    node.children = [];

    let results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete when aria-label and children are missing', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html'
      }
    });

    let results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail when aria-label contains only whitespace', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        'aria-label': ' \t   \n   '
      }
    });
    node.children = [];

    let results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        'aria-label': ''
      }
    });
    node.children = [];

    let results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete if anchor is still focusable and missing children', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        role: 'presentation'
      }
    });

    let results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail if anchor is still focusable and no children', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        role: 'presentation'
      }
    });
    node.children = [];

    let results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        title: ''
      }
    });
    node.children = [];

    let results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
