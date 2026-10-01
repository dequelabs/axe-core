describe('findNearbyElms', () => {
  let fixture;
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const findNearbyElms = axe.commons.dom.findNearbyElms;

  function getIds(vNodeList) {
    const ids = [];
    vNodeList.forEach(vNode => {
      if (vNode.props.id && vNode.props.id !== 'fixture') {
        ids.push(vNode.props.id);
      }
    });
    return ids;
  }

  describe('in the viewport', () => {
    beforeEach(() => {
      fixture = fixtureSetup(
        `<div id="n0" style="height:30px; margin-bottom:30px;">0</div>` +
          `<div id="n1" style="height:30px; margin-bottom:30px;">1</div>` +
          `<div id="n2" style="height:30px; margin-bottom:30px;">2</div>` +
          `<div id="n3" style="height:30px; margin-bottom:30px;">3</div>` +
          `<div id="n4" style="height:30px; margin-bottom:30px;">4</div>` +
          `<div id="n5" style="height:30px; margin-bottom:30px;">5</div>` +
          `<div id="n6" style="height:30px; margin-bottom:30px;">6</div>` +
          `<div id="n7" style="height:30px; margin-bottom:30px;">7</div>` +
          `<div id="n8" style="height:30px; margin-bottom:30px;">8</div>` +
          `<div id="n9" style="height:30px; margin-bottom:30px;">9</div>`
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
        `<div id="n0" style="position: fixed; top:-31px; height: 60px">0</div>` +
          `<div id="n1" style="position: fixed; top:-31px; height: 30px">1</div>` +
          `<div id="n2" style="position: fixed; top:0; height: 30px">2</div>`
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
        `<div style=" position: fixed;" id="n0">` +
          `<div id="n1" style="height:30px;">1</div>` +
          `<div id="n2" style="height:30px;">2</div>` +
          `</div>` +
          `<div id="n3" style="height:30px;">3</div>` +
          `<div id="n4" style="height:30px;">4</div>`
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

  describe('withinMargin option', () => {
    function setupTarget(neighbors) {
      const html = neighbors
        .map(
          ([id, left, top]) =>
            `<div id="${id}" style="position: absolute; left: ${left}px; top: ${top}px; width: 10px; height: 10px"></div>`
        )
        .join('');
      fixture = fixtureSetup(
        `<div style="position: relative">` +
          `<div id="target" style="position: absolute; left: 0; top: 0; width: 10px; height: 10px"></div>` +
          html +
          `</div>`
      );
      return axe.utils.querySelectorAll(fixture, '#target')[0];
    }

    it('returns elements further than margin by default', () => {
      const target = setupTarget([
        ['near', 20, 0],
        ['far', 60, 0]
      ]);
      const nearbyElms = findNearbyElms(target, 24);
      assert.deepEqual(getIds(nearbyElms), ['near', 'far']);
    });

    it('skips elements in the same grid cell further than margin', () => {
      const target = setupTarget([
        ['near', 20, 0],
        ['far', 60, 0]
      ]);
      const nearbyElms = findNearbyElms(target, 24, { withinMargin: true });
      assert.deepEqual(getIds(nearbyElms), ['near']);
    });

    it('skips elements exactly margin away', () => {
      const target = setupTarget([
        ['right', 34, 0],
        ['bottom', 0, 34]
      ]);
      const nearbyElms = findNearbyElms(target, 24, { withinMargin: true });
      assert.deepEqual(getIds(nearbyElms), []);
    });

    it('returns elements less than margin away', () => {
      const target = setupTarget([
        ['right', 33, 0],
        ['bottom', 0, 33]
      ]);
      const nearbyElms = findNearbyElms(target, 24, { withinMargin: true });
      assert.deepEqual(getIds(nearbyElms), ['right', 'bottom']);
    });

    it('returns only overlapping elements when margin is 0', () => {
      const target = setupTarget([
        ['overlapping', 5, 5],
        ['touching', 10, 0],
        ['near', 11, 0]
      ]);
      const nearbyElms = findNearbyElms(target, 0, { withinMargin: true });
      assert.deepEqual(getIds(nearbyElms), ['overlapping']);
    });

    it('returns diagonal elements less than margin away on both axes', () => {
      const target = setupTarget([
        ['diagonal', 26, 26],
        ['below', 20, 34]
      ]);
      const nearbyElms = findNearbyElms(target, 24, { withinMargin: true });
      assert.deepEqual(getIds(nearbyElms), ['diagonal']);
    });
  });
});
