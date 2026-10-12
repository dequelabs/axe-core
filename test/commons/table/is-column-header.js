describe('table.isColumnHeader', () => {
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

  it('returns false if not a column header', () => {
    const cell = document.querySelector('#cell1');
    assert.isFalse(table.isColumnHeader(cell));
  });

  it('returns true if scope="auto"', () => {
    const cell = document.querySelector('#ch1');
    assert.isTrue(table.isColumnHeader(cell));
  });

  it('returns true if scope="col"', () => {
    const cell = document.querySelector('#ch2');
    assert.isTrue(table.isColumnHeader(cell));
  });

  it('returns false if scope="row"', () => {
    const cell = document.querySelector('#rh2');
    assert.isFalse(table.isColumnHeader(cell));
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

    it('returns true if scope="colgroup"', () => {
      assert.isTrue(table.isColumnHeader(setup('colgroup')));
    });

    it('returns false if scope="rowgroup"', () => {
      assert.isFalse(table.isColumnHeader(setup('rowgroup')));
    });
  });
});
