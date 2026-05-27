describe('table.toGrid', () => {
  const html = axe.testUtils.html;
  function $id(id) {
    return document.getElementById(id);
  }

  const fixture = $id('fixture');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should work', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td id="t1">2</td>
          <td id="t2">ok</td>
        </tr>
        <tr>
          <td id="t3">2</td>
          <td id="t4">ok</td>
        </tr>
      </table>
    `;

    const target = fixture.querySelector('table');

    assert.deepEqual(axe.commons.table.toGrid(target), [
      [$id('t1'), $id('t2')],
      [$id('t3'), $id('t4')]
    ]);
  });

  it('should have cells with a width > 1 span more than one position', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td id="t1" colspan="2">2</td>
          <td id="t2">ok</td>
        </tr>
        <tr>
          <td id="t3" colspan="3">2</td>
        </tr>
      </table>
    `;

    const target = fixture.querySelector('table');

    assert.deepEqual(axe.commons.table.toGrid(target), [
      [$id('t1'), $id('t1'), $id('t2')],
      [$id('t3'), $id('t3'), $id('t3')]
    ]);
  });

  it('should have cells with height > 1 occupy more than one row', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td id="t1">2</td>
          <td rowspan="2" id="t2">ok</td>
          <td id="t3"></td>
        </tr>
        <tr>
          <td id="t4">4</td>
          <td id="t5">5</td>
        </tr>
      </table>
    `;

    const target = fixture.querySelector('table');

    assert.deepEqual(axe.commons.table.toGrid(target), [
      [$id('t1'), $id('t2'), $id('t3')],
      [$id('t4'), $id('t2'), $id('t5')]
    ]);
  });

  it('should work with both col and rowspans', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td id="t1" rowspan="2" colspan="2">2</td>
          <td id="t2">ok</td>
        </tr>
        <tr>
          <td id="t3">ok</td>
        </tr>
      </table>
    `;

    const target = fixture.querySelector('table');

    assert.deepEqual(axe.commons.table.toGrid(target), [
      [$id('t1'), $id('t1'), $id('t2')],
      [$id('t1'), $id('t1'), $id('t3')]
    ]);
  });

  it('should handle rowspan=0', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td id="t1">2</td>
          <td rowspan="0" id="t2">ok</td>
          <td id="t3"></td>
        </tr>
        <tr>
          <td id="t4">4</td>
          <td id="t5">5</td>
        </tr>
      </table>
    `;

    const target = fixture.querySelector('table');

    assert.deepEqual(axe.commons.table.toGrid(target), [
      [$id('t1'), $id('t2'), $id('t3')],
      [$id('t4'), $id('t2'), $id('t5')]
    ]);
  });

  it('should insert an empty array for empty rows', () => {
    fixture.innerHTML = html`
      <table>
        <tr></tr>
        <tr>
          <td id="t1">ok</td>
        </tr>
      </table>
    `;

    const target = fixture.querySelector('table');

    assert.deepEqual(axe.commons.table.toGrid(target), [[], [$id('t1')]]);
  });
});
