describe('layout-table-matches', () => {
  const fixture = document.getElementById('fixture');
  const flatTreeSetup = axe.testUtils.flatTreeSetup;
  let rule;

  beforeEach(() => {
    axe.configure({
      rules: [
        {
          id: 'layout-rule',
          matches: 'layout-table-matches'
        }
      ]
    });

    rule = axe.utils.getRule('layout-rule');
  });

  afterEach(() => {
    fixture.innerHTML = '';
    axe.reset();
  });

  it('should return false for data table', () => {
    fixture.innerHTML = '<table><caption>Hello></caption></table>';
    flatTreeSetup(fixture);
    const node = fixture.firstChild;

    assert.isFalse(rule.matches(node));
  });

  it('should return false if the table is focusable', () => {
    fixture.innerHTML = '<table tabindex="0"></table>';
    flatTreeSetup(fixture);
    const node = fixture.firstChild;

    assert.isFalse(rule.matches(node));
  });

  it('should return true if table has role=presentation', () => {
    fixture.innerHTML = '<table role="presentation"></table>';
    flatTreeSetup(fixture);
    const node = fixture.firstChild;

    assert.isTrue(rule.matches(node));
  });

  it('should return true if table has role=none', () => {
    fixture.innerHTML = '<table role="none"></table>';
    flatTreeSetup(fixture);
    const node = fixture.firstChild;

    assert.isTrue(rule.matches(node));
  });
});
