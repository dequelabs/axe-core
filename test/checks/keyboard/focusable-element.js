describe('focusable-element tests', function () {
  'use strict';

  var check;
  var fixture = document.getElementById('fixture');
  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;

  before(function () {
    check = checks['focusable-element'];
  });

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
    checkContext.reset();
  });

  it('returns true when element is focusable', function () {
    var params = checkSetup('<input id="target" type="radio">');
    var actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns false when element made not focusable by tabindex', function () {
    var params = checkSetup(
      '<input id="target" type="checkbox" tabindex="-1">'
    );
    var actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns false when element is not focusable by default', function () {
    var params = checkSetup('<p id="target">I hold some text </p>');
    var actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns true when element made focusable by tabindex', function () {
    var params = checkSetup(
      '<p id="target" tabindex="0">I hold some text </p>'
    );
    var actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns true when element made focusable by contenteditable', function () {
    var params = checkSetup(
      '<p id="target" contenteditable>I hold some text </p>'
    );
    var actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns true when element made focusable by contenteditable="true"', function () {
    var params = checkSetup(
      '<p id="target" contenteditable="true">I hold some text </p>'
    );
    var actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns false when element made focusable by contenteditable="false"', function () {
    var params = checkSetup(
      '<p id="target" contenteditable="false">I hold some text </p>'
    );
    var actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns true when element made focusable by contenteditable="invalid" and parent is contenteditable', function () {
    var params = checkSetup(
      '<div contenteditable><p id="target" contenteditable="invalid">I hold some text </p></div>'
    );
    var actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns false when element made focusable by contenteditable="invalid" and parent is not contenteditable', function () {
    var params = checkSetup(
      '<div><p id="target" contenteditable="invalid">I hold some text </p></div>'
    );
    var actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns false when element made focusable by contenteditable="invalid" and parent is contenteditable="false"', function () {
    var params = checkSetup(
      '<div contenteditable="false"><p id="target" contenteditable="invalid">I hold some text </p></div>'
    );
    var actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });
});
