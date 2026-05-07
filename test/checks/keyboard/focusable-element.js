describe('focusable-element tests', () => {
  let check;
  const fixture = document.getElementById('fixture');
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;

  before(() => {
    check = checks['focusable-element'];
  });

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
    checkContext.reset();
  });

  it('returns true when element is focusable', () => {
    const params = checkSetup('<input id="target" type="radio">');
    const actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns false when element made not focusable by tabindex', () => {
    const params = checkSetup(
      '<input id="target" type="checkbox" tabindex="-1">'
    );
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns false when element is not focusable by default', () => {
    const params = checkSetup('<p id="target">I hold some text </p>');
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns true when element made focusable by tabindex', () => {
    const params = checkSetup(
      '<p id="target" tabindex="0">I hold some text </p>'
    );
    const actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns true when element made focusable by contenteditable', () => {
    const params = checkSetup(
      '<p id="target" contenteditable>I hold some text </p>'
    );
    const actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns true when element made focusable by contenteditable="true"', () => {
    const params = checkSetup(
      '<p id="target" contenteditable="true">I hold some text </p>'
    );
    const actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns false when element made focusable by contenteditable="false"', () => {
    const params = checkSetup(
      '<p id="target" contenteditable="false">I hold some text </p>'
    );
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns true when element made focusable by contenteditable="invalid" and parent is contenteditable', () => {
    const params = checkSetup(
      '<div contenteditable><p id="target" contenteditable="invalid">I hold some text </p></div>'
    );
    const actual = check.evaluate.apply(checkContext, params);
    assert.isTrue(actual);
  });

  it('returns false when element made focusable by contenteditable="invalid" and parent is not contenteditable', () => {
    const params = checkSetup(
      '<div><p id="target" contenteditable="invalid">I hold some text </p></div>'
    );
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });

  it('returns false when element made focusable by contenteditable="invalid" and parent is contenteditable="false"', () => {
    const params = checkSetup(
      '<div contenteditable="false"><p id="target" contenteditable="invalid">I hold some text </p></div>'
    );
    const actual = check.evaluate.apply(checkContext, params);
    assert.isFalse(actual);
  });
});
