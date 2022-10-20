describe('link-name virtual-rule', function () {
  it('should pass for aria-label', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        'aria-label': 'foobar'
      }
    });

    var results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        'aria-labelledby': 'foobar'
      }
    });

    var results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        title: 'foobar'
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete when aria-label and children are missing', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html'
      }
    });

    var results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail when aria-label contains only whitespace', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        'aria-label': ' \t   \n   '
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        'aria-label': ''
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete if anchor is still focusable and missing children', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        role: 'presentation'
      }
    });

    var results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail if anchor is still focusable and no children', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        role: 'presentation'
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        href: '/foo.html',
        title: ''
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('link-name', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
