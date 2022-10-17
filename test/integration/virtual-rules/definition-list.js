describe('definition-list virtual-rule', () => {
  it('passes when there are no invalid child nodes', () => {
    const dl = new axe.SerialVirtualNode({ nodeName: 'dl' });
    const dt = new axe.SerialVirtualNode({ nodeName: 'dt' });
    const dd = new axe.SerialVirtualNode({ nodeName: 'dd' });
    dl.children = [dt, dd];
    dt.parent = dl;
    dd.parent = dl;

    const results = axe.runVirtualRule('definition-list', dl);
    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('fails when there no dd / dt pair', () => {
    const dl = new axe.SerialVirtualNode({ nodeName: 'dl' });
    const dd1 = new axe.SerialVirtualNode({ nodeName: 'dd' });
    const dd2 = new axe.SerialVirtualNode({ nodeName: 'dd' });
    dl.children = [dd1, dd2];
    dd1.parent = dl;
    dd2.parent = dl;

    const results = axe.runVirtualRule('definition-list', dl);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('fails when there is an invalid child nodes', () => {
    const dl = new axe.SerialVirtualNode({ nodeName: 'dl' });
    const span = new axe.SerialVirtualNode({
      nodeName: 'span',
      attributes: {}
    });
    dl.children = [span];
    span.parent = dl;

    const results = axe.runVirtualRule('definition-list', dl);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('is incomplete without child nodes', () => {
    const dl = new axe.SerialVirtualNode({ nodeName: 'dl' });
    const results = axe.runVirtualRule('definition-list', dl);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });
});
