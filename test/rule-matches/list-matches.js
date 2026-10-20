describe('list-matches', () => {
  const rule = axe.utils.getRule('list');
  const { queryFixture } = axe.testUtils;

  ['ul', 'ol'].forEach(nodeName => {
    [
      '',
      'role=""',
      'role=" "',
      'role="list"',
      'role=" LIST "',
      'role="invalid-role"',
      'role="widget"',
      'role="invalid-role list"',
      'role="list menu"',
      'role="none" tabindex="0"',
      'role="presentation" aria-label="Items"'
    ].forEach(attributes => {
      it(`matches <${nodeName} ${attributes}>`, () => {
        const vNode = queryFixture(
          `<${nodeName} id="target" ${attributes}><li>Item</li></${nodeName}>`
        );
        assert.isTrue(rule.matches(vNode.actualNode, vNode));
      });
    });

    [
      'role="none"',
      'role="presentation"',
      'role="menu"',
      'role="listbox"',
      'role="menu list"',
      'role="invalid-role menu"',
      'role="invalid-role presentation"'
    ].forEach(attributes => {
      it(`does not match <${nodeName} ${attributes}>`, () => {
        const vNode = queryFixture(
          `<${nodeName} id="target" ${attributes}><li>Item</li></${nodeName}>`
        );
        assert.isFalse(rule.matches(vNode.actualNode, vNode));
      });
    });
  });
});
