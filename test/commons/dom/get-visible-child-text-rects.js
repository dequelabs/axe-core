describe('dom.getVisibleChildTextRects', () => {
  const { getVisibleChildTextRects } = axe.commons.dom;
  const { fixtureSetup } = axe.testUtils;
  const fixture = document.querySelector('#fixture');

  /**
   * Get client rects of a node and filter out newline characters.
   * @param {Element} node
   */
  function getClientRects(node) {
    return Array.from(node.getClientRects()).filter(
      rect => rect.width > 1 && rect.height > 1
    );
  }

  /**
   * Asset that two DOMRect arrays are equal.
   * @param {DOMRect[]} rectAs
   * @param {DOMRect[]} rectBs
   */
  function assertRectsEqual(rectAs, rectBs) {
    assert.equal(rectAs.length, rectBs.length);
    rectAs.forEach((rect, index) => {
      const rectA = rectAs[index];
      const rectB = rectBs[index];

      assert.approximately(rectA.left, rectB.left, 1);
      assert.approximately(rectA.top, rectB.top, 1);
      assert.approximately(rectA.width, rectB.width, 1);
      assert.approximately(rectA.height, rectB.height, 1);
    });
  }

  it('returns the text rect of a node', () => {
    fixtureSetup(`<span>Hello</span>`);
    const node = fixture.firstChild;
    const actual = getVisibleChildTextRects(node);

    assertRectsEqual(actual, getClientRects(node));
  });

  it('returns multiple text rects and filters out newlines', () => {
    fixtureSetup(`<span>Hello<br/>World</span>`);
    const node = fixture.firstChild;
    const actual = getVisibleChildTextRects(node);

    assertRectsEqual(actual, getClientRects(node));
  });

  it('returns the nodes bounding box if text rects escape bounds of node', () => {
    fixtureSetup(`<div style="width: 10px;">Hello World</div>`);
    const node = fixture.firstChild;
    const actual = getVisibleChildTextRects(node);

    assert.deepEqual(actual, [node.getBoundingClientRect()]);
  });

  it('changes rect size based on overflow of parent', () => {
    fixtureSetup(`
      <div style="overflow: hidden; width: 10px;">
        <span id="target">Hello</span>
      </div>
    `);
    const node = fixture.querySelector('#target');
    const actual = getVisibleChildTextRects(node);
    const rect = getClientRects(node)[0];
    const expected = new DOMRect(rect.left, rect.top, 10, rect.height);

    assertRectsEqual(actual, [expected]);
  });

  it('changes rect size based on overflow of all ancestors', () => {
    fixtureSetup(`
      <div style="overflow: hidden; height: 10px;">
        <div style="overflow: hidden; width: 10px;">
          <span id="target">Hello</span>
        </div>
      </div>
    `);
    const node = fixture.querySelector('#target');
    const actual = getVisibleChildTextRects(node);
    const rect = getClientRects(node)[0];
    const expected = new DOMRect(rect.left, rect.top, 10, 10);

    assertRectsEqual(actual, [expected]);
  });

  it('changes only the rect size of text rects that go outside ancestor overflow', () => {
    fixtureSetup(`
      <div style="overflow: hidden; height: 25px">
        <span id="target">Hello<br/>World</span>
      </div>
    `);
    const node = fixture.querySelector('#target');
    const actual = getVisibleChildTextRects(node);
    const rects = getClientRects(node);
    const expected = [
      rects[0],
      new DOMRect(
        rects[1].left,
        rects[1].top,
        rects[1].width,
        25 - rects[1].height
      )
    ];

    assertRectsEqual(actual, expected);
  });

  it('does not return rects outside overflows', () => {
    fixtureSetup(`
      <div style="overflow: hidden; height: 50px;">
        <div style="overflow: hidden; height: 25px">
          <span id="target">Hello<br/>World<br/>Goodbye<br/>World</span>
        </div>
      </div>
    `);
    const node = fixture.querySelector('#target');
    const actual = getVisibleChildTextRects(node);

    assert.lengthOf(actual, 2);
  });
});
