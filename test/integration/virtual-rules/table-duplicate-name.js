describe('table-duplicate-name virtual-rule', () => {
  it('should incomplete on table element with children undefined', () => {
    const tableNode = new axe.SerialVirtualNode({
      nodeName: 'table'
    });
    tableNode.children = undefined;

    const results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass on table element', () => {
    const tableNode = new axe.SerialVirtualNode({
      nodeName: 'table'
    });

    tableNode.children = [];

    const results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass when table has empty summary', () => {
    const tableNode = new axe.SerialVirtualNode({
      nodeName: 'table',
      attributes: {
        summary: ''
      }
    });
    tableNode.children = [];

    const results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass when table has empty caption and summary', () => {
    const tableNode = new axe.SerialVirtualNode({
      nodeName: 'table',
      attributes: {
        summary: ''
      }
    });

    const captionNode = new axe.SerialVirtualNode({
      nodeName: 'caption'
    });
    captionNode.parent = tableNode;

    const textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: ''
    });
    textNode.parent = captionNode;

    captionNode.children = [textNode];
    tableNode.children = [captionNode];

    const results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when table summary and <caption> have the same text', () => {
    const DUPLICATED_TEXT = 'foobar';

    const tableNode = new axe.SerialVirtualNode({
      nodeName: 'table',
      attributes: {
        summary: DUPLICATED_TEXT
      }
    });

    const captionNode = new axe.SerialVirtualNode({
      nodeName: 'caption'
    });
    captionNode.parent = tableNode;

    const textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: DUPLICATED_TEXT
    });
    textNode.parent = captionNode;

    captionNode.children = [textNode];
    tableNode.children = [captionNode];

    const results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when table summary and <caption> have the same text, excluding whitespace', () => {
    const DUPLICATED_TEXT = 'foobar';

    const tableNode = new axe.SerialVirtualNode({
      nodeName: 'table',
      attributes: {
        summary: `  ${DUPLICATED_TEXT}`
      }
    });

    const captionNode = new axe.SerialVirtualNode({
      nodeName: 'caption'
    });
    captionNode.parent = tableNode;

    const textNode = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: `    ${DUPLICATED_TEXT}`
    });
    textNode.parent = captionNode;

    captionNode.children = [textNode];
    tableNode.children = [captionNode];

    const results = axe.runVirtualRule('table-duplicate-name', tableNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
