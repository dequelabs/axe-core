describe('identical-links-same-purpose tests', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let check = checks['identical-links-same-purpose'];
  let checkContext = axe.testUtils.MockCheckContext();
  let options = {};

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
    axe._tree = undefined;
  });

  it('returns undefined for native link with `href` but no accessible name', function () {
    let vNode = queryFixture('<a id="target" href="/home/#/foo"></a>');
    let actual = check.evaluate.call(
      checkContext,
      vNode.actualNode,
      options,
      vNode
    );
    assert.isUndefined(actual);
    assert.isNull(checkContext._data);
  });

  it('returns undefined when ARIA link that has no accessible name', function () {
    let vNode = queryFixture('<span role="link" id="target"></span>');
    let actual = check.evaluate.call(
      checkContext,
      vNode.actualNode,
      options,
      vNode
    );
    assert.isUndefined(actual);
    assert.isNull(checkContext._data);
  });

  it('returns undefined when ARIA link has only any combination of unicode (emoji, punctuations, nonBmp) characters as accessible name', function () {
    let vNode = queryFixture(
      '<button id="target" role="link">☀️!!!₨   </button>'
    );
    let actual = check.evaluate.call(
      checkContext,
      vNode.actualNode,
      options,
      vNode
    );
    assert.isUndefined(actual);
    assert.isNull(checkContext._data);
  });

  it('returns true for native links with `href` and accessible name', function () {
    let vNode = queryFixture('<a id="target" href="/home/#/foo">Pass 1</a>');
    let actual = check.evaluate.call(
      checkContext,
      vNode.actualNode,
      options,
      vNode
    );
    assert.isTrue(actual);
    assert.hasAllKeys(checkContext._data, ['name', 'urlProps']);
    assert.equal(checkContext._data.name, 'Pass 1'.toLowerCase());
    assert.equal(checkContext._data.urlProps.hash, '#/foo');
    assert.equal(checkContext._data.urlProps.pathname, '/home/');
  });

  it('returns true for ARIA links has accessible name (AREA with `MAP` which is used in `IMG`)', function () {
    let vNode = queryFixture(
      '<map name="infographic">' +
        '<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>' +
        '</map>' +
        '<img usemap="#infographic" alt="MDN infographic" />'
    );
    let actual = check.evaluate.call(
      checkContext,
      vNode.actualNode,
      options,
      vNode
    );
    assert.isTrue(actual);
    assert.hasAllKeys(checkContext._data, ['name', 'urlProps']);
    assert.equal(checkContext._data.name, 'MDN'.toLowerCase());
    assert.isFalse(!!checkContext._data.resource);
  });

  it('returns true for native links with `href` and accessible name (that also has emoji, nonBmp and punctuation characters)', function () {
    let vNode = queryFixture(
      '<a id="target" href="/contact/foo.html">The ☀️ is orange, the ◓ is white.</a>'
    );
    let actual = check.evaluate.call(
      checkContext,
      vNode.actualNode,
      options,
      vNode
    );
    assert.isTrue(actual);
    assert.hasAllKeys(checkContext._data, ['name', 'urlProps']);
    assert.equal(
      checkContext._data.name,
      'The is orange the is white'.toLowerCase()
    );
    assert.equal(checkContext._data.urlProps.filename, 'foo.html');
  });
});
