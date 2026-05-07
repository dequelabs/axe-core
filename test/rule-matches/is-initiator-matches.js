describe('is-initiator-matches', () => {
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('html-has-lang');
  });

  afterEach(() => {
    const fixture = document.getElementById('fixture');
    fixture.innerHTML = '';
  });

  it('should return true if the context is the initiator', () => {
    assert.isTrue(rule.matches(null, null, { initiator: true }));
  });

  it('should return false if the context is not the initiator', () => {
    assert.isFalse(rule.matches(null, null, { initiator: false }));
  });
});
