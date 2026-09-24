describe('empty-table-header-matches', () => {
  const html = axe.testUtils.html;
  const queryFixture = axe.testUtils.queryFixture;
  const queryShadowFixture = axe.testUtils.queryShadowFixture;
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('empty-table-header');
  });

  it('is a function', () => {
    assert.isFunction(rule.matches);
  });

  it('returns true for a th in a table', () => {
    const vNode = queryFixture(html`
      <table>
        <tr>
          <th id="target"></th>
        </tr>
      </table>
    `);
    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns true for an element with role="rowheader"', () => {
    const vNode = queryFixture(html`
      <table>
        <tr>
          <td id="target" role="rowheader"></td>
        </tr>
      </table>
    `);
    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns true for an element with role="columnheader"', () => {
    const vNode = queryFixture(html`
      <table>
        <tr>
          <td id="target" role="columnheader"></td>
        </tr>
      </table>
    `);
    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns false for a th in a table with role="none"', () => {
    const vNode = queryFixture(html`
      <table role="none">
        <tr>
          <th id="target"></th>
        </tr>
      </table>
    `);
    assert.isFalse(rule.matches(null, vNode));
  });

  it('returns false for a th in a table with role="presentation"', () => {
    const vNode = queryFixture(html`
      <table role="presentation">
        <tr>
          <th id="target"></th>
        </tr>
      </table>
    `);
    assert.isFalse(rule.matches(null, vNode));
  });

  it('returns false for a th in a table with role="none" in shadow DOM', () => {
    const vNode = queryShadowFixture(
      '<div id="shadow"></div>',
      html`
        <table role="none">
          <tr>
            <th id="target"></th>
          </tr>
        </table>
      `
    );
    assert.isFalse(rule.matches(null, vNode));
  });
});
