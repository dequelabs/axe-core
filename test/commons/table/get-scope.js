describe('table.getScope', () => {
  const html = axe.testUtils.html;

  function $id(id) {
    return document.getElementById(id);
  }

  const fixture = $id('fixture');
  const fixtureSetup = axe.testUtils.fixtureSetup;

  it('returns false for TD without scope attribute', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td></td>
          <td id="target">1</td>
        </tr>
        <tr>
          <th>2</th>
          <td>ok</td>
        </tr>
      </table>
    `;

    const target = $id('target');
    fixtureSetup();
    assert.equal(axe.commons.table.getScope(target), false);
  });

  it('throws if it is not passed a data cell', () => {
    assert.throws(() => {
      axe.commons.table.getScope();
    }, TypeError);

    const node = document.createElement('tr');
    axe.utils.getFlattenedTree(node);

    assert.throws(() => {
      axe.commons.table.getScope(node);
    }, TypeError);
  });

  it('does not throw if it is passed a data cell', () => {
    const node = document.createElement('td');
    axe.utils.getFlattenedTree(node);
    assert.doesNotThrow(() => {
      axe.commons.table.getScope(node);
    });
  });

  describe('auto scope', () => {
    it('return `auto` with implicit row and col scope', () => {
      fixture.innerHTML = html`
        <table>
          <tr>
            <th id="target">1</th>
            <td>ok</td>
          </tr>
          <tr>
            <td>ok</td>
            <td>ok</td>
          </tr>
        </table>
      `;

      const target = $id('target');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.equal(axe.commons.table.getScope(target), 'auto');
    });

    it('return `auto` with implicit row and col scope, not in the first column', () => {
      fixture.innerHTML = html`
        <table>
          <tr>
            <td></td>
            <th id="target">1</th>
          </tr>
          <tr>
            <th>2</th>
            <td>ok</td>
            <td></td>
          </tr>
        </table>
      `;

      const target = $id('target');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.equal(axe.commons.table.getScope(target), 'auto');
    });

    it('return `auto` with implicit row and col scope, not in the first row', () => {
      fixture.innerHTML = html`
        <table>
          <tr>
            <td></td>
            <th>1</th>
          </tr>
          <tr>
            <th id="target">2</th>
            <td>ok</td>
            <td></td>
          </tr>
        </table>
      `;

      const target = $id('target');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.equal(axe.commons.table.getScope(target), 'auto');
    });

    it('return `auto` without an actualNode or in the tree', () => {
      const serialNode = new axe.SerialVirtualNode({
        nodeName: 'th'
      });

      assert.equal(axe.commons.table.getScope(serialNode), 'auto');
    });
  });

  describe('col scope', () => {
    it('returns `col` with explicit col scope on TH', () => {
      fixture.innerHTML = html`
        <table>
          <tr>
            <td></td>
            <th id="target" scope="col">1</th>
          </tr>
          <tr>
            <th>2</th>
            <td>ok</td>
            <td></td>
          </tr>
        </table>
      `;

      const target = $id('target');
      fixtureSetup();
      assert.equal(axe.commons.table.getScope(target), 'col');
    });

    it('returns `col` with explicit col scope on TD', () => {
      fixture.innerHTML = html`
        <table>
          <tr>
            <td></td>
            <td id="target" scope="col">1</td>
          </tr>
          <tr>
            <th>2</th>
            <td>ok</td>
          </tr>
        </table>
      `;

      const target = $id('target');
      fixtureSetup();
      assert.equal(axe.commons.table.getScope(target), 'col');
    });

    it('returns `col` with role = columnheader on TD', () => {
      fixture.innerHTML = html`
        <table>
          <tr>
            <td></td>
            <td id="target" scope="row" role="columnheader">1</td>
          </tr>
          <tr>
            <th>2</th>
            <td>ok</td>
          </tr>
        </table>
      `;

      const target = $id('target');
      fixtureSetup();
      assert.equal(axe.commons.table.getScope(target), 'col');
    });

    it('returns `col` when part of a row of all TH elements', () => {
      fixture.innerHTML = html`
        <table>
          <tr>
            <th></th>
            <th id="target">1</th>
          </tr>
          <tr>
            <td>2</td>
            <td>ok</td>
          </tr>
        </table>
      `;

      const target = $id('target');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.equal(axe.commons.table.getScope(target), 'col');
    });

    it('returns `col` when part of both a row and a column of all TH elements', () => {
      fixture.innerHTML = html`
        <table>
          <tr>
            <th id="target">1</th>
            <th></th>
          </tr>
          <tr>
            <th>2</th>
            <td>ok</td>
          </tr>
        </table>
      `;

      const target = $id('target');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.equal(axe.commons.table.getScope(target), 'col');
    });

    it('understands colspan on the table', () => {
      fixture.innerHTML = html`
        <table>
          <tr>
            <th colspan="2"></th>
          </tr>
          <tr>
            <th id="target"></th>
            <th></th>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </table>
      `;
      const target = $id('target');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.equal(axe.commons.table.getScope(target), 'col');
    });

    it('understands colspan on the cell', () => {
      fixture.innerHTML = html`
        <table>
          <tr>
            <th id="target" colspan="2"></th>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </table>
      `;
      const target = $id('target');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.equal(axe.commons.table.getScope(target), 'col');
    });
  });

  describe('row scope', () => {
    it('returns `row` with explicit row scope on TH', () => {
      fixture.innerHTML = html`
        <table>
          <tr>
            <td></td>
            <th>1</th>
          </tr>
          <tr>
            <th id="target" scope="row">2</th>
            <td>ok</td>
            <td></td>
          </tr>
        </table>
      `;

      const target = $id('target');
      fixtureSetup();
      assert.equal(axe.commons.table.getScope(target), 'row');
    });

    it('returns `row` with explicit row scope on TD', () => {
      fixture.innerHTML = html`
        <table>
          <tr>
            <td></td>
            <td>1</td>
          </tr>
          <tr>
            <td id="target" scope="row">2</td>
            <td>ok</td>
          </tr>
        </table>
      `;

      const target = $id('target');
      fixtureSetup();
      assert.equal(axe.commons.table.getScope(target), 'row');
    });

    it('returns `row` with role = rowheader on TD', () => {
      fixture.innerHTML = html`
        <table>
          <tr>
            <td></td>
            <td>1</td>
          </tr>
          <tr>
            <td id="target" scope="col" role="rowheader">2</td>
            <td>ok</td>
          </tr>
        </table>
      `;

      const target = $id('target');
      fixtureSetup();
      assert.equal(axe.commons.table.getScope(target), 'row');
    });

    it('returns `row` when part of a column of all TH elements', () => {
      fixture.innerHTML = html`
        <table>
          <tr>
            <th></th>
            <td>1</td>
          </tr>
          <tr>
            <th id="target">2</th>
            <td>ok</td>
          </tr>
        </table>
      `;

      const target = $id('target');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.equal(axe.commons.table.getScope(target), 'row');
    });

    it('understands rowspan in the table', () => {
      fixture.innerHTML = html`
        <table>
          <tr>
            <th rowspan="2"></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th id="target"></th>
            <td></td>
          </tr>
        </table>
      `;
      const target = $id('target');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.equal(axe.commons.table.getScope(target), 'row');
    });

    it('understands rowspan on the cell', () => {
      fixture.innerHTML = html`
        <table>
          <tr>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th id="target" rowspan="2"></th>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
        </table>
      `;
      const target = $id('target');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.equal(axe.commons.table.getScope(target), 'row');
    });
  });

  it('does not throw on empty rows', () => {
    fixture.innerHTML = html`
      <table>
        <tr></tr>
        <tr>
          <th id="target">foo</th>
          <td>bar</td>
        </tr>
      </table>
    `;
    const target = $id('target');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.equal(axe.commons.table.getScope(target), 'auto');
  });
});
