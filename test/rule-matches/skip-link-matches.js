describe('skip-link-matches', () => {
  let rule, link;
  const fixture = document.getElementById('fixture');

  beforeEach(() => {
    rule = axe.utils.getRule('skip-link');
    fixture.innerHTML =
      '<a href="" id="target" style="position: absolute; left: -10000px;">Click me</a><div id="main"></div>';
    link = fixture.querySelector('#target');
    axe._tree = axe.utils.getFlattenedTree(fixture);
  });

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
  });

  it('is a function', () => {
    assert.isFunction(rule.matches);
  });

  it('returns false if the links is onscreen', () => {
    link.removeAttribute('style');
    link.href = '#main';
    assert.isFalse(rule.matches(link));
  });

  it('returns false if the href attribute does not start with #', () => {
    link.href = 'foo#bar';
    assert.isFalse(rule.matches(link));
  });

  it('returns false if the href attribute is `#`', () => {
    link.href = '#';
    assert.isFalse(rule.matches(link));
  });

  it('returns false if the href attribute starts with #!', () => {
    link.href = '#!foo';
    assert.isFalse(rule.matches(link));
  });

  it('returns false if the href attribute starts with #/', () => {
    link.href = '#/foo';
    assert.isFalse(rule.matches(link));
  });

  it('returns true if the href attribute starts with #', () => {
    link.href = '#main';
    assert.isTrue(rule.matches(link));
  });

  it('returns true if the href attribute starts with /# (angular)', () => {
    link.href = '/#main';
    assert.isTrue(rule.matches(link));
  });
});
