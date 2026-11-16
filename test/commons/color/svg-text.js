describe('color.getSvgTextBackdrop', () => {
  const { getSvgTextBackdrop, isSvgTextNode } = axe.commons.color;
  const { queryFixture } = axe.testUtils;

  describe('isSvgTextNode', () => {
    it('is true for text, tspan and textPath in an SVG', () => {
      const vNode = queryFixture(
        '<svg width="200" height="50">' +
          '<text id="target" x="10" y="30">Hello <tspan id="span">World</tspan></text>' +
          '</svg>'
      );
      assert.isTrue(isSvgTextNode(vNode.actualNode));
      assert.isTrue(isSvgTextNode(document.getElementById('span')));
    });

    it('is false for an HTML element named text', () => {
      const vNode = queryFixture('<p id="target">Hello</p>');
      assert.isFalse(isSvgTextNode(vNode.actualNode));
    });

    it('is false for the svg element itself and for shapes', () => {
      const vNode = queryFixture(
        '<svg id="target" width="200" height="50"><rect id="shape" /></svg>'
      );
      assert.isFalse(isSvgTextNode(vNode.actualNode));
      assert.isFalse(isSvgTextNode(document.getElementById('shape')));
    });

    it('is false for null and undefined', () => {
      assert.isFalse(isSvgTextNode(null));
      assert.isFalse(isSvgTextNode(undefined));
    });
  });

  describe('getSvgTextBackdrop', () => {
    it('returns null when the node is not SVG text', () => {
      const vNode = queryFixture('<p id="target">Hello</p>');
      assert.isNull(getSvgTextBackdrop(vNode.actualNode));
    });

    it('reports no overlap when the SVG holds only text', () => {
      const vNode = queryFixture(
        '<svg width="200" height="50">' +
          '<text id="target" x="10" y="30" fill="#949494">Hello</text>' +
          '</svg>'
      );
      const backdrop = getSvgTextBackdrop(vNode.actualNode);
      assert.isFalse(backdrop.overlaps);
      assert.equal(backdrop.svg.nodeName.toLowerCase(), 'svg');
    });

    it('reports an overlap when a painted shape sits behind the text', () => {
      const vNode = queryFixture(
        '<svg width="200" height="50">' +
          '<rect x="0" y="0" width="200" height="50" fill="#000"></rect>' +
          '<text id="target" x="10" y="30" fill="#fff">Hello</text>' +
          '</svg>'
      );
      assert.isTrue(getSvgTextBackdrop(vNode.actualNode).overlaps);
    });

    it('ignores a painted shape that does not overlap the text', () => {
      const vNode = queryFixture(
        '<svg width="400" height="50">' +
          '<rect x="300" y="0" width="50" height="50" fill="#000"></rect>' +
          '<text id="target" x="10" y="30" fill="#949494">Hello</text>' +
          '</svg>'
      );
      assert.isFalse(getSvgTextBackdrop(vNode.actualNode).overlaps);
    });

    it('ignores an overlapping shape with no fill and no stroke', () => {
      const vNode = queryFixture(
        '<svg width="200" height="50">' +
          '<rect x="0" y="0" width="200" height="50" fill="none" stroke="none"></rect>' +
          '<text id="target" x="10" y="30" fill="#949494">Hello</text>' +
          '</svg>'
      );
      assert.isFalse(getSvgTextBackdrop(vNode.actualNode).overlaps);
    });

    it('ignores an overlapping shape that is display:none', () => {
      const vNode = queryFixture(
        '<svg width="200" height="50">' +
          '<rect x="0" y="0" width="200" height="50" fill="#000" style="display:none"></rect>' +
          '<text id="target" x="10" y="30" fill="#949494">Hello</text>' +
          '</svg>'
      );
      assert.isFalse(getSvgTextBackdrop(vNode.actualNode).overlaps);
    });

    it('counts an overlapping shape that is stroked but not filled', () => {
      const vNode = queryFixture(
        '<svg width="200" height="50">' +
          '<rect x="0" y="0" width="200" height="50" fill="none" stroke="#000" stroke-width="4"></rect>' +
          '<text id="target" x="10" y="30" fill="#949494">Hello</text>' +
          '</svg>'
      );
      assert.isTrue(getSvgTextBackdrop(vNode.actualNode).overlaps);
    });
  });
});
