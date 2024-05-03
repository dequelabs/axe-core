describe('focusable-not-tabbable', function () {
  'use strict';

  let check;
  let fixture = document.getElementById('fixture');
  let fixtureSetup = axe.testUtils.fixtureSetup;
  let shadowSupported = axe.testUtils.shadowSupport.v1;
  let checkContext = axe.testUtils.MockCheckContext();
  let checkSetup = axe.testUtils.checkSetup;

  before(function () {
    check = checks['focusable-not-tabbable'];
  });

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
    axe._selectorData = undefined;
    checkContext.reset();
  });

  it('returns true when BUTTON removed from tab order through tabindex', function () {
    let params = checkSetup(
      '<div id="target" aria-hidden="true">' +
        '<button tabindex="-1">Some button</button>' +
        '</div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns false when LINK is in tab order', function () {
    let params = checkSetup(
      '<div id="target" aria-hidden="true">' +
        '<a href="abc.html">ABC Site</a>' +
        '</div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
    assert.lengthOf(checkContext._relatedNodes, 1);
    assert.deepEqual(
      checkContext._relatedNodes,
      Array.from(fixture.querySelectorAll('a'))
    );
  });

  it('returns true when focusable SUMMARY element, that cannot be disabled', function () {
    let params = checkSetup(
      '<details id="target" aria-hidden="true"><summary>Some button</summary><p>Some details</p></details>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
    assert.lengthOf(checkContext._relatedNodes, 1);
    assert.deepEqual(
      checkContext._relatedNodes,
      Array.from(fixture.querySelectorAll('summary'))
    );
  });

  it('returns true when TEXTAREA is in tab order, but 0 related nodes as TEXTAREA can be disabled', function () {
    let params = checkSetup(
      '<div id="target" aria-hidden="true">' +
        '<label>Enter your comments:' +
        '<textarea></textarea>' +
        '</label>' +
        '</div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.lengthOf(checkContext._relatedNodes, 0);
    assert.isTrue(actual);
  });

  it('returns false when focusable AREA element', function () {
    let params = checkSetup(
      '<main id="target" aria-hidden="true">' +
        '<map name="infographic">' +
        '<area shape="rect" coords="184,6,253,27" href="https://mozilla.org"' +
        'target="_blank" alt="Mozilla" />' +
        '</map>' +
        '</main>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns true when aria-hidden=false does not negate aria-hidden true', function () {
    // Note: aria-hidden can't be reset once you've set it to true on an ancestor
    let params = checkSetup(
      '<div id="target" aria-hidden="true"><div aria-hidden="false"><button tabindex="-1">Some button</button></div></div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  (shadowSupported ? it : xit)(
    'returns false when focusable text in shadowDOM',
    function () {
      // Note:
      // `testUtils.checkSetup` does not work for shadowDOM
      // as `axe._tree` and `axe._selectorData` needs to be updated after shadowDOM construction
      fixtureSetup('<div aria-hidden="true" id="target"></div>`');
      let node = fixture.querySelector('#target');
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<p tabindex="0">btn</p>';
      axe.testUtils.flatTreeSetup(fixture);
      axe._selectorData = axe.utils.getSelectorData(axe._tree);
      let virtualNode = axe.utils.getNodeFromTree(node);
      let actual = check.evaluate.call(checkContext, node, {}, virtualNode);
      assert.isFalse(actual);
    }
  );

  it('returns false when focusable content through tabindex', function () {
    let params = checkSetup(
      '<p id="target" tabindex="0" aria-hidden="true">Some text</p>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns false when focusable target that cannot be disabled', function () {
    let params = checkSetup(
      '<div aria-hidden="true"><a id="target" href="">foo</a><button>bar</button></div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns true when focusable target that can be disabled', function () {
    let params = checkSetup(
      '<div aria-hidden="true"><a href="">foo</a><button id="target">bar</button></div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns true if there is a focusable element and modal is open', function () {
    let params = checkSetup(
      '<div id="target" aria-hidden="true">' +
        '<a href="">foo</a>' +
        '</div>' +
        '<div role="dialog">Modal</div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns undefined when the control has onfocus', function () {
    let params = checkSetup(
      '<a href="/" aria-hidden="true" id="target" onfocus="redirectFocus()">Link</a>'
    );
    assert.isUndefined(check.evaluate.apply(checkContext, params));
  });

  it('returns undefined when all focusable controls have onfocus events', function () {
    let params = checkSetup(
      '<div aria-hidden="true" id="target">' +
        '  <a href="/" onfocus="redirectFocus()">First link</a>' +
        '  <a href="/" onfocus="redirectFocus()">Second link</a>' +
        '</div>'
    );
    assert.isUndefined(check.evaluate.apply(checkContext, params));
  });

  it('returns false when some, but not all focusable controls have onfocus events', function () {
    let params = checkSetup(
      '<div aria-hidden="true" id="target">' +
        '  <a href="/" onfocus="redirectFocus()">First link</a>' +
        '  <a href="/"">Second link</a>' +
        '</div>'
    );
    assert.isFalse(check.evaluate.apply(checkContext, params));
  });

  it('returns undefined when control has 0 width and height and pointer events: none (focus trap bumper)', () => {
    let params = checkSetup(
      '<div id="target" aria-hidden="true" tabindex="0" style="pointer-events: none"></div>'
    );
    assert.isUndefined(check.evaluate.apply(checkContext, params));
  });
});
