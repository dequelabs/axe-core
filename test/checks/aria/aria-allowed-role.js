describe('aria-allowed-role', function () {
  'use strict';

  var queryFixture = axe.testUtils.queryFixture;
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    checkContext.reset();
  });

  it('returns true if given element is an ignoredTag in options', function () {
    var vNode = queryFixture(
      '<article id="target" role="presentation"></article>'
    );
    var options = {
      ignoredTags: ['article']
    };
    var actual = axe.testUtils
      .getCheckEvaluate('aria-allowed-role')
      .call(checkContext, null, options, vNode);
    var expected = true;
    assert.equal(actual, expected);
    assert.isNull(checkContext._data, null);
  });

  it('returns false with implicit role of row for TR when allowImplicit is set to false via options', function () {
    var vNode = queryFixture(
      '<table role="grid"><tr id="target" role="row"></tr></table>'
    );
    var options = {
      allowImplicit: false
    };
    var outcome = axe.testUtils
      .getCheckEvaluate('aria-allowed-role')
      .call(checkContext, null, options, vNode);

    assert.isFalse(outcome);
    assert.deepEqual(checkContext._data, ['row']);
  });

  it('returns undefined (needs review) when element is hidden and has unallowed role', function () {
    var vNode = queryFixture(
      '<button id="target" type="button" aria-hidden="true"' +
        'role="presentation"></button>'
    );
    var actual = axe.testUtils
      .getCheckEvaluate('aria-allowed-role')
      .call(checkContext, null, null, vNode);
    assert.isUndefined(actual);
  });

  it('returns undefined (needs review) when element is with in hidden parent and has unallowed role', function () {
    var vNode = queryFixture(
      '<div style="display:none">' +
        '<button id="target" class="mm-tabstart" type="button"' +
        'role="presentation"></button>' +
        '</div>'
    );
    var actual = axe.testUtils
      .getCheckEvaluate('aria-allowed-role')
      .call(checkContext, null, null, vNode);
    assert.isUndefined(actual);
  });

  it('returns true when BUTTON has type menu and role as menuitem', function () {
    var vNode = queryFixture(
      '<button id="target" type="menu" role="menuitem"></button>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('returns true when img has no alt and role="presentation"', function () {
    var vNode = queryFixture('<img id="target" role="presentation"/>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, null);
  });

  it('returns true when img has no alt and role="none"', function () {
    var vNode = queryFixture('<img id="target" role="none"/>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, null);
  });

  it('returns true when img has empty alt and role="presentation"', function () {
    var vNode = queryFixture('<img id="target" alt="" role="presentation"/>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, null);
  });

  it('returns true when img has empty alt and role="none"', function () {
    var vNode = queryFixture('<img id="target" alt="" role="none"/>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, null);
  });

  it('returns false when img has alt and role="presentation"', function () {
    var vNode = queryFixture(
      '<img id="target" alt="not empty" role="presentation"/>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['presentation']);
  });

  it('returns false when img has alt and role="none"', function () {
    var vNode = queryFixture('<img id="target" alt="not empty" role="none"/>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['none']);
  });

  it('returns true when img has aria-label and a valid role, role="button"', function () {
    var vNode = queryFixture(
      '<img id="target" aria-label="foo" role="button"/>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data, null);
  });

  it('returns false when img has aria-label and a invalid role, role="alert"', function () {
    var vNode = queryFixture(
      '<img id="target" aria-label="foo" role="alert"/>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['alert']);
  });

  it('returns true when img has aria-labelledby and a valid role, role="menuitem"', function () {
    var vNode = queryFixture(
      '<div id="foo">hello world</div>' +
        '<img id="target" aria-labelledby="foo" role="menuitem"/>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data, null);
  });

  it('returns false when img has aria-labelledby and a invalid role, role="rowgroup"', function () {
    var vNode = queryFixture(
      '<div id="foo">hello world</div>' +
        '<img id="target" aria-labelledby="foo" role="rowgroup"/>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['rowgroup']);
  });

  it('returns true when img has title and a valid role, role="link"', function () {
    var vNode = queryFixture(
      '<div id="foo">hello world</div>' +
        '<img id="target" title="foo" role="link"/>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data, null);
  });

  it('returns false when img has title and a invalid role, role="radiogroup"', function () {
    var vNode = queryFixture(
      '<div id="foo">hello world</div>' +
        '<img id="target" title="foo" role="radiogroup"/>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['radiogroup']);
  });

  it('returns true when input of type image and no role', function () {
    var vNode = queryFixture('<input id="target" type="image"/>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data, null);
  });

  it('returns true when INPUT type is checkbox and has aria-pressed attribute', function () {
    var vNode = queryFixture(
      '<input id="target" type="checkbox" aria-pressed="">'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('returns true when INPUT type is text with role combobox', function () {
    var vNode = queryFixture('<input id="target" type="text" role="combobox">');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('returns true when INPUT type is tel with role combobox', function () {
    var vNode = queryFixture('<input id="target" type="tel" role="combobox">');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('returns true when INPUT type is url with role combobox', function () {
    var vNode = queryFixture('<input id="target" type="url" role="combobox">');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('returns true when INPUT type is search with role combobox', function () {
    var vNode = queryFixture(
      '<input id="target" type="search" role="combobox">'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('returns true when INPUT type is email with role combobox', function () {
    var vNode = queryFixture(
      '<input id="target" type="email" role="combobox">'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('returns true when INPUT type is text with role spinbutton', function () {
    var vNode = queryFixture(
      '<input id="target" type="text" role="spinbutton">'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('returns true when INPUT type is number with role spinbutton', function () {
    var vNode = queryFixture(
      '<input id="target" type="number" role="spinbutton">'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('returns true when INPUT type is tel with role spinbutton', function () {
    var vNode = queryFixture(
      '<input id="target" type="tel" role="spinbutton">'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('returns true when INPUT type is text with role searchbox', function () {
    var vNode = queryFixture(
      '<input id="target" type="text" role="searchbox">'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('returns false when a role is set on an element that does not allow any role', function () {
    var vNode = queryFixture('<dd id="target" role="link">');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['link']);
  });

  it('returns true when a role is set on an element that can have any role', function () {
    var vNode = queryFixture('<div id="target" role="link"></dd>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('returns true an <a> without a href to have any role', function () {
    var vNode = queryFixture('<a id="target" role="presentation"></a>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('returns true <a> with a empty href to have any valid role', function () {
    var vNode = queryFixture('<a id="target" role="link" href=""></a>');
    var actual = axe.testUtils
      .getCheckEvaluate('aria-allowed-role')
      .call(checkContext, null, null, vNode);
    assert.isTrue(actual);
  });

  it('returns true <img> with a non-empty alt', function () {
    var vNode = queryFixture('<img id="target" role="button" alt="some text">');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should allow <select> without a multiple and size attribute to have a menu role', function () {
    var vNode = queryFixture('<select id="target" role="menu">');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data, null);
  });

  it('returns true custom element <my-navbar> with a role of navigation', function () {
    var vNode = queryFixture('<my-navbar id="target" role="navigation">');
    var actual = axe.testUtils
      .getCheckEvaluate('aria-allowed-role')
      .call(checkContext, null, null, vNode);
    assert.isTrue(actual);
    assert.isNull(checkContext._data, null);
  });

  it('returns false if a dpub role’s type is not the element’s implicit role', function () {
    var vNode = queryFixture('<article id="target" role="doc-biblioref">');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
  });

  it('returns true if a dpub role’s type is the element’s implicit role', function () {
    var vNode = queryFixture('<a id="target" href="foo" role="doc-biblioref">');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, null, null, vNode)
    );
  });
});
