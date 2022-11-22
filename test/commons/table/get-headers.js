describe('table.getHeaders', function () {
  'use strict';
  function $id(id) {
    return document.getElementById(id);
  }

  var fixture = $id('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('should work with scope=auto', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr><td></td><th id="t1">1</th><th>2</th></tr>' +
      '<tr><th id="t2">2</th><td id="target">ok</td><td></td></tr>' +
      '</table>';

    var target = $id('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getHeaders(target), [
      $id('t1'),
      $id('t2')
    ]);
  });

  it('should work with scope set', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr><td></td><th scope="col" id="t1">1</th><th scope="col">2</th></tr>' +
      '<tr><th scope="row" id="t2">1</th><td id="target">ok</td><td></td></tr>' +
      '</table>';

    var target = $id('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getHeaders(target), [
      $id('t1'),
      $id('t2')
    ]);
  });

  it('should find multiple column headers', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr><td></td><th scope="col" id="t1">1</th><th scope="col">2</th></tr>' +
      '<tr><td></td><th scope="col" id="t2">1</th><th scope="col">2</th></tr>' +
      '<tr><th scope="row" id="t3">1</th><td id="target">ok</td><td></td></tr>' +
      '</table>';

    var target = $id('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getHeaders(target), [
      $id('t1'),
      $id('t2'),
      $id('t3')
    ]);
  });

  it('should find multiple row headers', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr><td></td><th scope="col">1</th><th scope="col" id="t1">2</th></tr>' +
      '<tr><th scope="row" id="t2">1</th><th scope="row" id="t3">2</th><td id="target">ok</td></tr>' +
      '</table>';

    var target = $id('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getHeaders(target), [
      $id('t1'),
      $id('t2'),
      $id('t3')
    ]);
  });

  it('should handle colspans', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr><td></td><th scope="col">1</th><th scope="col" id="t1">2</th></tr>' +
      '<tr><td colspan="2"></td><td id="target"></td></tr>' +
      '</table>';

    var target = $id('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getHeaders(target), [$id('t1')]);
  });

  it('should handle rowspans', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr><td rowspan="2"></td><th scope="col">1</th><th scope="col" id="t1">2</th></tr>' +
      '<tr><th scope="row" id="t2"></th><td id="target"></td></tr>' +
      '</table>';

    var target = $id('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getHeaders(target), [
      $id('t1'),
      $id('t2')
    ]);
  });

  it('should handle rowspan=0', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr><td rowspan="0"></td><th scope="col">1</th><th scope="col" id="t1">2</th></tr>' +
      '<tr><th scope="row" id="t2"></th><td id="target"></td></tr>' +
      '</table>';

    var target = $id('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getHeaders(target), [
      $id('t1'),
      $id('t2')
    ]);
  });

  it('should handle headers attribute', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr><td id="t1">t1</td><td id="t2">t2</td></tr>' +
      '<tr><td id="t3">t3</td><td id="target" headers="t1 t2 t3"></td></tr>' +
      '</table>';

    var target = $id('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getHeaders(target), [
      $id('t1'),
      $id('t2'),
      $id('t3')
    ]);
  });

  it('should handle empty headers attribute', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr>' +
      '<th scope="col" id="t1">Projects</th>' +
      '<th scope="col" id="t2">Progress</th>' +
      '</tr>' +
      '<tr>' +
      '<td headers="" id="target">My Project</td>' +
      '<td>15%</td>' +
      '</tr>' +
      '</table>';

    var target = $id('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getHeaders(target), [$id('t1')]);
  });

  it('should handle non-existent headers attribute', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr>' +
      '<th scope="col" id="t1">Projects</th>' +
      '<th scope="col" id="t2">Progress</th>' +
      '</tr>' +
      '<tr>' +
      '<td headers="non-existent" id="target">My Project</td>' +
      '<td>15%</td>' +
      '</tr>' +
      '</table>';

    var target = $id('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getHeaders(target), [$id('t1')]);
  });

  it('should work with tables that have inconsistent columns', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr><td id="t1">t1</td><td id="t2">t2</td></tr>' +
      '<tr><td id="t3">t3</td><td headers="t1 t2 t3"></td><td id="target"></td></tr>' +
      '</table>';

    var target = $id('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getHeaders(target), []);
  });

  it('should handle multiple headers with colspan', function () {
    fixture.innerHTML =
      '<table>' +
      '<thead>' +
      '<tr>' +
      '<th id="t1">Product</th>' +
      '<th id="t2">Amount</th>' +
      '<th id="t3">Price</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>' +
      '<tr><td colspan="2" id="target">No available products to display</td></tr>' +
      '</thead>' +
      '</table>';

    var target = $id('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getHeaders(target), [
      $id('t1'),
      $id('t2')
    ]);
  });

  it('should handle multiple headers with rowspan', function () {
    fixture.innerHTML =
      '<table>' +
      '<tbody>' +
      '<tr>' +
      '<th id="t1"><td>Projects</td><td rowspan="2" id="target">Foo</td>' +
      '</tr>' +
      '<tr><th id="t2"><td>Projects</td></tr>' +
      '<tr><th id="t3"><td>Projects</td></tr>' +
      '</thead>' +
      '</table>';

    var target = $id('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getHeaders(target), [
      $id('t1'),
      $id('t2')
    ]);
  });

  it('should handle negative colspan', function () {
    fixture.innerHTML =
      '<table>' +
      '<thead>' +
      '<tr>' +
      '<th id="t1">Product</th>' +
      '<th id="t2">Amount</th>' +
      '<th id="t3">Price</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>' +
      '<tr><td colspan="-3" id="target">No available products to display</td></tr>' +
      '</thead>' +
      '</table>';

    var target = $id('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getHeaders(target), [$id('t1')]);
  });

  it('should handle negative rowspan', function () {
    fixture.innerHTML =
      '<table>' +
      '<tbody>' +
      '<tr>' +
      '<th id="t1"><td>Projects</td><td rowspan="-3" id="target">Foo</td>' +
      '</tr>' +
      '<tr><th id="t2"><td>Projects</td></tr>' +
      '<tr><th id="t3"><td>Projects</td></tr>' +
      '</thead>' +
      '</table>';

    var target = $id('target');

    axe.testUtils.flatTreeSetup(fixture.firstChild);
    assert.deepEqual(axe.commons.table.getHeaders(target), [$id('t1')]);
  });
});
