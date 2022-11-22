describe('table.isDataCell', function () {
  'use strict';
  function $id(id) {
    return document.getElementById(id);
  }

  var fixture = $id('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should work with TH', function () {
    fixture.innerHTML =
      '<table>' + '<tr><th id="target">1</th></tr>' + '</table>';

    var target = $id('target');

    assert.isFalse(axe.commons.table.isDataCell(target));
  });

  it('should work with TD', function () {
    fixture.innerHTML =
      '<table>' + '<tr><td id="target">1</td></tr>' + '</table>';

    var target = $id('target');

    assert.isTrue(axe.commons.table.isDataCell(target));
  });

  it('should work with empty TD', function () {
    fixture.innerHTML =
      '<table>' + '<tr><td id="target"></td></tr>' + '</table>';

    var target = $id('target');

    assert.isFalse(axe.commons.table.isDataCell(target));
  });

  it('should ignore TDs with a valid role other than (grid)cell', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr><td id="target1" role="columnheader">heading</td></tr>' +
      '<tr><td id="target2" role="rowheader">heading</td></tr>' +
      '<tr><td id="target3" role="presentation">heading</td></tr>' +
      '</table>';

    var target1 = $id('target1');
    var target2 = $id('target2');
    var target3 = $id('target3');
    assert.isFalse(axe.commons.table.isDataCell(target1));
    assert.isFalse(axe.commons.table.isDataCell(target2));
    assert.isFalse(axe.commons.table.isDataCell(target3));
  });

  it('should return true for elements with role="(grid)cell"', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr><th id="target1" role="cell">heading</th></tr>' +
      '<tr><th id="target2" role="gridcell">heading</th></tr>' +
      '</table>';

    var target1 = $id('target1');
    var target2 = $id('target2');
    assert.isTrue(axe.commons.table.isDataCell(target1));
    assert.isTrue(axe.commons.table.isDataCell(target2));
  });

  it('should ignore invalid roles', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr><td id="target1" role="foobar">heading</td></tr>' +
      '<tr><th id="target2" role="foobar">heading</th></tr>' +
      '</table>';

    var target1 = $id('target1');
    var target2 = $id('target2');
    assert.isTrue(axe.commons.table.isDataCell(target1));
    assert.isFalse(axe.commons.table.isDataCell(target2));
  });

  it('should ignore abstract roles', function () {
    fixture.innerHTML =
      '<table>' +
      '<tr><td id="target1" role="section">heading</td></tr>' +
      '<tr><th id="target2" role="section">heading</th></tr>' +
      '</table>';

    var target1 = $id('target1');
    var target2 = $id('target2');
    assert.isTrue(axe.commons.table.isDataCell(target1));
    assert.isFalse(axe.commons.table.isDataCell(target2));
  });
});
