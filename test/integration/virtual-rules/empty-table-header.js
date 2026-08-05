describe('empty-table-header virtual-rule', () => {
  it('should fail when children contain no visible text', () => {
    const thNode = new axe.SerialVirtualNode({
      nodeName: 'th'
    });
    thNode.children = [];

    const results = axe.runVirtualRule('empty-table-header', thNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete when children are missing', () => {
    const thNode = new axe.SerialVirtualNode({
      nodeName: 'th'
    });

    const results = axe.runVirtualRule('empty-table-header', thNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail for role=rowheader', () => {
    const vNode = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'rowheader'
      }
    });
    vNode.children = [];

    const results = axe.runVirtualRule('empty-table-header', vNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for role=columnheader', () => {
    const vNode = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'columnheader'
      }
    });
    vNode.children = [];

    const results = axe.runVirtualRule('empty-table-header', vNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass with a table header', () => {
    const tableNode = new axe.SerialVirtualNode({
      nodeName: 'table'
    });

    const trNode = new axe.SerialVirtualNode({
      nodeName: 'tr'
    });
    trNode.parent = tableNode;

    const thNode = new axe.SerialVirtualNode({
      nodeName: 'th'
    });
    thNode.parent = trNode;

    const textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    textNode.parent = thNode;

    thNode.children = [textNode];
    trNode.children = [thNode];
    tableNode.children = [trNode];

    const results = axe.runVirtualRule('empty-table-header', tableNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass with scope of row', () => {
    const tableNode = new axe.SerialVirtualNode({
      nodeName: 'table'
    });

    const trNode = new axe.SerialVirtualNode({
      nodeName: 'tr'
    });
    trNode.parent = tableNode;

    const thNode = new axe.SerialVirtualNode({
      nodeName: 'th',
      attributes: {
        scope: 'row'
      }
    });
    thNode.parent = trNode;

    const textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    textNode.parent = thNode;

    thNode.children = [textNode];
    trNode.children = [thNode];
    tableNode.children = [trNode];
    const results = axe.runVirtualRule('empty-table-header', thNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass with scope of col', () => {
    const tableNode = new axe.SerialVirtualNode({
      nodeName: 'table'
    });

    const trNode = new axe.SerialVirtualNode({
      nodeName: 'tr'
    });
    trNode.parent = tableNode;

    const thNode = new axe.SerialVirtualNode({
      nodeName: 'th',
      attributes: {
        scope: 'col'
      }
    });
    thNode.parent = trNode;

    const textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    textNode.parent = thNode;

    thNode.children = [textNode];
    trNode.children = [thNode];
    tableNode.children = [trNode];

    const results = axe.runVirtualRule('empty-table-header', thNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass with a table definition of role rowheader', () => {
    const node = new axe.SerialVirtualNode({
      nodeName: 'td',
      attributes: {
        role: 'rowheader'
      }
    });
    const child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    node.children = [child];

    const results = axe.runVirtualRule('empty-table-header', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should be inapplicable when the th has role of cell', () => {
    const table = new axe.SerialVirtualNode({
      nodeName: 'table'
    });

    const tr = new axe.SerialVirtualNode({
      nodeName: 'tr'
    });

    const th = new axe.SerialVirtualNode({
      nodeName: 'th',
      attributes: {
        role: 'cell'
      }
    });

    tr.children = [th];
    tr.parent = table;
    th.parent = tr;
    th.children = [];
    table.children = [tr];

    const results = axe.runVirtualRule('empty-table-header', th);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
    assert.lengthOf(results.inapplicable, 1);
  });
});
