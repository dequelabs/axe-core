describe('table.isRowHeader', function () {
  'use strict';

  var table = axe.commons.table;
  var fixtureSetup = axe.testUtils.fixtureSetup;

  beforeEach(function () {
    fixtureSetup(
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
        '</table>'
    );
  });

  it('returns false if not a row header', function () {
    var cell = document.querySelector('#cell1');
    assert.isFalse(table.isRowHeader(cell));
  });

  it('returns true if scope="auto"', function () {
    var cell = document.querySelector('#rh1');
    assert.isTrue(table.isRowHeader(cell));
  });

  it('returns false if scope="col"', function () {
    var cell = document.querySelector('#ch1');
    assert.isFalse(table.isRowHeader(cell));
  });

  it('returns true if scope="row"', function () {
    var cell = document.querySelector('#rh2');
    assert.isTrue(table.isRowHeader(cell));
  });
});
