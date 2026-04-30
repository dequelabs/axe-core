describe('layout-table-matches', () => {
  const fixture = document.getElementById('fixture');
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('frame-title-unique');
  });

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should return true if title attribute has text', () => {
    fixture.innerHTML = '<iframe title="hello"></iframe>';
    const node = fixture.firstChild;
    assert.isTrue(rule.matches(node));
  });

  it('should return false if title attribute is empty', () => {
    fixture.innerHTML = '<iframe title=""></iframe>';
    const node = fixture.firstChild;
    assert.isFalse(rule.matches(node));
  });

  it('should return false if title attribute contains only whitespace', () => {
    fixture.innerHTML = '<iframe title="    "></iframe>';
    const node = fixture.firstChild;
    assert.isFalse(rule.matches(node));
  });
});
