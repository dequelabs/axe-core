describe('aria-conditional-attr virtual-rule', function () {
  it('passes when aria-checked is consistent with native checkbox state', () => {
    const results = axe.runVirtualRule('aria-conditional-attr', {
      nodeName: 'input',
      checked: true,
      attributes: {
        type: 'checkbox',
        'aria-checked': 'true'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('fails when aria-checked is inconsistent with native checkbox state', () => {
    const results = axe.runVirtualRule('aria-conditional-attr', {
      nodeName: 'input',
      checked: true,
      attributes: {
        type: 'checkbox',
        'aria-checked': 'false'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('passes conditional row attributes on detached rows', () => {
    const results = axe.runVirtualRule('aria-conditional-attr', {
      nodeName: 'tr',
      attributes: {
        role: 'row',
        'aria-level': '1',
        'aria-posinset': '1',
        'aria-setsize': '1',
        'aria-expanded': 'true'
      }
    });
    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('fails conditional row attributes on table', () => {
    const table = new axe.SerialVirtualNode({
      nodeName: 'table'
    });
    const tr = new axe.SerialVirtualNode({
      nodeName: 'tr',
      attributes: {
        role: 'row',
        'aria-level': '1',
        'aria-posinset': '1',
        'aria-setsize': '1',
        'aria-expanded': 'true'
      }
    });
    const td = new axe.SerialVirtualNode({ nodeName: 'td' });
    table.children = [tr];
    tr.children = [td];
    td.parent = tr;
    tr.parent = table;
    table.parent = null;

    const results = axe.runVirtualRule('aria-conditional-attr', tr);
    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);

    const { invalidAttrs } = results.violations[0].nodes[0].all[0].data;
    invalidAttrs.sort();
    assert.deepEqual(invalidAttrs, [
      'aria-expanded',
      'aria-level',
      'aria-posinset',
      'aria-setsize'
    ]);
  });

  it('passes conditional row attributes on treegrid', () => {
    const table = new axe.SerialVirtualNode({
      nodeName: 'table',
      attributes: { role: 'treegrid' }
    });
    const tr = new axe.SerialVirtualNode({
      nodeName: 'tr',
      attributes: {
        role: 'row',
        'aria-level': '1',
        'aria-posinset': '1',
        'aria-setsize': '1',
        'aria-expanded': 'true'
      }
    });
    const td = new axe.SerialVirtualNode({ nodeName: 'td' });
    table.children = [tr];
    tr.children = [td];
    td.parent = tr;
    tr.parent = table;
    table.parent = null;

    const results = axe.runVirtualRule('aria-conditional-attr', tr);
    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });
});
