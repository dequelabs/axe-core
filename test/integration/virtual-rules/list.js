describe('list virtual-rule', () => {
  ['list', 'invalid-role', 'invalid-role list'].forEach(role => {
    it(`fails for an invalid child with role="${role}"`, () => {
      const ul = new axe.SerialVirtualNode({
        nodeName: 'ul',
        attributes: { role }
      });
      const span = new axe.SerialVirtualNode({
        nodeName: 'span',
        attributes: {}
      });
      ul.children = [span];
      span.parent = ul;

      const results = axe.runVirtualRule('list', ul);
      assert.lengthOf(results.violations, 1);
      assert.lengthOf(results.passes, 0);
      assert.lengthOf(results.incomplete, 0);
    });
  });

  ['none', 'presentation', 'menu', 'invalid-role menu'].forEach(role => {
    it(`is inapplicable with role="${role}"`, () => {
      const ul = new axe.SerialVirtualNode({
        nodeName: 'ul',
        attributes: { role }
      });
      ul.children = [];

      const results = axe.runVirtualRule('list', ul);
      assert.lengthOf(results.violations, 0);
      assert.lengthOf(results.passes, 0);
      assert.lengthOf(results.incomplete, 0);
      assert.lengthOf(results.inapplicable, 1);
    });
  });

  it('passes when there are no invalid child nodes', () => {
    const ul = new axe.SerialVirtualNode({ nodeName: 'ul' });
    const li = new axe.SerialVirtualNode({ nodeName: 'li' });
    ul.children = [li];
    li.parent = ul;

    const results = axe.runVirtualRule('list', ul);
    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('fails when there is an invalid child node', () => {
    const ul = new axe.SerialVirtualNode({ nodeName: 'ul' });
    const span = new axe.SerialVirtualNode({
      nodeName: 'span',
      attributes: {}
    });
    ul.children = [span];
    span.parent = ul;

    const results = axe.runVirtualRule('list', ul);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('is incomplete without child nodes', () => {
    const ul = new axe.SerialVirtualNode({ nodeName: 'ul' });
    const results = axe.runVirtualRule('list', ul);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });
});
