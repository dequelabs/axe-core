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

  it('should fail an unallowed role on a summary for its details', () => {
    const details = new axe.SerialVirtualNode({ nodeName: 'details' });
    const summary = new axe.SerialVirtualNode({
      nodeName: 'summary',
      attributes: {
        role: 'tab'
      }
    });
    summary.parent = details;
    details.children = [summary];

    const results = axe.runVirtualRule('aria-allowed-role', summary);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass the implicit button role on a summary for its details', () => {
    const details = new axe.SerialVirtualNode({ nodeName: 'details' });
    const summary = new axe.SerialVirtualNode({
      nodeName: 'summary',
      attributes: {
        role: 'button'
      }
    });
    summary.parent = details;
    details.children = [summary];

    const results = axe.runVirtualRule('aria-allowed-role', summary);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should allow any role on a summary that is not the summary for its details', () => {
    const details = new axe.SerialVirtualNode({ nodeName: 'details' });
    const firstSummary = new axe.SerialVirtualNode({ nodeName: 'summary' });
    const secondSummary = new axe.SerialVirtualNode({
      nodeName: 'summary',
      attributes: {
        role: 'tab'
      }
    });
    firstSummary.parent = details;
    secondSummary.parent = details;
    details.children = [firstSummary, secondSummary];

    const results = axe.runVirtualRule('aria-allowed-role', secondSummary);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should allow any role on a summary without a details parent', () => {
    // isSummaryForDetails resolves the parent, so give the summary a
    // non-details parent rather than a disconnected node.
    const vNode = new axe.SerialVirtualNode({
      nodeName: 'summary',
      attributes: {
        role: 'group'
      }
    });
    const parent = new axe.SerialVirtualNode({
      nodeName: 'div'
    });
    parent.children = [vNode];
    vNode.parent = parent;

    const results = axe.runVirtualRule('aria-allowed-role', vNode);

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });
});
