describe('identical-links-same-purpose-matches tests', function () {
  'use strict';

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const rule = axe.utils.getRule('identical-links-same-purpose');

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('returns false when native link without accessible name', function () {
    const vNode = queryFixture('<a id="target" href=""></a>');
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for ARIA link without accessible name', function () {
    const vNode = queryFixture('<span role="link" id="target"></span>');
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for native link with a role !== link', function () {
    const vNode = queryFixture(
      '<a id="target" href="#" role="button">Go to Checkout</a>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false when `area` has no parent `map` element', function () {
    const vNode = queryFixture(
      '<area id="target" role="link" href="" shape="circle" coords="130,136,60" aria-label="MDN" />'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false when `area` has parent `map` that is not referred by `img[usemap]`', function () {
    const vNode = queryFixture(
      '<map name="iam-not-referred">' +
        '<area id="target" role="link" href="" shape="circle" coords="130,136,60" aria-label="MDN" />' +
        '</map>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns true when native link without href', function () {
    const vNode = queryFixture('<a id="target">Book Now</a>');
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when ARIA link without href', function () {
    const vNode = queryFixture(
      '<button id="target" role="link">Book Now</button>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when native link has an accessible name', function () {
    const vNode = queryFixture(
      '<a id="target" href="https://developer.mozilla.org/" aria-label="Go to MDN website"></a>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true for ARIA link has an accessible name', function () {
    const vNode = queryFixture(
      '<span role="link" id="target">Book Tour</span>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when `area` has parent `map` that is referred by `img`', function () {
    const vNode = queryFixture(
      '<map name="iam-referred">' +
        '<area id="target" role="link" href="" shape="circle" coords="130,136,60" aria-label="MDN" />' +
        '</map>' +
        '<img usemap="#iam-referred" alt="MDN infographic" />'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });
});
