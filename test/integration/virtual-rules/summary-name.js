function appendSerialChild(parent, child) {
  if (child instanceof axe.SerialVirtualNode === false) {
    child = new axe.SerialVirtualNode(child);
  }
  child.parent = parent;
  parent.children ??= [];
  parent.children.push(child);
  return child;
}

describe('summary-name virtual-rule', () => {
  let vDetails;
  beforeEach(() => {
    vDetails = new axe.SerialVirtualNode({
      nodeName: 'details',
      attributes: {}
    });
    appendSerialChild(vDetails, { nodeName: '#text', nodeValue: 'text' });
  });

  it('fails without children', () => {
    const vSummary = new axe.SerialVirtualNode({
      nodeName: 'summary',
      attributes: {}
    });
    vSummary.children = [];
    appendSerialChild(vDetails, vSummary);
    const results = axe.runVirtualRule('summary-name', vSummary);
    console.log(results);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('passes with text content', () => {
    const vSummary = new axe.SerialVirtualNode({
      nodeName: 'summary',
      attributes: {}
    });
    appendSerialChild(vSummary, { nodeName: '#text', nodeValue: 'text' });
    appendSerialChild(vDetails, vSummary);

    const results = axe.runVirtualRule('summary-name', vSummary);
    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('passes with aria-label', () => {
    const vSummary = new axe.SerialVirtualNode({
      nodeName: 'summary',
      attributes: { 'aria-label': 'foobar' }
    });
    appendSerialChild(vDetails, vSummary);
    const results = axe.runVirtualRule('summary-name', vSummary);
    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('passes with title', () => {
    const vSummary = new axe.SerialVirtualNode({
      nodeName: 'summary',
      attributes: { title: 'foobar' }
    });
    appendSerialChild(vDetails, vSummary);
    const results = axe.runVirtualRule('summary-name', vSummary);
    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('incompletes with aria-labelledby', () => {
    const vSummary = new axe.SerialVirtualNode({
      nodeName: 'summary',
      attributes: { 'aria-labelledby': 'foobar' }
    });
    appendSerialChild(vDetails, vSummary);
    const results = axe.runVirtualRule('summary-name', vSummary);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('throws without a parent', () => {
    const vSummary = new axe.SerialVirtualNode({
      nodeName: 'summary',
      attributes: { 'aria-labelledby': 'foobar' }
    });
    vSummary.children = [];
    assert.throws(() => {
      axe.runVirtualRule('summary-name', vSummary);
    });
  });
});
