describe('table.isRowHeader', () => {
  const html = axe.testUtils.html;

  const table = axe.commons.table;
  const fixtureSetup = axe.testUtils.fixtureSetup;

  beforeEach(() => {
    fixtureSetup(html`
      <table>
        <tr>
          <th id="ch1">column header 1</th>
          <th scope="col" id="ch2">column header 2</th>
        </tr>
        <tr>
          <th id="rh1">row header 1</th>
          <td id="cell1">cell 1</td>
        </tr>
        <tr>
          <th scope="row" id="rh2">row header 2</th>
          <td id="cell2">cell 2</td>
        </tr>
      </table>
    `);
  });

  it('returns false if not a row header', () => {
    const cell = document.querySelector('#cell1');
    assert.isFalse(table.isRowHeader(cell));
  });

  it('returns true if scope="auto"', () => {
    const cell = document.querySelector('#rh1');
    assert.isTrue(table.isRowHeader(cell));
  });

  it('returns false if scope="col"', () => {
    const cell = document.querySelector('#ch1');
    assert.isFalse(table.isRowHeader(cell));
  });

  it('returns true if scope="row"', () => {
    const cell = document.querySelector('#rh2');
    assert.isTrue(table.isRowHeader(cell));
  });

  describe('with a group scope', () => {
    // neither the row nor the column of #target is all th, so without the
    // scope attribute getScope would return 'auto'
    function setup(scope) {
      fixtureSetup(html`
        <table>
          <tr>
            <td>cell</td>
            <th id="target" scope="${scope}">header</th>
          </tr>
          <tr>
            <th>header</th>
            <td>cell</td>
          </tr>
        </table>
      `);
      return document.querySelector('#target');
    }

    it('returns true if scope="rowgroup"', () => {
      assert.isTrue(table.isRowHeader(setup('rowgroup')));
    });

    it('returns false if scope="colgroup"', () => {
      assert.isFalse(table.isRowHeader(setup('colgroup')));
    });
  });
});
