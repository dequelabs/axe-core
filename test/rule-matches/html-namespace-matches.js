describe('html-namespace-matches', function () {
  'use strict';
  let rule;
  let fixture;
  let axeFixtureSetup;

  beforeEach(function () {
    fixture = document.getElementById('fixture');
    axeFixtureSetup = axe.testUtils.fixtureSetup;
    rule = axe.utils.getRule('role-img-alt');
  });

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('returns true when passed an HTML element', function () {
    axeFixtureSetup('<h1>Hello world</h1>');
    let node = fixture.querySelector('h1');
    let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isTrue(rule.matches(node, virtualNode));
  });

  it('returns true when passed a custom HTML element', function () {
    axeFixtureSetup('<xx-heading>Hello world</xx-heading>');
    let node = fixture.querySelector('xx-heading');
    let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isTrue(rule.matches(node, virtualNode));
  });

  it('returns false when passed an SVG element', function () {
    axeFixtureSetup('<svg><title>Pretty picture</title></svg>');
    let node = fixture.querySelector('svg');
    let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isFalse(rule.matches(node, virtualNode));
  });

  it('returns false when passed an SVG circle element', function () {
    axeFixtureSetup(
      '<svg><circle><title>Pretty picture</title></circle></svg>'
    );
    let node = fixture.querySelector('circle');
    let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isFalse(rule.matches(node, virtualNode));
  });

  describe('Serial Virtual Node', function () {
    it('returns true when passed an HTML element', function () {
      let serialNode = new axe.SerialVirtualNode({
        nodeName: 'h1'
      });
      serialNode.parent = null;

      assert.isTrue(rule.matches(null, serialNode));
    });

    it('returns true when passed a custom HTML element', function () {
      let serialNode = new axe.SerialVirtualNode({
        nodeName: 'xx-heading'
      });
      serialNode.parent = null;

      assert.isTrue(rule.matches(null, serialNode));
    });

    it('returns false when passed an SVG circle element', function () {
      let serialNode = new axe.SerialVirtualNode({
        nodeName: 'circle'
      });
      let parent = new axe.SerialVirtualNode({
        nodeName: 'svg'
      });
      serialNode.parent = parent;
      parent.children = [serialNode];

      assert.isFalse(rule.matches(null, serialNode));
    });
  });
});
