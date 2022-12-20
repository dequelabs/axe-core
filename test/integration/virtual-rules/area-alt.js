describe('area-alt virtual-rule', function () {
  it('should pass for aria-label', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'map'
    });
    var child = new axe.SerialVirtualNode({
      nodeName: 'area',
      attributes: {
        href: 'foobar',
        'aria-label': 'foobar'
      }
    });
    child.parent = node;
    node.children = [child];

    var results = axe.runVirtualRule('area-alt', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'map'
    });
    var child = new axe.SerialVirtualNode({
      nodeName: 'area',
      attributes: {
        href: 'foobar',
        'aria-labelledby': 'foobar'
      }
    });
    child.parent = node;
    node.children = [child];

    var results = axe.runVirtualRule('area-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for alt', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'map'
    });
    var child = new axe.SerialVirtualNode({
      nodeName: 'area',
      attributes: {
        href: 'foobar',
        alt: 'foobar'
      }
    });
    child.parent = node;
    node.children = [child];

    var results = axe.runVirtualRule('area-alt', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for title', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'map'
    });
    var child = new axe.SerialVirtualNode({
      nodeName: 'area',
      attributes: {
        href: 'foobar',
        title: 'foobar'
      }
    });
    // children are required since titleText comes after subtree text
    // in accessible name calculation
    child.children = [];
    child.parent = node;
    node.children = [child];

    var results = axe.runVirtualRule('area-alt', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when alt contains only whitespace', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'map'
    });
    var child = new axe.SerialVirtualNode({
      nodeName: 'area',
      attributes: {
        href: 'foobar',
        alt: ' \t   \n   '
      }
    });
    child.parent = node;
    node.children = [child];

    var results = axe.runVirtualRule('area-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'map'
    });
    var child = new axe.SerialVirtualNode({
      nodeName: 'area',
      attributes: {
        href: 'foobar',
        'aria-label': ''
      }
    });
    child.parent = node;
    node.children = [child];

    var results = axe.runVirtualRule('area-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'map'
    });
    var child = new axe.SerialVirtualNode({
      nodeName: 'area',
      attributes: {
        href: 'foobar',
        title: ''
      }
    });
    child.children = [];
    child.parent = node;
    node.children = [child];

    var results = axe.runVirtualRule('area-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
