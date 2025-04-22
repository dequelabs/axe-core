describe('th-has-data-cells', () => {
  const fixture = document.getElementById('fixture');
  const shadowSupport = axe.testUtils.shadowSupport.v1;
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    checkContext.reset();
  });

  it('should return true each row header has a non-empty cell', () => {
    fixture.innerHTML =
      '<table>' +
      '  <tr> <th>hi</th> <td>hello</td> </tr>' +
      '  <tr> <th>hi</th> <td>hello</td> </tr>' +
      '</table>';

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('th-has-data-cells')
        .call(checkContext, node)
    );
  });

  it('should return true each non-empty column header has a cell', () => {
    fixture.innerHTML =
      '<table>' +
      '  <tr> <th>H</th> <th>H</th> </tr>' +
      '  <tr> <td>hi</td> <td>hello</td></tr>' +
      '</table>';

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('th-has-data-cells')
        .call(checkContext, node)
    );
  });

  it('should return true if referred to with headers attr', () => {
    fixture.innerHTML =
      '<table>' +
      '  <tr> <td headers="a">hi</td> <td headers="b">hello</td></tr>' +
      '  <tr> <th id="a">H</th> <th id="b">H</th> </tr>' +
      '</table>';

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('th-has-data-cells')
        .call(checkContext, node)
    );
  });

  it('should return true if referred to with aria-labelledby', () => {
    fixture.innerHTML =
      '<table>' +
      '  <tr> <td aria-labelledby="a">hi</td> <td aria-labelledby="b">hello</td></tr>' +
      '  <tr> <th id="a">H</th> <th id="b">H</th> </tr>' +
      '</table>';

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('th-has-data-cells')
        .call(checkContext, node)
    );
  });

  it('should return true if the th element is empty', () => {
    fixture.innerHTML =
      '<table>' +
      '  <tr> <th></th> <th></th> </tr>' +
      '  <tr> <th></th> <th></th> </tr>' +
      '</table>';
    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('th-has-data-cells')
        .call(checkContext, node)
    );
  });

  it('should return true when the td has a content element', () => {
    fixture.innerHTML =
      '<table>' +
      '  <tr> <th>hi</th> <td><input type="text"></td> </tr>' +
      '  <tr> <th>hi</th> <td><textarea></textarea></td> </tr>' +
      '  <tr> <th>hi</th> <td><select><option>a</option></select></td> </tr>' +
      '  <tr> <th>hi</th> <td><img src="" alt="foo"></td> </tr>' +
      '  <tr> <th>hi</th> <td><video></video></td> </tr>' +
      '  <tr> <th>hi</th> <td><audio></audio></td> </tr>' +
      '  <tr> <th>hi</th> <td><span role="img"></span></td> </tr>' +
      '</table>';

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('th-has-data-cells')
        .call(checkContext, node)
    );
  });

  it('should return undefined if a th has no data cells', () => {
    fixture.innerHTML =
      '<table>' +
      '  <tr> <th>hi</th> </tr>' +
      '  <tr> <th>hi</th> </tr>' +
      '</table>';

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('th-has-data-cells')
        .call(checkContext, node)
    );
  });

  it('should return true if all data cells are empty', () => {
    fixture.innerHTML =
      '<table>' +
      '  <tr> <th>hi</th> <td></td> </tr>' +
      '  <tr> <th>hi</th> <td></td> </tr>' +
      '</table>';

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('th-has-data-cells')
        .call(checkContext, node)
    );
  });

  it('should return undefined if a td with role=columnheader is used that has no data cells', () => {
    fixture.innerHTML =
      '<table id="fail4">' +
      '  <tr> <td>axe</td> <td role="columnheader">AXE</th> </tr>' +
      '</table>';

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('th-has-data-cells')
        .call(checkContext, node)
    );
  });

  it('should return undefined if table cell points to a different header', () => {
    fixture.innerHTML =
      '<table>' +
      '<tr>' +
      '<th id="col1">Column 1</th>' +
      '<th id="Column2">Column 2</th>' +
      '</tr>' +
      '<tr>' +
      '<td></td>' +
      '<td headers="col1"></td>' +
      '</tr>' +
      '</table>';

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('th-has-data-cells')
        .call(checkContext, node)
    );
  });

  (shadowSupport ? it : xit)('recognizes shadow tree content', () => {
    fixture.innerHTML = '<div id="shadow"> <b>data</b> </div>';
    const shadow = fixture
      .querySelector('#shadow')
      .attachShadow({ mode: 'open' });
    shadow.innerHTML =
      '<table>' +
      '  <tr> <th> header </th> </tr>' +
      '  <tr> <td><slot></slot></td> </tr>' +
      '</table>';

    axe.testUtils.flatTreeSetup(fixture);
    const node = axe.utils.querySelectorAll(axe._tree, 'table')[0].actualNode;
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('th-has-data-cells')
        .call(checkContext, node)
    );
  });
});
