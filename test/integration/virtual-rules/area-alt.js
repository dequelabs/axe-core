describe('area-alt virtual-rule', () => {
  it('should pass for aria-label', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'map'
    });
    const child = new axe.SerialVirtualNode({
      nodeName: 'area',
      attributes: {
        href: 'foobar',
        'aria-label': 'foobar'
      }
    });
    child.parent = node;
    node.children = [child];

    const results = axe.runVirtualRule('area-alt', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'map'
    });
    const child = new axe.SerialVirtualNode({
      nodeName: 'area',
      attributes: {
        href: 'foobar',
        'aria-labelledby': 'foobar'
      }
    });
    child.parent = node;
    node.children = [child];

    const results = axe.runVirtualRule('area-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for alt', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'map'
    });
    const child = new axe.SerialVirtualNode({
      nodeName: 'area',
      attributes: {
        href: 'foobar',
        alt: 'foobar'
      }
    });
    child.parent = node;
    node.children = [child];

    const results = axe.runVirtualRule('area-alt', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for title', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'map'
    });
    const child = new axe.SerialVirtualNode({
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

    const results = axe.runVirtualRule('area-alt', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when alt contains only whitespace', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'map'
    });
    const child = new axe.SerialVirtualNode({
      nodeName: 'area',
      attributes: {
        href: 'foobar',
        alt: ' \t   \n   '
      }
    });
    child.parent = node;
    node.children = [child];

    const results = axe.runVirtualRule('area-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'map'
    });
    const child = new axe.SerialVirtualNode({
      nodeName: 'area',
      attributes: {
        href: 'foobar',
        'aria-label': ''
      }
    });
    child.parent = node;
    node.children = [child];

    const results = axe.runVirtualRule('area-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'map'
    });
    const child = new axe.SerialVirtualNode({
      nodeName: 'area',
      attributes: {
        href: 'foobar',
        title: ''
      }
    });
    child.children = [];
    child.parent = node;
    node.children = [child];

    const results = axe.runVirtualRule('area-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
