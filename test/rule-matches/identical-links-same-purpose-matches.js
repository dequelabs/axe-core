describe('identical-links-same-purpose-matches tests', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var rule = axe.utils.getRule('identical-links-same-purpose');

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('returns false when native link without accessible name', function () {
    var vNode = queryFixture('<a id="target" href=""></a>');
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for ARIA link without accessible name', function () {
    var vNode = queryFixture('<span role="link" id="target"></span>');
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false for native link with a role !== link', function () {
    var vNode = queryFixture(
      '<a id="target" href="#" role="button">Go to Checkout</a>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false when `area` has no parent `map` element', function () {
    var vNode = queryFixture(
      '<area id="target" role="link" href="" shape="circle" coords="130,136,60" aria-label="MDN" />'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false when `area` has parent `map` that is not referred by `img[usemap]`', function () {
    var vNode = queryFixture(
      '<map name="iam-not-referred">' +
        '<area id="target" role="link" href="" shape="circle" coords="130,136,60" aria-label="MDN" />' +
        '</map>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns true when native link without href', function () {
    var vNode = queryFixture('<a id="target">Book Now</a>');
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when ARIA link without href', function () {
    var vNode = queryFixture(
      '<button id="target" role="link">Book Now</button>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when native link has an accessible name', function () {
    var vNode = queryFixture(
      '<a id="target" href="https://developer.mozilla.org/" aria-label="Go to MDN website"></a>'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true for ARIA link has an accessible name', function () {
    var vNode = queryFixture('<span role="link" id="target">Book Tour</span>');
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when `area` has parent `map` that is referred by `img`', function () {
    var vNode = queryFixture(
      '<map name="iam-referred">' +
        '<area id="target" role="link" href="" shape="circle" coords="130,136,60" aria-label="MDN" />' +
        '</map>' +
        '<img usemap="#iam-referred" alt="MDN infographic" />'
    );
    var actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });
});
