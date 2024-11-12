describe('td-headers-attr', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var checkContext = axe.testUtils.MockCheckContext();
  var fixtureSetup = axe.testUtils.fixtureSetup;
  var check = axe.testUtils.getCheckEvaluate('td-headers-attr');

  afterEach(function () {
    checkContext.reset();
  });

  it('returns true no headers attribute is present', function () {
    fixtureSetup(
      '<table>' +
        '  <tr> <th>hi</th> <td>hello</td> </tr>' +
        '  <tr> <th>hi</th> <td>hello</td> </tr>' +
        '</table>'
    );

    var node = fixture.querySelector('table');
    assert.isTrue(check.call(checkContext, node));
  });

  it('returns true if a valid header is present', function () {
    fixtureSetup(
      '<table>' +
        '  <tr> <th id="hi">hello</th> </tr>' +
        '  <tr> <td headers="hi">goodbye</td> </tr>' +
        '</table>'
    );

    var node = fixture.querySelector('table');
    assert.isTrue(check.call(checkContext, node));
  });

  it('returns true if multiple valid headers are present', function () {
    fixtureSetup(
      '<table>' +
        '  <tr> <th id="hi1">hello</th> <th id="hi2">hello</th> </tr>' +
        '  <tr> <td headers="hi1 \t\n hi2">goodbye</td> </tr>' +
        '</table>'
    );

    var node = fixture.querySelector('table');
    assert.isTrue(check.call(checkContext, node));
  });

  it('returns true with an empty header', function () {
    fixtureSetup(
      '<table>' +
        '  <tr> <th id="hi1"></th> </tr>' +
        '  <tr> <td headers="hi1">goodbye</td> </tr>' +
        '</table>'
    );

    var node = fixture.querySelector('table');
    assert.isTrue(check.call(checkContext, node));
  });

  it('returns undefined if headers is empty', function () {
    fixtureSetup(
      '<table>' +
        '  <tr> <th id="hi"> </th> </tr>' +
        '  <tr> <td headers="">goodbye</td> </tr>' +
        '</table>'
    );

    var node = fixture.querySelector('table');
    assert.isUndefined(check.call(checkContext, node));
  });

  it('returns false if the header is a table cell', function () {
    var node;

    fixtureSetup(
      '<table>' +
        '  <tr> <th> <span id="hi">hello</span> </th> </tr>' +
        '  <tr> <td headers="h1">goodbye</td> </tr>' +
        '</table>'
    );
    node = fixture.querySelector('table');
    assert.isFalse(check.call(checkContext, node));

    fixtureSetup(
      '<span id="hi">hello</span>' +
        '<table>' +
        '  <tr> <th></th> </tr>' +
        '  <tr> <td headers="h1">goodbye</td> </tr>' +
        '</table>'
    );
    node = fixture.querySelector('table');
    assert.isFalse(check.call(checkContext, node));
    assert.deepEqual(checkContext._data, {
      messageKey: 'cell-header-not-in-table'
    });

    fixtureSetup(
      '<table id="hi">' +
        '  <tr> <th>hello</th> </tr>' +
        '  <tr> <td headers="h1">goodbye</td> </tr>' +
        '</table>'
    );
    node = fixture.querySelector('table');
    assert.isFalse(check.call(checkContext, node));
  });

  it('returns false if table cell referenced as header', function () {
    fixtureSetup(`
      <table>
        <tr> <td id="hi">hello</td> </tr>
        <tr> <td headers="hi">goodbye</td> </tr>
      </table>
    `);

    var node = fixture.querySelector('table');
    assert.isFalse(check.call(checkContext, node));
    assert.deepEqual(checkContext._data, { messageKey: 'cell-header-not-th' });
  });

  it('returns true if table cell referenced as header with role rowheader or columnheader', function () {
    var node;

    fixtureSetup(`
      <table>
        <tr> <td role="rowheader" id="hi">hello</td> </tr>
        <tr> <td headers="hi">goodbye</td> </tr>
      </table>
    `);

    node = fixture.querySelector('table');
    assert.isTrue(check.call(checkContext, node));

    fixtureSetup(`
      <table>
        <tr> <td role="columnheader" id="hi">hello</td> </tr>
        <tr> <td headers="hi">goodbye</td> </tr>
      </table>
    `);

    node = fixture.querySelector('table');
    assert.isTrue(check.call(checkContext, node));
  });

  it('relatedNodes contains each cell only once', function () {
    fixtureSetup(`
      <table>
        <tr> <td id="hi1">hello</td> </tr>
        <tr> <td id="hi2">hello</td> </tr>
        <tr> <td id="bye" headers="hi1 hi2">goodbye</td> </tr>
      </table>'
    `);

    var node = fixture.querySelector('table');
    check.call(checkContext, node);
    assert.deepEqual(checkContext._relatedNodes, [
      fixture.querySelector('#bye')
    ]);
  });

  it('returns false if the header refers to the same cell', function () {
    fixtureSetup(
      '<table id="hi">' +
        '  <tr> <th>hello</th> </tr>' +
        '  <tr> <td id="bye" headers="bye">goodbye</td> </tr>' +
        '</table>'
    );

    var node = fixture.querySelector('table');
    assert.isFalse(check.call(checkContext, node));
    assert.deepEqual(checkContext._data, { messageKey: 'header-refs-self' });
  });

  it('returns true if td[headers] is hidden', function () {
    fixtureSetup(
      '<table>' +
        '  <tr> <th>Hello</th> <td headers="h1" hidden>goodbye</td> </tr>' +
        '</table>'
    );
    var node = fixture.querySelector('table');
    assert.isTrue(check.call(checkContext, node));
  });

  it('returns true if td[headers] has aria-hidden=true', function () {
    fixtureSetup(
      '<table>' +
        '  <tr> <th>Hello</th> <td headers="h1" aria-hidden="true">goodbye</td> </tr>' +
        '</table>'
    );
    var node = fixture.querySelector('table');
    assert.isTrue(check.call(checkContext, node));
  });
});
