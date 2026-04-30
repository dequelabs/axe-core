describe('td-headers-attr', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const checkContext = axe.testUtils.MockCheckContext();
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const check = axe.testUtils.getCheckEvaluate('td-headers-attr');

  afterEach(() => {
    checkContext.reset();
  });

  it('returns true no headers attribute is present', () => {
    fixtureSetup(html`
      <table>
        <tr>
          <th>hi</th>
          <td>hello</td>
        </tr>
        <tr>
          <th>hi</th>
          <td>hello</td>
        </tr>
      </table>
    `);

    const node = fixture.querySelector('table');
    assert.isTrue(check.call(checkContext, node));
  });

  it('returns true if a valid header is present', () => {
    fixtureSetup(html`
      <table>
        <tr>
          <th id="hi">hello</th>
        </tr>
        <tr>
          <td headers="hi">goodbye</td>
        </tr>
      </table>
    `);

    const node = fixture.querySelector('table');
    assert.isTrue(check.call(checkContext, node));
  });

  it('returns true if multiple valid headers are present', () => {
    fixtureSetup(html`
      <table>
        <tr>
          <th id="hi1">hello</th>
          <th id="hi2">hello</th>
        </tr>
        <tr>
          <td
            headers="hi1 	
 hi2"
          >
            goodbye
          </td>
        </tr>
      </table>
    `);

    const node = fixture.querySelector('table');
    assert.isTrue(check.call(checkContext, node));
  });

  it('returns true with an empty header', () => {
    fixtureSetup(html`
      <table>
        <tr>
          <th id="hi1"></th>
        </tr>
        <tr>
          <td headers="hi1">goodbye</td>
        </tr>
      </table>
    `);

    const node = fixture.querySelector('table');
    assert.isTrue(check.call(checkContext, node));
  });

  it('returns undefined if headers is empty', () => {
    fixtureSetup(html`
      <table>
        <tr>
          <th id="hi"></th>
        </tr>
        <tr>
          <td headers="">goodbye</td>
        </tr>
      </table>
    `);

    const node = fixture.querySelector('table');
    assert.isUndefined(check.call(checkContext, node));
  });

  it('returns false if the header is a table cell', () => {
    let node;

    fixtureSetup(html`
      <table>
        <tr>
          <th><span id="hi">hello</span></th>
        </tr>
        <tr>
          <td headers="h1">goodbye</td>
        </tr>
      </table>
    `);
    node = fixture.querySelector('table');
    assert.isFalse(check.call(checkContext, node));

    fixtureSetup(html`
      <span id="hi">hello</span>
      <table>
        <tr>
          <th></th>
        </tr>
        <tr>
          <td headers="h1">goodbye</td>
        </tr>
      </table>
    `);
    node = fixture.querySelector('table');
    assert.isFalse(check.call(checkContext, node));
    assert.deepEqual(checkContext._data, {
      messageKey: 'cell-header-not-in-table'
    });

    fixtureSetup(html`
      <table id="hi">
        <tr>
          <th>hello</th>
        </tr>
        <tr>
          <td headers="h1">goodbye</td>
        </tr>
      </table>
    `);
    node = fixture.querySelector('table');
    assert.isFalse(check.call(checkContext, node));
  });

  it('returns false if table cell referenced as header', () => {
    fixtureSetup(html`
      <table>
        <tr>
          <td id="hi">hello</td>
        </tr>
        <tr>
          <td headers="hi">goodbye</td>
        </tr>
      </table>
    `);

    const node = fixture.querySelector('table');
    assert.isFalse(check.call(checkContext, node));
    assert.deepEqual(checkContext._data, { messageKey: 'cell-header-not-th' });
  });

  it('returns true if table cell referenced as header with role rowheader or columnheader', () => {
    let node;

    fixtureSetup(html`
      <table>
        <tr>
          <td role="rowheader" id="hi">hello</td>
        </tr>
        <tr>
          <td headers="hi">goodbye</td>
        </tr>
      </table>
    `);

    node = fixture.querySelector('table');
    assert.isTrue(check.call(checkContext, node));

    fixtureSetup(html`
      <table>
        <tr>
          <td role="columnheader" id="hi">hello</td>
        </tr>
        <tr>
          <td headers="hi">goodbye</td>
        </tr>
      </table>
    `);

    node = fixture.querySelector('table');
    assert.isTrue(check.call(checkContext, node));
  });

  it('relatedNodes contains each cell only once', () => {
    fixtureSetup(html`
      <table>
        <tr>
          <td id="hi1">hello</td>
        </tr>
        <tr>
          <td id="hi2">hello</td>
        </tr>
        <tr>
          <td id="bye" headers="hi1 hi2">goodbye</td>
        </tr>
      </table>
      '
    `);

    const node = fixture.querySelector('table');
    check.call(checkContext, node);
    assert.deepEqual(checkContext._relatedNodes, [
      fixture.querySelector('#bye')
    ]);
  });

  it('returns false if the header refers to the same cell', () => {
    fixtureSetup(html`
      <table id="hi">
        <tr>
          <th>hello</th>
        </tr>
        <tr>
          <td id="bye" headers="bye">goodbye</td>
        </tr>
      </table>
    `);

    const node = fixture.querySelector('table');
    assert.isFalse(check.call(checkContext, node));
    assert.deepEqual(checkContext._data, { messageKey: 'header-refs-self' });
  });

  it('returns true if td[headers] is hidden', () => {
    fixtureSetup(html`
      <table>
        <tr>
          <th>Hello</th>
          <td headers="h1" hidden>goodbye</td>
        </tr>
      </table>
    `);
    const node = fixture.querySelector('table');
    assert.isTrue(check.call(checkContext, node));
  });

  it('returns true if td[headers] has aria-hidden=true', () => {
    fixtureSetup(html`
      <table>
        <tr>
          <th>Hello</th>
          <td headers="h1" aria-hidden="true">goodbye</td>
        </tr>
      </table>
    `);
    const node = fixture.querySelector('table');
    assert.isTrue(check.call(checkContext, node));
  });
});
