describe('identical-links-same-purpose-matches tests', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let rule = axe.utils.getRule('identical-links-same-purpose');

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('returns false when native link without accessible name', function () {
    let vNode = queryFixture('<a id="target" href=""></a>');
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for ARIA link without accessible name', function () {
    let vNode = queryFixture('<span role="link" id="target"></span>');
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for native link with a role !== link', function () {
    let vNode = queryFixture(
      '<a id="target" href="#" role="button">Go to Checkout</a>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false when `area` has no parent `map` element', function () {
    let vNode = queryFixture(
      '<area id="target" role="link" href="" shape="circle" coords="130,136,60" aria-label="MDN" />'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false when `area` has parent `map` that is not referred by `img[usemap]`', function () {
    let vNode = queryFixture(
      '<map name="iam-not-referred">' +
        '<area id="target" role="link" href="" shape="circle" coords="130,136,60" aria-label="MDN" />' +
        '</map>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns true when native link without href', function () {
    let vNode = queryFixture('<a id="target">Book Now</a>');
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when ARIA link without href', function () {
    let vNode = queryFixture(
      '<button id="target" role="link">Book Now</button>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when native link has an accessible name', function () {
    let vNode = queryFixture(
      '<a id="target" href="https://developer.mozilla.org/" aria-label="Go to MDN website"></a>'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true for ARIA link has an accessible name', function () {
    let vNode = queryFixture('<span role="link" id="target">Book Tour</span>');
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when `area` has parent `map` that is referred by `img`', function () {
    let vNode = queryFixture(
      '<map name="iam-referred">' +
        '<area id="target" role="link" href="" shape="circle" coords="130,136,60" aria-label="MDN" />' +
        '</map>' +
        '<img usemap="#iam-referred" alt="MDN infographic" />'
    );
    let actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });
});
