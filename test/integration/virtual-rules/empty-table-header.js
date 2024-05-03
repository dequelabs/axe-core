describe('empty-table-header virtual-rule', function () {
  it('should fail when children contain no visible text', function () {
    let thNode = new axe.SerialVirtualNode({
      nodeName: 'th'
    });
    thNode.children = [];

    let results = axe.runVirtualRule('empty-table-header', thNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete when children are missing', function () {
    let thNode = new axe.SerialVirtualNode({
      nodeName: 'th'
    });

    let results = axe.runVirtualRule('empty-table-header', thNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail for role=rowheader', function () {
    let vNode = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'rowheader'
      }
    });
    vNode.children = [];

    let results = axe.runVirtualRule('empty-table-header', vNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for role=columnheader', function () {
    let vNode = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'columnheader'
      }
    });
    vNode.children = [];

    let results = axe.runVirtualRule('empty-table-header', vNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass with a table header', function () {
    let tableNode = new axe.SerialVirtualNode({
      nodeName: 'table'
    });

    let trNode = new axe.SerialVirtualNode({
      nodeName: 'tr'
    });
    trNode.parent = tableNode;

    let thNode = new axe.SerialVirtualNode({
      nodeName: 'th'
    });
    thNode.parent = trNode;

    let textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    textNode.parent = thNode;

    thNode.children = [textNode];
    trNode.children = [thNode];
    tableNode.children = [trNode];

    let results = axe.runVirtualRule('empty-table-header', tableNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass with scope of row', function () {
    let tableNode = new axe.SerialVirtualNode({
      nodeName: 'table'
    });

    let trNode = new axe.SerialVirtualNode({
      nodeName: 'tr'
    });
    trNode.parent = tableNode;

    let thNode = new axe.SerialVirtualNode({
      nodeName: 'th',
      attributes: {
        scope: 'row'
      }
    });
    thNode.parent = trNode;

    let textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    textNode.parent = thNode;

    thNode.children = [textNode];
    trNode.children = [thNode];
    tableNode.children = [trNode];
    let results = axe.runVirtualRule('empty-table-header', thNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass with scope of col', function () {
    let tableNode = new axe.SerialVirtualNode({
      nodeName: 'table'
    });

    let trNode = new axe.SerialVirtualNode({
      nodeName: 'tr'
    });
    trNode.parent = tableNode;

    let thNode = new axe.SerialVirtualNode({
      nodeName: 'th',
      attributes: {
        scope: 'col'
      }
    });
    thNode.parent = trNode;

    let textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    textNode.parent = thNode;

    thNode.children = [textNode];
    trNode.children = [thNode];
    tableNode.children = [trNode];

    let results = axe.runVirtualRule('empty-table-header', thNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass with a table definition of role rowheader', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'td',
      attributes: {
        role: 'rowheader'
      }
    });
    let child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    node.children = [child];

    let results = axe.runVirtualRule('empty-table-header', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should be inapplicable when the th has role of cell', function () {
    let table = new axe.SerialVirtualNode({
      nodeName: 'table'
    });

    let tr = new axe.SerialVirtualNode({
      nodeName: 'tr'
    });

    let th = new axe.SerialVirtualNode({
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

    let results = axe.runVirtualRule('empty-table-header', th);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
    assert.lengthOf(results.inapplicable, 1);
  });
});
