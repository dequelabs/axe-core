describe('color.elementHasImage', () => {
  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const elementHasImage = axe.commons.color.elementHasImage;

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
    axe.commons.color.incompleteData.clear();
  });

  it('returns true when `HTMLElement` is of graphical type', () => {
    ['img', 'canvas', 'object', 'iframe', 'video', 'svg'].forEach(nodeName => {
      const vNode = queryFixture(`<${nodeName} id="target"></${nodeName}>`);
      const actual = elementHasImage(vNode.actualNode);
      assert.isTrue(actual);
      assert.equal(axe.commons.color.incompleteData.get('bgColor'), 'imgNode');
    });
  });

  it('returns false when `HTMLElement` has no background-image style set', () => {
    const vNode = queryFixture(
      '<div id="target" style="height: 40px; width: 30px;">No background style</div>'
    );
    const actual = elementHasImage(vNode.actualNode);
    assert.isFalse(actual);
  });

  it('returns false when `HTMLElement` has background-image style set to none', () => {
    const vNode = queryFixture(
      '<div id="target" style="height: 40px; width: 30px; background-image: none "> Some text... </div>'
    );
    const actual = elementHasImage(vNode.actualNode);
    assert.isFalse(actual);
  });

  it('returns true when `HTMLElement` has background-image (url)', () => {
    const vNode = queryFixture(
      '<div id="target" style="height: 40px; width: 30px; background-image: url(london.png)"> Some text... </div>'
    );
    const actual = elementHasImage(vNode.actualNode);
    assert.isTrue(actual);
    assert.equal(axe.commons.color.incompleteData.get('bgColor'), 'bgImage');
  });

  it('returns true when `HTMLElement` has background-image (gradient)', () => {
    const vNode = queryFixture(
      '<div id="target" style="height: 40px; width: 30px; background-image: linear-gradient(red, orange);"> Some text... </div>'
    );
    const actual = elementHasImage(vNode.actualNode);
    assert.isTrue(actual);
    assert.equal(axe.commons.color.incompleteData.get('bgColor'), 'bgGradient');
  });
});
