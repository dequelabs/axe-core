describe('table.getCellPosition', () => {
  const html = axe.testUtils.html;
  const fixture = document.getElementById('fixture');

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('should get x, y coordinates given a cell', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td id="target"></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    `;

    const target = document.getElementById('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getCellPosition(target), {
      x: 1,
      y: 1
    });
  });

  it('should handle colspans', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="2"></td>
          <td id="target"></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    `;

    const target = document.getElementById('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getCellPosition(target), {
      x: 2,
      y: 1
    });
  });

  it('should handle rowspans', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td rowspan="2"></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td id="target"></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    `;

    const target = document.getElementById('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getCellPosition(target), {
      x: 2,
      y: 1
    });
  });

  it('should handle rowspans and colspans', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td rowspan="2" colspan="2"></td>
          <td></td>
        </tr>
        <tr>
          <td id="target"></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    `;

    const target = document.getElementById('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getCellPosition(target), {
      x: 2,
      y: 1
    });
  });

  it('should handle intermittent empty rows', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr></tr>
        <tr>
          <td></td>
          <td id="target"></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr></tr>
      </table>
    `;

    const target = document.getElementById('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getCellPosition(target), {
      x: 1,
      y: 2
    });
  });
});
