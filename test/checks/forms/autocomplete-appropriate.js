describe('autocomplete-appropriate', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var checkSetup = axe.testUtils.checkSetup;
  var checkContext = axe.testUtils.MockCheckContext();
  var evaluate = axe.testUtils.getCheckEvaluate('autocomplete-appropriate');

  beforeEach(function () {
    axe._tree = undefined;
  });

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  function autocompleteCheckParams(term, type, options) {
    return checkSetup(
      '<input autocomplete="' + term + '" type=' + type + ' id="target" />',
      options
    );
  }

  it('returns true for non-select elements', function () {
    ['div', 'button', 'select', 'textarea'].forEach(function (tagName) {
      var elm = document.createElement(tagName);
      elm.setAttribute('autocomplete', 'foo');
      elm.setAttribute('type', 'email');
      var params = checkSetup(elm);

      assert.isTrue(
        evaluate.apply(checkContext, params),
        'failed for ' + tagName
      );
    });
  });

  it('returns true if the input type is in the map', function () {
    var options = { foo: ['url'] };
    var params = autocompleteCheckParams('foo', 'url', options);
    assert.isTrue(evaluate.apply(checkContext, params));
  });

  it('returns false if the input type is not in the map', function () {
    var options = { foo: ['url'] };
    var params = autocompleteCheckParams('foo', 'email', options);
    assert.isFalse(evaluate.apply(checkContext, params));
  });

  it('returns true if the input type is text and the term is undefined', function () {
    var options = {};
    var params = autocompleteCheckParams('foo', 'text', options);
    assert.isTrue(evaluate.apply(checkContext, params));
  });

  it('returns true if the input type is tel and the term is off', function () {
    var options = {};
    var params = autocompleteCheckParams('off', 'tel', options);
    assert.isTrue(evaluate.apply(checkContext, params));
  });

  it('returns true if the input type is url and the term is on', function () {
    var options = {};
    var params = autocompleteCheckParams('on', 'url', options);
    assert.isTrue(evaluate.apply(checkContext, params));
  });

  it('returns true if the input type is foobar and the term is undefined', function () {
    var options = {};
    var params = autocompleteCheckParams('foo', 'foobar', options);
    assert.isTrue(evaluate.apply(checkContext, params));
  });

  it('returns true if the input type is email and the term is username', function () {
    var options = {};
    var params = autocompleteCheckParams('username', 'email', options);
    assert.isTrue(evaluate.apply(checkContext, params));
  });

  it('returns false if the input type is text and the term maps to an empty array', function () {
    var options = { foo: [] };
    var params = autocompleteCheckParams('foo', 'text', options);
    assert.isFalse(evaluate.apply(checkContext, params));
  });

  it('returns false if the input type is month and term is bday-month', function () {
    var options = {};
    var params = autocompleteCheckParams('bday-month', 'month', options);
    assert.isFalse(evaluate.apply(checkContext, params));
  });

  it('returns false if the input type is MONTH (case-insensitive & sanitized) and term is bday-month', function () {
    var options = {};
    var params = autocompleteCheckParams('bday-month', '   MONTH    ', options);
    assert.isFalse(evaluate.apply(checkContext, params));
  });
});
