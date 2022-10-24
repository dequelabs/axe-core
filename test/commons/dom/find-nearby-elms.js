describe('findNearbyElms', () => {
  let fixture;
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const findNearbyElms = axe.commons.dom.findNearbyElms;

  function getIds(vNodeList) {
    const ids = [];
    vNodeList.forEach(function (vNode) {
      if (vNode.props.id && vNode.props.id !== 'fixture') {
        ids.push(vNode.props.id);
      }
    });
    return ids;
  }

  describe('in the viewport', () => {
    beforeEach(() => {
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

    it('returns node from the same grid cell', () => {
      const nearbyElms = findNearbyElms(fixture.children[1]);
      assert.deepEqual(getIds(nearbyElms), ['n0', 'n2', 'n3']);
    });

    it('returns node from multiple grid cells when crossing a boundary', () => {
      const nearbyElms = findNearbyElms(fixture.children[5]);
      assert.deepEqual(getIds(nearbyElms), ['n3', 'n4', 'n6']);
    });
  });

  describe('on the edge', () => {
    beforeEach(() => {
      fixture = fixtureSetup(
        '<div id="n0" style="position: fixed; top:-30px; height: 60px">0</div>' +
          '<div id="n1" style="position: fixed; top:-30px; height: 30px">1</div>' +
          '<div id="n2" style="position: fixed; top:0; height: 30px">2</div>'
      );
    });

    it('ignores cells outside the document boundary', () => {
      const nearbyElms = findNearbyElms(fixture.children[0]);
      assert.deepEqual(getIds(nearbyElms), ['n2']);
    });

    it('returns no neighbors for off-screen elements', () => {
      const nearbyElms = findNearbyElms(fixture.children[1]);
      assert.deepEqual(getIds(nearbyElms), []);
    });

    it('returns element partially on screen as neighbors', () => {
      const nearbyElms = findNearbyElms(fixture.children[2]);
      assert.deepEqual(getIds(nearbyElms), ['n0']);
    });
  });

  describe('when some nodes are fixed', () => {
    beforeEach(() => {
      fixture = fixtureSetup(
        '<div style=" position: fixed;" id="n0">' +
          '  <div id="n1" style="height:30px;">1</div>' +
          '  <div id="n2" style="height:30px;">2</div>' +
          '</div>' +
          '<div id="n3" style="height:30px;">3</div>' +
          '<div id="n4" style="height:30px;">4</div>'
      );
    });

    it('skips fixed position neighbors when not fixed', () => {
      const n3 = axe.utils.querySelectorAll(fixture, '#n3')[0];
      const nearbyElms = findNearbyElms(n3);
      assert.deepEqual(getIds(nearbyElms), ['n4']);
    });

    it('includes only fixed position neighbors when fixed', () => {
      const n1 = axe.utils.querySelectorAll(fixture, '#n1')[0];
      const nearbyElms = findNearbyElms(n1);
      assert.deepEqual(getIds(nearbyElms), ['n0', 'n2']);
    });
  });
});
