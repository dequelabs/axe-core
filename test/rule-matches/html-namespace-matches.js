describe('html-namespace-matches', () => {
  let rule;
  let fixture;
  let axeFixtureSetup;

  beforeEach(() => {
    fixture = document.getElementById('fixture');
    axeFixtureSetup = axe.testUtils.fixtureSetup;
    rule = axe.utils.getRule('role-img-alt');
  });

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('returns true when passed an HTML element', () => {
    axeFixtureSetup('<h1>Hello world</h1>');
    const node = fixture.querySelector('h1');
    const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isTrue(rule.matches(node, virtualNode));
  });

  it('returns true when passed a custom HTML element', () => {
    axeFixtureSetup('<xx-heading>Hello world</xx-heading>');
    const node = fixture.querySelector('xx-heading');
    const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isTrue(rule.matches(node, virtualNode));
  });

  it('returns false when passed an SVG element', () => {
    axeFixtureSetup('<svg><title>Pretty picture</title></svg>');
    const node = fixture.querySelector('svg');
    const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isFalse(rule.matches(node, virtualNode));
  });

  it('returns false when passed an SVG circle element', () => {
    axeFixtureSetup(
      '<svg><circle><title>Pretty picture</title></circle></svg>'
    );
    const node = fixture.querySelector('circle');
    const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isFalse(rule.matches(node, virtualNode));
  });

  describe('Serial Virtual Node', () => {
    it('returns true when passed an HTML element', () => {
      const serialNode = new axe.SerialVirtualNode({
        nodeName: 'h1'
      });
      serialNode.parent = null;

      assert.isTrue(rule.matches(null, serialNode));
    });

    it('returns true when passed a custom HTML element', () => {
      const serialNode = new axe.SerialVirtualNode({
        nodeName: 'xx-heading'
      });
      serialNode.parent = null;

      assert.isTrue(rule.matches(null, serialNode));
    });

    it('returns false when passed an SVG circle element', () => {
      const serialNode = new axe.SerialVirtualNode({
        nodeName: 'circle'
      });
      const parent = new axe.SerialVirtualNode({
        nodeName: 'svg'
      });
      serialNode.parent = parent;
      parent.children = [serialNode];

      assert.isFalse(rule.matches(null, serialNode));
    });
  });
});
