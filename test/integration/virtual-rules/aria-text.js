describe('aria-text virtual-rule', () => {
  it('should incomplete for element with undefined children', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'text'
      }
    });

    const results = axe.runVirtualRule('aria-text', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail for focusable widget children', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'text'
      }
    });
    const child = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'button',
        tabindex: 0
      }
    });
    node.children = [child];

    const results = axe.runVirtualRule('aria-text', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for children with native focus', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'text'
      }
    });
    const child = new axe.SerialVirtualNode({
      nodeName: 'button'
    });
    node.children = [child];

    const results = axe.runVirtualRule('aria-text', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass if element only has descendants that are not focusable', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'text'
      }
    });
    const child = new axe.SerialVirtualNode({
      nodeName: 'span'
    });
    const grandchild = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'hello'
    });

    child.children = [grandchild];
    node.children = [child];

    const results = axe.runVirtualRule('aria-text', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for deeply nested focusable children', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'text'
      }
    });
    const child = new axe.SerialVirtualNode({
      nodeName: 'div'
    });
    const grandchild = new axe.SerialVirtualNode({
      nodeName: 'div'
    });
    const greatgrandchild = new axe.SerialVirtualNode({
      nodeName: 'button'
    });
    greatgrandchild.parent = grandchild;
    grandchild.children = [greatgrandchild];
    child.children = [grandchild];
    node.children = [child];

    const results = axe.runVirtualRule('aria-text', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when tabIndex is negative', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'text'
      }
    });
    const child = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        tabindex: '-1',
        href: '#'
      }
    });

    node.children = [child];

    const results = axe.runVirtualRule('aria-text', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass when an anchor has no href and has implicit role of link', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'text'
      }
    });
    const child = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        tabindex: '-1'
      }
    });
    child.children = [];
    node.children = [child];

    const results = axe.runVirtualRule('aria-text', node);

    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
    assert.lengthOf(results.passes, 1);
  });

  it('should incomplete when vNode has no children and is type 1', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'text',
        nodeType: 1
      }
    });

    const results = axe.runVirtualRule('aria-text', node);

    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
    assert.lengthOf(results.passes, 0);
  });

  it('should fail when tabIndex is NaN', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'text'
      }
    });
    const child = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: {
        tabindex: 'foo',
        href: '#'
      }
    });

    node.children = [child];

    const results = axe.runVirtualRule('aria-text', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
