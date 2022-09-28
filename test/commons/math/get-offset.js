describe('getOffset', function () {
  'use strict';
  var fixtureSetup = axe.testUtils.fixtureSetup;
  var getOffset = axe.commons.math.getOffset;
  var round = 0.2;

  // Return the diagonal of a square of size X, or rectangle of size X * Y
  function getDiagonal(x, y) {
    y = typeof y === 'number' ? y : x;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  }

  it('returns with + spacing for horizontally adjacent elms', function () {
    var fixture = fixtureSetup(
      '<a style="width:30px; margin-right:10px; display:inline-block">&nbsp;</a>' +
        '<b style="width:20px; display:inline-block">&nbsp;</b>'
    );
    var nodeA = fixture.children[0];
    var nodeB = fixture.children[1];
    assert.closeTo(getOffset(nodeA, nodeB), 40, round);
    assert.closeTo(getOffset(nodeB, nodeA), 30, round);
  });

  it('returns closest horizontal distance for elements horizontally aligned', function () {
    var fixture = fixtureSetup(
      '<a style="width:30px; height:30px; margin-right:10px; display:inline-block">&nbsp;</a>' +
        '<b style="width:20px; height:20px; top:5px; position:relative; display:inline-block">&nbsp;</b>'
    );
    var nodeA = fixture.children[0];
    var nodeB = fixture.children[1];
    assert.closeTo(getOffset(nodeA, nodeB), getDiagonal(40, 5), round);
    assert.closeTo(getOffset(nodeB, nodeA), 30, round);
  });

  it('returns height + spacing for vertically adjacent elms', function () {
    var fixture = fixtureSetup(
      '<a style="height:30px; margin:10px 0; display:block">&nbsp;</a>' +
        '<b style="height:20px; display:block">&nbsp;</b>'
    );
    var nodeA = fixture.children[0];
    var nodeB = fixture.children[1];
    assert.closeTo(getOffset(nodeA, nodeB), 40, round);
    assert.closeTo(getOffset(nodeB, nodeA), 30, round);
  });

  it('returns closest vertical distance for elements horizontally aligned', function () {
    var fixture = fixtureSetup(
      '<a style="height:30px; margin:10px 0; display:block">&nbsp;</a>' +
        '<b style="height:20px; margin: 0 10px; display:block">&nbsp;</b>'
    );
    var nodeA = fixture.children[0];
    var nodeB = fixture.children[1];

    assert.closeTo(getOffset(nodeA, nodeB), getDiagonal(40, 10), round);
    assert.closeTo(getOffset(nodeB, nodeA), 30, round);
  });

  it('returns corner to corner distance for diagonal elms', function () {
    var fixture = fixtureSetup(
      '<a style="width: 30px; height:30px; margin:10px 30px; display:block">&nbsp;</a>' +
        '<b style="width: 20px; height:20px; display:block">&nbsp;</b>'
    );
    var nodeA = fixture.children[0];
    var nodeB = fixture.children[1];
    assert.closeTo(getOffset(nodeA, nodeB), getDiagonal(40), round);
    assert.closeTo(getOffset(nodeB, nodeA), getDiagonal(30), round);
  });

  it('returns the distance to the edge when elements overlap on an edge', function () {
    var fixture = fixtureSetup(
      '<a style="padding-right:30px; display:inline-block">' +
        '<b style="width:30px; height: 20px; display:inline-block">&nbsp;</b>' +
        '</a>'
    );
    var nodeA = fixture.children[0];
    var nodeB = nodeA.children[0];
    assert.closeTo(getOffset(nodeA, nodeB), 30, round);
    assert.closeTo(getOffset(nodeB, nodeA), 30, round);
  });

  it('returns the shortest side of the element when an element overlaps on a corner', function () {
    var fixture = fixtureSetup(
      '<a style="padding:30px 30px 0 0; display:inline-block">' +
        '<b style="width:30px; height: 20px; display:inline-block">&nbsp;</b>' +
        '</a>'
    );
    var nodeA = fixture.children[0];
    var nodeB = nodeA.children[0];
    assert.closeTo(getOffset(nodeA, nodeB), getDiagonal(30), round);
    assert.closeTo(getOffset(nodeB, nodeA), 20, round);
  });

  it('returns smallest diagonal if elmA fully covers elmB', function () {
    var fixture = fixtureSetup(
      '<a style="padding:10px; display:inline-block">' +
        '<b style="width:20px; height: 30px; display:inline-block">&nbsp;</b>' +
        '</a>'
    );
    var nodeA = fixture.children[0];
    var nodeB = nodeA.children[0];
    assert.closeTo(getOffset(nodeA, nodeB), getDiagonal(10), round);
    assert.closeTo(getOffset(nodeB, nodeA), 10, round);
  });
});
