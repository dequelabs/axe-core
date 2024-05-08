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
   * Assert that two DOMRect arrays are equal.
   * @param {DOMRect[]} actualRects
   * @param {DOMRect[]} expectedRects
   */
  function assertRectsEqual(actualRects, expectedRects) {
    assert.equal(actualRects.length, expectedRects.length);
    actualRects.forEach((rect, index) => {
      const actual = actualRects[index];
      const expected = expectedRects[index];

      assert.approximately(actual.left, expected.left, 1, 'left');
      assert.approximately(actual.top, expected.top, 1, 'top');
      assert.approximately(actual.width, expected.width, 1, 'width');
      assert.approximately(actual.height, expected.height, 1, 'height');
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

  it('changes nodeRect size if all text rects got outside ancestor overflow', () => {
    fixtureSetup(`
      <div style="overflow: hidden; width: 50px;">
        <div style="overflow: hidden; width: 25px">
          <div id="target" style="padding-left: 65px;">Hello World</div>
        </div>
      </div>
    `);
    const node = fixture.querySelector('#target');
    const actual = getVisibleChildTextRects(node);
    const rect = getClientRects(node)[0];
    const expected = new DOMRect(rect.left, rect.top, 25, rect.height);

    assertRectsEqual(actual, [expected]);
  });
});
