describe('focusable-element tests', function () {
  'use strict';

  let check;
  let fixture = document.getElementById('fixture');
  let checkContext = axe.testUtils.MockCheckContext();
  let checkSetup = axe.testUtils.checkSetup;

  before(function () {
    check = checks['focusable-element'];
  });

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
    checkContext.reset();
  });

  it('returns true when element is focusable', function () {
    let params = checkSetup('<input id="target" type="radio">');
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns false when element made not focusable by tabindex', function () {
    let params = checkSetup(
      '<input id="target" type="checkbox" tabindex="-1">'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns false when element is not focusable by default', function () {
    let params = checkSetup('<p id="target">I hold some text </p>');
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns true when element made focusable by tabindex', function () {
    let params = checkSetup(
      '<p id="target" tabindex="0">I hold some text </p>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns true when element made focusable by contenteditable', function () {
    let params = checkSetup(
      '<p id="target" contenteditable>I hold some text </p>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns true when element made focusable by contenteditable="true"', function () {
    let params = checkSetup(
      '<p id="target" contenteditable="true">I hold some text </p>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns false when element made focusable by contenteditable="false"', function () {
    let params = checkSetup(
      '<p id="target" contenteditable="false">I hold some text </p>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns true when element made focusable by contenteditable="invalid" and parent is contenteditable', function () {
    let params = checkSetup(
      '<div contenteditable><p id="target" contenteditable="invalid">I hold some text </p></div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns false when element made focusable by contenteditable="invalid" and parent is not contenteditable', function () {
    let params = checkSetup(
      '<div><p id="target" contenteditable="invalid">I hold some text </p></div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns false when element made focusable by contenteditable="invalid" and parent is contenteditable="false"', function () {
    let params = checkSetup(
      '<div contenteditable="false"><p id="target" contenteditable="invalid">I hold some text </p></div>'
    );
    let actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });
});
