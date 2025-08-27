describe('table.isDataTable', () => {
  const fixture = document.getElementById('fixture');

  it('should be false if the table has role=presentation', () => {
    fixture.innerHTML =
      '<table role="presentation">' +
      '<thead><tr><th>1</th><th>2</th></tr></thead>' +
      '<tbody><tr><td>One</td><td>Two</td></tr></tbody>' +
      '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(axe.commons.table.isDataTable(node));
  });

  it('should be false if the table has role=none', () => {
    fixture.innerHTML =
      '<table role="none">' +
      '<thead><tr><th>1</th><th>2</th></tr></thead>' +
      '<tbody><tr><td>One</td><td>Two</td></tr></tbody>' +
      '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture);
    assert.isFalse(axe.commons.table.isDataTable(node));
  });

  it('should be true if the table is inside an editable area', () => {
    fixture.innerHTML =
      '<div contenteditable="true">' +
      '<table>' +
      '<thead><tr><th>1</th><th>2</th></tr></thead>' +
      '<tbody><tr><td>One</td><td>Two</td></tr></tbody>' +
      '</table>' +
      '</div>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if the table has a role of grid', () => {
    fixture.innerHTML = '<table role="grid"></table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if the table has a role of treegrid', () => {
    fixture.innerHTML = '<table role="treegrid"></table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if the element has a role of table', () => {
    fixture.innerHTML = '<div role="table"></div>';

    const node = fixture.querySelector('[role="table"]');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  describe('should be true if the table has a landmark role', () => {
    it('application', () => {
      fixture.innerHTML = '<table role="application"></table>';

      const node = fixture.querySelector('table');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.isTrue(axe.commons.table.isDataTable(node));
    });
    it('banner', () => {
      fixture.innerHTML = '<table role="banner"></table>';

      const node = fixture.querySelector('table');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.isTrue(axe.commons.table.isDataTable(node));
    });
    it('complementary', () => {
      fixture.innerHTML = '<table role="complementary"></table>';

      const node = fixture.querySelector('table');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.isTrue(axe.commons.table.isDataTable(node));
    });
    it('contentinfo', () => {
      fixture.innerHTML = '<table role="contentinfo"></table>';

      const node = fixture.querySelector('table');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.isTrue(axe.commons.table.isDataTable(node));
    });
    it('form', () => {
      fixture.innerHTML = '<table role="form"></table>';

      const node = fixture.querySelector('table');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.isTrue(axe.commons.table.isDataTable(node));
    });
    it('main', () => {
      fixture.innerHTML = '<table role="main"></table>';

      const node = fixture.querySelector('table');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.isTrue(axe.commons.table.isDataTable(node));
    });
    it('navigation', () => {
      fixture.innerHTML = '<table role="navigation"></table>';

      const node = fixture.querySelector('table');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.isTrue(axe.commons.table.isDataTable(node));
    });
    it('search', () => {
      fixture.innerHTML = '<table role="search"></table>';

      const node = fixture.querySelector('table');
      axe.testUtils.flatTreeSetup(fixture.firstChild);
      assert.isTrue(axe.commons.table.isDataTable(node));
    });
  });

  it('should be false if the table has datatable=0', () => {
    fixture.innerHTML =
      '<table datatable="0">' +
      '<thead><tr><th>1</th><th>2</th></tr></thead>' +
      '<tbody><tr><td>One</td><td>Two</td></tr></tbody>' +
      '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isFalse(axe.commons.table.isDataTable(node));
  });

  it('should be true if the table has a summary attribute', () => {
    fixture.innerHTML = '<table summary="Hello">' + '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if the table has a caption element', () => {
    fixture.innerHTML = '<table>' + '<caption>Hello</caption>' + '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if the table has a col element', () => {
    fixture.innerHTML = '<table>' + '<col>' + '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if the table has a colgroup element', () => {
    fixture.innerHTML = '<table>' + '<colgroup></colgroup>' + '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if the table has a thead element', () => {
    fixture.innerHTML = '<table>' + '<thead></thead>' + '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if the table has a tfoot element', () => {
    fixture.innerHTML = '<table>' + '<tfoot></tfoot>' + '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if the table has a th element', () => {
    fixture.innerHTML = '<table>' + '<tr><th></th></tr>' + '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if the table has a rowheader', () => {
    fixture.innerHTML =
      '<table>' + '<tr><td role="rowheader"></td></tr>' + '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if the table has a columnheader', () => {
    fixture.innerHTML =
      '<table>' + '<tr><td role="columnheader"></td></tr>' + '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if the table has a cell with headers attribute', () => {
    fixture.innerHTML =
      '<table>' + '<tr><td headers="yes"></td></tr>' + '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if the table has a cell with scope attribute', () => {
    fixture.innerHTML =
      '<table>' + '<tr><td scope="col"></td></tr>' + '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if the table has a cell with abbr attribute', () => {
    fixture.innerHTML =
      '<table>' + '<tr><td abbr="yes"></td></tr>' + '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if the table has a cell with an abbr element as a single child', () => {
    fixture.innerHTML =
      '<table>' + '<tr><td><div><abbr>ok</abbr></div></td></tr>' + '</table>';

    let node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isFalse(axe.commons.table.isDataTable(node));

    fixture.innerHTML =
      '<table>' + '<tr><td><abbr>ok</abbr><div></div></td></tr>' + '</table>';

    node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isFalse(axe.commons.table.isDataTable(node));

    fixture.innerHTML =
      '<table>' + '<tr><td><abbr>ok</abbr></td></tr>' + '</table>';

    node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be false if it has a nested table', () => {
    fixture.innerHTML =
      '<table id="out"><tr><td>' +
      '<table><tr><td></td></tr></table>' +
      '</td></tr></table>';

    const node = fixture.querySelector('#out');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isFalse(axe.commons.table.isDataTable(node));
  });

  it('should be false if it has only one column', () => {
    fixture.innerHTML =
      '<table>' + '<tr><td></td></tr>' + '<tr><td></td></tr>' + '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isFalse(axe.commons.table.isDataTable(node));
  });

  it('should be false if it has only one row', () => {
    fixture.innerHTML = '<table>' + '<tr><td></td><td></td></tr>' + '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isFalse(axe.commons.table.isDataTable(node));
  });

  it('should be true if it has 5 or more columns', () => {
    fixture.innerHTML =
      '<table>' +
      '<tr><td></td><td></td><td></td><td></td><td></td></tr>' +
      '<tr><td></td><td></td><td></td><td></td><td></td></tr>' +
      '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if it has borders around cells', () => {
    fixture.innerHTML =
      '<table border="1">' +
      '<tr><td></td><td></td></tr>' +
      '<tr><td></td><td></td></tr>' +
      '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if it has zebra rows', () => {
    fixture.innerHTML =
      '<table>' +
      '<tr><td></td><td></td></tr>' +
      '<tr style="background: #fc0"><td></td><td></td></tr>' +
      '<tr><td></td><td></td></tr>' +
      '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });

  it('should be true if it has zebra rows - background image', () => {
    fixture.innerHTML =
      '<table>' +
      '<tr><td></td><td></td></tr>' +
      '<tr style="background-image: url(data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOy' +
      'DZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
      'AAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQ' +
      'KGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7)"><td></td><td></td></tr>' +
      '<tr><td></td><td></td></tr>' +
      '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });
  it('should be true if it has 20 or more rows', () => {
    fixture.innerHTML =
      '<table>' +
      new Array(21).join('<tr><td></td><td></td><td></td></tr>') +
      '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });
  it('should be false if its width is 95% of the document width', () => {
    fixture.innerHTML =
      '<table style="width: 95.5%">' +
      new Array(3).join('<tr><td></td><td></td><td></td></tr>') +
      '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isFalse(axe.commons.table.isDataTable(node));
  });

  it('should be false if it has less than 10 cells', () => {
    fixture.innerHTML =
      '<table>' +
      new Array(4).join('<tr><td></td><td></td><td></td></tr>') +
      '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isFalse(axe.commons.table.isDataTable(node));
  });

  it('should be false if has an iframe element descendent', () => {
    fixture.innerHTML =
      '<table>' +
      new Array(4).join('<tr><td></td><td></td><td></td></tr>') +
      '<tr><td><iframe src="javascript: void 0;"></iframe></td><td></td><td></td></tr>' +
      '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isFalse(axe.commons.table.isDataTable(node));
  });

  it('should be false if has an object element descendent', () => {
    fixture.innerHTML =
      '<table>' +
      new Array(4).join('<tr><td></td><td></td><td></td></tr>') +
      '<tr><td><object></object></td><td></td><td></td></tr>' +
      '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isFalse(axe.commons.table.isDataTable(node));
  });

  it('should be false if has an embed element descendent', () => {
    fixture.innerHTML =
      '<table>' +
      new Array(4).join('<tr><td></td><td></td><td></td></tr>') +
      '<tr><td><embed></td><td></td><td></td></tr>' +
      '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isFalse(axe.commons.table.isDataTable(node));
  });

  // Causing sauce labs tests to fail & don't really care about applets
  it.skip('should be false if has an applet element descendent', () => {
    fixture.innerHTML =
      '<table>' +
      new Array(4).join('<tr><td></td><td></td><td></td></tr>') +
      '<tr><td><applet></applet></td><td></td><td></td></tr>' +
      '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isFalse(axe.commons.table.isDataTable(node));
  });

  it('should otherwise be true', () => {
    fixture.innerHTML =
      '<table>' +
      new Array(4).join('<tr><td></td><td></td><td></td><td></td></tr>') +
      '</table>';

    const node = fixture.querySelector('table');
    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.isTrue(axe.commons.table.isDataTable(node));
  });
});
