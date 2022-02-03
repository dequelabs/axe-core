describe('findNearbyElms', function () {
  'use strict';
  var fixtureSetup = axe.testUtils.fixtureSetup;
  var findNearbyElms = axe.commons.dom.findNearbyElms;
  var fixture;

  function getIds(vNodeList) {
    var ids = []
    vNodeList.forEach(function (vNode) {
      if (vNode.props.id && vNode.props.id !== 'fixture') {
        ids.push(vNode.props.id)
      }
    });
    return ids;
  }

  beforeEach(function () {
    fixture = fixtureSetup(
      '<div id="n0" style="height:30px; margin-bottom:30px;">0</div>' +
      '<div id="n1" style="height:30px; margin-bottom:30px;">1</div>' +
      '<div id="n2" style="height:30px; margin-bottom:30px;">2</div>' +
      '<div id="n3" style="height:30px; margin-bottom:30px;">3</div>' +
      '<div id="n4" style="height:30px; margin-bottom:30px;">4</div>' +
      '<div id="n5" style="height:30px; margin-bottom:30px;">5</div>' +
      '<div id="n6" style="height:30px; margin-bottom:30px;">6</div>' +
      '<div id="n7" style="height:30px; margin-bottom:30px;">7</div>' +
      '<div id="n8" style="height:30px; margin-bottom:30px;">8</div>' +
      '<div id="n9" style="height:30px; margin-bottom:30px;">9</div>'
    );
  });

  it('returns node from the same grid cell', function () {
    var nearbyElms = findNearbyElms(fixture.children[1]);
    assert.deepEqual(getIds(nearbyElms), ['n0', 'n2', 'n3']);
  });

  it('returns node from multiple grid cells when crossing a boundary', function () {
    var nearbyElms = findNearbyElms(fixture.children[5]);
    assert.deepEqual(getIds(nearbyElms), ['n3', 'n4', 'n6']);
  });
});
