describe('aria-allowed-role virtual-rule', () => {
  afterEach(() => {
    axe.reset();
  });

  it('should pass for allowed role', () => {
    const results = axe.runVirtualRule('aria-allowed-role', {
      nodeName: 'div',
      attributes: {
        role: 'checkbox',
        'aria-checked': true
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for unallowed role', () => {
    const results = axe.runVirtualRule('aria-allowed-role', {
      nodeName: 'dd',
      attributes: {
        role: 'link'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for element with ignored option', () => {
    axe.configure({
      checks: [
        {
          id: 'aria-allowed-role',
          options: {
            ignoredTags: ['dd']
          }
        }
      ]
    });

    const results = axe.runVirtualRule('aria-allowed-role', {
      nodeName: 'dd',
      attributes: {
        role: 'link'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for hidden element', () => {
    const results = axe.runVirtualRule('aria-allowed-role', {
      nodeName: 'dd',
      attributes: {
        'aria-hidden': true,
        role: 'link'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should incomplete for hidden element parent', () => {
    const vNode = new axe.SerialVirtualNode({
      nodeName: 'dd',
      attributes: {
        role: 'link'
      }
    });
    const parent = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-hidden': true
      }
    });
    parent.children = [vNode];
    vNode.parent = parent;

    const results = axe.runVirtualRule('aria-allowed-role', vNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass doc-example on a figure with a child figcaption', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'figure',
      attributes: {
        role: 'doc-example'
      }
    });
    const child = new axe.SerialVirtualNode({
      nodeName: 'figcaption'
    });
    child.parent = node;
    node.children = [child];

    const results = axe.runVirtualRule('aria-allowed-role', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail an unallowed role on a figure with a child figcaption', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'figure',
      attributes: {
        role: 'group'
      }
    });
    const child = new axe.SerialVirtualNode({
      nodeName: 'figcaption'
    });
    child.parent = node;
    node.children = [child];

    const results = axe.runVirtualRule('aria-allowed-role', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should allow any role on a figure without a child figcaption', () => {
    const results = axe.runVirtualRule('aria-allowed-role', {
      nodeName: 'figure',
      attributes: {
        role: 'group'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });
});
