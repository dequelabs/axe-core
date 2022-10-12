describe('table-or-grid-role-matches', () => {
  const { queryFixture } = axe.testUtils;
  const rule = axe.utils.getRule('td-headers-attr');

  it(`returns true for tables without role`, () => {
    const vNode = queryFixture(`<table id="target">
        <th id="h">foo</th> <td headers="h">bar</td>
      </table>`);
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  ['table', 'grid', 'treegrid'].forEach(role => {
    it(`returns true for tables with role=${role}`, () => {
      const vNode = queryFixture(`<table id="target" role="${role}">
          <th id="h">foo</th> <td headers="h">bar</td>
        </table>`);
      assert.isTrue(rule.matches(vNode.actualNode, vNode));
    });
  });

  ['region', 'presentation', 'none'].forEach(role => {
    it(`returns false for tables with role=${role}`, () => {
      const vNode = queryFixture(`<table id="target" role="${role}">
          <th id="h">foo</th> <td headers="h">bar</td>
        </table>`);
      assert.isFalse(rule.matches(vNode.actualNode, vNode));
    });
  });

  it(`returns true for tables with an invalid role`, () => {
    const vNode = queryFixture(`<table id="target" role="invalid-aria-role">
        <th id="h">foo</th> <td headers="h">bar</td>
      </table>`);
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it(`returns true for focusable tables with role=none`, () => {
    const vNode = queryFixture(`<table id="target" role="none" tabindex="0">
        <th id="h">foo</th> <td headers="h">bar</td>
      </table>`);
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it(`returns true for tables with role=none but with a global ARIA attribute`, () => {
    const vNode =
      queryFixture(`<table id="target" role="none" aria-live="assertive">
        <th id="h">foo</th> <td headers="h">bar</td>
      </table>`);
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });
});
