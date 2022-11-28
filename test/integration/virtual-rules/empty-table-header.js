describe('empty-table-header virtual-rule', function () {
  it('should fail when children contain no visible text', function () {
    var thNode = new axe.SerialVirtualNode({
      nodeName: 'th'
    });
    thNode.children = [];

    var results = axe.runVirtualRule('empty-table-header', thNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete when children are missing', function () {
    var thNode = new axe.SerialVirtualNode({
      nodeName: 'th'
    });

    var results = axe.runVirtualRule('empty-table-header', thNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should fail for role=rowheader', function () {
    var vNode = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'rowheader'
      }
    });
    vNode.children = [];

    var results = axe.runVirtualRule('empty-table-header', vNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for role=columnheader', function () {
    var vNode = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        role: 'columnheader'
      }
    });
    vNode.children = [];

    var results = axe.runVirtualRule('empty-table-header', vNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass with a table header', function () {
    var tableNode = new axe.SerialVirtualNode({
      nodeName: 'table'
    });

    var trNode = new axe.SerialVirtualNode({
      nodeName: 'tr'
    });
    trNode.parent = tableNode;

    var thNode = new axe.SerialVirtualNode({
      nodeName: 'th'
    });
    thNode.parent = trNode;

    var textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    textNode.parent = thNode;

    thNode.children = [textNode];
    trNode.children = [thNode];
    tableNode.children = [trNode];

    var results = axe.runVirtualRule('empty-table-header', tableNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass with scope of row', function () {
    var tableNode = new axe.SerialVirtualNode({
      nodeName: 'table'
    });

    var trNode = new axe.SerialVirtualNode({
      nodeName: 'tr'
    });
    trNode.parent = tableNode;

    var thNode = new axe.SerialVirtualNode({
      nodeName: 'th',
      attributes: {
        scope: 'row'
      }
    });
    thNode.parent = trNode;

    var textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    textNode.parent = thNode;

    thNode.children = [textNode];
    trNode.children = [thNode];
    tableNode.children = [trNode];
    var results = axe.runVirtualRule('empty-table-header', thNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass with scope of col', function () {
    var tableNode = new axe.SerialVirtualNode({
      nodeName: 'table'
    });

    var trNode = new axe.SerialVirtualNode({
      nodeName: 'tr'
    });
    trNode.parent = tableNode;

    var thNode = new axe.SerialVirtualNode({
      nodeName: 'th',
      attributes: {
        scope: 'col'
      }
    });
    thNode.parent = trNode;

    var textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    textNode.parent = thNode;

    thNode.children = [textNode];
    trNode.children = [thNode];
    tableNode.children = [trNode];

    var results = axe.runVirtualRule('empty-table-header', thNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass with a table definition of role rowheader', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'td',
      attributes: {
        role: 'rowheader'
      }
    });
    var child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    node.children = [child];

    var results = axe.runVirtualRule('empty-table-header', node);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });
});
