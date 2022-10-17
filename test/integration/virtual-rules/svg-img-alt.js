describe('svg-img-alt virtual-rule', function () {
  it('should pass for aria-label', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'svg',
      attributes: {
        role: 'img',
        'aria-label': 'foobar'
      }
    });

    var results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'svg',
      attributes: {
        role: 'graphics-document',
        'aria-labelledby': 'foobar'
      }
    });

    var results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', function () {
    var parent = new axe.SerialVirtualNode({
      nodeName: 'svg'
    });
    var node = new axe.SerialVirtualNode({
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

    var results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for title element', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'svg',
      attributes: {
        role: 'img'
      }
    });
    var title = new axe.SerialVirtualNode({
      nodeName: 'title'
    });
    var text = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });

    title.children = [text];
    title.parent = node;
    node.children = [title];

    var results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete when aria-label and children are missing', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'svg',
      attributes: {
        role: 'img'
      }
    });

    var results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail when aria-label contains only whitespace', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'svg',
      attributes: {
        role: 'img',
        'aria-label': ' \t   \n   '
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'svg',
      attributes: {
        role: 'img',
        'aria-label': ''
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'svg',
      attributes: {
        role: 'img',
        title: ''
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete when title element has missing children', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'svg',
      attributes: {
        role: 'img'
      }
    });
    var title = new axe.SerialVirtualNode({
      nodeName: 'title'
    });

    title.parent = node;
    node.children = [title];

    var results = axe.runVirtualRule('svg-img-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });
});
