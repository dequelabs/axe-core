describe('table-duplicate-name virtual-rule', function () {
  it('should incomplete on table element with children undefined', function () {
    var tableNode = new axe.SerialVirtualNode({
      nodeName: 'table'
    });
    tableNode.children = undefined;

    var results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass on table element', function () {
    var tableNode = new axe.SerialVirtualNode({
      nodeName: 'table'
    });

    tableNode.children = [];

    var results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass when table has empty summary', function () {
    var tableNode = new axe.SerialVirtualNode({
      nodeName: 'table',
      attributes: {
        summary: ''
      }
    });
    tableNode.children = [];

    var results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass when table has empty caption and summary', function () {
    var tableNode = new axe.SerialVirtualNode({
      nodeName: 'table',
      attributes: {
        summary: ''
      }
    });

    var captionNode = new axe.SerialVirtualNode({
      nodeName: 'caption'
    });
    captionNode.parent = tableNode;

    var textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: ''
    });
    textNode.parent = captionNode;

    captionNode.children = [textNode];
    tableNode.children = [captionNode];

    var results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when table summary and <caption> have the same text', function () {
    var DUPLICATED_TEXT = 'foobar';

    var tableNode = new axe.SerialVirtualNode({
      nodeName: 'table',
      attributes: {
        summary: DUPLICATED_TEXT
      }
    });

    var captionNode = new axe.SerialVirtualNode({
      nodeName: 'caption'
    });
    captionNode.parent = tableNode;

    var textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: DUPLICATED_TEXT
    });
    textNode.parent = captionNode;

    captionNode.children = [textNode];
    tableNode.children = [captionNode];

    var results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when table summary and <caption> have the same text, excluding whitespace', function () {
    var DUPLICATED_TEXT = 'foobar';

    var tableNode = new axe.SerialVirtualNode({
      nodeName: 'table',
      attributes: {
        summary: '  ' + DUPLICATED_TEXT
      }
    });

    var captionNode = new axe.SerialVirtualNode({
      nodeName: 'caption'
    });
    captionNode.parent = tableNode;

    var textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: ' \t  ' + DUPLICATED_TEXT
    });
    textNode.parent = captionNode;

    captionNode.children = [textNode];
    tableNode.children = [captionNode];

    var results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
