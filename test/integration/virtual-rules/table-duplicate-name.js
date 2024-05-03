describe('table-duplicate-name virtual-rule', function () {
  it('should incomplete on table element with children undefined', function () {
    let tableNode = new axe.SerialVirtualNode({
      nodeName: 'table'
    });
    tableNode.children = undefined;

    let results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass on table element', function () {
    let tableNode = new axe.SerialVirtualNode({
      nodeName: 'table'
    });

    tableNode.children = [];

    let results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass when table has empty summary', function () {
    let tableNode = new axe.SerialVirtualNode({
      nodeName: 'table',
      attributes: {
        summary: ''
      }
    });
    tableNode.children = [];

    let results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass when table has empty caption and summary', function () {
    let tableNode = new axe.SerialVirtualNode({
      nodeName: 'table',
      attributes: {
        summary: ''
      }
    });

    let captionNode = new axe.SerialVirtualNode({
      nodeName: 'caption'
    });
    captionNode.parent = tableNode;

    let textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: ''
    });
    textNode.parent = captionNode;

    captionNode.children = [textNode];
    tableNode.children = [captionNode];

    let results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when table summary and <caption> have the same text', function () {
    let DUPLICATED_TEXT = 'foobar';

    let tableNode = new axe.SerialVirtualNode({
      nodeName: 'table',
      attributes: {
        summary: DUPLICATED_TEXT
      }
    });

    let captionNode = new axe.SerialVirtualNode({
      nodeName: 'caption'
    });
    captionNode.parent = tableNode;

    let textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: DUPLICATED_TEXT
    });
    textNode.parent = captionNode;

    captionNode.children = [textNode];
    tableNode.children = [captionNode];

    let results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when table summary and <caption> have the same text, excluding whitespace', function () {
    let DUPLICATED_TEXT = 'foobar';

    let tableNode = new axe.SerialVirtualNode({
      nodeName: 'table',
      attributes: {
        summary: '  ' + DUPLICATED_TEXT
      }
    });

    let captionNode = new axe.SerialVirtualNode({
      nodeName: 'caption'
    });
    captionNode.parent = tableNode;

    let textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: ' \t  ' + DUPLICATED_TEXT
    });
    textNode.parent = captionNode;

    captionNode.children = [textNode];
    tableNode.children = [captionNode];

    let results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
