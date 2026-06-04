describe('data-table-matches', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const fixtureSetup = axe.testUtils.fixtureSetup;
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('th-has-data-cells');
  });

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('is a function', () => {
    assert.isFunction(rule.matches);
  });

  it('should return false if table has role="presentation"', () => {
    fixtureSetup(html`
      <table role="presentation" id="target">
        <tr>
          <th>hi</th>
          <td></td>
        </tr>
        <tr>
          <th>hi</th>
          <td></td>
        </tr>
      </table>
    `);

    const vNode = axe.utils.querySelectorAll(axe._tree[0], 'table')[0];
    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it('should return false if table has role="none"', () => {
    fixtureSetup(html`
      <table role="none" id="target">
        <tr>
          <th>hi</th>
          <td></td>
        </tr>
        <tr>
          <th>hi</th>
          <td></td>
        </tr>
      </table>
    `);

    const vNode = axe.utils.querySelectorAll(axe._tree[0], 'table')[0];
    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it('should return true if table is a data table', () => {
    fixtureSetup(html`
      <table id="target">
        <caption>
          Table caption
        </caption>
        <tr>
          <th scope="col">Heading 1</th>
          <th scope="col">Heading 2</th>
        </tr>
        <tr>
          <td>Thing 1</td>
          <td>Thing 2</td>
        </tr>
      </table>
    `);

    const vNode = axe.utils.querySelectorAll(axe._tree[0], 'table')[0];
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });
});
