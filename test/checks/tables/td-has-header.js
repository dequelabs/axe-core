describe('td-has-header', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const shadowSupport = axe.testUtils.shadowSupport.v1;
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    fixture.innerHTML = '';
    checkContext.reset();
    axe._tree = null;
  });

  it('should not be fooled by rowspan and colspan', () => {
    fixture.innerHTML = html`
      <table>
        <thead>
          <tr>
            <td rowspan="2">Species</td>
            <td colspan="2">Info</td>
          </tr>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gorilla</td>
            <td>Koko</td>
            <td>44</td>
          </tr>
          <tr>
            <td>Human</td>
            <td>Matt</td>
            <td>33</td>
          </tr>
        </tbody>
      </table>
    `;
    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    const result = axe.testUtils
      .getCheckEvaluate('td-has-header')
      .call(checkContext, node);

    assert.isFalse(result);
    assert.equal(checkContext._relatedNodes.length, 4);
  });

  it('should return true each non-empty cell has a row header', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <th>hi</th>
          <td>hello</td>
        </tr>
      </table>
    `;

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('td-has-header').call(checkContext, node)
    );
  });

  it('should return true each non-empty cell has a column header', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <th>hi</th>
          <th>hello</th>
        </tr>
        <tr>
          <td>hi</td>
          <td>hello</td>
        </tr>
      </table>
    `;

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('td-has-header').call(checkContext, node)
    );
  });

  it('should return true each non-empty cell has aria-label', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td aria-label="one">hi</td>
          <td aria-label="two">hello</td>
        </tr>
        <tr>
          <td aria-label="one">hi</td>
          <td aria-label="two">hello</td>
        </tr>
      </table>
    `;

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('td-has-header').call(checkContext, node)
    );
  });

  it('should return true each non-empty cell has aria-labelledby', () => {
    fixture.innerHTML = html`
      <div id="one">one</div>
      <div id="two">two</div>
      <table>
        <tr>
          <td aria-labelledby="one">hi</td>
          <td aria-labelledby="two">hello</td>
        </tr>
        <tr>
          <td aria-labelledby="one">hi</td>
          <td aria-labelledby="two">hello</td>
        </tr>
      </table>
    `;

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('td-has-header').call(checkContext, node)
    );
  });

  it('should return true each non-empty cell has a headers attribute', () => {
    // This will fail under td-headers-attr because the headers must be inside the table
    fixture.innerHTML = html`
      <div id="one">one</div>
      <div id="two">two</div>
      <table>
        <tr>
          <td headers="one">hi</td>
          <td headers="two">hello</td>
        </tr>
        <tr>
          <td headers="one">hi</td>
          <td headers="two">hello</td>
        </tr>
      </table>
    `;

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('td-has-header').call(checkContext, node)
    );
  });

  it('should return true there is at least one non-empty header', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <th>hi</th>
          <th>hello</th>
        </tr>
        <tr>
          <th></th>
          <td>hello</td>
        </tr>
      </table>
    `;

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('td-has-header').call(checkContext, node)
    );
  });

  it('should return true if the only data cells are empty', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </table>
    `;

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('td-has-header').call(checkContext, node)
    );
  });

  it('should return false if a cell has no headers', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td>hi</td>
          <td>hello</td>
        </tr>
      </table>
    `;

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');

    assert.isFalse(
      axe.testUtils.getCheckEvaluate('td-has-header').call(checkContext, node)
    );
    assert.deepEqual(checkContext._relatedNodes, [
      node.rows[0].cells[0],
      node.rows[0].cells[1]
    ]);
  });

  it('should return false if a cell has no headers - complex table', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <td colspan="3">Psuedo-Caption</td>
        </tr>
        <tr>
          <td>hi</td>
          <td>hello</td>
          <td>Ok</td>
        </tr>
      </table>
    `;

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');

    assert.isFalse(
      axe.testUtils.getCheckEvaluate('td-has-header').call(checkContext, node)
    );
    assert.deepEqual(checkContext._relatedNodes, [
      node.rows[0].cells[0],
      node.rows[1].cells[0],
      node.rows[1].cells[1],
      node.rows[1].cells[2]
    ]);
  });

  it('should return true if the headers element is empty', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <th>Hello</th>
          <td headers="">goodbye</td>
        </tr>
      </table>
    `;

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('td-has-header').call(checkContext, node)
    );
  });

  it('should return true if the headers element refers to non-existing elements', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <th>Hello</th>
          <td headers="beatles">goodbye</td>
        </tr>
      </table>
    `;

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('td-has-header').call(checkContext, node)
    );
  });

  it('should return false if all headers are empty', () => {
    fixture.innerHTML = html`
      <table>
        <tr>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td>hi</td>
          <td>hello</td>
        </tr>
      </table>
    `;

    axe.testUtils.flatTreeSetup(fixture);
    const node = fixture.querySelector('table');
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('td-has-header').call(checkContext, node)
    );
  });

  (shadowSupport ? it : xit)('recognizes shadow tree content', () => {
    fixture.innerHTML = '<div id="shadow"> <b>header</b> </div>';
    const shadow = fixture
      .querySelector('#shadow')
      .attachShadow({ mode: 'open' });
    shadow.innerHTML = html`
      <table>
        <tr>
          <th><slot></slot></th>
        </tr>
        <tr>
          <td>data</td>
        </tr>
      </table>
    `;

    axe.testUtils.flatTreeSetup(fixture);
    const node = axe.utils.querySelectorAll(axe._tree, 'table')[0].actualNode;
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('td-has-header').call(checkContext, node)
    );
  });
});
