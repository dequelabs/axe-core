describe('focusable-disabled', function () {
  'use strict';

  let check;
  let fixture = document.getElementById('fixture');
  let fixtureSetup = axe.testUtils.fixtureSetup;
  let shadowSupported = axe.testUtils.shadowSupport.v1;
  let checkContext = axe.testUtils.MockCheckContext();
  let checkSetup = axe.testUtils.checkSetup;

  before(function () {
    check = checks['focusable-disabled'];
  });

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
    axe._selectorData = undefined;
    checkContext.reset();
  });

  it('returns true when content not focusable by default (no tabbable elements)', function () {
    let params = checkSetup('<p id="target" aria-hidden="true">Some text</p>');
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns true when content hidden through CSS (no tabbable elements)', function () {
    let params = checkSetup(
      '<div id="target" aria-hidden="true"><a href="/" style="display:none">Link</a></div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns true when content made unfocusable through disabled (no tabbable elements)', function () {
    let params = checkSetup(
      '<input id="target" disabled aria-hidden="true" />'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns true when content made unfocusable through disabled fieldset', function () {
    let params = checkSetup(
      '<fieldset id="target" disabled aria-hidden="true"><input /></fieldset>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  (shadowSupported ? it : xit)(
    'returns false when content is in a disabled fieldset but in another shadow tree',
    function () {
      let fieldset = document.createElement('fieldset');
      fieldset.setAttribute('disabled', 'true');
      fieldset.setAttribute('aria-hidden', 'true');
      fieldset.setAttribute('id', 'target');
      let disabledInput = document.createElement('input');
      fieldset.appendChild(disabledInput);
      let shadowRoot = document.createElement('div');
      fieldset.appendChild(shadowRoot);
      let shadow = shadowRoot.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<label>Shadow input <input /></label>';
      let params = checkSetup(fieldset);

      let actual = check.evaluate.apply(checkContext, params);

      assert.isFalse(actual);
    }
  );

  it('returns false when content is in the legend of a disabled fieldset', function () {
    let params = checkSetup(
      '<fieldset id="target" disabled aria-hidden="true"><legend><input /></legend></fieldset>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns false when content is in an aria-hidden but not disabled fieldset', function () {
    let params = checkSetup(
      '<fieldset id="target" aria-hidden="true"><input /></fieldset>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns true when focusable off screen link (cannot be disabled)', function () {
    let params = checkSetup(
      '<div id="target" aria-hidden="true"><a href="/" style="position:absolute; top:-999em">Link</a></div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
    assert.lengthOf(checkContext._relatedNodes, 0);
  });

  it('returns false when focusable form field only disabled through ARIA', function () {
    let params = checkSetup(
      '<div id="target" aria-hidden="true"><input type="text" aria-disabled="true"/></div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
    assert.lengthOf(checkContext._relatedNodes, 1);
    assert.deepEqual(
      checkContext._relatedNodes,
      Array.from(fixture.querySelectorAll('input'))
    );
  });

  it('returns false when focusable SELECT element that can be disabled', function () {
    let params = checkSetup(
      '<div id="target" aria-hidden="true">' +
        '<label>Choose:' +
        '<select>' +
        '<option selected="selected">Chosen</option>' +
        '<option>Not Selected</option>' +
        '</select>' +
        '</label>' +
        '</div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
    assert.lengthOf(checkContext._relatedNodes, 1);
    assert.deepEqual(
      checkContext._relatedNodes,
      Array.from(fixture.querySelectorAll('select'))
    );
  });

  it('returns true when focusable AREA element (cannot be disabled)', function () {
    let params = checkSetup(
      '<main id="target" aria-hidden="true">' +
        '<map name="infographic">' +
        '<area shape="rect" coords="184,6,253,27" href="https://mozilla.org"' +
        'target="_blank" alt="Mozilla" />' +
        '</map>' +
        '</main>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  (shadowSupported ? it : xit)(
    'returns false when focusable content inside shadowDOM, that can be disabled',
    function () {
      // Note:
      // `testUtils.checkSetup` does not work for shadowDOM
      // as `axe._tree` and `axe._selectorData` needs to be updated after shadowDOM construction
      fixtureSetup('<div id="target"></div>');
      let node = fixture.querySelector('#target');
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<button>Some text</button>';
      axe.testUtils.flatTreeSetup(fixture);
      axe._selectorData = axe.utils.getSelectorData(axe._tree);
      let virtualNode = axe.utils.getNodeFromTree(node);
      let actual = check.evaluate.call(checkContext, node, {}, virtualNode);
      assert.isFalse(actual);
    }
  );

  it('returns true when focusable target that cannot be disabled', function () {
    let params = checkSetup(
      '<div aria-hidden="true"><a id="target" href="">foo</a><button>bar</button></div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns false when focusable target that can be disabled', function () {
    let params = checkSetup(
      '<div aria-hidden="true"><a href="">foo</a><button id="target">bar</button></div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns true if there is a focusable element and modal is open', function () {
    let params = checkSetup(
      '<div id="target" aria-hidden="true">' +
        '<button>Some button</button>' +
        '</div>' +
        '<div role="dialog">Modal</div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns undefined when the control has onfocus', function () {
    let params = checkSetup(
      '<button aria-hidden="true" id="target" onfocus="redirectFocus()">Button</button>'
    );
    assert.isUndefined(check.evaluate.apply(checkContext, params));
  });

  it('returns undefined when all focusable controls have onfocus events', function () {
    let params = checkSetup(
      '<div aria-hidden="true" id="target">' +
        '  <button onfocus="redirectFocus()">button</button>' +
        '</div>'
    );
    assert.isUndefined(check.evaluate.apply(checkContext, params));
  });

  it('returns false when some, but not all focusable controls have onfocus events', function () {
    let params = checkSetup(
      '<div aria-hidden="true" id="target">' +
        '  <button onfocus="redirectFocus()">button</button>' +
        '  <button>button</button>' +
        '</div>'
    );
    assert.isFalse(check.evaluate.apply(checkContext, params));
  });

  it('returns undefined when control has 0 width and height and pointer events: none (focus trap bumper)', () => {
    let params = checkSetup(
      '<button id="target" aria-hidden="true" style="pointer-events: none; width: 0; height: 0; margin: 0; padding: 0; border: 0"></button>'
    );
    assert.isUndefined(check.evaluate.apply(checkContext, params));
  });
});
