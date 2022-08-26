describe('table.isHeader', function () {
  'use strict';

  var table = axe.commons.table;
  var fixture = document.querySelector('#fixture');
  var fixtureSetup = axe.testUtils.fixtureSetup;

  var tableFixture =
    '<table>' +
    '<tr>' +
    '<th id="ch1">column header 1</th>' +
    '<th scope="col" id="ch2">column header 2</th>' +
    '</tr>' +
    '<tr>' +
    '<th id="rh1">row header 1</th>' +
    '<td id="cell1">cell 1</td>' +
    '</tr>' +
    '<tr>' +
    '<th scope="row" id="rh2">row header 2</th>' +
    '<td id="cell2">cell 2</td>' +
    '</tr>' +
    '</table>';

  it('should return true for column headers', function () {
    fixtureSetup(tableFixture);
    var cell = document.querySelector('#ch1');
    assert.isTrue(table.isHeader(cell));
  });

  it('should return true if cell is a row header', function () {
    fixtureSetup(tableFixture);
    var cell = document.querySelector('#rh1');
    assert.isTrue(table.isHeader(cell));
  });

  it('should return false if cell is not a column or row header', function () {
    fixtureSetup(tableFixture);
    var cell = document.querySelector('#cell1');
    assert.isFalse(table.isHeader(cell));
  });

  it('should return true if referenced by another cells headers attr', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr><td id="target">1</td><td headers="bar target foo"></tr>' +
      '</table>';

    var target = document.querySelector('#target');
    fixtureSetup();
    assert.isTrue(table.isHeader(target));
  });

  it('should return false otherwise', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr><td id="target">1</td><td headers="bar monkeys foo"></tr>' +
      '</table>';

    var target = document.querySelector('#target');
    fixtureSetup();
    assert.isFalse(table.isHeader(target));
  });
});
